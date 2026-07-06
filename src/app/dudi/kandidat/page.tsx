import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function DudiKandidatPage() {
  return <RoutePlaceholderPage page={getPageSpec("/dudi/kandidat")} />;
}
