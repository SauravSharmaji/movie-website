// script.js
document.getElementById('downloadBtn').addEventListener('click', async () => {
    const urlInput = document.getElementById('urlInput').value.trim();
    const resultContainer = document.getElementById('resultContainer');
    
    if (!urlInput) {
      alert("Please enter a valid Instagram Reel URL!");
      return;
    }
  
    // Send the URL to the PHP backend
    try {
      const response = await fetch('downloader.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `url=${encodeURIComponent(urlInput)}`,
      });
  
      const data = await response.json();
  
      if (data.success) {
        resultContainer.innerHTML = `
          <p>Video Preview:</p>
          <video src="${data.download_url}" controls width="100%"></video>
          <a href="${data.download_url}" download="reel.mp4" target="_blank" class="download-link">Download Reel</a>
        `;
      } else {
        resultContainer.innerHTML = `<p class="error">${data.error}</p>`;
      }
      resultContainer.style.display = 'block';
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
  