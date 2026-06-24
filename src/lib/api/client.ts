import "server-only";
import { Client } from "fnapicom";

export function createFnApiClient() {
  const apiKey = process.env.FORTNITE_API_KEY;
  if (!apiKey) throw new Error("FORTNITE_API_KEY is not set");
  return new Client({ apiKey });
}
