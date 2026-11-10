export async function POST(req) {
  try {
    const data = await req.json();
    const scriptURL = process.env.SHEET_SCRIPT_URL;

    if (!scriptURL) {
      console.warn("SHEET_SCRIPT_URL is not configured.");
      return new Response(
        JSON.stringify({
          success: false,
          error: "SHEET_SCRIPT_URL environment variable is not configured",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();

    return new Response(text, {
      status: response.ok ? 200 : response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
