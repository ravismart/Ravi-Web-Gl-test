document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
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
                            <div class="slider-container">
                                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" alt="Before VFX" loading="lazy">
                                <div class="slider-overlay" style="background-image: url('https://images.unsplash.com/photo-1600585154526-990dced4363a');"></div>
                                <div class="slider-handle">|</div>
                            </div>
                            <div class="content-description">
                                <h2>VFX Breakdown</h2>
                                <p>Before and after of a compositing project.</p>
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
                initializeSlider();
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
            if (link.getAttribute('data-page') === page) {
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

    function initializeSlider() {
        const container = document.querySelector('.slider-container');
        const sliderHandle = container.querySelector('.slider-handle');
        const sliderOverlay = container.querySelector('.slider-overlay');

        function updateSlider(x) {
            const rect = container.getBoundingClientRect();
            x = Math.max(rect.left, Math.min(x, rect.right));
            const width = x - rect.left;
            sliderHandle.style.left = `${width}px`;
            sliderOverlay.style.width = `${width}px`;
        }

        function setInitialPosition() {
            const rect = container.getBoundingClientRect();
            updateSlider(rect.left + rect.width / 2);
        }

        setInitialPosition();

        sliderHandle.addEventListener('mousedown', () => {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        sliderHandle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            document.addEventListener('touchmove', onTouchMove);
            document.addEventListener('touchend', onTouchEnd);
        });

        function onMouseMove(e) {
            updateSlider(e.pageX);
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        function onTouchMove(e) {
            const touch = e.touches[0];
            updateSlider(touch.pageX);
        }

        function onTouchEnd() {
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        }
    }

    function initializePortfolio() {
        const images = document.querySelectorAll('.portfolio-gallery img');
        images.forEach((img, index) => {
            img.addEventListener('click', () => openModal(img, index));
        });

        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', () => changeImage(-1));
        nextBtn.addEventListener('click', () => changeImage(1));
        modalImg.addEventListener('dblclick', toggleFullscreen);

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
