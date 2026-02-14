export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();

    // RD Station API Configuration
    // For server-side calls to api.rd.services, use the Private Token (API Key)
    const PRIVATE_TOKEN = (import.meta.env.RD_STATION_PRIVATE_TOKEN) || "1eda080a62e086732d7a51c95e79b109";
    const IDENTIFIER = (import.meta.env.RD_STATION_IDENTIFIER) || "decreto-plastico-whitepaper";


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

    console.log('RD Station Payload:', JSON.stringify(rdPayload, null, 2));

    const response = await fetch(`https://api.rd.services/platform/conversions?api_key=${PRIVATE_TOKEN}`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(rdPayload),
    });


    const responseBody = await response.text();
    console.log('RD Station Raw Response:', responseBody);

    let result;
    try {
      result = JSON.parse(responseBody);
    } catch (e) {
      result = { raw: responseBody };
    }

    if (!response.ok) {
      console.error('RD Station API Error Details:', result);
      return new Response(JSON.stringify({ ok: false, error: "RD Station API Error", details: result }), {
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
    return new Response(JSON.stringify({ ok: false, error: "Internal Server Error", message: err instanceof Error ? err.message : String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

