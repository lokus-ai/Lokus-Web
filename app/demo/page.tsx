'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, X, ChevronDown, ChevronRight, MoreHorizontal, 
  FileText, Folder, Settings, RotateCcw, Grid3x3, Database,
  Settings2, Mail, GitBranch
} from 'lucide-react';

export default function DemoPage() {
  const [currentView, setCurrentView] = useState('explorer');
  const [selectedFile, setSelectedFile] = useState('Book Review - The Lean Startup.md');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(new Set(['Classes']));

  // Kanban data matching the screenshot
  const kanbanColumns = [
    { id: 'todo', title: 'Todo', count: 2, color: 'bg-gray-500' },
    { id: 'in-progress', title: 'In Progress', count: 1, color: 'bg-blue-500' },
    { id: 'urgent', title: 'Urgent', count: 1, color: 'bg-red-500' },
    { id: 'question', title: 'Question', count: 0, color: 'bg-yellow-500' }
  ];

  const kanbanTasks = {
    todo: [
      { id: 1, title: 'Call With Karen', date: 'Oct 10', status: 'Todo' },
      { id: 2, title: 'Meeting With John', date: 'Oct 10', status: 'Todo' }
    ],
    'in-progress': [
      { id: 3, title: 'How To Make A Custom PC?', date: 'Oct 10', status: 'In Progress' }
    ],
    urgent: [
      { id: 4, title: 'Learning Lokus', date: 'Oct 10', status: 'Urgent' }
    ],
    question: []
  };

  // File structure matching the screenshot
  const fileStructure = [
    { id: 'attachments', name: 'Attachments', type: 'folder', expanded: false },
    { 
      id: 'classes', 
      name: 'Classes', 
      type: 'folder', 
      expanded: true,
      children: [
        'DATA STRUCTURE AND ALGORITHMS',
        'OOP Lab',
        'Public Speaking',
        'UX class'
      ]
    },
    { id: 'hackathon', name: 'Hackathon', type: 'folder', expanded: false },
    { id: 'lokus-dev', name: 'Lokus Development', type: 'folder', expanded: false },
    { id: 'notes', name: 'Notes', type: 'folder', expanded: false },
    { id: 'test', name: 'Test', type: 'folder', expanded: false },
    { id: 'undergrad', name: 'Undergraduate Research', type: 'folder', expanded: false },
    { id: 'ai', name: 'Understanding AI', type: 'folder', expanded: false },
    { id: 'transfer', name: 'University Transfer', type: 'folder', expanded: false },
    { id: 'templates', name: 'templates', type: 'folder', expanded: false }
  ];

  const files = [
    'Book Review - The Lean Startup.md',
    'Final_University_Transfer_Strategy_Complete_List.md',
    'Fixes Needed.md'
  ];

  const sidebarItems = [
    { icon: FileText, active: currentView === 'explorer' },
    { icon: Grid3x3, active: currentView === 'kanban' },
    { icon: Settings2, active: false },
    { icon: Database, active: false },
    { icon: GitBranch, active: false },
    { icon: Mail, active: false }
  ];

  const TaskCard = ({ task, columnColor }: { task: any, columnColor: string }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#3a3a3a] border border-[#4a4a4a] rounded-lg p-4 mb-3 group hover:border-[#5a5a5a] transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-[#dcddde] font-medium text-sm mb-2">{task.title}</h4>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#888888]">{task.date}</span>
            <span className={`px-2 py-1 rounded text-xs ${columnColor} text-white`}>
              {task.status}
            </span>
          </div>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#4a4a4a] rounded">
          <MoreHorizontal className="w-3 h-3 text-[#888888]" />
        </button>
      </div>
    </motion.div>
  );

  const KanbanView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full bg-[#2a2a2a] flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-[#3a3a3a]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[#dcddde] text-xl font-semibold mb-1">Task Board</h1>
            <p className="text-[#888888] text-sm">4 tasks • 0 completed (0% done)</p>
          </div>
          <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors">
            <RotateCcw className="w-5 h-5 text-[#888888]" />
          </button>
        </div>
        
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888888]" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg text-[#dcddde] placeholder-[#666666] focus:outline-none focus:border-[#7c3aed]"
            />
          </div>
          <select className="px-4 py-2 bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg text-[#dcddde] focus:outline-none focus:border-[#7c3aed]">
            <option>All Status</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 p-6 overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {kanbanColumns.map((column) => (
            <motion.div
              key={column.id}
              className="w-80 bg-[#363636] rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: kanbanColumns.indexOf(column) * 0.1 }}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-[#4a4a4a] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  <span className="text-[#dcddde] font-medium">{column.title}</span>
                  <span className="bg-[#4a4a4a] text-[#888888] text-xs px-2 py-1 rounded-full">
                    {column.count}
                  </span>
                </div>
                <button className="p-1 hover:bg-[#4a4a4a] rounded transition-colors">
                  <Plus className="w-4 h-4 text-[#888888]" />
                </button>
              </div>

              {/* Tasks */}
              <div className="p-4 min-h-[400px]">
                <AnimatePresence>
                  {kanbanTasks[column.id as keyof typeof kanbanTasks]?.map((task) => (
                    <TaskCard key={task.id} task={task} columnColor={column.color} />
                  ))}
                </AnimatePresence>
                
                {column.id === 'question' && (
                  <div className="text-center py-12">
                    <p className="text-[#666666] text-sm mb-2">No question tasks</p>
                    <p className="text-[#555555] text-xs">Drag tasks here or click + to add</p>
                  </div>
                )}

                {/* Add Task Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border border-dashed border-[#4a4a4a] rounded-lg text-[#888888] hover:border-[#5a5a5a] hover:text-[#dcddde] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add new task
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const ExplorerView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex"
    >
      {/* File Explorer */}
      <div className="w-80 bg-[#2a2a2a] border-r border-[#3a3a3a] flex flex-col">
        <div className="p-4 border-b border-[#3a3a3a]">
          <div className="flex items-center gap-3 mb-4">
            <Folder className="w-5 h-5 text-[#888888]" />
            <h2 className="text-[#dcddde] font-medium">Explorer</h2>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {/* Folders */}
          <div className="space-y-1 mb-4">
            {fileStructure.map((item) => (
              <div key={item.id}>
                <motion.div
                  className="flex items-center gap-2 px-2 py-1.5 text-sm text-[#dcddde] rounded cursor-pointer hover:bg-[#3a3a3a] transition-colors"
                  whileHover={{ x: 2 }}
                >
                  {item.type === 'folder' && (
                    <>
                      {item.expanded ? 
                        <ChevronDown className="w-4 h-4 text-[#888888]" /> : 
                        <ChevronRight className="w-4 h-4 text-[#888888]" />
                      }
                      <Folder className="w-4 h-4 text-[#888888]" />
                      <span>{item.name}</span>
                    </>
                  )}
                </motion.div>
                
                {/* Expanded folder children */}
                {item.expanded && item.children && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 mt-1 space-y-1"
                  >
                    {item.children.map((child) => (
                      <motion.div
                        key={child}
                        className="flex items-center gap-2 px-2 py-1 text-sm text-[#888888] rounded cursor-pointer hover:bg-[#3a3a3a] hover:text-[#dcddde] transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                        <span>{child}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Files */}
          <div className="space-y-1">
            {files.map((file) => (
              <motion.div
                key={file}
                onClick={() => setSelectedFile(file)}
                className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer transition-colors ${
                  selectedFile === file
                    ? 'bg-[#7c3aed]/20 text-[#dcddde]'
                    : 'text-[#888888] hover:bg-[#3a3a3a] hover:text-[#dcddde]'
                }`}
                whileHover={{ x: 2 }}
              >
                <FileText className="w-4 h-4" />
                <span className="truncate">{file}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-[#1e1e1e] flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-[#4a4a4a] mx-auto mb-4" />
          <h3 className="text-[#dcddde] text-lg font-medium mb-2">
            {selectedFile || 'No file selected'}
          </h3>
          <p className="text-[#888888] text-sm">
            This is a demo - full editor available in the desktop app
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#dcddde] font-sans">
      {/* Top Bar */}
      <div className="h-8 bg-[#202020] border-b border-[#3a3a3a] flex items-center px-4">
        <Link href="/" className="text-xs text-[#888888] hover:text-[#dcddde] transition-colors">
          ← Back to Lokus.ai
        </Link>
        <div className="flex-1 text-center text-xs text-[#666666]">
          Interactive Demo - Pixel-perfect Lokus UI v2.0 🚀
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-2rem)]">
        {/* Sidebar */}
        <div className="w-16 bg-[#363636] border-r border-[#3a3a3a] flex flex-col items-center py-4">
          <motion.div 
            className="w-8 h-8 bg-[#7c3aed] rounded-lg flex items-center justify-center mb-6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </motion.div>

          <div className="space-y-3">
            {sidebarItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  if (index === 0) setCurrentView('explorer');
                  if (index === 1) setCurrentView('kanban');
                }}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  item.active 
                    ? 'bg-[#7c3aed]/20 text-[#7c3aed]' 
                    : 'text-[#888888] hover:bg-[#4a4a4a] hover:text-[#dcddde]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {currentView === 'kanban' ? (
              <KanbanView key="kanban" />
            ) : (
              <ExplorerView key="explorer" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}