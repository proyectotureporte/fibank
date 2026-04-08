/**
 * Script to reject a specific transaction
 *
 * Run with: npx tsx scripts/reject-transaction.ts
 */

import { config } from "dotenv";
import { createClient } from "@sanity/client";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || "",
});

async function rejectTransaction() {
  const txId = "jPiOZwflduvgIzRX0wo5hd";
  console.log(`Updating transaction ${txId}...`);

  await client
    .patch(txId)
    .set({
      status: "rejected",
      rejectionReason:
        "Se ha encontrado inconsistencias en el dinero de la declaración del impuesto del 2024",
      rejectionSolution: "Rectificar declaración del año 2024",
    })
    .commit();

  console.log("Transaction updated successfully to 'rejected'");
  console.log("Motivo: Se ha encontrado inconsistencias en el dinero de la declaración del impuesto del 2024");
  console.log("Solución: Rectificar declaración del año 2024");
}

rejectTransaction().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
