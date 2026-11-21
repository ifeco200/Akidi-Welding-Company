/* =========================================================
   Akidi Welding & Fabrication Company Ltd.
   js/main.js
========================================================= */

(function () {
    "use strict";

    /* ---------- CONFIG: edit these ---------- */
    const CONFIG = {
        whatsappNumber: "2348032750691", // international format, no + or 0
        businessName: "Akidi Welding and Fabrication Company Ltd.",
        services: [
            "Welding Services",
            "Metal Fabrication",
            "Gates and Doors",
            "Steel Railings",
            "Other"
        ]
    };

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------- Inject the CSS this script needs ---------- */
    const style = document.createElement("style");
    style.textContent = `
        .site-header.is-scrolled { box-shadow: 0 6px 24px rgba(0,0,0,.30); }
        .site-nav a.active { color: #f59e0b; box-shadow: inset 0 -3px 0 #f59e0b; }

        .reveal { opacity: 0; transform: translateY(28px);
            transition: opacity .7s ease, transform .7s ease; }
        .reveal.is-visible { opacity: 1; transform: none; }

        .back-to-top, .whatsapp-float {
            position: fixed; right: 18px; z-index: 900; border: 0; border-radius: 50%;
            width: 50px; height: 50px; display: flex; align-items: center;
            justify-content: center; cursor: pointer; color: #fff;
            box-shadow: 0 8px 22px rgba(0,0,0,.28); text-decoration: none;
            transition: opacity .3s ease, transform .3s ease, background-color .2s ease;
        }
        .back-to-top { bottom: 82px; background: #1f3c88; font-size: 22px;
            opacity: 0; pointer-events: none; transform: translateY(12px); }
        .back-to-top.is-visible { opacity: 1; pointer-events: auto; transform: none; }
        .back-to-top:hover { background: #162d68; }
        .whatsapp-float { bottom: 20px; background: #25d366; }
        .whatsapp-float:hover { transform: scale(1.08); }
        .whatsapp-float svg { width: 28px; height: 28px; fill: #fff; }

        .whatsapp-button { display: inline-flex; align-items: center; gap: 10px;
            margin: 0 0 0 12px; padding: 14px 24px; background: #25d366; color: #fff;
            border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;
            box-shadow: 0 7px 18px rgba(37,211,102,.30); }
        .whatsapp-button:hover { background: #1ebe5b; transform: translateY(-2px); }
        .whatsapp-button svg { width: 22px; height: 22px; fill: #fff; }
        #contact > .whatsapp-button { margin: 0 auto 30px; }
        @media (max-width: 600px) {
            #home .whatsapp-button { margin: 14px 0 0; }
        }

        .lightbox-counter { position: fixed; top: 28px; left: 24px; color: #fff;
            font-size: 14px; font-weight: 700; letter-spacing: .5px; }
        .lightbox-image { transition: opacity .25s ease; }
        .lightbox-image.is-loading { opacity: .25; }

        .quote-form { width: min(100%, 550px); margin: 34px auto 0; text-align: left;
            display: grid; gap: 14px; }
        .quote-form h3 { margin: 0 0 4px; text-align: center; font-size: 21px; }
        .quote-form label { display: grid; gap: 6px; font-size: 15px; font-weight: 600; }
        .quote-form input, .quote-form select, .quote-form textarea {
            width: 100%; padding: 12px 14px; border-radius: 8px;
            border: 1px solid rgba(255,255,255,.35); background: rgba(255,255,255,.95);
            color: #1f2937; font: inherit; }
        .quote-form textarea { min-height: 110px; resize: vertical; }
        .quote-form button { padding: 14px 20px; border: 0; border-radius: 8px;
            background: #f59e0b; color: #0f172a; font-weight: 800; font-size: 16px;
            cursor: pointer; transition: transform .2s ease, background-color .2s ease; }
        .quote-form button:hover { background: #fbbf24; transform: translateY(-2px); }
        .form-error { color: #fecaca; font-size: 14px; min-height: 18px; margin: 0; }

        @media (prefers-reduced-motion: reduce) {
            .reveal { opacity: 1; transform: none; transition: none; }
        }
    `;
    document.head.appendChild(style);


    /* =====================================================
       1. HEADER SHADOW ON SCROLL + BACK-TO-TOP
    ===================================================== */
    const header = document.querySelector(".site-header");

    const backToTop = document.createElement("button");
    backToTop.type = "button";
    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.innerHTML = "&#8593;";
    document.body.appendChild(backToTop);

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });

    let scrollTicking = false;
    function onScroll() {
        if (scrollTicking) return;
        scrollTicking = true;
        window.requestAnimationFrame(() => {
            const y = window.scrollY;
            if (header) header.classList.toggle("is-scrolled", y > 10);
            backToTop.classList.toggle("is-visible", y > 600);
            scrollTicking = false;
        });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();


    /* =====================================================
       2. ACTIVE NAV LINK (highlights the section in view)
    ===================================================== */
    const navLinks = Array.from(document.querySelectorAll(".site-nav a:not(.nav-cta):not(.brand)"));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach((link) => {
                        const active =
                            link.getAttribute("href") === "#" + entry.target.id;
                        link.classList.toggle("active", active);
                        if (active) {
                            link.setAttribute("aria-current", "page");
                            link.scrollIntoView({
                                inline: "center",
                                block: "nearest"
                            });
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        sections.forEach((section) => navObserver.observe(section));
    }


    /* =====================================================
       3. SCROLL REVEAL ANIMATIONS
    ===================================================== */
    const revealTargets = document.querySelectorAll(
        ".section-title, .section-intro, .service-card, .project-item, " +
        "#about p, .contact-details, .hero-image, .why-card, .step-card, " +
        ".faq-item, .map-wrap, .area-chips"
    );

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealTargets.forEach((el, i) => {
            el.classList.add("reveal");
            el.style.transitionDelay = (i % 3) * 90 + "ms";
            revealObserver.observe(el);
        });
    }


    /* =====================================================
       4. IMAGE LIGHTBOX
    ===================================================== */
    const projectButtons = Array.from(
        document.querySelectorAll(".project-button")
    );
    // buttons currently shown in the gallery (changes when a filter is used)
    let list = projectButtons.slice();

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeButton = document.getElementById("lightbox-close");
    const previousButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    if (lightbox && list.length) {
        const counter = document.createElement("div");
        counter.className = "lightbox-counter";
        counter.setAttribute("aria-live", "polite");
        lightbox.appendChild(counter);

        let currentIndex = 0;
        let lastFocused = null;

        function preload(index) {
            const i = (index + list.length) % list.length;
            const img = new Image();
            img.src = list[i].dataset.image;
        }

        function showImage(index) {
            currentIndex =
                (index + list.length) % list.length;

            const button = list[currentIndex];
            const src = button.dataset.image;
            const alt = button.dataset.alt || "";

            lightboxImage.classList.add("is-loading");
            lightboxImage.onload = () =>
                lightboxImage.classList.remove("is-loading");
            lightboxImage.onerror = () =>
                lightboxImage.classList.remove("is-loading");

            lightboxImage.src = src;
            lightboxImage.alt = alt;
            lightboxCaption.textContent = alt;
            counter.textContent =
                currentIndex + 1 + " / " + list.length;

            preload(currentIndex + 1);
            preload(currentIndex - 1);
        }

        function openLightbox(index) {
            lastFocused = document.activeElement;
            showImage(index);
            lightbox.classList.add("is-open");
            document.body.style.overflow = "hidden";
            closeButton.focus();
        }

        function closeLightbox() {
            lightbox.classList.remove("is-open");
            document.body.style.overflow = "";
            lightboxImage.removeAttribute("src");
            lightboxCaption.textContent = "";
            counter.textContent = "";
            if (lastFocused) lastFocused.focus();
        }

        const showPrevious = () => showImage(currentIndex - 1);
        const showNext = () => showImage(currentIndex + 1);

        projectButtons.forEach((button) => {
            button.addEventListener("click", () =>
                openLightbox(list.indexOf(button))
            );
        });

        closeButton.addEventListener("click", closeLightbox);
        previousButton.addEventListener("click", showPrevious);
        nextButton.addEventListener("click", showNext);

        lightbox.addEventListener("click", (event) => {
            if (
                event.target === lightbox ||
                event.target.classList.contains("lightbox-content")
            ) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (!lightbox.classList.contains("is-open")) return;

            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") showPrevious();
            if (event.key === "ArrowRight") showNext();

            if (event.key === "Tab") {
                const focusable = [closeButton, previousButton, nextButton];
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });

        // swipe support for phones
        let touchStartX = 0;
        lightbox.addEventListener(
            "touchstart",
            (e) => { touchStartX = e.changedTouches[0].clientX; },
            { passive: true }
        );
        lightbox.addEventListener(
            "touchend",
            (e) => {
                const diff = e.changedTouches[0].clientX - touchStartX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? showPrevious() : showNext();
                }
            },
            { passive: true }
        );
    }


    /* =====================================================
       4b. GALLERY FILTER (All / Doors / Gates)
    ===================================================== */
    const gallery = document.querySelector(".project-gallery");

    if (gallery && projectButtons.length) {
        const labels = { door: "Doors", gate: "Gates", rail: "Railings" };

        const categoryOf = (button) => {
            const file = (button.dataset.image || "").toLowerCase();
            const key = Object.keys(labels).find((k) => file.startsWith(k));
            return key || "other";
        };

        const found = [];
        projectButtons.forEach((button) => {
            const cat = categoryOf(button);
            button.closest(".project-item").dataset.category = cat;
            if (labels[cat] && !found.includes(cat)) found.push(cat);
        });

        if (found.length > 1) {
            const bar = document.createElement("div");
            bar.className = "gallery-filters";
            bar.setAttribute("role", "group");
            bar.setAttribute("aria-label", "Filter projects");

            const makeBtn = (value, text) => {
                const b = document.createElement("button");
                b.type = "button";
                b.className = "filter-btn" + (value === "all" ? " is-active" : "");
                b.dataset.filter = value;
                b.textContent = text;
                return b;
            };

            bar.appendChild(makeBtn("all", "All"));
            found.forEach((cat) => bar.appendChild(makeBtn(cat, labels[cat])));
            gallery.insertAdjacentElement("beforebegin", bar);

            bar.addEventListener("click", (event) => {
                const btn = event.target.closest(".filter-btn");
                if (!btn) return;

                const value = btn.dataset.filter;
                bar.querySelectorAll(".filter-btn").forEach((b) =>
                    b.classList.toggle("is-active", b === btn)
                );

                gallery.querySelectorAll(".project-item").forEach((item) => {
                    const show = value === "all" || item.dataset.category === value;
                    item.hidden = !show;
                    if (show) item.classList.add("is-visible");
                });

                list = projectButtons.filter((b) => !b.closest(".project-item").hidden);
            });
        }
    }


    /* =====================================================
       5. WHATSAPP BUTTONS
    ===================================================== */
    const whatsappLink = document.createElement("a");
    whatsappLink.className = "whatsapp-float";
    whatsappLink.href =
        "https://wa.me/" + CONFIG.whatsappNumber +
        "?text=" + encodeURIComponent(
            "Hello " + CONFIG.businessName + ", I would like to make an enquiry."
        );
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    whatsappLink.setAttribute("aria-label", "Chat with us on WhatsApp");
    whatsappLink.innerHTML =
        '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.18 1.6 6L4 29l8.1-1.56a12 12 0 0 0 3.94.66C22.68 28.1 28 22.7 28 16.06 28 9.4 22.68 3 16.04 3zm0 21.9c-1.2 0-2.38-.32-3.4-.93l-.5-.3-4.8.92.94-4.68-.33-.52a9.9 9.9 0 0 1-1.52-5.35c0-5.5 4.48-9.98 9.99-9.98 5.5 0 9.96 4.48 9.96 9.98s-4.46 9.86-9.34 9.86zm5.5-7.5c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.5.7.3 1.26.5 1.7.62.72.23 1.37.2 1.88.12.58-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35z"/></svg>';
    document.body.appendChild(whatsappLink);

    // "Chat on WhatsApp" buttons in the hero and contact sections
    function makeWhatsappButton() {
        const a = document.createElement("a");
        a.className = "whatsapp-button";
        a.href = whatsappLink.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerHTML = whatsappLink.innerHTML + "<span>Chat on WhatsApp</span>";
        return a;
    }

    const heroActions = document.querySelector(".hero-actions");
    if (heroActions) {
        heroActions.appendChild(makeWhatsappButton());
    }

    const contactIntro = document.querySelector("#contact > p");
    if (contactIntro) {
        contactIntro.insertAdjacentElement("afterend", makeWhatsappButton());
    }


    /* =====================================================
       6. "REQUEST A QUOTE" FORM  (sends to WhatsApp)
    ===================================================== */
    const contactSection = document.getElementById("contact");
    const contactDetails = document.querySelector(".contact-details");

    if (contactSection && contactDetails) {
        const form = document.createElement("form");
        form.className = "quote-form";
        form.noValidate = true;
        form.innerHTML = `
            <h3>Request a Free Quote</h3>
            <label>Your name
                <input type="text" name="name" autocomplete="name" required>
            </label>
            <label>Phone number
                <input type="tel" name="phone" autocomplete="tel"
                       inputmode="tel" required>
            </label>
            <label>Service needed
                <select name="service" required>
                    <option value="">Select a service</option>
                    ${CONFIG.services
                        .map((s) => `<option value="${s}">${s}</option>`)
                        .join("")}
                </select>
            </label>
            <label>Project details
                <textarea name="message"
                    placeholder="Size, design, location, timeline..."></textarea>
            </label>
            <p class="form-error" role="alert"></p>
            <button type="submit">Send on WhatsApp</button>
        `;
        contactDetails.insertAdjacentElement("afterend", form);

        const errorBox = form.querySelector(".form-error");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            errorBox.textContent = "";

            const data = new FormData(form);
            const name = (data.get("name") || "").toString().trim();
            const phone = (data.get("phone") || "").toString().trim();
            const service = (data.get("service") || "").toString();
            const message = (data.get("message") || "").toString().trim();

            if (name.length < 2) {
                errorBox.textContent = "Please enter your name.";
                form.name.focus();
                return;
            }
            if (!/^[+\d][\d\s-]{7,16}$/.test(phone)) {
                errorBox.textContent = "Please enter a valid phone number.";
                form.phone.focus();
                return;
            }
            if (!service) {
                errorBox.textContent = "Please choose a service.";
                form.service.focus();
                return;
            }

            const text =
                "Hello " + CONFIG.businessName + ",\n\n" +
                "Name: " + name + "\n" +
                "Phone: " + phone + "\n" +
                "Service: " + service + "\n" +
                (message ? "Details: " + message + "\n" : "") +
                "\nI would like a quote.";

            window.open(
                "https://wa.me/" + CONFIG.whatsappNumber +
                "?text=" + encodeURIComponent(text),
                "_blank",
                "noopener"
            );
            form.reset();
        });
    }


    /* =====================================================
       7. SMALL POLISH
    ===================================================== */

    // Always-current copyright year
    const footerText = document.querySelector(".footer-copy");
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace(
            /©\s*\d{4}|&copy;\s*\d{4}/,
            "&copy; " + new Date().getFullYear()
        );
    }

    // Hide broken images instead of showing a broken icon
    document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("error", () => {
            img.style.visibility = "hidden";
        }, { once: true });
    });

    // Format phone numbers nicely (keeps the tel: link working)
    document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
        const digits = link.textContent.replace(/\D/g, "");
        if (digits.length === 11 && link.textContent.trim() === digits) {
            link.textContent =
                digits.slice(0, 4) + " " +
                digits.slice(4, 7) + " " +
                digits.slice(7);
        }
    });

})();