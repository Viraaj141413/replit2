import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createDefaultProject, type Project } from '@/lib/file-system';
import ChatInterface from '@/components/chat-interface-new';
import { Button } from '@/components/ui/button';
import { Brain, Home, Monitor, Terminal, FileText, Folder, Package } from 'lucide-react';
import CodeEditor from '@/components/code-editor';
import FileExplorer from '@/components/file-explorer';
import RightPanel from '@/components/right-panel';

export default function IDE() {
  const [project, setProject] = useState<Project>(createDefaultProject('My Project'));

  // Load existing files on mount
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const response = await fetch('/api/files/list');
        if (response.ok) {
          const data = await response.json();
          setProject(prev => ({
            ...prev,
            files: data.files
          }));
        }
      } catch (error) {
        console.error('Failed to load files:', error);
      }
    };

    loadFiles();
  }, []);
  const [appContent, setAppContent] = useState<string>('');
  const [consoleLogs, setConsoleLogs] = useState<Array<{
    message: string;
    type: 'success' | 'error' | 'info';
    timestamp: Date;
  }>>([]);
  const [openFile, setOpenFile] = useState<{name: string, content: string, language: string} | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<Array<{name: string, content: string, language: string}>>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Create dynamic file tree from generated files
  const createFileTree = () => {
    const tree: any[] = [];
    const folderMap = new Map();

    // Add generated files to tree
    generatedFiles.forEach(file => {
      const pathParts = file.name.split('/');
      let currentLevel = tree;
      let currentPath = '';

      pathParts.forEach((part, index) => {
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        if (index === pathParts.length - 1) {
          // This is a file
          currentLevel.push({
            name: part,
            type: 'file',
            generatedFile: file,
            disabled: false
          });
        } else {
          // This is a folder
          let folder = currentLevel.find(item => item.name === part && item.type === 'folder');
          if (!folder) {
            folder = {
              name: part,
              type: 'folder',
              children: []
            };
            currentLevel.push(folder);
          }
          currentLevel = folder.children;
        }
      });
    });

    // Add default structure if no files generated yet
    if (generatedFiles.length === 0) {
      return [
        { name: 'src', type: 'folder', children: [], disabled: true },
        { name: 'public', type: 'folder', children: [], disabled: true },
        { name: 'package.json', type: 'file', disabled: true },
        { name: 'README.md', type: 'file', disabled: true }
      ];
    }

    return tree;
  };

  const sampleFiles = createFileTree();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectName = params.get('name') || 'My Custom App';
    const newProject = createDefaultProject(projectName);
    setProject(newProject);

    // Auto-start chat if prompt provided
    const prompt = searchParams.get('prompt');
    if (prompt) {
      localStorage.setItem('projectDescription', prompt);
      // Trigger chat with the prompt automatically
      setTimeout(() => {
        const event = new CustomEvent('autoStartChat', { detail: { prompt } });
        window.dispatchEvent(event);
      }, 1000);
    }
  }, [searchParams]);

  const handleConsoleLog = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setConsoleLogs(prev => [...prev, {
      message,
      type,
      timestamp: new Date()
    }]);
  };

  const handleAppUpdate = (htmlContent: string) => {
    setAppContent(htmlContent);
  };

  const handleFileGenerated = async (fileName: string, content: string, language: string) => {
    try {
      // Create the file via API
      const response = await fetch('/api/files/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName,
          content,
          language
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create file');
      }

      // Add the file to the project state
      setProject(prev => ({
        ...prev,
        files: {
          ...prev.files,
          [fileName]: {
            content,
            type: language || 'text'
          }
        }
      }));

      setConsoleLogs(prev => [...prev, {
        message: `📄 Created file: ${fileName}`,
        type: 'success',
        timestamp: new Date()
      }]);

      // Auto-open the first generated file
      if (Object.keys(project.files).length === 0) {
        setOpenFile({
          name: fileName,
          content,
          language: language || 'text'
        });
      }
    } catch (error) {
      console.error('Error creating file:', error);
      setConsoleLogs(prev => [...prev, {
        message: `❌ Failed to create file: ${fileName}`,
        type: 'error',
        timestamp: new Date()
      }]);
    }
  };

  const openFileInEditor = (file: {name: string, content: string, language: string}) => {
    setOpenFile(file);
  };

  const closeFileEditor = () => {
    setOpenFile(null);
  };

  const saveFileContent = (fileName: string, content: string) => {
    setGeneratedFiles(prev => {
      const updated = [...prev];
      const fileIndex = updated.findIndex(f => f.name === fileName);
      if (fileIndex >= 0) {
        updated[fileIndex] = { ...updated[fileIndex], content };
        handleConsoleLog(`Saved ${fileName}`, 'success');
      }
      return updated;
    });
  };

  const deleteFile = (fileName: string) => {
    if (confirm(`Are you sure you want to delete ${fileName}?`)) {
      setGeneratedFiles(prev => prev.filter(f => f.name !== fileName));
      if (openFile?.name === fileName) {
        setOpenFile(null);
      }
      handleConsoleLog(`Deleted ${fileName}`, 'info');
    }
  };

  const createNewFile = () => {
    const fileName = prompt('Enter file name (e.g., components/Button.tsx):');
    if (fileName && fileName.trim()) {
      const language = getLanguageFromFilename(fileName);
      const newFile = {
        name: fileName.trim(),
        content: `// ${fileName}\n// Created by user\n\nexport default function Component() {\n  return (\n    <div>\n      <h1>New Component</h1>\n    </div>\n  );\n}`,
        language
      };
      setGeneratedFiles(prev => [...prev, newFile]);
      openFileInEditor(newFile);
      handleConsoleLog(`Created ${fileName}`, 'success');
    }
  };

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath);
      } else {
        newSet.add(folderPath);
      }
      return newSet;
    });
  };

  const renderFileTree = (files: any[], depth = 0, parentPath = '') => {
    return files.map((file, index) => {
      const fullPath = parentPath ? `${parentPath}/${file.name}` : file.name;
      const isExpanded = expandedFolders.has(fullPath);

      return (
        <div key={index} style={{ paddingLeft: `${depth * 12}px` }}>
          <div 
            className="group flex items-center justify-between py-1 px-2 hover:bg-gray-700 rounded text-sm"
          >
            <div 
              className="flex items-center space-x-2 cursor-pointer flex-1"
              onClick={() => {
                if (file.type === 'folder') {
                  toggleFolder(fullPath);
                } else {
                  if (file.generatedFile) {
                    openFileInEditor(file.generatedFile);
                  }
                }
              }}
            >
              {file.type === 'folder' ? (
                <>
                  <div className="w-4 h-4 flex items-center justify-center">
                    {isExpanded ? '📂' : '📁'}
                  </div>
                  <span className="text-gray-300">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({file.children?.length || 0})
                  </span>
                </>
              ) : (
                <>
                  <FileText className={`w-4 h-4 ${file.disabled ? 'text-gray-600' : 'text-blue-400'}`} />
                  <span className={`text-gray-300 ${file.disabled ? 'text-gray-600 italic' : ''}`}>
                    {file.name}
                  </span>
                  {file.generatedFile && (
                    <span className="text-xs text-green-400">●</span>
                  )}
                </>
              )}
            </div>

            {file.generatedFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(file.generatedFile.name);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 rounded text-red-400 hover:text-white transition-all"
                title="Delete file"
              >
                ✕
              </button>
            )}
          </div>
          {file.children && isExpanded && renderFileTree(file.children, depth + 1, fullPath)}
        </div>
      );
    });
  };

  // Remove sample file content - all files are now generated

  const getLanguageFromFilename = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const langMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown'
    };
    return langMap[ext || ''] || 'text';
  };

  if (!project) {
    return (
      <div className="h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-white">Loading your workspace...</div>
      </div>
    );
  }

  const activeFile = openFile ? {name: openFile.name, content: openFile.content, language: openFile.language} : null;

  return (
    <div className="h-screen bg-[#0d1117] text-white flex overflow-hidden">
      {/* LEFT SIDEBAR - File Explorer */}
      <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Brain className="w-5 h-5 text-blue-400" />
          </div>
        </div>

        {/* File Management Actions */}
        <div className="p-2 border-b border-gray-700">
          <button
            onClick={createNewFile}
            className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
          >
            + New File
          </button>
        </div>

        {/* File Tree */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2 px-2">
              <div className="flex items-center space-x-2">
                <Package className="w-3 h-3" />
                <span>Project Files ({generatedFiles.length})</span>
              </div>
              {generatedFiles.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Delete all generated files?')) {
                      setGeneratedFiles([]);
                      setOpenFile(null);
                      handleConsoleLog('Cleared all files', 'info');
                    }
                  }}
                  className="text-red-400 hover:text-red-300"
                  title="Clear all files"
                >
                  🗑️
                </button>
              )}
            </div>
            {renderFileTree(sampleFiles)}
            {generatedFiles.length === 0 && (
              <div className="text-xs text-gray-500 mt-2 italic px-2">
                Files will appear here as the AI generates them.
                You can also create files manually using the button above.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CENTER - CHAT INTERFACE */}
      <div className="flex-1 border-r border-gray-700 bg-gray-900 flex flex-col">
        {!openFile ? (
          <ChatInterface
            project={project}
            onConsoleLog={handleConsoleLog}
            onAppUpdate={handleAppUpdate}
            onFileGenerated={handleFileGenerated}
          />
        ) : (
          <div className="flex flex-col h-full">
            {/* File Editor Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">{openFile.name}</span>
                <span className="text-xs text-gray-400 uppercase">{openFile.language}</span>
              </div>
              <button
                onClick={closeFileEditor}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <span className="text-gray-400 hover:text-white">✕</span>
              </button>
            </div>

            {/* File Content */}
            <div className="flex-1 overflow-auto">
              <textarea
                value={openFile.content}
                onChange={(e) => {
                  setOpenFile(prev => prev ? { ...prev, content: e.target.value } : null);
                }}
                className="w-full h-full p-4 text-sm text-gray-300 font-mono bg-gray-900 border-none outline-none resize-none"
                spellCheck={false}
                style={{ minHeight: '100%' }}
              />
            </div>

            {/* File Actions */}
            <div className="p-3 border-t border-gray-700 bg-gray-800 flex gap-2">
              <button
                onClick={() => {
                  if (openFile) {
                    saveFileContent(openFile.name, openFile.content);
                  }
                }}
                className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
              >
                Save File
              </button>
              <button
                onClick={closeFileEditor}
                className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
              >
                Back to Chat
              </button>
              <button
                onClick={() => {
                  if (openFile && confirm(`Delete ${openFile.name}?`)) {
                    deleteFile(openFile.name);
                  }
                }}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT - ENHANCED PANEL */}
      <div className="w-96 bg-[#0d1117] flex flex-col">
        <RightPanel 
          project={project}
          activeFile={activeFile}
          previewContent={appContent}
          onConsoleLog={handleConsoleLog}
        />
      </div>
    </div>
  );
}