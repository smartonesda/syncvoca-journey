import type { Route } from "next";
import { redirect } from "next/navigation";

export default function AdminSchoolsPage() {
  redirect("/dashboard/admin/schools" as Route);
}
