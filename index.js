/*=========================================================
                PART 1 - FOUNDATION
=========================================================*/
document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
                    DOM ELEMENTS
    =====================================================*/

    const navbar = document.querySelector("nav");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    /*=====================================================
                ACTIVE NAVIGATION
    =====================================================*/
    function updateActiveNav() {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;
            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }
    /*=====================================================
                    NAVBAR SHADOW
    =====================================================*/

    function navbarShadow() {
    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}


    /*=====================================================
                SCROLL PROGRESS BAR
    =====================================================*/

    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);
    function updateProgressBar() {
        const pageHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrollPercent =
            (window.scrollY / pageHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
    }
    /*=====================================================
                SCROLL TO TOP BUTTON
    =====================================================*/

    const scrollButton = document.createElement("button");
    scrollButton.className = "scroll-top";
    scrollButton.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(scrollButton);
    function toggleScrollButton() {
        if (window.scrollY > 500) {
            scrollButton.classList.add("show");
        } else {
            scrollButton.classList.remove("show");
        }
    }
    scrollButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
  /*=====================================================
                SCROLL REVEAL
    =====================================================*/

    const revealElements = document.querySelectorAll(
    "section, .project-card, .skill-box"
);
    function revealElementsOnScroll() {
        const trigger = window.innerHeight * 0.85;
        revealElements.forEach(element => {
            const top = element.getBoundingClientRect().top;
            if (top < trigger) {
                element.classList.add("show-section");
            }
        });
    }
    /*=====================================================
                WINDOW EVENTS
    =====================================================*/

    window.addEventListener("scroll", () => {
        updateActiveNav();
        navbarShadow();
        updateProgressBar();
        toggleScrollButton();
        revealElementsOnScroll();
    });



    /*=====================================================
                INITIAL LOAD
    =====================================================*/

    updateActiveNav();
    navbarShadow();
    updateProgressBar();
    toggleScrollButton();
    revealElementsOnScroll();
});
/*=========================================================
                PART 2 - INTERACTIONS
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
                    TYPEWRITER EFFECT
    =====================================================*/

    const roles = [
        "Data Scientist",
        "Machine Learning Engineer",
        "MIS Executive",
        "Data Analyst",
        "NLP Enthusiast",
        "Consultant"
    ];

    const typingElement = document.getElementById("typing-text");

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeWriter() {
        if (!typingElement) return;
        const currentRole = roles[roleIndex];
        if (!deleting) {
            typingElement.textContent =
                currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeWriter, 1500);
                return;
            }
        }
        else {
            typingElement.textContent =
                currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                roleIndex++;
                if (roleIndex >= roles.length) {
                    roleIndex = 0;
                }
            }
        }
        setTimeout(typeWriter, deleting ? 45 : 70);
    }
    typeWriter();
    /*=====================================================
                    MOBILE MENU
    =====================================================*/

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });

        });

    }
    /*=====================================================
                    PROJECT CARD TILT
    =====================================================*/

    const cards = document.querySelectorAll(".project-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((rect.height / 2 - y) / rect.height) * 10;
            const rotateY = ((x - rect.width / 2) / rect.width) * 10;
            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
        });

    });

/*==============================
CURSOR GLOW
==============================*/

const cursor = document.querySelector(".cursor-glow");
if(cursor){
    document.addEventListener("mousemove",(e)=>{
        cursor.style.left = e.clientX + "px";
        cursor.style.top  = e.clientY + "px";
    });
}
        /*==============================================
                CURSOR HOVER EFFECT
        ==============================================*/
        const hoverItems = document.querySelectorAll(
"a,button,.project-card,.resume-btn,.skill-box"
);
        hoverItems.forEach(item => {
    if(!cursor) return;
            item.addEventListener("mouseenter", () => {
                cursor.style.width = "170px";
                cursor.style.height = "170px";
                cursor.style.opacity = ".9";
            });

            item.addEventListener("mouseleave", () => {
                cursor.style.width = "120px";
                cursor.style.height = "120px";
                cursor.style.opacity = ".7";

            });

        });
        window.dispatchEvent(new Event("scroll"));
    })
    
    /*=========================================================
            EDUCATION ACCORDION
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const accordions = document.querySelectorAll("#education .accordion");

    accordions.forEach((accordion) => {

        const button = accordion.querySelector(".accordion-btn");
        const content = accordion.querySelector(".accordion-content");
        const icon = button.querySelector("i");

        button.addEventListener("click", () => {

            const isOpen = accordion.classList.contains("active");

            /* Close all accordions */

            accordions.forEach((item) => {

                item.classList.remove("active");

                item.querySelector(".accordion-content").style.maxHeight = null;

                item.querySelector(".accordion-btn i").style.transform =
                    "rotate(0deg)";

            });

            /* Open clicked accordion */

            if (!isOpen) {

                accordion.classList.add("active");

                content.style.maxHeight =
                    content.scrollHeight + "px";

                icon.style.transform =
                    "rotate(180deg)";

            }

        });

    });

});

