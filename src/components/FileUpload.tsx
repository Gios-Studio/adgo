import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Upload, X, File, Image, Video } from 'lucide-react';

interface FileUploadProps {
  bucket: string;
  accept?: string;
  maxSize?: number; // in MB
  onUpload?: (url: string, fileName: string) => void;
  className?: string;
}

export const FileUpload = ({ 
  bucket, 
  accept = "*", 
  maxSize = 10, 
  onUpload, 
  className 
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: `File size must be less than ${maxSize}MB`,
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
  };

  const uploadFile = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Simulate progress (Supabase doesn't provide real progress events)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, selectedFile);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });

      onUpload?.(publicUrl, selectedFile.name);
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (file.type.startsWith('video/')) return <Video className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {!selectedFile ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-32 border-2 border-dashed border-border hover:border-primary transition-colors"
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </span>
            <span className="text-xs text-muted-foreground">
              Max size: {maxSize}MB
            </span>
          </div>
        </Button>
      ) : (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getFileIcon(selectedFile)}
              <span className="text-sm font-medium truncate">{selectedFile.name}</span>
              <span className="text-xs text-muted-foreground">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-xs text-muted-foreground">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
          
          {!uploading && (
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={uploadFile}
                disabled={uploading}
                className="flex-1"
              >
                Upload File
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                Change File
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};