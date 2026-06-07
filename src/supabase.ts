// ═══════════════════════════════════════
// HOW TO USE IN A LANDING PAGE:
// import { submitOrder } from "../../supabase";
// await submitOrder({
//   client_id:    "amourshop",  // ← change per client
//   source:       "maio",       // ← change per landing page
//   name, phone, city,
//   size, quantity, product_name
// });
// ═══════════════════════════════════════

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || "") as string;
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_KEY || "") as string;

export interface OrderData {
  client_id: string;
  name: string;
  phone: string;
  city: string;
  size?: string;
  quantity: number | string;
  product_name: string;
  source: string;
}

export const submitOrder = async (orderData: OrderData) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn("Supabase credentials not fully configured. Using development fallback simulation:", orderData);
    return { 
      status: "simulated_success", 
      data: [{ ...orderData, status: "pending", created_at: new Date().toISOString() }] 
    };
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
    method: "POST",
    headers: {
      apikey:         SUPABASE_ANON_KEY,
      Authorization:  `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer:         "return=representation",
    },
    body: JSON.stringify({
      client_id:    orderData.client_id,
      name:         orderData.name,
      phone:        orderData.phone,
      city:         orderData.city,
      size:         orderData.size,
      quantity:     orderData.quantity,
      product_name: orderData.product_name,
      source:       orderData.source,
      status:       "pending",
      created_at:   new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
