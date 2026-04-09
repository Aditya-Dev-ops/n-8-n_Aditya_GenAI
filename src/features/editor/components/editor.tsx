"use client";

import {type Node , type Edge, applyNodeChanges, applyEdgeChanges, addEdge, NodeChange, EdgeChange, Connection, ReactFlow, Background, Controls, MiniMap, Panel} from "@xyflow/react";

import { ErrorView, LoadingView } from "@/components/custom/entity-components";
import { useSuspenseOneWorkflow } from "@/features/workflows/hooks/use-workflows";
import { useCallback, useState } from "react";
import { nodeComponents } from "@/config/node-components";
import { AddNodeButton } from "./add-node-button";


export const EditorLoading = ()=>{
    return <LoadingView message="Loading editor..."/>
};


export const EditorError = ()=>{
return <ErrorView message="Something went wrong in loading workflow"/>
}



// const initialNodes = [
//   {
//     id:'n1',
//     position:{x:0, y:0},
//     data:{label: "Node1"}
//   },
//   {
//     id:'n2',
//     position:{x:0, y:100},
//     data:{label: "Node2"}
//   },
// ]


// const initialEdges = [
//   {id:"n1-n2", source:"n1", target:"n2"}
// ]


export const Editor = ({workflowId}:{workflowId: string})=>{
  const {data:workflow} = useSuspenseOneWorkflow(workflowId);

  const [nodes ,setNodes] = useState<Node[]>(workflow.nodes);
  const [edges ,setEdges] = useState<Edge[]>(workflow.edges)

  const onNodesChange = useCallback(
   (changes: NodeChange[])=> setNodes((nodesSnapshot)=> applyNodeChanges(changes , nodesSnapshot)),
   [],
  );

  const onEdgesChanges = useCallback((changes:EdgeChange[])=>{
      return setEdges((edgesSnapshot)=> applyEdgeChanges(changes , edgesSnapshot))
  },[]);

   const onConnect = useCallback((params :Connection)=>{
     return setEdges((edgesSnapshot)=> addEdge(params , edgesSnapshot));
   },[]);

  return(
  <div className="w-screen h-screen">
    <ReactFlow
     nodes={nodes}
     edges={edges}
     onNodesChange={onNodesChange}
     onEdgesChange={onEdgesChanges}
     onConnect={onConnect}
     nodeTypes={nodeComponents}
     fitView
    //  proOptions={{
    //   hideAttribution:true
    //  }}
    >
     <Background />
     <Controls/>
     <MiniMap/>
     <Panel>
      <AddNodeButton/>
     </Panel>
   </ReactFlow>
  </div>
  )
};