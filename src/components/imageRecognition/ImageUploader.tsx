
import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Only process image files
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Pass the file to the parent
    onImageSelected(file);
  };

  const removeImage = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const triggerFileInput = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const takePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // This is a simplified version - in a real app, you'd create a video element
      // and capture a frame from it using a canvas
      console.log("Camera activated", stream);
      // For now, let's just trigger the file input
      triggerFileInput();
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Couldn't access camera. Please upload an image instead.");
      triggerFileInput();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!preview ? (
        <div 
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
            dragActive 
              ? 'border-intelliwaste-blue bg-intelliwaste-blue/5' 
              : 'border-intelliwaste-gray-medium hover:border-intelliwaste-blue/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
          
          <div className="text-center py-10">
            <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-intelliwaste-blue/10 flex items-center justify-center">
              <ImageIcon size={40} className="text-intelliwaste-blue" />
            </div>
            <h3 className="text-xl font-medium mb-2">Drag & drop your image</h3>
            <p className="text-intelliwaste-gray-dark mb-6">
              Supported formats: JPG, PNG, GIF
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-5 py-2.5 rounded-lg bg-intelliwaste-blue text-white font-medium flex items-center justify-center gap-2 hover:bg-intelliwaste-blue-dark transition-colors shadow-sm"
              >
                <Upload size={18} />
                Upload Image
              </button>
              <button
                type="button"
                onClick={takePhoto}
                className="px-5 py-2.5 rounded-lg bg-white text-intelliwaste-blue-dark font-medium border border-intelliwaste-gray-medium flex items-center justify-center gap-2 hover:bg-intelliwaste-gray transition-colors"
              >
                <Camera size={18} />
                Take Photo
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden shadow-glass-sm transition-all hover:shadow-glass">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-auto object-contain max-h-[400px]" 
          />
          <button
            onClick={removeImage}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
