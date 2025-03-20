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
        initializePage(page);
        updateActiveNav(page);
        console.log(`7. Page ${page} loaded successfully`);
    }

    function fetchContent(page) {
        console.log(`8. Fetching content for: ${page}`);
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
                        <div class="work-item">
                            <iframe src="https://player.vimeo.com/video/1018840035?autoplay=1&muted=0&loop=1" frameborder="0" allow="autoplay; fullscreen" title="Shot 0090 Final Comp"></iframe>
                            <div class="work-description">
                                <h3>Shot 0090 Final Comp</h3>
                                <p>Created a seamless composite of CGI and live footage.</p>
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
                        <div class="portfolio-item" data-index="1">
                            <img src="https://picsum.photos/800/450?random=2" alt="Portfolio 2" loading="lazy">
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
        console.log(`9. Initializing page: ${page}`);
        if (page === 'about') initializeAbout();
        if (page === 'contact') initializeContact();
        if (page === 'breakdowns') initializeBreakdowns();
        if (page === 'portfolio') initializePortfolio();
    }

    function initializeAbout() {
        console.log("10. Initializing About page");
        const form = document.getElementById('testimonial-form');
        const response = document.getElementById('testimonial-response');
        const list = document.getElementById('testimonial-list');

        if (!window.firebase || !window.firebase.db) {
            list.innerHTML = '<p>Testimonials unavailable (database not initialized).</p>';
            console.log("11. Firebase not available");
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
            console.log("12. Testimonials loaded successfully");
        }).catch(err => {
            console.error("12. Error loading testimonials:", err);
            list.innerHTML = '<p>Failed to load testimonials.</p>';
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            console.log("13. Submitting testimonial");
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
                console.log("14. Testimonial submitted successfully");
            }).catch(err => {
                console.error("14. Error submitting testimonial:", err);
                response.textContent = 'Error submitting review: ' + err.message;
            });
        });
    }

    function initializeContact() {
        console.log("10. Initializing Contact page");
        const form = document.getElementById('contact-form');
        const response = document.getElementById('contact-response');

        form.addEventListener('submit', async e => {
            e.preventDefault();
            console.log("11. Submitting contact form");
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
                    console.log("12. Contact form submitted successfully");
                } else {
                    console.error("12. Contact form submission failed:", res.status);
                    response.textContent = 'Error sending message.';
                }
            } catch (err) {
                console.error("12. Network error in contact form:", err);
                response.textContent = 'Network error: ' + err.message;
            });
        };
    }

    function initializeBreakdowns() {
        console.log("10. Initializing Breakdowns page");
        document.querySelectorAll('.slider-container').forEach(slider => {
            slider.addEventListener('click', () => {
                console.log("11. Opening breakdown modal");
                const beforeSrc = slider.querySelector('.before').src;
                const afterSrc = slider.querySelector('.after').src;
                openModal(`
                    <div class="modal-slider">
                        <img class="before" src="${beforeSrc}" alt="Before VFX">
                        <img class="after" src="${afterSrc}" alt="After VFX">
                        <div class="slider-bar"></div>
                    </div>
                `);
            });
        });
    }

    function initializePortfolio() {
        console.log("10. Initializing Portfolio page");
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                console.log("11. Opening portfolio modal");
                const imgSrc = item.querySelector('img').src;
                openModal(`
                    <img src="${imgSrc}" alt="Portfolio Image" class="modal-image">
                `);
            });
        });
    }

    function openModal(content) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                ${content}
            </div>
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            console.log("12. Closing modal");
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log("12. Closing modal (outside click)");
                modal.remove();
            }
        });
    }

    function updateActiveNav(page) {
        console.log(`13. Updating nav for: ${page}`);
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
            console.log(`14. Nav clicked: ${page}`);
            loadPage(page);
        });
    });

    console.log("15. Calling loadPage('home')");
    loadPage('home');
});
