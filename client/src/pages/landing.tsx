
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Clock, Code, Sparkles, Zap, Plus, Home, Calculator, Gamepad2, ShoppingCart, MessageSquare, BarChart3, Cloud } from 'lucide-react';

interface RecentProject {
  id: string;
  name: string;
  description: string;
  lastModified: Date;
  type: 'web' | 'mobile' | 'api' | 'desktop';
}

export default function Landing() {
  const [inputValue, setInputValue] = useState('');
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecentProjects = () => {
      const saved = localStorage.getItem('recentProjects');
      if (saved) {
        const projects = JSON.parse(saved);
        setRecentProjects(projects.map((p: any) => ({
          ...p,
          lastModified: new Date(p.lastModified)
        })));
      } else {
        const defaultProjects: RecentProject[] = [
          {
            id: '1',
            name: 'Calculator App',
            description: 'Modern calculator with keyboard support',
            lastModified: new Date(Date.now() - 1000 * 60 * 30),
            type: 'web'
          },
          {
            id: '2', 
            name: 'Todo List App',
            description: 'Task management with local storage',
            lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2),
            type: 'web'
          }
        ];
        setRecentProjects(defaultProjects);
        localStorage.setItem('recentProjects', JSON.stringify(defaultProjects));
      }
    };

    loadRecentProjects();
  }, []);

  const handleStartBuilding = () => {
    if (inputValue.trim()) {
      localStorage.setItem('projectDescription', inputValue.trim());
      localStorage.setItem('autoStartMessage', inputValue.trim());
      navigate(`/ide?prompt=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStartBuilding();
    }
  };

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'web': return <Code className="w-5 h-5" />;
      case 'mobile': return <Sparkles className="w-5 h-5" />;
      case 'api': return <Zap className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const quickStartApps = [
    { icon: Calculator, name: "Calculator App", description: "Modern calculator with keyboard support" },
    { icon: MessageSquare, name: "Todo List App", description: "Task management with local storage" },
    { icon: Gamepad2, name: "Simple Game", description: "Interactive browser game" },
    { icon: ShoppingCart, name: "E-commerce Site", description: "Online store with shopping cart" },
    { icon: BarChart3, name: "Dashboard App", description: "Data visualization dashboard" },
    { icon: Cloud, name: "Weather App", description: "Real-time weather information" }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-semibold">AI App Builder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/ide')}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Build anything with AI
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Describe your app idea and watch AI generate complete projects with code, files, and functionality
          </p>
          
          {/* Main Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="E.g., 'Build a calculator app with a modern design' or 'Create a todo list with local storage'"
                className="w-full h-32 px-6 py-4 text-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-xl resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                rows={4}
              />
              <div className="flex items-center justify-between mt-4 px-2">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>💡 Be specific for better results</span>
                  <span>🚀 AI will generate complete projects</span>
                </div>
                <Button
                  onClick={handleStartBuilding}
                  disabled={!inputValue.trim()}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Build with AI →
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Start Apps */}
          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-300 mb-6">Quick Start Ideas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickStartApps.map((app, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(app.description)}
                  className="p-4 bg-gray-800 hover:bg-gray-700 text-left rounded-lg border border-gray-600 transition-all duration-200 hover:border-blue-500 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <app.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{app.name}</h4>
                      <p className="text-sm text-gray-400">{app.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Complete Projects</h3>
              <p className="text-gray-400">AI generates all files, code, and structure needed for your app</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multiple Technologies</h3>
              <p className="text-gray-400">Supports React, HTML/CSS/JS, Python, APIs, and more</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Preview</h3>
              <p className="text-gray-400">See your app running immediately with live preview</p>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        {recentProjects.length > 0 && (
          <div className="border-t border-gray-800 pt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentProjects.slice(0, 4).map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/ide?project=${project.id}`)}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer group flex items-center space-x-3"
                >
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {getProjectIcon(project.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">{project.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimeAgo(project.lastModified)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
