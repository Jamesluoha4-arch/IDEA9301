const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const defaultPrompt =
  "Create a full-body transparent-background Q-style collectible figurine based strictly on the uploaded real camera photo. Preserve the person's visible face shape, hairstyle, hair color, skin tone, facial impression, outfit, clothing colors, and overall styling from the photo. Do not invent or add any accessories. Do not add glasses unless the person is clearly wearing glasses in the uploaded photo. If the person is not wearing glasses, the figurine must not have glasses. Do not add hats, jewelry, facial hair, masks, or extra clothing unless clearly visible in the photo. Use rounded cute 3D toy proportions, matte vinyl figurine material, oversized head, small body, premium studio render, transparent background, clean edges, no text, no watermark.";

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return json({ error: "Use POST." }, 405);
    }

    if (!env.OPENAI_API_KEY) {
      return json({ error: "OPENAI_API_KEY is not configured." }, 500);
    }

    const { image, prompt = defaultPrompt } = await request.json();
    if (!image || typeof image !== "string") {
      return json({ error: "Missing image data URL." }, 400);
    }

    const imageBlob = dataUrlToBlob(image);
    const form = new FormData();
    form.append("model", "gpt-image-1");
    form.append("image", imageBlob, "face-photo.jpg");
    form.append("prompt", prompt);
    form.append("background", "transparent");
    form.append("output_format", "png");
    form.append("size", "1024x1536");
    form.append("quality", "medium");
    form.append("input_fidelity", "high");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: form,
    });

    const data = await response.json();
    if (!response.ok) {
      return json(
        { error: data.error?.message || "OpenAI image generation failed." },
        response.status,
      );
    }

    const imageResult = data.data?.[0]?.b64_json;
    if (!imageResult) {
      return json({ error: "OpenAI response did not include an image." }, 502);
    }

    return json({ image: `data:image/png;base64,${imageResult}` });
  },
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function dataUrlToBlob(dataUrl) {
  const [meta, base64] = dataUrl.split(",");
  const mime = meta.match(/data:(.*?);base64/)?.[1] || "image/jpeg";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}
