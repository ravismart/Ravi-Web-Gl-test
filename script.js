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
                                    <img class="before" src="https://via.placeholder.com/800x450?text=Before+Image+1" alt="Before VFX 1">
                                    <img class="after" src="https://via.placeholder.com/800x450?text=After+Image+1" alt="After VFX 1">
                                    <div class="slider-divider"></div>
                                    <span class="maximize" aria-label="Maximize slider">⤢</span>
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 1</h2>
                                    <p>Raw scene vs. enhanced composite.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://via.placeholder.com/800x450?text=Before+Image+2" alt="Before VFX 2">
                                    <img class="after" src="https://via.placeholder.com/800x450?text=After+Image+2" alt="After VFX 2">
                                    <div class="slider-divider"></div>
                                    <span class="maximize" aria-label="Maximize slider">⤢</span>
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 2</h2>
                                    <p>Cityscape before and after effects.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://via.placeholder.com/800x450?text=Before+Image+3" alt="Before VFX 3">
                                    <img class="after" src="https://via.placeholder.com/800x450?text=After+Image+3" alt="After VFX 3">
                                    <div class="slider-divider"></div>
                                    <span class="maximize" aria-label="Maximize slider">⤢</span>
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 3</h2>
                                    <p>Nature scene with added elements.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://via.placeholder.com/800x450?text=Before+Image+4" alt="Before VFX 4">
                                    <img class="after" src="https://via.placeholder.com/800x450?text=After+Image+4" alt="After VFX 4">
                                    <div class="slider-divider"></div>
                                    <span class="maximize" aria-label="Maximize slider">⤢</span>
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 4</h2>
                                    <p>Urban shot with VFX overlay.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://via.placeholder.com/800x450?text=Before+Image+5" alt="Before VFX 5">
                                    <img class="after" src="https://via.placeholder.com/800x450?text=After+Image+5" alt="After VFX 5">
                                    <div class="slider-divider"></div>
                                    <span class="maximize" aria-label="Maximize slider">⤢</span>
                                </div>
                                <div class="slider-description">
                                    <h2>VFX Breakdown 5</h2>
                                    <p>Beach scene with digital enhancements.</p>
                                </div>

                                <div class="slider-container">
                                    <img class="before" src="https://via.placeholder.com/800x450?text=Before+Image+6" alt="Before VFX 6">
                                    <img class="after" src="https://via.placeholder.com/800x450?text=After+Image+6" alt="After VFX 6">
                                    <div class="slider-divider"></div>
                                    <span class="maximize" aria-label="Maximize slider">⤢</span>
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
                                <div class="portfolio-item">
                                    <img src="https://i.postimg.cc/xjFKQSK5/MG-0345.jpg" alt="VFX Project 1" data-description="Sci-Fi Composite" loading="lazy">
                                </div>
                                <div class="portfolio-item">
                                    <img src="https://i.postimg.cc/nc4BD9yR/Bird-Silhoutte-Photography-Ravikanth.jpg" alt="VFX Project 2" data-description="Fantasy Scene" loading="lazy">
                                </div>
                                <div class="portfolio-item">
                                    <img src="https://i.postimg.cc/sxFGB3wC/Glass-Botle-Photography-Ravikanth.jpg" alt="VFX Project 3" data-description="Explosion Effect" loading="lazy">
                                </div>
                                <div class="portfolio-item">
                                    <img src="https://via.placeholder.com/800x450?text=Portfolio+Image+4" alt="VFX Project 4" data-description="Space Battle" loading="lazy">
                                </div>
                                <div class="portfolio-item">
                                    <img src="https://via.placeholder.com/800x450?text=Portfolio+Image+5" alt="VFX Project 5" data-description="Nature VFX" loading="lazy">
                                </div>
                                <div class="portfolio-item">
                                    <img src="https://via.placeholder.com/800x450?text=Portfolio+Image+6" alt="VFX Project 6" data-description="Urban Composite" loading="lazy">
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
                            <div class="about-container">
                                <div class="about-profile">
                                    <img src="https://static.wixstatic.com/media/967fe0_b15d636debfc4d3fa5ccd91be5c9e92e~mv2.jpeg/v1/fill/w_223,h_223,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1674928531371%20(1).jpeg" alt="Ravikanth Kachibhotla" class="profile-picture">
                                    <h2>Ravikanth Kachibhotla</h2>
                                    <p>VFX Compositor</p>
                                </div>
                                <div class="about-background">
                                    <h3>Background</h3>
                                    <p class="typewriter">Passionate VFX Compositor with a keen eye for detail and a creative mindset. Currently at Singandkaur Photography Studio (Jun 2022 - Present) as a Candid Videographer/Photographer, mastering cinematic lighting techniques. Previously at Verto Motion Pictures (Apr 2017 - Sep 2019) as a Graphic Designer & Photographer, leading content creation. Advanced Visual Effects Diploma from CEA, Bow Valley College (May 2022 - Apr 2024), with hands-on cinematography experience. Bachelor of Technology in Computer Science and Engineering from Lovely Professional University (Aug 2015 - Sep 2019), showcasing 3D modeling and game development skills.</p>
                                </div>
                                <div class="about-skills">
                                    <h3>Skills</h3>
                                    <div class="skills-grid">
                                        <div class="skill-item"><i class="fas fa-film"></i><span>NUKE</span></div>
                                        <div class="skill-item"><i class="fas fa-video"></i><span>Houdini</span></div>
                                        <div class="skill-item"><i class="fas fa-cube"></i><span>Maya</span></div>
                                        <div class="skill-item"><i class="fas fa-paint-brush"></i><span>Substance Painter</span></div>
                                        <div class="skill-item"><i class="fas fa-cut"></i><span>Premiere Pro</span></div>
                                        <div class="skill-item"><i class="fas fa-tasks"></i><span>Flow Production Tracking</span></div>
                                        <div class="skill-item"><i class="fas fa-globe"></i><span>English</span></div>
                                        <div class="skill-item"><i class="fas fa-globe"></i><span>Telugu</span></div>
                                        <div class="skill-item"><i class="fas fa-globe"></i><span>Hindi</span></div>
                                    </div>
                                    <a href="https://bebabf30-5d26-4c3c-8107-26fc3135ebc5.filesusr.com/ugd/967fe0_a80febd4fbe1444685159c1d8b76c9f3.pdf" download="RK_Resume.pdf" class="download-resume-btn">Download Resume</a>
                                </div>
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
        const images = document.querySelectorAll('.portfolio-gallery img');
        images.forEach((img, index) => {
            img.addEventListener('click', () => openImageModal(index));
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
        loadPage('portfolio'); // Return directly to portfolio
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
        }, 500);
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
        loadPage('breakdowns'); // Return directly to breakdowns
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
        }, 500);
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
        let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [
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
            localStorage.setItem('testimonials', JSON.stringify(testimonials));
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
