import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { registerChatRoutes } from "./chat-routes";
import { setupVite, serveStatic, log } from "./vite";
import fs from 'fs';
import path from 'path';

const app = express();

// Enable trust proxy for deployment environments
app.set('trust proxy', 1);

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);
  registerChatRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error('Server error:', err);
    res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use PORT environment variable or default to 3000 for development
  // this serves both the API and the client.
  const port = parseInt(process.env.PORT || '3000', 10);

  const startServer = (attemptPort: number) => {
    server.listen({
      port: attemptPort,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving on port ${attemptPort}`);
    }).on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        log(`Port ${attemptPort} is busy, trying ${attemptPort + 1}`);
        startServer(attemptPort + 1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  };

  startServer(port);
})();

// Use all routes from routes.ts
// File creation endpoint
app.post('/api/files/create', async (req, res) => {
  try {
    const { fileName, content, language } = req.body;

    if (!fileName || content === undefined) {
      return res.status(400).json({ error: 'fileName and content are required' });
    }

    // Create the file path
    const filePath = path.join(process.cwd(), fileName);

    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, content, 'utf8');

    console.log(`📄 Created file: ${fileName}`);
    res.json({ success: true, fileName, path: filePath });
  } catch (error) {
    console.error('Error creating file:', error);
    res.status(500).json({ error: 'Failed to create file' });
  }
});

// File listing endpoint
app.get('/api/files/list', async (req, res) => {
  try {
    const projectDir = process.cwd();
    const files: any = {};

    const scanDirectory = (dir: string, relativePath = '') => {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        // Skip certain directories and files
        if (item.startsWith('.') || item === 'node_modules' || item === 'server' || item === 'temp-projects') {
          continue;
        }

        const fullPath = path.join(dir, item);
        const relativeFilePath = relativePath ? path.join(relativePath, item) : item;
        const stat = fs.statSync(fullPath);

        if (stat.isFile()) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const ext = path.extname(item).toLowerCase();
            let type = 'text';

            if (ext === '.html') type = 'html';
            else if (ext === '.css') type = 'css';
            else if (ext === '.js' || ext === '.jsx') type = 'javascript';
            else if (ext === '.ts' || ext === '.tsx') type = 'typescript';
            else if (ext === '.py') type = 'python';
            else if (ext === '.json') type = 'json';

            files[relativeFilePath] = { content, type };
          } catch (error) {
            // Skip files that can't be read
          }
        } else if (stat.isDirectory()) {
          scanDirectory(fullPath, relativeFilePath);
        }
      }
    };

    scanDirectory(projectDir);
    res.json({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});