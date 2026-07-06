import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function GuruPage() {
  return <RoutePlaceholderPage page={getPageSpec("/guru")} />;
}
