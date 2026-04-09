"use client"

import { NodeProps } from "@xyflow/react"
import { PlaceholderNode } from "../react-flow/placeholder-node"
import { PlusIcon } from "lucide-react"
import { memo } from "react"
import { WorkflowNode } from "./workflow-node"


export const InitialNode = memo((props:NodeProps)=>{
    return (
    <WorkflowNode 
     name="Initial node"
     description="Click to add a node"
     onDelete={()=>{console.log("Ondelete")}}
     onSettings={()=>{console.log("OnSettings")}}
    >
        <PlaceholderNode
           {...props}
           onClick={()=>{}}
           >    
            <div className="flex items-center justify-center cursor-pointer">  
              <PlusIcon className="size-4"/>
            </div>
        </PlaceholderNode>
    </WorkflowNode>
    )
});

InitialNode.displayName = "InitialNode"