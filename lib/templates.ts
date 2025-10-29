export function generateSolidityTemplate(prompt: string): string {
  const cleaned = prompt.trim() || "Sample escrow with depositor, beneficiary, and arbiter.";
  return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// Auto-generated template based on prompt:
/// ${cleaned.replace(/\n/g, " ")}
contract PromptEscrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;

    constructor(address _beneficiary, address _arbiter) payable {
        depositor = msg.sender;
        beneficiary = _beneficiary;
        arbiter = _arbiter;
    }

    function approve() external {
        require(msg.sender == arbiter, "ONLY_ARBITER");
        (bool ok, ) = beneficiary.call{value: address(this).balance}("");
        require(ok, "TRANSFER_FAILED");
    }

    function refund() external {
        require(msg.sender == arbiter, "ONLY_ARBITER");
        (bool ok, ) = depositor.call{value: address(this).balance}("");
        require(ok, "TRANSFER_FAILED");
    }
}
`;
}

export function generatePlutusTemplate(prompt: string): string {
  const cleaned = prompt.trim() || "Time-locked escrow validator example.";
  return `-- Auto-generated Plutus (Haskell) template based on prompt:
-- ${cleaned.replace(/\n/g, " ")}

{-# INLINABLE mkValidator #-}
mkValidator :: BuiltinData -> BuiltinData -> BuiltinData -> ()
mkValidator datum redeemer context = ()

{-
Notes:
- This is a placeholder validator skeleton. Use Plutus Tx to compile Haskell to Plutus Core.
- For production, define Datum/Redeemer types, validation checks (signatures, timelocks, values).
- Consider using Aiken or Plutus Tx depending on your stack.
- Deploy using a toolchain like Lucid, Mesh, or cardano-cli scripts.
-}
`;
}

export function generateCardanoMintingPolicyTemplate(pubKeyHashHint?: string): string {
  const pkh = (pubKeyHashHint || "<PUB_KEY_HASH>").toLowerCase();
  return `-- Native Script JSON (cardano-cli) example minting policy that requires a signature
-- Replace keyHash below with your wallet's payment key hash
{
  "type": "sig",
  "keyHash": "${pkh}"
}
`;
}

export function synthesizeFromPrompt(prompt: string, chain: "cardano" | "evm", language: "plutus" | "solidity"): string {
  if (chain === "evm" && language === "solidity") return generateSolidityTemplate(prompt);
  if (chain === "cardano" && language === "plutus") return generatePlutusTemplate(prompt);
  // Default fallback
  return generatePlutusTemplate(prompt);
}

