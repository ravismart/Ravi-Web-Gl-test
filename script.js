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
        setTimeout(() => {
            mainContent.classList.add('visible');
            initializePage(page);
            updateActiveNav(page);
            console.log(`7. Page ${page} loaded successfully`);
        }, 100);
    }

    function fetchContent(page) {
        console.log(`8. Fetching content for: ${page}`);
        switch (page) {
            case 'home':
                return `
                    <div class="video-background">
                        <iframe src="https://player.vimeo.com/video/1015033668?autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" title="Ravikanth Compositing Reel 2024"></iframe>
                        <div class="overlay"></div>
                        <div class="content">
                            <h1>VFX Compositor</h1>
                            <h2>Ravikanth Kachibhotla</h2>
                        </div>
                    </div>
                `;
            case 'mywork':
                return `
                    <div class="video-gallery">
                        <div class="video-box">
                            <iframe src="https://player.vimeo.com/video/1018839925?autoplay=1&muted=0&loop=1&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" title="Shot 0080 Final Comp"></iframe>
                            <p>Integrated complex VFX elements into live-action footage.</p>
                        </div>
                        <div class="video-box">
                            <iframe src="https://player.vimeo.com/video/1018840035?autoplay=1&muted=0&loop=1&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" title="Shot 0090 Final Comp"></iframe>
                            <p>Created a seamless composite of CGI and live footage.</p>
                        </div>
                        <div class="video-box">
                            <iframe src="https://player.vimeo.com/video/1018843740?autoplay=1&muted=0&loop=1&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" title="Reel Excerpt"></iframe>
                            <p>Dynamic compositing showcase.</p>
                        </div>
                    </div>
                `;
            case 'breakdowns':
                return `
                    <div class="breakdowns-container">
                        <div class="slider-container" data-index="0">
                            <!-- Replace these with your images -->
                            <img class="before" src="https://picsum.photos/800/450?random=1" alt="Before VFX 1">
                            <img class="after" src="https://picsum.photos/800/450?random=2" alt="After VFX 1">
                            <div class="slider-divider"></div>
                            <span class="maximize" aria-label="Maximize slider">⤢</span>
                        </div>
                        <div class="slider-description"><p>Breakdown 1: Enhanced with VFX techniques.</p></div>
                        <div class="slider-container" data-index="1">
                            <!-- Replace these with your images -->
                            <img class="before" src="https://picsum.photos/800/450?random=3" alt="Before VFX 2">
                            <img class="after" src="https://picsum.photos/800/450?random=4" alt="After VFX 2">
                            <div class="slider-divider"></div>
                            <span class="maximize" aria-label="Maximize slider">⤢</span>
                        </div>
                        <div class="slider-description"><p>Breakdown 2: CGI integration.</p></div>
                        <div class="slider-container" data-index="2">
                            <!-- Replace these with your images -->
                            <img class="before" src="https://picsum.photos/800/450?random=5" alt="Before VFX 3">
                            <img class="after" src="https://picsum.photos/800/450?random=6" alt="After VFX 3">
                            <div class="slider-divider"></div>
                            <span class="maximize" aria-label="Maximize slider">⤢</span>
                        </div>
                        <div class="slider-description"><p>Breakdown 3: Lighting and compositing.</p></div>
                    </div>
                `;
            case 'portfolio':
                return `
                    <div class="portfolio-gallery">
                        <div class="portfolio-item" data-index="0">
                            <!-- Replace with your image -->
                            <img src="https://picsum.photos/800/450?random=1" alt="VFX Project 1" data-description="Project 1: Cinematic composite">
                        </div>
                        <div class="portfolio-item" data-index="1">
                            <!-- Replace with your image -->
                            <img src="https://picsum.photos/800/450?random=2" alt="VFX Project 2" data-description="Project 2: CGI integration">
                        </div>
                        <div class="portfolio-item" data-index="2">
                            <!-- Replace with your image -->
                            <img src="https://picsum.photos/800/450?random=3" alt="VFX Project 3" data-description="Project 3: Visual effects showcase">
                        </div>
                    </div>
                `;
            case 'about':
                return `
                    <div class="about-container">
                        <div class="about-parallax">
                            <div class="about-header">
                                <h1>About Me</h1>
                            </div>
                            <div class="about-content">
                                <div class="about-left">
                                    <img src="https://static.wixstatic.com/media/967fe0_b15d636debfc4d3fa5ccd91be5c9e92e~mv2.jpeg/v1/fill/w_223,h_223,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1674928531371%20(1).jpeg" alt="Ravikanth Kachibhotla" class="profile-picture">
                                    <h2>Ravikanth Kachibhotla</h2>
                                    <p>VFX Compositor & Creative Visionary</p>
                                    <div class="skills-grid">
                                        <div class="skill-item"><img src="https://simpleicons.org/icons/nuke.svg" alt="NUKE" class="software-logo"><span>NUKE</span></div>
                                        <div class="skill-item"><img src="https://simpleicons.org/icons/houdini.svg" alt="Houdini" class="software-logo"><span>Houdini</span></div>
                                        <div class="skill-item"><img src="https://simpleicons.org/icons/autodeskmaya.svg" alt="Maya" class="software-logo"><span>Maya</span></div>
                                        <div class="skill-item"><img src="https://simpleicons.org/icons/adobesubstance3dpainter.svg" alt="Substance Painter" class="software-logo"><span>Substance Painter</span></div>
                                        <div class="skill-item"><img src="https://simpleicons.org/icons/adobepremierepro.svg" alt="Premiere Pro" class="software-logo"><span>Premiere Pro</span></div>
                                        <div class="skill-item"><img src="https://simpleicons.org/icons/adobeaftereffects.svg" alt="After Effects" class="software-logo"><span>After Effects</span></div>
                                        <div class="skill-item"><img src="https://simpleicons.org/icons/shotgrid.svg" alt="ShotGrid" class="software-logo"><span>ShotGrid</span></div>
                                    </div>
                                </div>
                                <div class="about-right">
                                    <div class="bio-section">
                                        <h4>Profile</h4>
                                        <p>I’m Ravikanth Kachibhotla, a dedicated VFX Compositor based in Calgary, AB. With a passion for blending creativity and technology, I specialize in crafting seamless visual effects that elevate storytelling. My journey in visual arts is driven by a relentless pursuit of perfection and an eye for cinematic detail.</p>
                                    </div>
                                    <div class="bio-section">
                                        <h4>Professional Journey</h4>
                                        <div class="timeline">
                                            <div class="timeline-item">
                                                <h5>June 2022 - Present</h5>
                                                <p><strong>Candid Videographer & Photographer</strong> at Singandkaur Photography Studio. I’ve honed my skills in capturing raw, emotional moments and creating compelling visual content for clients across diverse projects.</p>
                                            </div>
                                            <div class="timeline-item">
                                                <h5>2017 - 2019</h5>
                                                <p><strong>Volunteer Lead Designer</strong> at Verto Motion Pictures. I spearheaded graphic design initiatives, mentored aspiring filmmakers, and contributed to short films that pushed creative boundaries.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bio-section">
                                        <h4>Education</h4>
                                        <p><strong>Advanced Visual Effects Diploma</strong>, Bow Valley College (2022-2024). Focused on compositing, 3D integration, and advanced VFX techniques.<br><strong>Bachelor of Technology in Computer Science</strong>, Lovely Professional University (2015-2019). Built a strong foundation in programming and digital systems.</p>
                                    </div>
                                    <div class="bio-section">
                                        <h4>My Approach</h4>
                                        <p>I believe every frame tells a story. My work blends technical precision with artistic intuition, ensuring every effect enhances the narrative. From matte painting to complex CGI integration, I thrive on transforming raw footage into cinematic magic.</p>
                                    </div>
                                    <a href="https://bebabf30-5d26-4c3c-8107-26fc3135ebc5.filesusr.com/ugd/967fe0_a80febd4fbe1444685159c1d8b76c9f3.pdf" download="RK_Resume.pdf" class="download-resume-btn">Download Resume</a>
                                </div>
                            </div>
                        </div>
                        <div class="testimonials-section">
                            <h3>Testimonials</h3>
                            <div id="testimonial-list" class="testimonial-list"></div>
                            <div class="testimonial-form-container">
                                <form id="testimonial-form">
                                    <input type="text" name="name" placeholder="Your Name" required>
                                    <textarea name="comment" placeholder="Your Comment" rows="4" required></textarea>
                                    <button type="submit">Submit Review</button>
                                </form>
                                <div id="testimonial-response" class="form-response"></div>
                            </div>
                        </div>
                    </div>
                `;
            case 'contact':
                return `
                    <div class="contact-container">
                        <div class="contact-form">
                            <h2>Get in Touch</h2>
                            <form id="contact-form">
                                <input type="text" name="name" placeholder="Your Name" required>
                                <input type="email" name="email" placeholder="Your Email" required>
                                <input type="text" name="subject" placeholder="Subject" required>
                                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                                <button type="submit">Send Message</button>
                            </form>
                            <div id="contact-response" class="form-response"></div>
                        </div>
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

        if (typeof firebase === 'undefined' || !firebase.firestore) {
            list.innerHTML = '<p>Testimonials unavailable (database not initialized).</p>';
            console.log("11. Firebase not available");
            return;
        }

        const db = firebase.firestore();
        db.collection('testimonials').orderBy('timestamp', 'desc').get()
            .then(snapshot => {
                list.innerHTML = snapshot.docs.map(doc => `
                    <div class="testimonial-card">
                        <p>"${doc.data().comment}"</p>
                        <p class="testimonial-name">- ${doc.data().name}</p>
                    </div>
                `).join('');
                console.log("12. Testimonials loaded successfully");
            })
            .catch(err => {
                console.error("12. Error loading testimonials:", err);
                list.innerHTML = '<p>Failed to load testimonials.</p>';
            });

        form.addEventListener('submit', e => {
            e.preventDefault();
            console.log("13. Submitting testimonial");
            const name = form.name.value;
            const comment = form.comment.value;
            db.collection('testimonials').add({
                name,
                comment,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
                    mode: 'no-cors',
                    headers: { 'Accept': 'application/json' }
                });
                response.textContent = 'Message sent successfully!';
                form.classList.add('submitted');
                setTimeout(() => {
                    form.reset();
                    form.classList.remove('submitted');
                }, 500);
                console.log("12. Contact form submitted successfully");
            } catch (err) {
                console.error("12. Network error in contact form:", err);
                response.textContent = 'Network error: Please try again later.';
            }
        });
    }

    function initializeBreakdowns() {
        console.log("10. Initializing Breakdowns page");
        const containers = document.querySelectorAll('.slider-container');
        containers.forEach((container, index) => {
            const beforeImg = container.querySelector('.before');
            const afterImg = container.querySelector('.after');
            const divider = container.querySelector('.slider-divider');

            function setupSlider(element) {
                let isDragging = false;

                function updateSlider(clientX) {
                    const rect = element.getBoundingClientRect();
                    let offsetX = clientX - rect.left;
                    offsetX = Math.max(0, Math.min(offsetX, rect.width));
                    divider.style.left = `${offsetX}px`;
                    afterImg.style.clipPath = `inset(0 ${rect.width - offsetX}px 0 0)`;
                }

                element.addEventListener('mousedown', e => {
                    isDragging = true;
                    updateSlider(e.clientX);
                });

                element.addEventListener('mousemove', e => {
                    if (isDragging) {
                        updateSlider(e.clientX);
                    }
                });

                document.addEventListener('mouseup', () => {
                    isDragging = false;
                });

                element.addEventListener('touchstart', e => {
                    const touch = e.touches[0];
                    updateSlider(touch.clientX);
                }, { passive: false });

                element.addEventListener('touchmove', e => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    updateSlider(touch.clientX);
                }, { passive: false });

                element.addEventListener('touchend', () => {
                    isDragging = false;
                }, { passive: false });

                const rect = element.getBoundingClientRect();
                updateSlider(rect.left + rect.width / 2);
            }

            setupSlider(container);

            container.querySelector('.maximize').addEventListener('click', e => {
                e.stopPropagation();
                console.log("11. Opening breakdown modal");
                openSliderModal(index, containers);
            });
        });
    }

    function initializePortfolio() {
        console.log("10. Initializing Portfolio page");
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                console.log("11. Opening portfolio modal");
                openPortfolioModal(index, items);
            });
        });
    }

    function openSliderModal(currentIndex, containers) {
        const total = containers.length;
        const updateModal = (index) => {
            const beforeSrc = containers[index].querySelector('.before').src;
            const afterSrc = containers[index].querySelector('.after').src;
            const desc = containers[index].nextElementSibling.querySelector('p').textContent;
            return `
                <div class="slider-modal-content" data-index="${index}">
                    <img class="slider-before" src="${beforeSrc}" alt="Before VFX">
                    <img class="slider-after" src="${afterSrc}" alt="After VFX">
                    <div class="slider-divider"></div>
                    <div class="slider-description"><p>${desc}</p></div>
                </div>
            `;
        };

        const modal = document.createElement('div');
        modal.classList.add('modal', 'slider-modal');
        modal.innerHTML = `
            <span class="close" aria-label="Close modal">×</span>
            ${updateModal(currentIndex)}
            <span class="prev" aria-label="Previous">❮</span>
            <span class="next" aria-label="Next">❯</span>
        `;
        document.body.appendChild(modal);

        const closeModal = () => {
            console.log("12. Closing modal");
            modal.remove();
        };

        modal.querySelector('.close').addEventListener('click', closeModal);
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });

        const sliderContent = modal.querySelector('.slider-modal-content');
        const beforeImg = sliderContent.querySelector('.slider-before');
        const afterImg = sliderContent.querySelector('.slider-after');
        const divider = sliderContent.querySelector('.slider-divider');

        function setupSlider(element) {
            let isDragging = false;

            function updateSlider(clientX) {
                const rect = element.getBoundingClientRect();
                let offsetX = clientX - rect.left;
                offsetX = Math.max(0, Math.min(offsetX, rect.width));
                divider.style.left = `${offsetX}px`;
                afterImg.style.clipPath = `inset(0 ${rect.width - offsetX}px 0 0)`;
            }

            element.addEventListener('mousedown', e => {
                isDragging = true;
                updateSlider(e.clientX);
            });

            element.addEventListener('mousemove', e => {
                if (isDragging) {
                    updateSlider(e.clientX);
                }
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });

            element.addEventListener('touchstart', e => {
                const touch = e.touches[0];
                updateSlider(touch.clientX);
            }, { passive: false });

            element.addEventListener('touchmove', e => {
                e.preventDefault();
                const touch = e.touches[0];
                updateSlider(touch.clientX);
            }, { passive: false });

            element.addEventListener('touchend', () => {
                isDragging = false;
            }, { passive: false });

            const rect = element.getBoundingClientRect();
            updateSlider(rect.left + rect.width / 2);
        }

        setupSlider(sliderContent);

        const prevBtn = modal.querySelector('.prev');
        const nextBtn = modal.querySelector('.next');
        prevBtn.style.display = total > 1 ? 'block' : 'none';
        nextBtn.style.display = total > 1 ? 'block' : 'none';

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                modal.querySelector('.slider-modal-content').innerHTML = updateModal(currentIndex).replace('<div class="slider-modal-content" data-index="' + currentIndex + '">', '').replace('</div>', '');
                setupSlider(modal.querySelector('.slider-modal-content'));
                prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
                nextBtn.style.display = currentIndex < total - 1 ? 'block' : 'none';
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < total - 1) {
                currentIndex++;
                modal.querySelector('.slider-modal-content').innerHTML = updateModal(currentIndex).replace('<div class="slider-modal-content" data-index="' + currentIndex + '">', '').replace('</div>', '');
                setupSlider(modal.querySelector('.slider-modal-content'));
                prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
                nextBtn.style.display = currentIndex < total - 1 ? 'block' : 'none';
            }
        });

        modal.classList.add('active');
    }

    function openPortfolioModal(currentIndex, items) {
        const total = items.length;
        const updateModal = (index) => {
            const imgSrc = items[index].querySelector('img').src;
            const desc = items[index].querySelector('img').getAttribute('data-description');
            return `
                <div class="modal-content-container">
                    <img class="modal-content" src="${imgSrc}" alt="Portfolio Image">
                    <div class="modal-description">${desc}</div>
                </div>
            `;
        };

        const modal = document.createElement('div');
        modal.classList.add('modal', 'image-modal');
        modal.innerHTML = `
            <span class="close" aria-label="Close modal">×</span>
            ${updateModal(currentIndex)}
            <span class="prev" aria-label="Previous">❮</span>
            <span class="next" aria-label="Next">❯</span>
        `;
        document.body.appendChild(modal);

        const closeModal = () => {
            console.log("12. Closing modal");
            modal.remove();
        };

        modal.querySelector('.close').addEventListener('click', closeModal);
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });

        const prevBtn = modal.querySelector('.prev');
        const nextBtn = modal.querySelector('.next');
        prevBtn.style.display = total > 1 ? 'block' : 'none';
        nextBtn.style.display = total > 1 ? 'block' : 'none';

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                modal.querySelector('.modal-content-container').innerHTML = updateModal(currentIndex);
                prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
                nextBtn.style.display = currentIndex < total - 1 ? 'block' : 'none';
            }
        });
        nextBtn.addEventListener('click', () => {
            if (currentIndex < total - 1) {
                currentIndex++;
                modal.querySelector('.modal-content-container').innerHTML = updateModal(currentIndex);
                prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
                nextBtn.style.display = currentIndex < total - 1 ? 'block' : 'none';
            }
        });

        document.addEventListener('keydown', e => {
            if (modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    currentIndex--;
                    modal.querySelector('.modal-content-container').innerHTML = updateModal(currentIndex);
                    prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
                    nextBtn.style.display = currentIndex < total - 1 ? 'block' : 'none';
                } else if (e.key === 'ArrowRight' && currentIndex < total - 1) {
                    currentIndex++;
                    modal.querySelector('.modal-content-container').innerHTML = updateModal(currentIndex);
                    prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
                    nextBtn.style.display = currentIndex < total - 1 ? 'block' : 'none';
                } else if (e.key === 'Escape') {
                    closeModal();
                }
            }
        });

        modal.classList.add('active');
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
