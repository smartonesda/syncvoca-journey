import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function DudiPlacementPage() {
  return <RoutePlaceholderPage page={getPageSpec("/dudi/placement")} />;
}
