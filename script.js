document.addEventListener("DOMContentLoaded", function() {
    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAWXzsqC6BKxhQwHyLd6D4vsSskyq136yY",
        authDomain: "ravi-vfx-portfolio.firebaseapp.com",
        projectId: "ravi-vfx-portfolio",
        storageBucket: "ravi-vfx-portfolio.firebasestorage.app",
        messagingSenderId: "352536740700",
        appId: "1:352536740700:web:367340a615b35f42f9f799",
        measurementId: "G-26N9GY8TSK"
    };

    // Initialize Firebase with error handling
    let db;
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("Firebase initialized successfully");
    } catch (err) {
        console.error("Firebase initialization failed:", err);
    }

    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const sliderModal = document.getElementById('slider-modal');
    const sliderBefore = document.querySelector('.slider-before');
    const sliderAfter = document.querySelector('.slider-after');
    const sliderDivider = document.querySelector('.slider-modal-content .slider-divider');
    const closeBtn = document.querySelectorAll('.close');
    const loader = document.getElementById('loader');

    function loadPage(page) {
        const mainContent = document.getElementById('main-content');
        loader.style.display = 'block';
        mainContent.classList.remove('visible');

        fetchContent(page).then(html => {
            mainContent.innerHTML = html;
            loader.style.display = 'none';
            mainContent.classList.add('visible');
            initializePage(page);
            updateActiveNav(page);
        }).catch(err => {
            console.error('Error loading page:', err);
            mainContent.innerHTML = '<p>Sorry, something went wrong.</p>';
            loader.style.display = 'none';
            mainContent.classList.add('visible');
        });
    }

    function fetchContent(page) {
        return new Promise(resolve => {
            setTimeout(() => {
                switch (page) {
                    case 'home':
                        resolve(`
                            <div class="video-background">
                                <iframe src="https://player.vimeo.com/video/1015033668?autoplay=1&muted=1&loop=1&background=1" frameborder="0" allow="autoplay; fullscreen" title="Ravikanth Compositing Reel 2024"></iframe>
                                <div class="overlay"></div>
                                <div class="content">
                                    <h1>VFX Compositor</h1>
                                    <h2>Ravikanth Kachibhotla</h2>
                                </div>
                            </div>
                        `);
                        break;
                    case 'mywork':
                        resolve(`
                            <div class="work-gallery">
                                <div class="work-item">
                                    <iframe src="https://player.vimeo.com/video/1018839925?autoplay=1&muted=0&loop=1" frameborder="0" allow="autoplay; fullscreen" title="Shot 0080 Final Comp"></iframe>
                                    <div class="work-description">
                                        <h3>Shot 0080 Final Comp</h3>
                                        <p>Integrated complex VFX elements into live-action footage, enhancing the scene with dynamic lighting and particle effects.</p>
                                    </div>
                                </div>
                                <div class="work-item">
                                    <iframe src="https://player.vimeo.com/video/1018840035?autoplay=1&muted=0&loop=1" frameborder="0" allow="autoplay; fullscreen" title="Shot 0090 Final Comp"></iframe>
                                    <div class="work-description">
                                        <h3>Shot 0090 Final Comp</h3>
                                        <p>Created a seamless composite of CGI and live footage, focusing on atmospheric depth and color grading.</p>
                                    </div>
                                </div>
                                <div class="work-item">
                                    <iframe src="https://player.vimeo.com/video/1018843740?autoplay=1&muted=0&loop=1" frameborder="0" allow="autoplay; fullscreen" title="Shot 0100 Final Comp"></iframe>
                                    <div class="work-description">
                                        <h3>Shot 0100 Final Comp</h3>
                                        <p>Designed and executed a high-energy explosion sequence with meticulous attention to timing and realism.</p>
                                    </div>
                                </div>
                            </div>
                        `);
                        break;
                    case 'breakdowns':
                        resolve(`
                            <div class="breakdowns-container">
                                ${Array.from({ length: 6 }, (_, i) => `
                                    <div class="breakdown-item">
                                        <div class="slider-container" data-index="${i}">
                                            <img class="before" src="https://picsum.photos/800/450?random=${i * 2 + 1}" alt="Before VFX ${i + 1}">
                                            <img class="after" src="https://picsum.photos/800/450?random=${i * 2 + 2}" alt="After VFX ${i + 1}">
                                            <div class="slider-bar"></div>
                                            <button class="fullscreen-btn" aria-label="View in fullscreen">⤢</button>
                                        </div>
                                        <p>Breakdown ${i + 1}: Enhanced with VFX techniques.</p>
                                    </div>
                                `).join('')}
                            </div>
                        `);
                        break;
                    case 'portfolio':
                        resolve(`
                            <div class="portfolio-container">
                                ${Array.from({ length: 22 }, (_, i) => `
                                    <div class="portfolio-item" data-index="${i}">
                                        <img src="https://picsum.photos/800/450?random=${i + 1}" alt="Portfolio ${i + 1}" loading="lazy">
                                    </div>
                                `).join('')}
                            </div>
                        `);
                        break;
                    case 'about':
                        resolve(`
                            <div class="about-container">
                                <div class="about-profile">
                                    <img src="https://static.wixstatic.com/media/967fe0_b15d636debfc4d3fa5ccd91be5c9e92e~mv2.jpeg/v1/fill/w_223,h_223,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1674928531371%20(1).jpeg" alt="Ravikanth Kachibhotla" class="profile-picture">
                                    <h2>Ravikanth Kachibhotla</h2>
                                    <p>VFX Compositor | Calgary, AB</p>
                                    <div class="skills-grid">
                                        <div class="skill-item"><img src="https://cdn.worldvectorlogo.com/logos/nuke-1.svg" alt="NUKE" class="software-logo"><span>NUKE</span></div>
                                        <div class="skill-item"><img src="https://cdn.worldvectorlogo.com/logos/houdini.svg" alt="Houdini" class="software-logo"><span>Houdini</span></div>
                                        <div class="skill-item"><img src="https://cdn.worldvectorlogo.com/logos/autodesk-maya-1.svg" alt="Maya" class="software-logo"><span>Maya</span></div>
                                        <div class="skill-item"><img src="https://cdn.worldvectorlogo.com/logos/substance-painter.svg" alt="Substance Painter" class="software-logo"><span>Substance Painter</span></div>
                                        <div class="skill-item"><img src="https://cdn.worldvectorlogo.com/logos/adobe-premiere-pro-cc.svg" alt="Premiere Pro" class="software-logo"><span>Premiere Pro</span></div>
                                        <div class="skill-item"><img src="https://cdn.worldvectorlogo.com/logos/flow-1.svg" alt="Flow" class="software-logo"><span>Flow</span></div>
                                    </div>
                                    <a href="https://bebabf30-5d26-4c3c-8107-26fc3135ebc5.filesusr.com/ugd/967fe0_a80febd4fbe1444685159c1d8b76c9f3.pdf" download="RK_Resume.pdf" class="download-btn">Download Resume</a>
                                </div>
                                <div class="about-details">
                                    <h3>About Me</h3>
                                    <p>I’m a dedicated VFX Compositor with a passion for transforming raw footage into captivating visual stories. Based in Calgary, AB, I bring a blend of technical precision and creative flair to every project.</p>
                                    <h4>Experience</h4>
                                    <p>Since June 2022, I’ve been with Singandkaur Photography Studio as a Candid Videographer and Photographer, leading content creation with expertise in videography and lighting. From 2017 to 2019, I contributed to Verto Motion Pictures, designing graphics and capturing events while mentoring aspiring filmmakers.</p>
                                    <h4>Education</h4>
                                    <p>My Advanced Visual Effects Diploma from Bow Valley College (2022-2024) equipped me with hands-on compositing skills, while my B.Tech in Computer Science from Lovely Professional University (2015-2019) laid a strong technical foundation, including 3D game development.</p>
                                    <div class="testimonials-section">
                                        <h4>Testimonials</h4>
                                        <div id="testimonial-list"></div>
                                        <div class="testimonial-form">
                                            <h5>Leave a Review</h5>
                                            <form id="testimonial-form">
                                                <input type="text" name="name" placeholder="Your Name" required>
                                                <textarea name="comment" placeholder="Your Comment" required></textarea>
                                                <button type="submit">Submit</button>
                                            </form>
                                            <div id="testimonial-response"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);
                        break;
                    case 'contact':
                        resolve(`
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
                        `);
                        break;
                    default:
                        resolve('<p>Page not found.</p>');
                }
            }, 300);
        });
    }

    function initializePage(page) {
        switch (page) {
            case 'breakdowns': initializeBreakdowns(); break;
            case 'portfolio': initializePortfolio(); break;
            case 'about': initializeAbout(); break;
            case 'contact': initializeContact(); break;
            case 'mywork': initializeMyWork(); break;
        }
    }

    function updateActiveNav(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page && !link.classList.contains('logo-link')) link.classList.add('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            loadPage(link.getAttribute('data-page'));
        });
    });

    // Breakdowns
    function initializeBreakdowns() {
        document.querySelectorAll('.slider-container').forEach(container => {
            const before = container.querySelector('.before');
            const after = container.querySelector('.after');
            const bar = container.querySelector('.slider-bar');
            let isDragging = false;

            function updateSlider(e) {
                const rect = container.getBoundingClientRect();
                let x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
                x = Math.max(0, Math.min(x, rect.width));
                bar.style.left = `${x}px`;
                after.style.clipPath = `inset(0 ${rect.width - x}px 0 0)`;
            }

            container.addEventListener('mousedown', e => { isDragging = true; updateSlider(e); });
            document.addEventListener('mousemove', e => { if (isDragging) updateSlider(e); });
            document.addEventListener('mouseup', () => { isDragging = false; });
            container.addEventListener('touchstart', e => updateSlider(e), { passive: false });
            container.addEventListener('touchmove', e => updateSlider(e), { passive: false });

            updateSlider({ clientX: container.getBoundingClientRect().left + container.offsetWidth / 2 });

            container.querySelector('.fullscreen-btn').addEventListener('click', () => {
                openSliderModal(container.dataset.index);
            });
        });

        closeBtn[1].addEventListener('click', closeSliderModal);
        document.addEventListener('keydown', e => {
            if (sliderModal.classList.contains('active') && e.key === 'Escape') closeSliderModal();
        });
    }

    function openSliderModal(index) {
        const container = document.querySelectorAll('.slider-container')[index];
        sliderBefore.src = container.querySelector('.before').src;
        sliderAfter.src = container.querySelector('.after').src;
        sliderModal.classList.add('active');
        sliderModal.setAttribute('aria-hidden', 'false');
        initializeSliderModal();
        if (sliderModal.requestFullscreen) sliderModal.requestFullscreen();
    }

    function closeSliderModal() {
        if (document.fullscreenElement) document.exitFullscreen();
        sliderModal.classList.remove('active');
        sliderModal.setAttribute('aria-hidden', 'true');
        loadPage('breakdowns');
    }

    function initializeSliderModal() {
        let isDragging = false;

        function updateModalSlider(e) {
            const rect = sliderModal.querySelector('.slider-modal-content').getBoundingClientRect();
            let x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            sliderDivider.style.left = `${x}px`;
            sliderAfter.style.clipPath = `inset(0 ${rect.width - x}px 0 0)`;
        }

        sliderModal.addEventListener('mousedown', e => { isDragging = true; updateModalSlider(e); });
        document.addEventListener('mousemove', e => { if (isDragging) updateModalSlider(e); });
        document.addEventListener('mouseup', () => { isDragging = false; });
        sliderModal.addEventListener('touchstart', e => updateModalSlider(e), { passive: false });
        sliderModal.addEventListener('touchmove', e => updateModalSlider(e), { passive: false });

        updateModalSlider({ clientX: sliderModal.getBoundingClientRect().left + sliderModal.offsetWidth / 2 });
    }

    // Portfolio
    function initializePortfolio() {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => openImageModal(item.dataset.index));
        });

        closeBtn[0].addEventListener('click', closeImageModal);
        document.addEventListener('keydown', e => {
            if (imageModal.classList.contains('active') && e.key === 'Escape') closeImageModal();
        });
    }

    function openImageModal(index) {
        const img = document.querySelectorAll('.portfolio-item img')[index];
        modalImg.src = img.src;
        imageModal.classList.add('active');
        imageModal.setAttribute('aria-hidden', 'false');
        if (imageModal.requestFullscreen) imageModal.requestFullscreen();
    }

    function closeImageModal() {
        if (document.fullscreenElement) document.exitFullscreen();
        imageModal.classList.remove('active');
        imageModal.setAttribute('aria-hidden', 'true');
        loadPage('portfolio');
    }

    // About (with Testimonials)
    function initializeAbout() {
        const form = document.getElementById('testimonial-form');
        const response = document.getElementById('testimonial-response');
        const list = document.getElementById('testimonial-list');

        if (!db) {
            list.innerHTML = '<p>Testimonials unavailable (database not initialized).</p>';
            return;
        }

        function displayTestimonials() {
            db.collection('testimonials').orderBy('timestamp', 'desc').get().then(snapshot => {
                list.innerHTML = snapshot.docs.map(doc => `
                    <div class="testimonial">
                        <p>"${doc.data().comment}"</p>
                        <p>- ${doc.data().name}</p>
                    </div>
                `).join('');
            }).catch(err => {
                console.error('Error loading testimonials:', err);
                list.innerHTML = '<p>Failed to load testimonials.</p>';
            });
        }

        form.addEventListener('submit', e => {
            e.preventDefault();
            const name = form.name.value;
            const comment = form.comment.value;
            db.collection('testimonials').add({
                name,
                comment,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                response.textContent = 'Review submitted successfully!';
                form.reset();
                displayTestimonials();
                setTimeout(() => response.textContent = '', 3000);
            }).catch(err => {
                response.textContent = 'Error submitting review: ' + err.message;
            });
        });

        displayTestimonials();
    }

    // Contact
    function initializeContact() {
        const form = document.getElementById('contact-form');
        const response = document.getElementById('contact-response');

        form.addEventListener('submit', async e => {
            e.preventDefault();
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
                    setTimeout(() => response.textContent = '', 3000);
                } else {
                    response.textContent = 'Error sending message. Please try again.';
                }
            } catch (err) {
                response.textContent = 'Network error: ' + err.message;
            }
        });
    }

    // My Work
    function initializeMyWork() {
        // No additional JS needed; descriptions are static in HTML
    }

    // Load the home page immediately
    loadPage('home');
});
