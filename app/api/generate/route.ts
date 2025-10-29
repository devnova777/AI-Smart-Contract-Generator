import { NextRequest } from "next/server";
import { synthesizeFromPrompt, generateCardanoMintingPolicyTemplate } from "@/lib/templates";
import { validatePubKeyHash } from "@/lib/cardano";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt: string = body?.prompt ?? "";
    const chain: "cardano" | "evm" = body?.chain === "evm" ? "evm" : "cardano";
    const language: "plutus" | "solidity" = body?.language === "solidity" ? "solidity" : "plutus";
    const pubKeyHashHint: string | undefined = body?.pubKeyHashHint;

    let code = synthesizeFromPrompt(prompt, chain, language);

    if (chain === "cardano" && language === "plutus") {
      if (validatePubKeyHash(pubKeyHashHint)) {
        code += "\n--\n" + generateCardanoMintingPolicyTemplate(pubKeyHashHint);
      } else {
        code += "\n--\n" + generateCardanoMintingPolicyTemplate();
      }
    }

    return new Response(JSON.stringify({ code }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
}

