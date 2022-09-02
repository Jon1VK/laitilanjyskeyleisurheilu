/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { APIContext } from 'astro';
import { resolveHTTPResponse } from '@trpc/server';
import type { HTTPHeaders } from '@trpc/client';
import { appRouter } from '@server/router';

async function httpHandler({ request, params }: APIContext): Promise<Response> {
  const query = new URL(request.url).searchParams;
  const requestBody = request.method === 'GET' ? {} : await request.json();
  const { status, headers, ...response } = await resolveHTTPResponse({
    async createContext() {
      // CreateContext
    },
    router: appRouter,
    path: params.trpc as string,
    req: {
      query,
      method: request.method,
      headers: request.headers as unknown as HTTPHeaders,
      body: requestBody,
    },
  });
  return new Response(response.body, {
    headers: headers as HeadersInit,
    status,
  });
}

export const post = httpHandler;
export const get = httpHandler;
