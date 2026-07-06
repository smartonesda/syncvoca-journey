import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function OrangTuaProgresPage() {
  return <RoutePlaceholderPage page={getPageSpec("/orang-tua/progres")} />;
}
