/**
 * Cloudflare Pages Function Proxy for Wabiy Public Quick Audit
 * Keeps external API endpoints encapsulated behind the first-party domain
 */
export async function onRequestPost(context: { request: Request }): Promise<Response> {
  try {
    const body = await context.request.json();
    const clientOrigin = context.request.headers.get('Origin') || 'https://georgia-koenig.de';

    const response = await fetch('https://api.wabiy.com/audit/public/quick', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': clientOrigin,
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: {
          code: 'proxy_failed',
          message: error?.message || 'Quick audit service currently unavailable.',
        },
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

