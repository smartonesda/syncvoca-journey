import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function SiswaSimulasiPage() {
  return <RoutePlaceholderPage page={getPageSpec("/siswa/simulasi")} />;
}
