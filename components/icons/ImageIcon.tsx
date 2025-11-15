
import React from 'react';

export const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-purple-600">
    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06l2.75-2.75a.75.75 0 011.06 0l3.72 3.72a.75.75 0 001.06 0l2.22-2.22a.75.75 0 011.06 0l2.75 2.75V6H3v10.06z" clipRule="evenodd" />
    <circle cx="17" cy="9" r="1.5" fill="white" />
  </svg>
);
