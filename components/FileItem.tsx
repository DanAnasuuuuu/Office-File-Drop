
import React, { useState, useEffect } from 'react';
import { formatFileSize } from '../utils/formatFileSize';
import { DocxIcon } from './icons/DocxIcon';
import { XlsxIcon } from './icons/XlsxIcon';
import { PptxIcon } from './icons/PptxIcon';
import { ImageIcon } from './icons/ImageIcon';
import { FileIcon } from './icons/FileIcon';

interface FileItemProps {
  file: File;
}

const getFileIcon = (fileName: string): React.ReactElement => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    switch (extension) {
        case 'docx':
        case 'doc':
            return <DocxIcon className="w-8 h-8" />;
        case 'xlsx':
        case 'xls':
        case 'csv':
            return <XlsxIcon className="w-8 h-8" />;
        case 'pptx':
        case 'ppt':
            return <PptxIcon className="w-8 h-8" />;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
        case 'svg':
            return <ImageIcon className="w-8 h-8" />;
        default:
            return <FileIcon className="w-8 h-8" />;
    }
};

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);


export const FileItem: React.FC<FileItemProps> = ({ file }) => {
    const [objectUrl, setObjectUrl] = useState<string>('');

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setObjectUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [file]);
    
    return (
        <li className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4 min-w-0">
                {getFileIcon(file.name)}
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
            </div>
            <a
                href={objectUrl}
                download={file.name}
                className="ml-4 flex-shrink-0 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
                <DownloadIcon className="w-5 h-5 mr-2 -ml-1" />
                Download
            </a>
        </li>
    );
};
