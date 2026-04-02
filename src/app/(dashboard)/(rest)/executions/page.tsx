import { requireAuth } from "@/lib/auth-utils";

const page = async () => {
  await requireAuth();
  return (
    <div>Execution Page</div>
  );
}

export default page;