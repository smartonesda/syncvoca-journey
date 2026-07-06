import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function GuruSiswaDetailPage() {
  return <RoutePlaceholderPage page={getPageSpec("/guru/siswa/[studentId]")} />;
}
