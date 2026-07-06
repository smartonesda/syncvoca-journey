import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function AdminDudiPage() {
  return <RoutePlaceholderPage page={getPageSpec("/admin/dudi")} />;
}
