document.addEventListener("DOMContentLoaded", function() {
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const sliderModal = document.getElementById('slider-modal');
    const sliderBefore = document.querySelector('.slider-before');
    const sliderAfter = document.querySelector('.slider-after');
    const sliderDivider = document.querySelector('.slider-modal-content .slider-divider');
    const sliderCaption = document.getElementById('slider-caption');
    const closeBtn = document.querySelectorAll('.close');
    const prevBtn = document.querySelectorAll('.prev');
    const nextBtn = document.querySelectorAll('.next');
    const loader = document.getElementById('loader');
    let currentImageIndex = 0;
    let currentSliderIndex = 0;

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
                                    <div class="slider-divider"></div>
                                    <span class="maximize" aria-label="Maximize slider">⤢</span>
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 1</h2>
                                    <p>Raw scene vs. enhanced composite.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" alt="Before VFX 2">
                                    <img class="after" src="https://images.unsplash.com/photo-1518837695005-208458ced5b6" alt="After VFX 2">
                                    <div class="slider-divider"></div>
                                    <span class="maximize" aria-label="Maximize slider">⤢</span>
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 2</h2>
                                    <p>Cityscape before and after effects.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg" alt="Before VFX 3">
                                    <img class="after" src="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg" alt="After VFX 3">
                                    <div class="slider-divider"></div>
                                    <span class="maximize" aria-label="Maximize slider">⤢</span>
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 3</h2>
                                    <p>Nature scene with added elements.</p>
                                </div>
                            </div>
                        `);
                        break;
                    case 'portfolio':
                        resolve(`
                            <div class="portfolio-gallery">
                                <div class="portfolio-item">
                                    <img src="https://i.postimg.cc/xjFKQSK5/MG-0345.jpg" alt="VFX Project 1" data-description="Sci-Fi Composite" loading="lazy">
                                    <span class="maximize" aria-label="Maximize image">⤢</span>
                                </div>
                                <div class="portfolio-item">
                                    <img src="https://i.postimg.cc/nc4BD9yR/Bird-Silhoutte-Photography-Ravikanth.jpg" alt="VFX Project 2" data-description="Fantasy Scene" loading="lazy">
                                    <span class="maximize" aria-label="Maximize image">⤢</span>
                                </div>
                                <div class="portfolio-item">
                                    <img src="https://i.postimg.cc/sxFGB3wC/Glass-Botle-Photography-Ravikanth.jpg" alt="VFX Project 3" data-description="Explosion Effect" loading="lazy">
                                    <span class="maximize" aria-label="Maximize image">⤢</span>
                                </div>
                            </div>
                        `);
                        break;
                    case 'testimonials':
                        resolve(`
                            <div class="testimonials-container">
                                <h2>Testimonials</h2>
                                <div class="testimonial-list" id="testimonial-list">
                                    <!-- Testimonials will be populated here -->
                                </div>
                                <div class="testimonial-form">
                                    <h3>Leave a Review</h3>
                                    <form id="testimonialForm">
                                        <input type="text" name="name" placeholder="Your Name" required>
                                        <textarea name="comment" placeholder="Your Comment" rows="4" required></textarea>
                                        <button type="submit">Submit Review</button>
                                    </form>
                                    <div id="testimonial-response" class="form-response"></div>
                                </div>
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
                initializeSliderModal();
                break;
            case 'portfolio':
                initializePortfolio();
                break;
            case 'testimonials':
                initializeTestimonials();
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
            const beforeImg = container.querySelector('.before');
            const afterImg = container.querySelector('.after');
            const divider = container.querySelector('.slider-divider');
            let isDragging = false;

            function updateSlider(x) {
                const rect = container.getBoundingClientRect();
                let offsetX = x - rect.left;
                offsetX = Math.max(0, Math.min(offsetX, rect.width));
                divider.style.left = `${offsetX}px`;
                afterImg.style.clipPath = `inset(0 ${rect.width - offsetX}px 0 0)`;
            }

            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchstart', handleTouchStart);

            function handleMouseMove(e) {
                if (isDragging) updateSlider(e.pageX);
            }

            function handleMouseDown(e) {
                isDragging = true;
                updateSlider(e.pageX);
            }

            function handleMouseUp() {
                isDragging = false;
            }

            function handleTouchMove(e) {
                e.preventDefault();
                const touch = e.touches[0];
                updateSlider(touch.pageX);
            }

            function handleTouchStart(e) {
                const touch = e.touches[0];
                updateSlider(touch.pageX);
            }

            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mouseup', handleMouseUp);
            container.addEventListener('touchmove', handleTouchMove, { passive: false });
            container.addEventListener('touchstart', handleTouchStart, { passive: false });

            const rect = container.getBoundingClientRect();
            updateSlider(rect.left + rect.width / 2);
        });
    }

    function initializePortfolio() {
        const maximizeButtons = document.querySelectorAll('.portfolio-item .maximize');
        const images = document.querySelectorAll('.portfolio-gallery img');
        maximizeButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openImageModal(index);
            });
        });
        images.forEach((img, index) => {
            img.addEventListener('dblclick', () => openImageModal(index));
        });

        closeBtn[0].addEventListener('click', closeImageModal);
        prevBtn[0].addEventListener('click', () => changeImage(-1));
        nextBtn[0].addEventListener('click', () => changeImage(1));

        imageModal.addEventListener('click', (e) => {
            if (e.button === 0 && e.target === imageModal) changeImage(-1);
            if (e.button === 2) changeImage(1);
        });

        document.addEventListener('keydown', (e) => {
            if (imageModal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') changeImage(-1);
                else if (e.key === 'ArrowRight') changeImage(1);
                else if (e.key === 'Escape') closeImageModal();
            }
        });

        imageModal.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    function openImageModal(index) {
        const images = document.querySelectorAll('.portfolio-gallery img');
        imageModal.classList.add('active');
        imageModal.setAttribute('aria-hidden', 'false');
        modalImg.src = images[index].src;
        captionText.textContent = images[index].getAttribute('data-description') || images[index].alt;
        currentImageIndex = index;
        updateImageNavButtons();
        modalImg.classList.add('scaling');
        setTimeout(() => modalImg.classList.remove('scaling'), 300);
        
        if (imageModal.requestFullscreen) {
            imageModal.requestFullscreen();
        } else if (imageModal.webkitRequestFullscreen) {
            imageModal.webkitRequestFullscreen();
        } else if (imageModal.msRequestFullscreen) {
            imageModal.msRequestFullscreen();
        }
    }

    function closeImageModal() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        imageModal.classList.remove('active');
        modalImg.classList.remove('scaling', 'slide');
        imageModal.setAttribute('aria-hidden', 'true');
    }

    function changeImage(n) {
        const images = document.querySelectorAll('.portfolio-gallery img');
        currentImageIndex = (currentImageIndex + n + images.length) % images.length;
        const img = images[currentImageIndex];
        
        modalImg.classList.add('slide');
        modalImg.style.transform = n < 0 ? 'translateX(10px)' : 'translateX(-10px)';
        setTimeout(() => {
            modalImg.src = img.src;
            captionText.textContent = img.getAttribute('data-description') || img.alt;
            modalImg.classList.remove('slide');
            modalImg.style.transform = 'translateX(0)';
        }, 500); // Match animation duration
        updateImageNavButtons();
    }

    function updateImageNavButtons() {
        const images = document.querySelectorAll('.portfolio-gallery img');
        prevBtn[0].style.display = images.length > 1 ? 'block' : 'none';
        nextBtn[0].style.display = images.length > 1 ? 'block' : 'none';
    }

    function initializeSliderModal() {
        const maximizeButtons = document.querySelectorAll('.slider-container .maximize');
        maximizeButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openSliderModal(index);
            });
        });

        closeBtn[1].addEventListener('click', closeSliderModal);
        prevBtn[1].addEventListener('click', () => changeSlider(-1));
        nextBtn[1].addEventListener('click', () => changeSlider(1));

        sliderModal.addEventListener('click', (e) => {
            if (e.button === 0 && e.target === sliderModal) changeSlider(-1);
            if (e.button === 2) changeSlider(1);
        });

        document.addEventListener('keydown', (e) => {
            if (sliderModal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') changeSlider(-1);
                else if (e.key === 'ArrowRight') changeSlider(1);
                else if (e.key === 'Escape') closeSliderModal();
            }
        });

        sliderModal.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    function openSliderModal(index) {
        const sliders = document.querySelectorAll('.slider-container');
        const descriptions = document.querySelectorAll('.slider-description');
        currentSliderIndex = index;
        
        sliderBefore.src = sliders[index].querySelector('.before').src;
        sliderAfter.src = sliders[index].querySelector('.after').src;
        sliderCaption.innerHTML = descriptions[index].innerHTML;
        
        sliderModal.classList.add('active');
        sliderModal.setAttribute('aria-hidden', 'false');
        initializeSliderInModal();
        updateSliderNavButtons();

        if (sliderModal.requestFullscreen) {
            sliderModal.requestFullscreen();
        } else if (sliderModal.webkitRequestFullscreen) {
            sliderModal.webkitRequestFullscreen();
        } else if (sliderModal.msRequestFullscreen) {
            sliderModal.msRequestFullscreen();
        }
    }

    function closeSliderModal() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        sliderModal.classList.remove('active');
        sliderModal.setAttribute('aria-hidden', 'true');
    }

    function changeSlider(n) {
        const sliders = document.querySelectorAll('.slider-container');
        const descriptions = document.querySelectorAll('.slider-description');
        currentSliderIndex = (currentSliderIndex + n + sliders.length) % sliders.length;
        
        sliderBefore.classList.add('slide');
        sliderAfter.classList.add('slide');
        sliderBefore.style.transform = n < 0 ? 'translateX(10px)' : 'translateX(-10px)';
        sliderAfter.style.transform = n < 0 ? 'translateX(10px)' : 'translateX(-10px)';
        setTimeout(() => {
            sliderBefore.src = sliders[currentSliderIndex].querySelector('.before').src;
            sliderAfter.src = sliders[currentSliderIndex].querySelector('.after').src;
            sliderCaption.innerHTML = descriptions[currentSliderIndex].innerHTML;
            sliderBefore.classList.remove('slide');
            sliderAfter.classList.remove('slide');
            sliderBefore.style.transform = 'translateX(0)';
            sliderAfter.style.transform = 'translateX(0)';
            initializeSliderInModal();
        }, 500); // Match animation duration
        updateSliderNavButtons();
    }

    function updateSliderNavButtons() {
        const sliders = document.querySelectorAll('.slider-container');
        prevBtn[1].style.display = sliders.length > 1 ? 'block' : 'none';
        nextBtn[1].style.display = sliders.length > 1 ? 'block' : 'none';
    }

    function initializeSliderInModal() {
        let isDragging = false;

        function updateSlider(x) {
            const rect = sliderModal.querySelector('.slider-modal-content').getBoundingClientRect();
            let offsetX = x - rect.left;
            offsetX = Math.max(0, Math.min(offsetX, rect.width));
            sliderDivider.style.left = `${offsetX}px`;
            sliderAfter.style.clipPath = `inset(0 ${rect.width - offsetX}px 0 0)`;
        }

        sliderModal.removeEventListener('mousemove', handleMouseMove);
        sliderModal.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        sliderModal.removeEventListener('touchmove', handleTouchMove);
        sliderModal.removeEventListener('touchstart', handleTouchStart);

        function handleMouseMove(e) {
            if (isDragging) updateSlider(e.pageX);
        }

        function handleMouseDown(e) {
            isDragging = true;
            updateSlider(e.pageX);
        }

        function handleMouseUp() {
            isDragging = false;
        }

        function handleTouchMove(e) {
            e.preventDefault();
            const touch = e.touches[0];
            updateSlider(touch.pageX);
        }

        function handleTouchStart(e) {
            const touch = e.touches[0];
            updateSlider(touch.pageX);
        }

        sliderModal.addEventListener('mousemove', handleMouseMove);
        sliderModal.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        sliderModal.addEventListener('touchmove', handleTouchMove, { passive: false });
        sliderModal.addEventListener('touchstart', handleTouchStart, { passive: false });

        const rect = sliderModal.querySelector('.slider-modal-content').getBoundingClientRect();
        updateSlider(rect.left + rect.width / 2);
    }

    function initializeTestimonials() {
        const form = document.getElementById('testimonialForm');
        const responseDiv = document.getElementById('testimonial-response');
        const testimonialList = document.getElementById('testimonial-list');

        // Simulated testimonials (replace with backend in production)
        const testimonials = [
            { name: "John Doe", comment: "Ravikanth's work is outstanding! A true VFX master." },
            { name: "Jane Smith", comment: "Professional and creative. Highly recommend!" }
        ];

        function displayTestimonials() {
            testimonialList.innerHTML = testimonials.map(t => `
                <div class="testimonial">
                    <p>"${t.comment}"</p>
                    <p class="testimonial-name">- ${t.name}</p>
                </div>
            `).join('');
        }

        displayTestimonials();

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.name.value;
            const comment = form.comment.value;
            testimonials.push({ name, comment });
            displayTestimonials();
            responseDiv.innerHTML = '<p>Thank you for your review!</p>';
            form.reset();
            setTimeout(() => responseDiv.innerHTML = '', 3000);
        });
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
