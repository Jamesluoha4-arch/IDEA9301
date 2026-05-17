const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const defaultPrompt =
  "Q版手办: 与真人同款穿搭、同款发型，圆润3D建模，哑光质感。真人照片: 与0版同款造型，冷白皮清透妆容。Generate a full-body transparent-background Q-style 3D collectible figurine that preserves the photographed person's outfit, hairstyle, glasses, facial impression, and overall pose. Premium matte vinyl toy render, oversized head, small body proportions, clean studio lighting, no text, no watermark.";

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
    form.append("model", "gpt-image-1.5");
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

    return json({ image: `data:image/png;base64,${data.data?.[0]?.b64_json || ""}` });
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
