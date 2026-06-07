const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const SOURCE = "maio";

export async function submitOrder(orderData) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name: orderData.name,
      phone: orderData.phone,
      city: orderData.city,
      size: orderData.design,
      quantity: orderData.totalQuantity,
      product_name: orderData.design,
      source: SOURCE,
      status: "pending",
      created_at: new Date().toISOString(),
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Failed to submit order");
  }
  return res.json();
}
