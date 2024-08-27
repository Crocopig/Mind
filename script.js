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
    const fileIcon = document.getElementById('file-icon');

    if (data) {
        aiMessage.textContent = data.message || "No message available";
        urlTitle.textContent = data.title || 'No Title';
        urlLink.textContent = data.url || 'No URL';
        urlDiv.href = data.url || '#';
        fileIcon.innerHTML = getFileIconHTML(data.fileType || 'unknown');
    } else {
        aiMessage.textContent = "Error loading data";
        urlTitle.textContent = "Error";
        urlLink.textContent = "";
        urlDiv.href = "#";
        fileIcon.innerHTML = getFileIconHTML("error");
    }
}

function getFileIconHTML(fileType) {
    const iconColor = 'white';
    switch(fileType.toLowerCase()) {
        case 'pdf':
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
        case 'png':
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
        case 'jpg':
        case 'jpeg':
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
        default:
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`;
    }
}

async function refreshData() {
    const newData = await fetchData();
    if (newData && JSON.stringify(newData) !== JSON.stringify(currentData)) {
        currentData = newData;
        console.log("New data detected, updating UI...");
        updateUI(currentData);
    } else {
        console.log("No new data or data unchanged");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const aiMessage = document.getElementById('ai-message');
    aiMessage.textContent = "Loading...";
    const urlTitle = document.getElementById('url-title');
    urlTitle.textContent = "Loading...";
    const urlLink = document.getElementById('url-link');
    urlLink.textContent = "Loading...";

    refreshData();
    // Refresh data every 30 seconds
    setInterval(refreshData, 30000);
});
