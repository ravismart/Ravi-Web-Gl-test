console.log("1. Script loaded");

document.addEventListener("DOMContentLoaded", function() {
    console.log("2. DOM fully loaded");

    const mainContent = document.getElementById('main-content');
    const loader = document.getElementById('loader');
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const sliderModal = document.getElementById('slider-modal');
    const sliderBefore = document.querySelector('.slider-before');
    const sliderAfter = document.querySelector('.slider-after');
    const sliderDivider = document.querySelector('.slider-modal-content .slider-divider');
    const closeBtn = document.querySelectorAll('.close');
    let currentPortfolioIndex = 0;

    console.log("3. DOM elements assigned:", { mainContent, loader, imageModal, modalImg, sliderModal });

    function loadPage(page) {
        console.log(`4. Loading page: ${page}`);
        loader.style.display = 'block';
        mainContent.classList.remove('visible');
        try {
            const html = fetchContent(page);
            console.log(`5. Content fetched for ${page}:`, html.substring(0, 50) + "...");
            mainContent.innerHTML = html;
            console.log("6. Content inserted into mainContent");
            loader.style.display = 'none';
            mainContent.classList.add('visible');
            initializePage(page);
            updateActiveNav(page);
            console.log(`7. Page ${page} loaded successfully`);
        } catch (err) {
            console.error(`8. Error in loadPage(${page}):`, err);
            mainContent.innerHTML = '<p>Sorry, something went wrong.</p>';
            loader.style.display = 'none';
            mainContent.classList.add('visible');
        }
    }

    function fetchContent(page) {
        console.log(`9. Fetching content for: ${page}`);
        switch (page) {
            case 'home':
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
            case 'mywork':
                return `
                    <div class="work-gallery">
                        <div class="work-item">
                            <iframe src="https://player.vimeo.com/video/1018839925?autoplay=1&muted=0&loop=1" frameborder="0" allow="autoplay; fullscreen" title="Shot 0080 Final Comp"></iframe>
                            <div class="work-description">
                                <h3>Shot 0080 Final Comp</h3>
                                <p>Integrated complex VFX elements into live-action footage.</p>
                            </div>
                        </div>
                    </div>
                `;
            case 'breakdowns':
                return `
                    <div class="breakdowns-container">
                        <div class="breakdown-item">
                            <div class="slider-container" data-index="0">
                                <img class="before" src="https://picsum.photos/800/450?random=1" alt="Before VFX 1">
                                <img class="after" src="https://picsum.photos/800/450?random=2" alt="After VFX 1">
                                <div class="slider-bar"></div>
                                <button class="fullscreen-btn" aria-label="Maximize slider">⤢</button>
                            </div>
                            <p>Breakdown 1: Enhanced with VFX techniques.</p>
                        </div>
                    </div>
                `;
            case 'portfolio':
                return `
                    <div class="portfolio-container">
                        <div class="portfolio-item" data-index="0">
                            <img src="https://picsum.photos/800/450?random=1" alt="Portfolio 1" loading="lazy">
                        </div>
                    </div>
                `;
            case 'about':
                return `
                    <div class="about-container">
                        <h2>About Me</h2>
                        <p>I’m a dedicated VFX Compositor based in Calgary, AB.</p>
                        <div id="testimonial-list"></div>
                        <form id="testimonial-form">
                            <input type="text" name="name" placeholder="Your Name" required>
                            <textarea name="comment" placeholder="Your Comment" required></textarea>
                            <button type="submit">Submit</button>
                        </form>
                        <div id="testimonial-response"></div>
                    </div>
                `;
            case 'contact':
                return `
                    <div class="contact-container">
                        <h2>Contact Me</h2>
                        <form id="contact-form">
                            <input type="text" name="name" placeholder="Your Name" required>
                            <input type="email" name="email" placeholder="Your Email" required>
                            <input type="text" name="subject" placeholder="Subject" required>
                            <textarea name="message" placeholder="Your Message" required></textarea>
                            <button type="submit">Send Message</button>
                        </form>
                        <div id="contact-response"></div>
                    </div>
                `;
            default:
                return '<p>Page not found.</p>';
        }
    }

    function initializePage(page) {
        console.log(`11. Initializing page: ${page}`);
        if (page === 'about') initializeAbout();
        if (page === 'contact') initializeContact();
        if (page === 'breakdowns') initializeBreakdowns();
        if (page === 'portfolio') initializePortfolio();
        console.log(`12. Page ${page} initialized`);
    }

    function initializeAbout() {
        console.log("14. Initializing About page");
        const form = document.getElementById('testimonial-form');
        const response = document.getElementById('testimonial-response');
        const list = document.getElementById('testimonial-list');

        if (!window.firebase || !window.firebase.db) {
            list.innerHTML = '<p>Testimonials unavailable (database not initialized).</p>';
            console.log("15. Firebase not available");
            return;
        }

        const { db, collection, getDocs, addDoc, orderBy, query, serverTimestamp } = window.firebase;
        const q = query(collection(db, 'testimonials'), orderBy('timestamp', 'desc'));
        getDocs(q).then(snapshot => {
            list.innerHTML = snapshot.docs.map(doc => `
                <div class="testimonial">
                    <p>"${doc.data().comment}"</p>
                    <p>- ${doc.data().name}</p>
                </div>
            `).join('');
            console.log("16. Testimonials loaded successfully");
        }).catch(err => {
            console.error("16. Error loading testimonials:", err);
            list.innerHTML = '<p>Failed to load testimonials.</p>';
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            console.log("17. Submitting testimonial");
            const name = form.name.value;
            const comment = form.comment.value;
            addDoc(collection(db, 'testimonials'), {
                name,
                comment,
                timestamp: serverTimestamp()
            }).then(() => {
                response.textContent = 'Review submitted successfully!';
                form.reset();
                initializeAbout();
                console.log("18. Testimonial submitted successfully");
            }).catch(err => {
                console.error("18. Error submitting testimonial:", err);
                response.textContent = 'Error submitting review: ' + err.message;
            });
        });
    }

    function initializeContact() {
        console.log("14. Initializing Contact page");
        const form = document.getElementById('contact-form');
        const response = document.getElementById('contact-response');

        form.addEventListener('submit', async e => {
            e.preventDefault();
            console.log("15. Submitting contact form");
            const formData = new FormData(form);
            try {
                const res = await fetch('https://formspree.io/f/mdknbwwq', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    response.textContent = 'Message sent successfully!';
                    form.reset();
                    console.log("16. Contact form submitted successfully");
                } else {
                    console.error("16. Contact form submission failed:", res.status);
                    response.textContent = 'Error sending message.';
                }
            } catch (err) {
                console.error("16. Network error in contact form:", err);
                response.textContent = 'Network error: ' + err.message;
            });
        });
    }

    function initializeBreakdowns() {
        console.log("14. Initializing Breakdowns page");
        document.querySelectorAll('.slider-container').forEach(container => {
            const before = container.querySelector('.before');
            const after = container.querySelector('.after');
            const bar = container.querySelector('.slider-bar');

            function updateSlider(e) {
                const rect = container.getBoundingClientRect();
                let x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
                x = Math.max(0, Math.min(x, rect.width));
                bar.style.left = `${x}px`;
                after.style.clipPath = `inset(0 ${rect.width - x}px 0 0)`;
            }

            container.addEventListener('mousedown', e => updateSlider(e));
            container.addEventListener('mousemove', e => updateSlider(e));
            container.querySelector('.fullscreen-btn').addEventListener('click', () => {
                console.log("15. Opening slider modal");
                sliderBefore.src = before.src;
                sliderAfter.src = after.src;
                sliderModal.classList.add('active');
            });
        });

        closeBtn[1].addEventListener('click', () => {
            console.log("15. Closing slider modal");
            sliderModal.classList.remove('active');
        });
    }

    function initializePortfolio() {
        console.log("14. Initializing Portfolio page");
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                currentPortfolioIndex = parseInt(item.dataset.index);
                console.log("15. Opening image modal at index:", currentPortfolioIndex);
                modalImg.src = item.querySelector('img').src;
                imageModal.classList.add('active');
            });
        });

        closeBtn[0].addEventListener('click', () => {
            console.log("15. Closing image modal");
            imageModal.classList.remove('active');
        });
    }

    function updateActiveNav(page) {
        console.log(`19. Updating nav for: ${page}`);
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page && !link.classList.contains('logo-link')) {
                link.classList.add('active');
            }
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            console.log(`20. Nav clicked: ${page}`);
            loadPage(page);
        });
    });

    console.log("21. Calling loadPage('home')");
    loadPage('home');
});
