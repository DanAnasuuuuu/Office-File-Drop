
import React, { useState, useRef, useCallback } from 'react';

interface DropzoneProps {
  onFilesAdded: (files: File[]) => void;
}

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h18v-3.75m-18 0V5.625c0-1.036.84-1.875 1.875-1.875h14.25c1.035 0 1.875.84 1.875 1.875v11.625m-18 0h18" />
    </svg>
);

export const Dropzone: React.FC<DropzoneProps> = ({ onFilesAdded }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  }, [onFilesAdded]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(Array.from(e.target.files));
      // Reset the input value to allow re-uploading the same file
      if(inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };
  
  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
      className={`border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors duration-200 ease-in-out
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'}`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleChange}
      />
      <div className="flex flex-col items-center justify-center space-y-4 text-gray-500">
        <UploadIcon className="w-12 h-12 text-gray-400" />
        <p className="text-lg font-semibold">
          <span className="text-blue-600">Click to upload</span> or drag and drop files here
        </p>
        <p className="text-sm">DOCX, XLSX, PPTX, PDF, PNG, JPG, etc.</p>
      </div>
    </div>
  );
};
