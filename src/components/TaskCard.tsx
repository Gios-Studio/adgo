import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Task {
  id: string;
  title: string;
  description: string;
  tag: {
    color: string;
    label: string;
  };
  dueDate: string;
  assignees: number;
  progress: {
    completed: number;
    total: number;
  };
}

interface TaskCardProps {
  task: Task;
  columnId: string;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, columnId, onTaskUpdate }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      taskId: task.id,
      fromColumnId: columnId
    }));
  };

  const getTagColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-100 text-purple-700';
      case 'blue':
        return 'bg-blue-100 text-blue-700';
      case 'accent':
        return 'bg-accent/20 text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const progressPercentage = (task.progress.completed / task.progress.total) * 100;

  return (
    <Card 
      className="cursor-move hover:shadow-md transition-shadow duration-200 bg-card"
      draggable
      onDragStart={handleDragStart}
    >
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <Badge 
            variant="secondary" 
            className={cn("text-xs", getTagColorClasses(task.tag.color))}
          >
            {task.tag.label}
          </Badge>
          
          <h4 className="font-medium text-sm text-foreground leading-tight">
            {task.title}
          </h4>
          
          <p className="text-xs text-muted-foreground leading-relaxed">
            {task.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{task.progress.completed}/{task.progress.total}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{task.dueDate}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{task.assignees}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;