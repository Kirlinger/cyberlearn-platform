"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IconCopy, IconCheck } from "@/components/icons";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/60 dark:border-white/5">
      <div className="flex items-center justify-between border-b border-slate-200/60 bg-slate-50 px-4 py-2 dark:border-white/5 dark:bg-surface-900">
        <span className="text-xs font-medium text-slate-400">Terminal</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <IconCheck className="h-3.5 w-3.5 text-cyber-500" />
              <span className="text-cyber-500">Copied</span>
            </>
          ) : (
            <>
              <IconCopy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language="bash"
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.8rem",
          lineHeight: 1.6,
          padding: "1rem",
          background: "transparent",
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
