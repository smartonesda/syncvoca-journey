import { notFound } from "next/navigation";
import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec, type PageSpecKey } from "@/lib/routes";

const guruSpecByPath: Record<string, PageSpecKey> = {
  siswa: "/guru/siswa",
  simulasi: "/guru/simulasi",
  consent: "/guru/consent",
  placement: "/guru/placement",
  laporan: "/guru/laporan",
};

type DashboardGuruSectionPageProps = {
  params: Promise<{
    path: string[];
  }>;
};

export default async function DashboardGuruSectionPage({
  params,
}: DashboardGuruSectionPageProps) {
  const { path } = await params;
  const pathKey = path.join("/");
  const specKey = pathKey.startsWith("siswa/")
    ? "/guru/siswa/[studentId]"
    : guruSpecByPath[pathKey];

  if (!specKey) {
    notFound();
  }

  return <RoutePlaceholderPage page={getPageSpec(specKey)} />;
}
