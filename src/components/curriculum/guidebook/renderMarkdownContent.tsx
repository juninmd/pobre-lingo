import React from 'react';

export const renderMarkdownContent = (content: string) => {
  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return content.split('\n').map((line, index) => {
    if (line.startsWith('# ')) {
      return <h2 key={index} className="text-xl font-bold mt-4 mb-2 text-primary">{line.replace('# ', '')}</h2>;
    }
    if (line.startsWith('### ')) {
      return <h3 key={index} className="text-lg font-semibold mt-3 mb-1">{line.replace('### ', '')}</h3>;
    }
    if (line.trim().startsWith('* ')) {
      const text = line.trim().replace('* ', '');
      return (
        <div key={index} className="flex items-start gap-2 mb-1 ml-1">
          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
          <span className="text-muted-foreground">{parseBold(text)}</span>
        </div>
      );
    }
    if (line.trim() === '') {
      return <div key={index} className="h-2" />;
    }
    return <p key={index} className="mb-2 text-muted-foreground leading-relaxed">{parseBold(line)}</p>;
  });
};
