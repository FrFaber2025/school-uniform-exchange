import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload } from 'lucide-react';
import { ExternalBlob } from '../backend';

interface ImageUploadProps {
  images: ExternalBlob[];
  onChange: (images: ExternalBlob[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    const filesToUpload = files.slice(0, remainingSlots);

    const newPreviews: string[] = [];
    const newBlobs: ExternalBlob[] = [];
    const newProgress: number[] = [];

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          newPreviews.push(event.target.result as string);
          if (newPreviews.length === filesToUpload.length) {
            setPreviews([...previews, ...newPreviews]);
          }
        }
      };
      reader.readAsDataURL(file);

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress((prev) => {
          const updated = [...prev];
          updated[images.length + i] = percentage;
          return updated;
        });
      });

      newBlobs.push(blob);
      newProgress.push(0);
    }

    setUploadProgress([...uploadProgress, ...newProgress]);
    onChange([...images, ...newBlobs]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    const newProgress = uploadProgress.filter((_, i) => i !== index);
    onChange(newImages);
    setPreviews(newPreviews);
    setUploadProgress(newProgress);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {previews.map((preview, index) => (
          <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <img src={preview} alt={`Upload ${index + 1}`} className="h-full w-full object-cover" />
            {uploadProgress[index] < 100 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-sm font-medium text-white">{uploadProgress[index]}%</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-muted-foreground/50 hover:bg-muted"
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Add Photo</span>
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      <p className="text-sm text-muted-foreground">
        {images.length} / {maxImages} photos uploaded
      </p>
    </div>
  );
}
