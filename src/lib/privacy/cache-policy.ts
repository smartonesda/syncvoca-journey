export type ClientCachePolicy =
  | "cache-first"
  | "network-first"
  | "network-only"
  | "no-store";

const noStorePatterns = [/audit/i, /consent/i, /report/i, /export/i];
const userDataPatterns = [/student/i, /siswa/i, /candidate/i, /kandidat/i];

export function getClientCachePolicy(resource: string): ClientCachePolicy {
  if (noStorePatterns.some((pattern) => pattern.test(resource))) {
    return "no-store";
  }

  if (userDataPatterns.some((pattern) => pattern.test(resource))) {
    return "network-first";
  }

  if (/\.(css|js|png|jpg|jpeg|svg|webp|woff2?)$/i.test(resource)) {
    return "cache-first";
  }

  return "network-first";
}
