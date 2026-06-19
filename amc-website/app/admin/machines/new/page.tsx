import { redirect } from "next/navigation";
// /admin/machines/new → handled by the [id] route with id="__new__"
export default function NewMachinePage() {
  redirect("/admin/machines/__new__");
}
