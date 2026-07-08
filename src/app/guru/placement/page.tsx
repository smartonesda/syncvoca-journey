import type { Route } from "next";
import { redirect } from "next/navigation";

export default function GuruPlacementPage() {
  redirect("/dashboard/guru/placement" as Route);
}
