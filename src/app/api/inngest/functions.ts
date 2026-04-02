import {inngest} from  "@/inngest/client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const googleGenerativeAi = createGoogleGenerativeAI();

export const executeAi = inngest.createFunction(
    {id: "execute-ai"},
    {event:"execute/ai"},
    async ({ event, step }) => {
        const { text } = await step.ai.wrap("gemini-generate-text",
                generateText,{
                    model: googleGenerativeAi("gemini-2.5-flash"),
                    system: "you are a helpful assistant.",
                    prompt: event.data.prompt,
                    experimental_telemetry: {
                        isEnabled: true,
                        recordInputs: true,
                        recordOutputs: true,
                      },
                });
        return { text };
    }         
        );