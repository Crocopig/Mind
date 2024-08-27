let currentData = null;

async function fetchData() {
    try {
        const response = await fetch('/api/latest');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function updateUI(data) {
    const aiMessage = document.getElementById('ai-message');
    const urlDiv = document.getElementById('url-div');
    const urlTitle = document.getElementById('url-title');
    const urlLink = document.getElementById('url-link');

    if (data && data.message) {
        aiMessage.textContent = data.message;
        aiMessage.style.display = 'block';
    } else {
        aiMessage.style.display = 'none';
    }

    if (data && data.url && data.title) {
        urlTitle.textContent = data.title;
        urlLink.textContent = data.url;
        urlLink.href = data.url;
        urlDiv.style.display = 'block';
    } else {
        urlDiv.style.display = 'none';
    }
}

async function refreshData() {
    const data = await fetchData();
    updateUI(data);
}

document.addEventListener('DOMContentLoaded', () => {
    refreshData();
    // Refresh data every 30 seconds
    setInterval(refreshData, 30000);
});
