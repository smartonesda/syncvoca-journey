import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function GuruPlacementPage() {
  return <RoutePlaceholderPage page={getPageSpec("/guru/placement")} />;
}
