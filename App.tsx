
import React, { useState, useCallback } from 'react';
import { Dropzone } from './components/Dropzone';
import { FileList } from './components/FileList';

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesAdded = useCallback((newFiles: File[]) => {
    setFiles(prevFiles => {
      const uniqueNewFiles = newFiles.filter(
        newFile => !prevFiles.some(
          existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size
        )
      );
      return [...prevFiles, ...uniqueNewFiles];
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setFiles([]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            Office File Drop
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Share files with your colleagues. Just drag, drop, and they can download.
          </p>
        </header>

        <main className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
          <Dropzone onFilesAdded={handleFilesAdded} />
          <FileList files={files} onClearAll={handleClearAll} />
        </main>

        <footer className="text-center mt-8">
            <p className="text-sm text-gray-400">
                A simple file sharing tool for your team.
            </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
