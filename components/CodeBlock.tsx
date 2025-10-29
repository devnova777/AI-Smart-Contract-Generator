"use client";

export function CodeBlock({ code, languageHint }: { code: string; languageHint?: string }) {
  return (
    <pre className="code" aria-label={`code-${languageHint ?? "text"}`}>
      <code>{code}</code>
    </pre>
  );
}

