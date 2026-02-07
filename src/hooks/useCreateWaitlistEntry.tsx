import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "@/lib/api";

export type WaitlistPayload = {
  email: string;
};

export function useCreateWaitlistEntry() {
  return useMutation({
    mutationFn: async (payload: WaitlistPayload) => {
      console.log("📤 Sending to:", `${API_BASE}/api/waitlist`);

      // useCreateWaitlistEntry.ts
const res = await fetch(`${API_BASE}/api/waitlist`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload), // { email: "..." }
});



      console.log("📥 Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("❌ Error:", errorData);
        throw new Error(errorData.detail || "Failed to join waitlist");
      }

      const data = await res.json().catch(() => null);
      console.log("✅ Success:", data);
      return data;
    },
  });
}
