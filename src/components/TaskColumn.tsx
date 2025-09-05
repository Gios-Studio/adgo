import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TaskCard, { Task } from './TaskCard';
import { cn } from '@/lib/utils';

export interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

interface TaskColumnProps {
  column: Column;
  onTaskMove: (taskId: string, fromColumnId: string, toColumnId: string) => void;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, onTaskMove, onTaskUpdate }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskData = e.dataTransfer.getData('application/json');
    if (taskData) {
      const { taskId, fromColumnId } = JSON.parse(taskData);
      onTaskMove(taskId, fromColumnId, column.id);
    }
  };

  const getColumnColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-200 bg-blue-50/50';
      case 'amber':
        return 'border-amber-200 bg-amber-50/50';
      case 'green':
        return 'border-green-200 bg-green-50/50';
      case 'muted':
      default:
        return 'border-muted bg-muted/20';
    }
  };

  const getCountBadgeColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-700';
      case 'amber':
        return 'bg-amber-100 text-amber-700';
      case 'green':
        return 'bg-green-100 text-green-700';
      case 'muted':
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card 
      className={cn(
        "h-full flex flex-col transition-colors duration-200",
        getColumnColorClasses(column.color),
        isDragOver && "border-primary bg-primary/10"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm text-foreground">{column.title}</h3>
          <Badge 
            variant="secondary" 
            className={cn("text-xs", getCountBadgeColor(column.color))}
          >
            {column.tasks.length}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-3 overflow-y-auto">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            onTaskUpdate={onTaskUpdate}
          />
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground border-dashed border-2 border-muted-foreground/30 hover:border-muted-foreground/50 h-auto py-3"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add task
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskColumn;