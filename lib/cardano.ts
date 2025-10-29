// Minimal Lucid types import for reference (no on-chain execution here)
import type { Lucid } from "lucid-cardano";

export type CardanoGenerationInput = {
  prompt: string;
  pubKeyHashHint?: string;
};

export function validatePubKeyHash(pkh?: string): boolean {
  if (!pkh) return false;
  return /^[0-9a-fA-F]{28,64}$/.test(pkh);
}

