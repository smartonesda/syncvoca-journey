import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function SiswaJourneyPage() {
  return <RoutePlaceholderPage page={getPageSpec("/siswa/journey")} />;
}
