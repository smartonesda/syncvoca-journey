import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function DudiKandidatDetailPage() {
  return <RoutePlaceholderPage page={getPageSpec("/dudi/kandidat/[candidateCode]")} />;
}
