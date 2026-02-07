import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "@/lib/api";

export type VenueApplicationPayload = {
  venue: string;
  city: string;
  type: string;
  web?: string | null;
  contact: string;
  role?: string | null;
  email: string;
  phone: string;
  nights: string;
  capacity: string;
  payout: string;
  notes?: string | null;
};

export function useCreateVenueApplication() {
  return useMutation({
    mutationFn: async (payload: VenueApplicationPayload) => {
      // Normalise optional fields to null so the backend model is happy
      const normalisedPayload: VenueApplicationPayload = {
        ...payload,
        web: payload.web?.trim() || null,
        role: payload.role?.trim() || null,
        notes: payload.notes?.trim() || null,
        email: payload.email.trim().toLowerCase(),
        venue: payload.venue.trim(),
        city: payload.city.trim(),
        contact: payload.contact.trim(),
        phone: payload.phone.trim(),
        nights: payload.nights.trim(),
        capacity: payload.capacity.trim(),
        payout: payload.payout.trim(),
      };

      const url = `${API_BASE}/api/venue-application`;
      console.log("📤 Sending venue application to:", url);
      console.log("📦 Payload:", normalisedPayload);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalisedPayload),
      });

      console.log("📥 Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("❌ Venue application error:", errorData);
        throw new Error(
          (errorData as any).detail || "Failed to submit venue application"
        );
      }

      const data = await res.json().catch(() => null);
      console.log("✅ Venue application success:", data);
      return data;
    },
  });
}