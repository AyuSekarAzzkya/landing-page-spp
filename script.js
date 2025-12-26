const body = document.getElementById("mainBody");
const themeToggles = [
    document.getElementById("darkModeToggle"),
    document.getElementById("darkModeToggleMobile")
];

// Fungsi untuk memperbarui semua icon tema (Moon/Sun)
const updateIcons = (isDark) => {
    themeToggles.forEach(toggle => {
        if (!toggle) return;
        const icon = toggle.querySelector('i');
        if (isDark) {
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
        }
    });
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    updateIcons(true);
}

themeToggles.forEach(toggle => {
    if (!toggle) return;
    
    toggle.addEventListener("click", () => {
        // 1. Tambahkan animasi putar pada tombol yang diklik
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s";
            icon.style.transform = "rotate(360deg) scale(0)";
            icon.style.opacity = "0";
        }

        setTimeout(() => {
            body.classList.toggle("dark-mode");
            const isDark = body.classList.contains("dark-mode");
            
            updateIcons(isDark); 
            localStorage.setItem("theme", isDark ? "dark" : "light");

            if (icon) {
                icon.style.transform = "rotate(0deg) scale(1)";
                icon.style.opacity = "1";
            }
        }, 250); 
    });
});

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');

        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => mobileMenu.classList.add('show'), 10);
            menuBtn.querySelector('i').classList.replace('fa-bars', 'fa-times');
        } else {
            mobileMenu.classList.remove('show');
            setTimeout(() => mobileMenu.classList.add('hidden'), 300);
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
            mobileMenu.classList.add('hidden');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
}

window.onscroll = () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
};

AOS.init({
    once: true,
    duration: 1000,
    easing: "ease-out-cubic",
    disable: 'mobile'
});

window.addEventListener('load', () => {
    const loader = document.getElementById('preloader');
    loader.classList.add('opacity-0');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 700);
});

const glow = document.createElement("div");
glow.id = "cursor-glow";
document.body.appendChild(glow);

window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});