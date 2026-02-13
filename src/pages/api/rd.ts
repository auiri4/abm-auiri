export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const text = await request.text();
    const data = text ? JSON.parse(text) : {};

    return new Response(JSON.stringify({ ok: true, received: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
}
