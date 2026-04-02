import {  createTRPCRouter, protectedProcedure } from '../init';
import { prisma } from '@/lib/db';
import {generateText } from "ai";
import {google} from "@ai-sdk/google"
import z from "zod";

export const appRouter = createTRPCRouter({
 testAi: protectedProcedure.mutation(async ()=>{
    const {text} = await generateText({
        model: google("gemini-2.5-flash"),
        prompt: "Write a vegetarian lasagna reccipe for 4 people"
    });
    return text;
 }),
 getWorkflows: protectedProcedure.query(({ctx})=> {
 console.log({userId : ctx.auth.user.id})
 return prisma.workflows.findMany({
    where:{
        id:ctx.auth.user.id,
    }
 });
 }),  
 createWorkflow: protectedProcedure
   .input(z.object({ name: z.string().min(1) }))
   .mutation(async ({ ctx, input }) => {
    return prisma.workflows.create({
        data:{
            name: input.name,
        }
    })
 }),
});
// export type definition of API
export type AppRouter = typeof appRouter;