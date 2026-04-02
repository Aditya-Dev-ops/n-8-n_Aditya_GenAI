import { requireAuth } from "@/lib/auth-utils"

type Props = {
    params: Promise<{
      workflowsId:string
    }>
}

const page = async ({params}: Props) => {
  await requireAuth();
    const {workflowsId } = await params;
  return (
    <div>Workflows Id:{workflowsId}</div>
  )
}

export default page;