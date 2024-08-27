async function fetchData() {
    try {
        console.log("Fetching data from API...");
        const response = await fetch('/api/latest');
        const data = await response.json();
        console.log("Data received from API:", data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function updateUI(data) {
    const aiMessage = document.getElementById('ai-message');
    const urlDiv = document.getElementById('url-div');

    if (data && data.message) {
        aiMessage.textContent = data.message;
        aiMessage.style.display = 'block';
        console.log("Message updated in UI:", data.message);
    } else {
        aiMessage.style.display = 'none';
    }

    if (data && data.url && data.title) {
        document.getElementById('url-title').textContent = data.title;
        document.getElementById('url-link').textContent = data.url;
        document.getElementById('url-link').href = data.url;
        urlDiv.style.display = 'block';
        console.log("URL div updated in UI:", data.url);
    } else {
        urlDiv.style.display = 'none';
    }
}

async function refreshData() {
    const data = await fetchData();
    updateUI(data);
}

document.addEventListener('DOMContentLoaded', () => {
    refreshData(); // Initial fetch on page load
});
