import { Editor, EditorError, EditorLoading } from "@/features/editor/components/editor"
import { prefetchOneWorkflow } from "@/features/workflows/server/prefetch"
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient } from "@/trpc/server"
import { ErrorBoundary } from "react-error-boundary";
import { EditorHeader } from "@/features/editor/components/Editor-Header";
import {  Suspense } from "react"

type Props = {
    params: Promise<{
      workflowsId:string
    }>

}

const page = async ({params}: Props) => {
  await requireAuth();
    const {workflowsId } = await params;
     prefetchOneWorkflow(workflowsId);

  return (
    <HydrateClient>
      <ErrorBoundary  fallback={<EditorError/>}>
         <Suspense fallback={<EditorLoading/>}>
         <EditorHeader workflowId={workflowsId}/>
          <main className="flex-1">
           <Editor workflowId={workflowsId}/>
          </main> 
         </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default page;