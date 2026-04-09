import { Pagination } from "@/components/ui/pagination";
import { PAGINATION } from "@/config/constants";
import { prisma } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { NodeType } from "@prisma/client";
import {generateSlug} from "random-word-slugs";
import type { Node, Edge } from "@xyflow/react";
import z from "zod";

export const workflowsRouter = createTRPCRouter({
    create: protectedProcedure.mutation(({ctx})=>{
     return prisma.workflows.create({
        data:{
            name:generateSlug(3),
            userId:ctx.auth.user.id,
            nodes:{
                 create:{
                    type: NodeType.INITIAL,
                    position:{x:0 , y:0},
                    name:NodeType.INITIAL
                 }
            }
        }
     })
    }),
    remove:protectedProcedure
    .input(z.object({id:z.string()}))
    .mutation(({ctx , input})=>{
        return prisma.workflows.delete({
            where:{
                id:input.id,
                userId:ctx.auth.user.id
            }
        })
    }),

    updateName: protectedProcedure
    .input(z.object({id: z.string(), name:z.string()}))
    .mutation(({ctx , input}) =>{
        return prisma.workflows.update({
            where:{
                id:input.id,
                userId:ctx.auth.user.id
            },
            data:{
                name:input.name
            }
        })
    }),
    
    getOne: protectedProcedure
    .input(z.object({id:z.string()}))
    .query(async ({ctx , input})=>{
        const workflow =  await prisma.workflows.findUniqueOrThrow({
            where:{
              id:input.id, userId: ctx.auth.user.id
            },
            include:{
                nodes: true, connections: true
            }
        });
     // Transfoem server nodes to react-flow compatible nodes 
      const nodes: Node[] =  workflow.nodes.map((node)=> ({
      id:node.id,
      type:node.type,
      position:node.position as {x:number , y:number},
      data:(node.data as Record<string, unknown>) || {},
     }));
    
     // Transfoem server connections to react-flow compatible connections
     const edges: Edge[] = workflow.connections.map((connection)=>({
        id:connection.id,
        source:connection.fromNodeId,
        target:connection.toNodeId,
        sourceHandle:connection.fromOutput,
        targetHandle: connection.toInput,
     }))   

     return {
        id:workflow.id,
        name:workflow.name,
        nodes,
        edges
     }
    }),

    getMany: protectedProcedure
    .input(
        z.object({
            page:z.number().default(PAGINATION.DEFAULT_PAGE),
            pageSize: z
                .number()
                .min(PAGINATION.MIN_PAGE_SIZE)
                .max(PAGINATION.MAX_PAGE_SIZE)
                .default(PAGINATION.DEFAULT_PAGE_SIZE),
            search : z.string().default("")
        })
    )
    .query( async ({ctx , input})=>{

        const {page , pageSize , search} = input;
        const [items , totalCount] = await Promise.all([
           prisma.workflows.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: {
                userId: ctx.auth.user.id,
                name:{
                    contains:search,
                    mode:"insensitive",
                },
            },
            orderBy:{
                updatedAt:"desc",
            },
           }),
           prisma.workflows.count({
            where:{
                userId:ctx.auth.user.id,
            },
           }),
        ]);
        const totalPages = Math.ceil(totalCount/ pageSize);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        
        return{
            items,
            page,
            pageSize,
            totalCount,
            hasNextPage,
            totalPages,
            hasPreviousPage
        }
    }),

});