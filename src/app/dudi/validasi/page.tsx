import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function DudiValidasiPage() {
  return <RoutePlaceholderPage page={getPageSpec("/dudi/validasi")} />;
}
