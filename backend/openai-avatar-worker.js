const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const defaultPrompt =
  "Transform the person in the reference photo into a head-focused chibi 3D vinyl sticker character inspired by a cute designer collectible toy aesthetic. The generated avatar should focus on the head and upper shoulders only, because it will be used for live facial expression tracking. Closely follow the real person in the reference image, including face shape, skin tone, facial features, expression, hairstyle, hair accessories, and visible clothing around the neck or shoulders. Do not add glasses by default. Only include glasses if the person is clearly wearing glasses in the reference photo. If the person is not wearing glasses, the generated character must not wear glasses. Only include accessories, facial decorations, jewelry, hats, or other items if they are clearly visible in the reference photo. Do not invent or add any extra accessories that are not present in the original image. The final character should look like a cute designer toy sticker: big rounded head, glossy 3D vinyl texture, soft rounded shapes, expressive face, clean eyes and mouth suitable for expression animation, and high-quality collectible figure details. Create a single complete head avatar only, centered in the image, with no text, no logo, and no extra objects. Use a clean plain light background. The final image should feel close to the real person while having a cute designer toy aesthetic.";

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

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body." }, 400);
    }

    const { image } = body;
    if (!image || typeof image !== "string") {
      return json({ error: "Missing image data URL." }, 400);
    }

    const imageBlob = dataUrlToBlob(image);
    const form = new FormData();
    form.append("model", "gpt-image-2");
    form.append("image[]", imageBlob, "face-photo.jpg");
    form.append("prompt", defaultPrompt);
    form.append("output_format", "png");
    form.append("size", "1024x1024");
    form.append("quality", "medium");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: form,
    });

    let data;
    try {
      data = await response.json();
    } catch {
      return json({ error: "OpenAI returned a non-JSON response." }, 502);
    }
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
