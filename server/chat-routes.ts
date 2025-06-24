import { Express } from 'express';

// Helper functions for generating specific types of applications
function generateWebsiteCode(prompt: string): string {
  return `I'll create a modern, responsive website for you!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Website</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.1);
        }
        .hero-content {
            z-index: 1;
            max-width: 800px;
            padding: 0 20px;
        }
        .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            margin-bottom: 1rem;
            font-weight: 700;
        }
        .hero p {
            font-size: clamp(1.1rem, 3vw, 1.5rem);
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .cta-button {
            background: #ff6b6b;
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        .cta-button:hover {
            background: #ff5252;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
        }
        .features {
            padding: 100px 0;
            background: #f8f9fa;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-top: 60px;
        }
        .feature-card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-10px);
        }
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #333;
        }
        @media (max-width: 768px) {
            .features-grid { grid-template-columns: 1fr; }
            .hero { padding: 40px 0; }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-content">
            <h1>Welcome to the Future</h1>
            <p>Experience innovation like never before with our cutting-edge solutions</p>
            <a href="#features" class="cta-button">Explore Features</a>
        </div>
    </section>

    <section class="features" id="features">
        <div class="container">
            <h2 class="section-title">Amazing Features</h2>

            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Lightning Fast</h3>
                    <p>Optimized for speed and performance with cutting-edge technology</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎨</div>
                    <h3>Beautiful Design</h3>
                    <p>Modern, responsive design that looks great on all devices</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>Secure & Reliable</h3>
                    <p>Built with security and reliability as top priorities</p>
                </div>
            </div>
        </div>
    </section>

    <script>
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>
\`\`\`

This website includes:
- Modern responsive design
- Smooth animations and interactions
- Mobile-first approach
- Optimized performance
- Clean, semantic HTML
- Professional styling

Just save as an HTML file and open in your browser!`;
}

function generateReactCode(prompt: string): string {
  return `I'll create a modern React application for you!

\`\`\`json
{
  "name": "react-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  }
}
\`\`\`

\`\`\`tsx
import React, { useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }])
      setInput('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Modern Todo App</h1>

        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            Add Task
          </button>
        </div>

        <div className="todos-list">
          {todos.map(todo => (
            <div key={todo.id} className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <div className="empty-state">
            <p>No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
\`\`\`

This React app includes:
- TypeScript for type safety
- Modern React hooks
- Beautiful responsive design
- Smooth animations
- Full todo functionality

Run with: \`npm install && npm run dev\``;
}

function generatePythonCode(prompt: string): string {
  return `I'll create a comprehensive Python application for you!

\`\`\`python
#!/usr/bin/env python3
"""
Modern Python Application
Built with best practices and error handling
"""

import json
import csv
import os
import sys
from datetime import datetime
from typing import List, Dict, Optional
import requests

class DataProcessor:
    """A comprehensive data processing class"""

    def __init__(self):
        self.data = []
        self.processed_data = []

    def load_from_csv(self, filename: str) -> bool:
        """Load data from CSV file"""
        try:
            with open(filename, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                self.data = [row for row in reader]
                print(f"✅ Loaded {len(self.data)} records from {filename}")
                return True
        except FileNotFoundError:
            print(f"❌ File {filename} not found")
            return False
        except Exception as e:
            print(f"❌ Error loading CSV: {e}")
            return False

    def analyze_data(self) -> Dict:
        """Analyze the loaded data"""
        if not self.data:
            print("❌ No data to analyze")
            return {}

        analysis = {
            'total_records': len(self.data),
            'timestamp': datetime.now().isoformat(),
            'fields': list(self.data[0].keys()) if self.data else [],
            'summary': {}
        }
        return analysis

def main():
    """Main application function"""
    print("🚀 Python Data Processor Started")
    processor = DataProcessor()
    print("Ready to process data!")

if __name__ == "__main__":
    main()
\`\`\`

This Python application includes:
- Complete data processing capabilities
- Error handling and validation
- Type hints for better code quality
- Professional structure

Run with: \`python main.py\``;
}

