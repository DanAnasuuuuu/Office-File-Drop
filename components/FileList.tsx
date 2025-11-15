
import React from 'react';
import { FileItem } from './FileItem';

interface FileListProps {
  files: File[];
  onClearAll: () => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onClearAll }) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Shared Files</h2>
            <button
                onClick={onClearAll}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 transition-colors"
            >
                Clear All
            </button>
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
                {files.map((file, index) => (
                    <FileItem key={`${file.name}-${file.lastModified}-${index}`} file={file} />
                ))}
            </ul>
        </div>
    </div>
  );
};
