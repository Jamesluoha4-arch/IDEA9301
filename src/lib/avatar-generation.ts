import fallbackFigurineUrl from "@/assets/chibi-figurine.png";

export const generatedAvatarStorageKey = "second-self.generated-avatar";

export const figurinePrompt =
  "Create a full-body transparent-background Q-style collectible figurine based strictly on the uploaded real camera photo. Preserve the person's visible face shape, hairstyle, hair color, skin tone, facial impression, outfit, clothing colors, and overall styling from the photo. Do not invent or add any accessories. Do not add glasses unless the person is clearly wearing glasses in the uploaded photo. If the person is not wearing glasses, the figurine must not have glasses. Do not add hats, jewelry, facial hair, masks, or extra clothing unless clearly visible in the photo. Use rounded cute 3D toy proportions, matte vinyl figurine material, oversized head, small body, premium studio render, transparent background, clean edges, no text, no watermark.";

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

  let data: { image?: string; b64_json?: string; error?: string };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: photoDataUrl,
        prompt: figurinePrompt,
      }),
    });
    data = (await response.json()) as { image?: string; b64_json?: string; error?: string };
    if (!response.ok) {
      throw new Error(data.error || `Avatar generation failed: ${response.status}`);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Avatar generation request failed.");
  }

  const imageUrl = data.image || (data.b64_json ? `data:image/png;base64,${data.b64_json}` : "");
  if (!imageUrl) throw new Error("Avatar generation response did not include an image.");
  saveGeneratedAvatar(imageUrl);
  return { imageUrl, usedFallback: false };
}
