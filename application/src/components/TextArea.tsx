import React, { useRef } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface EmailProps {
  content: string;
}

const Email: React.FC<EmailProps> = ({ content }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center">Meeting minutes</h1>
      <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md relative">
        <pre className={`${inter.className} whitespace-pre-line text-xs mb-4`}>
          {content}
          {content}
        </pre>
        <button
          className="block mx-auto px-2 py-1 bg-gray-300 text-gray-700 rounded"
          onClick={handleCopyToClipboard}
        >
          Copy
        </button>
        <textarea
          ref={textareaRef}
          className="absolute opacity-0 pointer-events-none"
          defaultValue={content}
        />
      </div>
    </div>
  );
};

export default Email;
