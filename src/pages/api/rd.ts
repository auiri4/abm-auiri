export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();

    // RD Station API Configuration
    const PUBLIC_TOKEN = process.env.RD_STATION_PUBLIC_TOKEN || "622cae42d95f4d8cfa49f08ce0b1451a";
    const IDENTIFIER = process.env.RD_STATION_IDENTIFIER || "decreto-plastico-whitepaper";

    const rdPayload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: IDENTIFIER,
        email: data.email,
        name: data.name,
        company_name: data.company,
        job_title: data.job_title,
        company_size: data.company_size, // O RD Station tenta mapear campos extras automaticamente
      }
    };

    const response = await fetch(`https://api.rdstation.com.br/platform/conversions?api_key=${PUBLIC_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(rdPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('RD Station Error:', result);
      return new Response(JSON.stringify({ ok: false, error: "RD Station API Error" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error('API Error:', err);
    return new Response(JSON.stringify({ ok: false, error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

