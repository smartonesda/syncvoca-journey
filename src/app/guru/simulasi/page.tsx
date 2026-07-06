import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function GuruSimulasiPage() {
  return <RoutePlaceholderPage page={getPageSpec("/guru/simulasi")} />;
}
