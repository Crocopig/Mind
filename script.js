let currentData = null;

async function fetchData() {
    try {
        const response = await fetch('https://crocomind.netlify.app/api/latest');  
        const data = await response.json();
        console.log("Fetched data:", data);  
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function resetUI() {
    console.log("Resetting UI...");
    const aiMessage = document.getElementById('ai-message');
    const urlTitle = document.getElementById('url-title');
    const urlLink = document.getElementById('url-link');
    const fileIcon = document.getElementById('file-icon');

    aiMessage.textContent = "Loading...";
    urlTitle.textContent = "";
    urlLink.textContent = "";
    fileIcon.innerHTML = "";
}

function updateUI(data) {
    console.log("Updating UI with data:", data); 
    const aiMessage = document.getElementById('ai-message');
    const urlDiv = document.getElementById('url-div');
    const urlTitle = document.getElementById('url-title');
    const urlLink = document.getElementById('url-link');
    const fileIcon = document.getElementById('file-icon');

    if (data) {
        aiMessage.textContent = data.message;
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
        case 'doc':
        case 'docx':
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
        case 'png':
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="8" y1="2" x2="8" y2="22"></line><line x1="16" y1="2" x2="16" y2="22"></line><line x1="2" y1="8" x2="22" y2="8"></line><line x1="2" y1="16" x2="22" y2="16"></line></svg>`;
        default:
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`;
    }
}

function fadeOut(element) {
    element.style.opacity = 1;
    (function fade() {
        if ((element.style.opacity -= .1) < 0) {
            element.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

function fadeIn(element, display) {
    element.style.opacity = 0;
    element.style.display = display || "block";
    (function fade() {
        var val = parseFloat(element.style.opacity);
        if (!((val += .1) > 1)) {
            element.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

function updateUIWithAnimation(data) {
    const aiMessage = document.getElementById('ai-message');
    const urlDiv = document.getElementById('url-div');

    fadeOut(aiMessage);
    fadeOut(urlDiv);

    setTimeout(() => {
        updateUI(data);
        fadeIn(aiMessage);
        fadeIn(urlDiv);
    }, 500);
}

async function refreshData() {
    resetUI();  // Clear UI before fetching new data
    const newData = await fetchData();
    currentData = newData;
    console.log("New data detected, updating UI...");
    updateUIWithAnimation(currentData);
}

document.addEventListener('DOMContentLoaded', function() {
    refreshData();
    // Refresh data every 30 seconds
    setInterval(refreshData, 30000);
});
