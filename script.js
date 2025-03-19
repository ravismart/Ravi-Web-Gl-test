document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById('main-content');
    const loader = document.getElementById('loader');

    // Page content definitions
    const pages = {
        home: `
            <div class="home-container">
                <h1>Welcome</h1>
                <p>This is the portfolio of Ravikanth Kachibhotla, VFX Compositor.</p>
                <iframe src="https://player.vimeo.com/video/1015033668?autoplay=1&muted=1&loop=1&background=1" frameborder="0" allow="autoplay; fullscreen" title="Ravikanth Compositing Reel 2024"></iframe>
            </div>
        `,
        mywork: `
            <div class="work-container">
                <h1>My Work</h1>
                <div class="work-item">
                    <iframe src="https://player.vimeo.com/video/1018839925?autoplay=1&muted=0&loop=1" frameborder="0" allow="autoplay; fullscreen" title="Shot 0080 Final Comp"></iframe>
                    <p>Shot 0080 Final Comp: Integrated VFX with live footage.</p>
                </div>
                <div class="work-item">
                    <iframe src="https://player.vimeo.com/video/1018840035?autoplay=1&muted=0&loop=1" frameborder="0" allow="autoplay; fullscreen" title="Shot 0090 Final Comp"></iframe>
                    <p>Shot 0090 Final Comp: Seamless CGI composite.</p>
                </div>
            </div>
        `,
        breakdowns: `
            <div class="breakdowns-container">
                <h1>Breakdowns</h1>
                <div class="breakdown-item">
                    <img src="https://picsum.photos/800/450?random=1" alt="Before">
                    <img src="https://picsum.photos/800/450?random=2" alt="After">
                    <p>Breakdown 1: Enhanced with VFX.</p>
                </div>
            </div>
        `,
        portfolio: `
            <div class="portfolio-container">
                <h1>Portfolio</h1>
                <div class="portfolio-item">
                    <img src="https://picsum.photos/800/450?random=3" alt="Portfolio 1">
                </div>
                <div class="portfolio-item">
                    <img src="https://picsum.photos/800/450?random=4" alt="Portfolio 2">
                </div>
            </div>
        `,
        about: `
            <div class="about-container">
                <h1>About Me</h1>
                <p>I’m Ravikanth Kachibhotla, a VFX Compositor based in Calgary, AB.</p>
                <p>Experience: Videographer at Singandkaur Photography Studio since 2022.</p>
                <p>Education: Advanced Visual Effects Diploma, Bow Valley College (2022-2024).</p>
            </div>
        `,
        contact: `
            <div class="contact-container">
                <h1>Contact</h1>
                <form id="contact-form">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="email" placeholder="Your Email" required>
                    <textarea name="message" placeholder="Your Message" required></textarea>
                    <button type="submit">Send</button>
                </form>
                <div id="contact-response"></div>
            </div>
        `
    };

    // Load a page
    function loadPage(page) {
        loader.style.display = 'block';
        mainContent.classList.remove('visible');

        setTimeout(() => {
            mainContent.innerHTML = pages[page] || '<p>Page not found.</p>';
            loader.style.display = 'none';
            mainContent.classList.add('visible');
            initializePage(page);
            updateActiveNav(page);
        }, 300);
    }

    // Initialize page-specific functionality
    function initializePage(page) {
        if (page === 'contact') {
            const form = document.getElementById('contact-form');
            const response = document.getElementById('contact-response');
            form.addEventListener('submit', e => {
                e.preventDefault();
                response.textContent = 'Message sent successfully! (Demo)';
                form.reset();
                setTimeout(() => response.textContent = '', 3000);
            });
        }
    }

    // Update active nav link
    function updateActiveNav(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page && !link.classList.contains('logo-link')) {
                link.classList.add('active');
            }
        });
    }

    // Attach navigation listeners
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            loadPage(page);
        });
    });

    // Initial page load
    loadPage('home');
});
