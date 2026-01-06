if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js'); }

document.addEventListener('DOMContentLoaded', () => {
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isPWA) {
        startLoading();
    }
});

function launchGame() {
    window.location.href = '/game';
}

function startLoading() {
    const btn = document.getElementById('mainButton');
    const container = document.getElementById('progressContainer');
    const bar = document.getElementById('progressBar');
    const text = document.getElementById('loadingText');
    const content = document.querySelector('.content-wrapper');

    btn.style.display = "none";
    container.style.display = "block";
    text.style.display = "block";

    let width = 0;
    const messages = ["Connecting to Forest...", "Loading Assets...", "Setting up Camp...", "Ready!"];
    
    const interval = setInterval(() => {
        // Randomly increase width slightly for a more "organic" loading feel
        width += Math.floor(Math.random() * 3) + 1; 
        
        if (width >= 100) {
            width = 100;
            clearInterval(interval);
            text.innerText = "Ready!";
            
            // Short delay so the user sees "Ready!"
            setTimeout(() => {
                content.classList.add('fade-out'); // Trigger CSS animation
                
                // Final delay for the animation to finish before switching pages
                setTimeout(() => {
                    window.location.href = '/game';
                }, 800);
            }, 500);
        }

        bar.style.width = width + "%";
        text.innerText = messages[Math.floor(width/30)] || "Almost there...";

    }, 150); 
}
