/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:35 UTC
 */

import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import TaskColumn, { Column } from './TaskColumn';
import { Task } from './TaskCard';

// Initial data for the task board
const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'muted',
    tasks: [
      {
        id: 't1',
        title: 'Update landing page hero section',
        description: 'Review new design mockups and update copy',
        tag: { color: 'purple', label: 'Design' },
        dueDate: 'May 20',
        assignees: 2,
        progress: { completed: 3, total: 5 }
      },
      {
        id: 't2',
        title: 'Social media campaign planning',
        description: 'Outline Q2 campaign goals and content calendar',
        tag: { color: 'accent', label: 'Marketing' },
        dueDate: 'May 22',
        assignees: 1,
        progress: { completed: 0, total: 4 }
      },
      {
        id: 't3',
        title: 'Set up automated testing',
        description: 'Configure CI/CD pipeline for test automation',
        tag: { color: 'blue', label: 'Development' },
        dueDate: 'May 24',
        assignees: 2,
        progress: { completed: 0, total: 6 }
      },
      {
        id: 't4',
        title: 'Create brand style guide',
        description: 'Document colors, typography, and UI components',
        tag: { color: 'purple', label: 'Design' },
        dueDate: 'May 25',
        assignees: 1,
        progress: { completed: 0, total: 3 }
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'blue',
    tasks: [
      {
        id: 't5',
        title: 'Implement user authentication',
        description: 'Set up OAuth and session management',
        tag: { color: 'blue', label: 'Development' },
        dueDate: 'May 18',
        assignees: 3,
        progress: { completed: 4, total: 8 }
      },
      {
        id: 't6',
        title: 'Design system documentation',
        description: 'Create comprehensive component library docs',
        tag: { color: 'purple', label: 'Design' },
        dueDate: 'May 19',
        assignees: 2,
        progress: { completed: 7, total: 10 }
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    color: 'amber',
    tasks: [
      {
        id: 't7',
        title: 'Performance optimization audit',
        description: 'Analyze and improve application performance',
        tag: { color: 'blue', label: 'Development' },
        dueDate: 'May 17',
        assignees: 2,
        progress: { completed: 5, total: 5 }
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'green',
    tasks: [
      {
        id: 't8',
        title: 'Mobile responsive design',
        description: 'Ensure all components work on mobile devices',
        tag: { color: 'purple', label: 'Design' },
        dueDate: 'May 15',
        assignees: 1,
        progress: { completed: 6, total: 6 }
      },
      {
        id: 't9',
        title: 'User feedback collection',
        description: 'Implement feedback forms and analytics',
        tag: { color: 'accent', label: 'Marketing' },
        dueDate: 'May 14',
        assignees: 2,
        progress: { completed: 4, total: 4 }
      }
    ]
  }
];

const TaskBoard = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const { toast } = useToast();

  const handleTaskMove = (taskId: string, fromColumnId: string, toColumnId: string) => {
    if (fromColumnId === toColumnId) return;

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Find source and destination columns
      const sourceColumn = newColumns.find(col => col.id === fromColumnId);
      const destColumn = newColumns.find(col => col.id === toColumnId);
      
      if (!sourceColumn || !destColumn) return prevColumns;
      
      // Find and remove task from source column
      const taskIndex = sourceColumn.tasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) return prevColumns;
      
      const [movedTask] = sourceColumn.tasks.splice(taskIndex, 1);
      
      // Add task to destination column
      destColumn.tasks.push(movedTask);
      
      return newColumns;
    });

    toast({
      title: "Task moved",
      description: `Task moved to ${toColumnId.replace('-', ' ')}`,
    });
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )
      }));
    });

    toast({
      title: "Task updated",
      description: "Task has been successfully updated",
    });
  };

  return (
    <div className="w-full h-[600px] max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            column={column}
            onTaskMove={handleTaskMove}
            onTaskUpdate={handleTaskUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;