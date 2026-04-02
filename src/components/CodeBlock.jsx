import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ code }) {
  return (
    <SyntaxHighlighter
      language="bash"
      style={oneDark}
      customStyle={{ borderRadius: '0.75rem', fontSize: '0.85rem' }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
