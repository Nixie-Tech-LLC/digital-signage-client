const screenCodeSpan = document.getElementById('screen-code');
const contentDiv = document.getElementById('content');

let screenCode = null;

// Simulate assigning a screen code on first launch
function generateScreenCode() {
  // In production, this would call a real API to fetch a code
  return Math.floor(Math.random() * 900000) + 100000;
}

function fetchContent() {
  if (!screenCode) return;

  fetch(`https://your-api.com/signage/${screenCode}`)
    .then(response => response.json())
    .then(data => {
      contentDiv.innerHTML = data.content || "No content assigned.";
    })
    .catch(err => {
      console.error("Failed to fetch content:", err);
      contentDiv.innerHTML = "Error fetching content.";
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  screenCode = generateScreenCode();
  screenCodeSpan.textContent = screenCode;

  // Poll content every 30 seconds
  setInterval(fetchContent, 30000);
  fetchContent(); // initial load
});
