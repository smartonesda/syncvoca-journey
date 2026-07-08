import type { Route } from "next";
import { redirect } from "next/navigation";

type DudiKandidatDetailPageProps = {
  params: Promise<{
    candidateCode: string;
  }>;
};

export default async function DudiKandidatDetailPage({
  params,
}: DudiKandidatDetailPageProps) {
  const { candidateCode } = await params;

  redirect(`/dashboard/dudi/kandidat/${candidateCode}` as Route);
}
