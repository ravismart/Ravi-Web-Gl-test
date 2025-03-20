console.log("1. Script loaded");

document.addEventListener("DOMContentLoaded", function() {
    console.log("2. DOM fully loaded");

    const mainContent = document.getElementById('main-content');
    const loader = document.getElementById('loader');

    console.log("3. DOM elements assigned:", { mainContent, loader });

    function loadPage(page) {
        console.log(`4. Loading page: ${page}`);
        loader.style.display = 'block';
        mainContent.classList.remove('visible');
        const html = fetchContent(page);
        console.log(`5. Content fetched for ${page}:`, html.substring(0, 50) + "...");
        mainContent.innerHTML = html;
        console.log("6. Content inserted into mainContent");
        loader.style.display = 'none';
        mainContent.classList.add('visible');
        console.log(`7. Page ${page} loaded successfully`);
    }

    function fetchContent(page) {
        console.log(`8. Fetching content for: ${page}`);
        if (page === 'home') {
            return `
                <div class="video-background">
                    <iframe src="https://player.vimeo.com/video/1015033668?autoplay=1&muted=1&loop=1&background=1" frameborder="0" allow="autoplay; fullscreen" title="Ravikanth Compositing Reel 2024"></iframe>
                    <div class="overlay"></div>
                    <div class="content">
                        <h1>VFX Compositor</h1>
                        <h2>Ravikanth Kachibhotla</h2>
                    </div>
                </div>
            `;
        }
        return '<p>Page not found.</p>';
    }

    console.log("9. Calling loadPage('home')");
    loadPage('home');
});
