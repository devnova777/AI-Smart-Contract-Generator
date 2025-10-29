"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";

type Chain = "cardano" | "evm";
type Language = "plutus" | "solidity";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [chain, setChain] = useState<Chain>("cardano");
  const [language, setLanguage] = useState<Language>("plutus");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  async function onGenerate() {
    setIsLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, chain, language })
      });
      const data = await res.json();
      setResult(data.code ?? "");
    } catch (err) {
      setResult(`Error: ${String(err)}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <h1 className="title">AI Smart Contract Generator</h1>
      <p className="subtitle">TypeScript + Next.js + Cardano (Lucid) starter that generates contract templates from prompts.</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="row">
          <div>
            <label htmlFor="select-chain">Target Chain</label>
            <select id="select-chain" title="Target Chain" value={chain} onChange={(e) => setChain(e.target.value as Chain)}>
              <option value="cardano">Cardano</option>
              <option value="evm">EVM</option>
            </select>
          </div>
          <div>
            <label htmlFor="select-language">Language</label>
            <select id="select-language" title="Language" value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
              <option value="plutus">Plutus (Cardano)</option>
              <option value="solidity">Solidity (EVM)</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Prompt</label>
          <textarea
            placeholder="Describe the contract purpose, roles, conditions (e.g., time-locked escrow)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button onClick={onGenerate} disabled={isLoading}>Generate</button>
          <button onClick={() => { navigator.clipboard.writeText(result); }} disabled={!result}>Copy</button>
        </div>
      </div>

      <div className="card">
        <label>Result</label>
        <CodeBlock languageHint={language} code={result || "// Generated contract will appear here"} />
        <div className="footer">This is a template generator. Review, test, and audit before mainnet use.</div>
      </div>
    </div>
  );
}

