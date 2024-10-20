import type { APIRoute } from 'astro';
import { HfInference } from "@huggingface/inference";
import { ENHANCER_PROMPT } from "../../utils/prompts";
import { HF_API_KEY } from 'astro:env/server';

export const GET: APIRoute = ({ params, request }) => {
  return new Response(JSON.stringify({
    message: "Prompt enhancer API - Standard Free Plan"
  }));
};

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const inference = new HfInference(HF_API_KEY);
    const body = await request.json();
    const message = body.message;

    try {
      if (!message) {
        return new Response(JSON.stringify({ message: "Prompt is required." }), {
          status: 400
        });
      }

      const prompt = ENHANCER_PROMPT(message);
      const encoder = new TextEncoder();

      // Create a ReadableStream to send the data progressively.
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of inference.chatCompletionStream({
              model: "mistralai/Mistral-Nemo-Instruct-2407",
              messages: [
                { role: "user", content: prompt }
              ],
              max_tokens: 600,
              temperature: 1,
            })) {
              const textChunk = chunk.choices[0]?.delta?.content || "";
              console.log(textChunk);
              controller.enqueue(encoder.encode(textChunk));
            }
          } catch (error) {
            controller.error(error);
          } finally {
            controller.close();
          }
        }
      });

      // Return the stream response
      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        message: "An error occurred while processing the prompt."
      }), {
        status: 500
      });
    }
  }
  return new Response(null, { status: 400 });
};
