const express = require("express");

const app = express();

app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: req.body.prompt
        })
      }
    );

    const buffer = await response.arrayBuffer();

    res.set("Content-Type", "image/png");
    res.send(Buffer.from(buffer));

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.listen(process.env.PORT || 3000);