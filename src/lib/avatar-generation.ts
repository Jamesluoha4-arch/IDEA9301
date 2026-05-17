import fallbackFigurineUrl from "@/assets/chibi-figurine.png";

export const generatedAvatarStorageKey = "second-self.generated-avatar";

export const figurinePrompt =
  "Q版手办: 与真人同款穿搭、同款发型，圆润3D建模，哑光质感。真人照片: 与0版同款造型，冷白皮清透妆容。Generate a full-body transparent-background Q-style 3D collectible figurine that preserves the photographed person's outfit, hairstyle, glasses, facial impression, and overall pose. Premium matte vinyl toy render, oversized head, small body proportions, clean studio lighting, no text, no watermark.";

export function getAvatarApiUrl() {
  const viteUrl = import.meta.env.VITE_AVATAR_API_URL;
  const runtimeUrl =
    typeof window !== "undefined" ? window.localStorage.getItem("avatarApiUrl") : null;
  return runtimeUrl || viteUrl || "";
}

export function readGeneratedAvatar() {
  if (typeof window === "undefined") return fallbackFigurineUrl;
  return window.sessionStorage.getItem(generatedAvatarStorageKey) || fallbackFigurineUrl;
}

export function saveGeneratedAvatar(imageUrl: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(generatedAvatarStorageKey, imageUrl);
  } catch {
    // Large generated images can exceed sessionStorage limits; keep the in-memory URL in the caller.
  }
}

export async function generateAvatarFromPhoto(photoDataUrl: string) {
  const endpoint = getAvatarApiUrl();
  if (!endpoint) {
    return { imageUrl: fallbackFigurineUrl, usedFallback: true };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: photoDataUrl,
      prompt: figurinePrompt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Avatar generation failed: ${response.status}`);
  }

  const data = (await response.json()) as { image?: string; b64_json?: string };
  const imageUrl = data.image || (data.b64_json ? `data:image/png;base64,${data.b64_json}` : "");
  if (!imageUrl) throw new Error("Avatar generation response did not include an image.");
  saveGeneratedAvatar(imageUrl);
  return { imageUrl, usedFallback: false };
}
