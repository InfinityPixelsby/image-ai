async function generateImage() {

  const prompt = document.getElementById("prompt").value;
  const loading = document.getElementById("loading");
  const img = document.getElementById("result");
  const placeholder = document.getElementById("placeholder");

  if (!prompt) {
    loading.textContent = "Enter a prompt";
    return;
  }

  loading.textContent = "Generating...";

  img.style.display = "none";

  try {

    const response = await fetch(
      "https://image-ai-backend-1w9l.onrender.com/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      loading.textContent = error;
      return;
    }

    const blob = await response.blob();

    const imageURL = URL.createObjectURL(blob);

    img.src = imageURL;

    placeholder.style.display = "none";
    img.style.display = "block";

    loading.textContent = "Done!";

  } catch (err) {

    loading.textContent = err.message;

  }
}
