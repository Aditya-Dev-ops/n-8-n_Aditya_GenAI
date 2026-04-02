

// Create an API that serves Inngest functions
import { inngest } from "@/inngest/client";
import {serve} from "inngest/next";
import { executeAi } from "./functions";
export const {GET , POST  , PUT} = serve({
client:inngest,
functions:[
    executeAi, 
    // Function will be passed here
]
});