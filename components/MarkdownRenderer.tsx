import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');

  // Helper to process text formatting (Links and Bold)
  const formatText = (text: string) => {
    let html = text;
    
    // 1. Replace Markdown links: [Title](URL)
    // We use a regex to catch the pattern and replace it with an anchor tag.
    // Added stronger styling for visibility
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    html = html.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-red-400 hover:text-red-300 underline decoration-red-500/30 transition-colors font-medium">$1</a>');

    // 2. Replace Bold: **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    html = html.replace(boldRegex, '<strong class="text-white font-semibold">$1</strong>');

    // 3. Highlight Hashtags (optional but nice since user asked for them)
    const hashtagRegex = /(?<!&)(#[a-zA-Z0-9_]+)/g;
    html = html.replace(hashtagRegex, '<span class="text-blue-400">$1</span>');

    return { __html: html };
  };

  return (
    <div className="space-y-2 text-gray-300 leading-relaxed">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        
        if (!trimmed) return <div key={index} className="h-2" />;

        // Headers
        if (trimmed.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-bold text-red-400 mt-4 mb-2">{trimmed.replace('### ', '')}</h3>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold text-white mt-6 mb-3 border-b border-gray-700 pb-1">{trimmed.replace('## ', '')}</h2>;
        }
        if (trimmed.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-extrabold text-white mt-6 mb-4">{trimmed.replace('# ', '')}</h1>;
        }

        // List items
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const listContent = trimmed.substring(2);
          return (
            <div key={index} className="flex items-start ml-4">
              <span className="text-red-500 mr-2 mt-1">•</span>
              <span dangerouslySetInnerHTML={formatText(listContent)} />
            </div>
          );
        }

        // Numbered lists
        if (/^\d+\./.test(trimmed)) {
           return (
            <div key={index} className="flex items-start ml-4 mt-1">
              <span className="text-red-500 mr-2 font-mono text-sm">{trimmed.split('.')[0]}.</span>
              <span dangerouslySetInnerHTML={formatText(trimmed.substring(trimmed.indexOf('.') + 1).trim())} />
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={index} dangerouslySetInnerHTML={formatText(trimmed)} />
        );
      })}
    </div>
  );
};