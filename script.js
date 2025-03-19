document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const loader = document.getElementById('loader');
    let currentIndex = 0;

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
        });
    }

    function fetchContent(page) {
        return new Promise(resolve => {
            setTimeout(() => {
                switch (page) {
                    case 'home':
                        resolve(`
                            <div class="video-background">
                                <iframe src="https://player.vimeo.com/video/1015033668?autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" title="Ravikanth Compositing Reel 2024"></iframe>
                                <div class="overlay"></div>
                                <div class="content">
                                    <h1>VFX Compositor</h1>
                                    <h2>Crafting Visual Stories</h2>
                                </div>
                            </div>
                        `);
                        break;
                    case 'mywork':
                        resolve(`
                            <div class="video-gallery">
                                <div class="video-box">
                                    <iframe src="https://player.vimeo.com/video/1018839925?autoplay=1&muted=0&loop=1&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" title="Shot 0080 Final Comp"></iframe>
                                </div>
                                <div class="video-box">
                                    <iframe src="https://player.vimeo.com/video/1018840035?autoplay=1&muted=0&loop=1&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" title="Shot 0080 Final Comp"></iframe>
                                </div>
                                <div class="video-box">
                                    <iframe src="https://player.vimeo.com/video/1018843740?autoplay=1&muted=0&loop=1&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" title="Shot 0080 Final Comp"></iframe>
                                </div>
                            </div>
                        `);
                        break;
                    case 'breakdowns':
                        resolve(`
                            <div class="breakdowns-container">
                                <div class="slider-container">
                                    <img class="before" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" alt="Before VFX 1">
                                    <img class="after" src="https://images.unsplash.com/photo-1600585154526-990dced4363a" alt="After VFX 1">
                                    <input type="range" min="0" max="100" value="50" class="slider">
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 1</h2>
                                    <p>Raw scene vs. enhanced composite.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" alt="Before VFX 2">
                                    <img class="after" src="https://images.unsplash.com/photo-1518837695005-208458ced5b6" alt="After VFX 2">
                                    <input type="range" min="0" max="100" value="50" class="slider">
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 2</h2>
                                    <p>Cityscape before and after effects.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://images.unsplash.com/photo-1472214103451-9374a3b6e3d8" alt="Before VFX 3">
                                    <img class="after" src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="After VFX 3">
                                    <input type="range" min="0" max="100" value="50" class="slider">
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 3</h2>
                                    <p>Nature scene with added elements.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b" alt="Before VFX 4">
                                    <img class="after" src="https://images.unsplash.com/photo-1538370965046-79c0d6907d47" alt="After VFX 4">
                                    <input type="range" min="0" max="100" value="50" class="slider">
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 4</h2>
                                    <p>Urban shot with VFX overlay.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" alt="Before VFX 5">
                                    <img class="after" src="https://images.unsplash.com/photo-1519750783828-1e2051123958" alt="After VFX 5">
                                    <input type="range" min="0" max="100" value="50" class="slider">
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 5</h2>
                                    <p>Beach scene with digital enhancements.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://images.unsplash.com/photo-1519125323398-675f398f6978" alt="Before VFX 6">
                                    <img class="after" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab" alt="After VFX 6">
                                    <input type="range" min="0" max="100" value="50" class="slider">
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 6</h2>
                                    <p>Abstract before and after.</p>
                                </div>
                            </div>
                        `);
                        break;
                    case 'portfolio':
                        resolve(`
                            <div class="portfolio-gallery">
                                <img src="https://i.postimg.cc/xjFKQSK5/MG-0345.jpg" alt="VFX Project 1" data-description="Sci-Fi Composite" loading="lazy">
                                <img src="https://i.postimg.cc/nc4BD9yR/Bird-Silhoutte-Photography-Ravikanth.jpg" alt="VFX Project 2" data-description="Fantasy Scene" loading="lazy">
                                <img src="https://i.postimg.cc/sxFGB3wC/Glass-Botle-Photography-Ravikanth.jpg" alt="VFX Project 3" data-description="Explosion Effect" loading="lazy">
                            </div>
                        `);
                        break;
                    case 'about':
                        resolve(`
                            <div class="about-me-content">
                                <img src="https://static.wixstatic.com/media/967fe0_b15d636debfc4d3fa5ccd91be5c9e92e~mv2.jpeg/v1/fill/w_223,h_223,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1674928531371%20(1).jpeg" alt="Profile Picture" class="profile-picture">
                                <h2>Driven VFX Compositor</h2>
                                <p>I’m a passionate VFX compositor skilled in After Effects, Nuke, and Blender, dedicated to crafting immersive visual narratives.</p>
                                <a href="https://bebabf30-5d26-4c3c-8107-26fc3135ebc5.filesusr.com/ugd/967fe0_a80febd4fbe1444685159c1d8b76c9f3.pdf" download="RK_Resume.pdf" class="download-resume-btn">Download Resume</a>
                            </div>
                        `);
                        break;
                    case 'contact':
                        resolve(`
                            <div class="contact-form">
                                <h2>Get in Touch</h2>
                                <form id="contactForm" action="https://formspree.io/f/mdknbwwq" method="POST">
                                    <input type="text" name="name" placeholder="Your Name" required>
                                    <input type="email" name="email" placeholder="Your Email" required>
                                    <input type="text" name="subject" placeholder="Subject" required>
                                    <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                                    <button type="submit">Send Message</button>
                                </form>
                                <div id="form-response" class="form-response"></div>
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
            case 'breakdowns':
                initializeSliders();
                break;
            case 'portfolio':
                initializePortfolio();
                break;
            case 'contact':
                initializeContact();
                break;
        }
    }

    function updateActiveNav(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page && !link.classList.contains('logo-link')) {
                link.classList.add('active');
            }
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });

    function initializeSliders() {
        document.querySelectorAll('.slider-container').forEach(container => {
            const afterImg = container.querySelector('.after');
            const slider = container.querySelector('.slider');

            slider.addEventListener('input', () => {
                afterImg.style.width = `${slider.value}%`;
            });
        });
    }

    function initializePortfolio() {
        const images = document.querySelectorAll('.portfolio-gallery img');
        images.forEach((img, index) => {
            img.addEventListener('click', () => openModal(img, index));
        });

        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', () => changeImage(-1));
        nextBtn.addEventListener('click', () => changeImage(1));
        fullscreenBtn.addEventListener('click', toggleFullscreen);

        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') changeImage(-1);
                else if (e.key === 'ArrowRight') changeImage(1);
                else if (e.key === 'Escape') closeModal();
            }
        });
    }

    function openModal(image, index) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        modalImg.src = image.src;
        captionText.textContent = image.getAttribute('data-description') || image.alt;
        currentIndex = index;
        updateNavButtons();
    }

    function closeModal() {
        modal.classList.remove('active', 'fullscreen');
        modalImg.classList.remove('scaling');
        modal.setAttribute('aria-hidden', 'true');
    }

    function changeImage(n) {
        const images = document.querySelectorAll('.portfolio-gallery img');
        currentIndex = (currentIndex + n + images.length) % images.length;
        const img = images[currentIndex];
        modalImg.src = img.src;
        captionText.textContent = img.getAttribute('data-description') || img.alt;
        updateNavButtons();
    }

    function updateNavButtons() {
        const images = document.querySelectorAll('.portfolio-gallery img');
        prevBtn.style.display = images.length > 1 ? 'block' : 'none';
        nextBtn.style.display = images.length > 1 ? 'block' : 'none';
    }

    function toggleFullscreen() {
        modal.classList.toggle('fullscreen');
        modalImg.classList.add('scaling');
        setTimeout(() => modalImg.classList.remove('scaling'), 300); // Match animation duration
    }

    function initializeContact() {
        const form = document.getElementById('contactForm');
        const responseDiv = document.getElementById('form-response');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, { method: 'POST', body: formData });
                responseDiv.innerHTML = response.ok
                    ? '<p>Message sent successfully!</p>'
                    : '<p>Error sending message. Please try again.</p>';
                if (response.ok) form.reset();
            } catch {
                responseDiv.innerHTML = '<p>Error sending message. Please try again.</p>';
            }
        });
    }

    loadPage('home');
});
