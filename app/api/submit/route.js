export async function POST(req) {
  try {
    const data = await req.json();
    const scriptURL =
      process.env.SHEET_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbxZZacOove3X7XoHkSZkBVWUdMnoQFi5TQ8FryYJkySVSpspLcgoL3Thvkne_9v6pxp/exec";
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();

    return new Response(text, {
      status: 200,
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
