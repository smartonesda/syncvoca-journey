import type { Route } from "next";
import { redirect } from "next/navigation";

type GuruSiswaDetailPageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function GuruSiswaDetailPage({ params }: GuruSiswaDetailPageProps) {
  const { studentId } = await params;

  redirect(`/dashboard/guru/siswa/${studentId}` as Route);
}