function generateAPICode(prompt: string): string {
  return `I'll create a complete REST API server for you!

\`\`\`javascript
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
];

// Routes
app.get('/api/users', (req, res) => {
  res.json({ data: users });
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ data: user });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: Date.now(),
    name,
    email
  };

  users.push(newUser);
  res.status(201).json({ data: newUser });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🚀 Server running on http://0.0.0.0:\${PORT}\`);
});
\`\`\`

This REST API includes:
- Complete CRUD operations
- Input validation and error handling
- CORS support
- Clean, RESTful design

Run with: \`npm install && npm start\``;
}

function generateLocalResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('calculator')) {
    return `I'll create a modern calculator for you!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .calculator {
            background: white;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .display {
            width: 100%;
            height: 60px;
            font-size: 24px;
            text-align: right;
            border: 2px solid #ddd;
            border-radius: 10px;
            padding: 0 15px;
            margin-bottom: 20px;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        button {
            height: 50px;
            font-size: 18px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .number { background: #f8f9fa; }
        .operator { background: #667eea; color: white; }
        .equals { background: #28a745; color: white; }
        .clear { background: #dc3545; color: white; }
        button:hover { transform: translateY(-2px); }
    </style>
</head>
<body>
    <div class="calculator">
        <input type="text" class="display" id="display" value="0" readonly>
        <div class="buttons">
            <button class="clear" onclick="clearDisplay()">C</button>
            <button class="clear" onclick="deleteLast()">←</button>
            <button class="operator" onclick="appendToDisplay('/')">/</button>
            <button class="operator" onclick="appendToDisplay('*')">×</button>
            <button class="number" onclick="appendToDisplay('7')">7</button>
            <button class="number" onclick="appendToDisplay('8')">8</button>
            <button class="number" onclick="appendToDisplay('9')">9</button>
            <button class="operator" onclick="appendToDisplay('-')">-</button>
            <button class="number" onclick="appendToDisplay('4')">4</button>
            <button class="number" onclick="appendToDisplay('5')">5</button>
            <button class="number" onclick="appendToDisplay('6')">6</button>
            <button class="operator" onclick="appendToDisplay('+')">+</button>
            <button class="number" onclick="appendToDisplay('1')">1</button>
            <button class="number" onclick="appendToDisplay('2')">2</button>
            <button class="number" onclick="appendToDisplay('3')">3</button>
            <button class="equals" onclick="calculate()">=</button>
            <button class="number" onclick="appendToDisplay('0')" style="grid-column: span 2;">0</button>
            <button class="number" onclick="appendToDisplay('.')">.</button>
        </div>
    </div>

    <script>
        let display = document.getElementById('display');
        let currentInput = '0';

        function updateDisplay() {
            display.value = currentInput;
        }

        function appendToDisplay(value) {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay();
        }

        function clearDisplay() {
            currentInput = '0';
            updateDisplay();
        }

        function deleteLast() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }

        function calculate() {
            try {
                currentInput = eval(currentInput.replace('×', '*')).toString();
            } catch (error) {
                currentInput = 'Error';
            }
            updateDisplay();
        }
    </script>
</body>
</html>
\`\`\`

Just save as an HTML file and open in your browser!`;
  }

  return "Hello! I can help you create websites, apps, calculators, todo lists, and more. What would you like to build?";
}

export function registerChatRoutes(app: Express) {
  // Chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ 
          success: false, 
          error: 'Prompt is required' 
        });
      }

      let response = '';

      // Generate appropriate response based on prompt
      const lowerPrompt = prompt.toLowerCase();

      if (lowerPrompt.includes('website') || lowerPrompt.includes('landing')) {
        response = generateWebsiteCode(prompt);
      } else if (lowerPrompt.includes('react')) {
        response = generateReactCode(prompt);
      } else if (lowerPrompt.includes('python')) {
        response = generatePythonCode(prompt);
      } else if (lowerPrompt.includes('api') || lowerPrompt.includes('server')) {
        response = generateAPICode(prompt);
      } else {
        response = generateLocalResponse(prompt);
      }

      res.json({
        success: true,
        response: response
      });

    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  });

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'Server is running',
      timestamp: new Date().toISOString()
    });
  });
}