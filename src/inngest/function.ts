import {inngest} from "./client";

export const generateText = inngest.createFunction(
    {
        name:"generate-text",
        id:"generate-text"
    },
    {
        event:"generate-text/event"
    },
    async({event , step})=>{
        const {prompt} = event.data;
    }
)