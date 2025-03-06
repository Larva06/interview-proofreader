import type { Token } from "../../../src/types/api.js";

interface Env {
    X_AUTH?: string | undefined;
    GEMINI_API_KEY?: string | undefined;
}

const onRequest: PagesFunction<Env> = async ({ env, request }): Promise<Response> => {
    const authToken = env.X_AUTH;
    if (!authToken)
        return new Response("Internal Server Error. X_AUTH is not set in the environment variables.", { status: 500 });

    const geminiApiKey = env.GEMINI_API_KEY;
    if (!geminiApiKey)
        return new Response("Internal Server Error. GEMINI_API_KEY is not set in the environment variables.", {
            status: 500
        });

    const authHeader = request.headers.get("x-auth");
    if (!authHeader) return new Response("Unauthorized. Missing x-auth header.", { status: 401 });

    if (authHeader !== authToken) return new Response("Unauthorized. Invalid x-auth header.", { status: 401 });

    const result = {
        token: geminiApiKey
    } as const satisfies Token;

    return new Response(JSON.stringify(result), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
        },
        status: 200
    });
};

export { onRequest };
