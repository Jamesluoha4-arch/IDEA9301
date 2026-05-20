import fallbackFigurineUrl from "@/assets/chibi-figurine.png";

export const generatedAvatarStorageKey = "second-self.generated-avatar";

export const figurinePrompt =
  "Transform the person in the reference photo into a head-focused chibi 3D vinyl sticker character inspired by a cute designer collectible toy aesthetic. The generated avatar should focus on the head and upper shoulders only, because it will be used for live facial expression tracking. Closely follow the real person in the reference image, including face shape, skin tone, facial features, expression, hairstyle, hair accessories, and visible clothing around the neck or shoulders. Do not add glasses by default. Only include glasses if the person is clearly wearing glasses in the reference photo. If the person is not wearing glasses, the generated character must not wear glasses. Only include accessories, facial decorations, jewelry, hats, or other items if they are clearly visible in the reference photo. Do not invent or add any extra accessories that are not present in the original image. The final character should look like a cute designer toy sticker: big rounded head, glossy 3D vinyl texture, soft rounded shapes, expressive face, clean eyes and mouth suitable for expression animation, and high-quality collectible figure details. Create a single complete head avatar only, centered in the image, with no text, no logo, and no extra objects. Use a clean plain light background. The final image should feel close to the real person while having a cute designer toy aesthetic.";

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
  window.dispatchEvent(new CustomEvent("second-self-avatar-ready", { detail: { imageUrl } }));
}

export async function generateAvatarFromPhoto(photoDataUrl: string) {
  const endpoint = getAvatarApiUrl();
  if (!endpoint) {
    saveGeneratedAvatar(fallbackFigurineUrl);
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
