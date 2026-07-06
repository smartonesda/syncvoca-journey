import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function DudiPage() {
  return <RoutePlaceholderPage page={getPageSpec("/dudi")} />;
}
