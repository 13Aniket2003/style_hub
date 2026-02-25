/* static/main.js */

document.addEventListener('DOMContentLoaded', function () {

    // ==============================================
    // 1. SCROLL REVEAL ANIMATION (Intersection Observer)
    // ==============================================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ==============================================
    // 2. AJAX ADD TO CART
    // ==============================================

    document.querySelectorAll('.ajax-add-to-cart').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const url = this.getAttribute('href');
            this.style.opacity = '0.7';

            fetch(url, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
                .then(response => {
                    this.style.opacity = '1';

                    if (response.redirected) {
                        window.location.href = response.url;
                        return null;
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.status === 'success') {
                        document.querySelectorAll('.badge, .cart-badge')
                            .forEach(b => b.innerText = data.cart_count);
                        showToast(data.message);
                    }
                })
                .catch(() => {
                    this.style.opacity = '1';
                });
        });
    });

    function showToast(message) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast toast-success';
        toast.innerHTML = `
            <span>${message}</span>
            <span class="toast-close" style="margin-left:12px;cursor:pointer;">&times;</span>
        `;

        toast.querySelector('.toast-close').onclick = () => toast.remove();
        container.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    }

    // ==============================================
    // 3. THEME TOGGLE
    // ==============================================

    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) themeToggleBtn.innerText = '☀️';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerText = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerText = '☀️';
            }
        });
    }

    // ==============================================
    // 4. GLOBAL HELPERS
    // ==============================================

    window.togglePassword = function (fieldId, btn) {
        const input = document.getElementById(fieldId);
        if (!input) return;
        if (input.type === "password") {
            input.type = "text";
            btn.innerText = "🙈";
        } else {
            input.type = "password";
            btn.innerText = "👁️";
        }
    };

    window.toggleAuth = function (tabName) {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const btns = document.querySelectorAll('.tab-btn');

        btns.forEach(b => b.classList.remove('active'));

        if (tabName === 'login') {
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
            btns[0]?.classList.add('active');
        } else {
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
            btns[1]?.classList.add('active');
        }
    };

    // ==============================================
    // 5. PAGE TRANSITION (SAFE VERSION)
    // ==============================================

    // Enter animation
    document.body.classList.add('page-enter-active');
    setTimeout(() => {
        document.body.classList.remove('page-enter-active');
        document.body.style.opacity = '1';
    }, 550);

    // ❗ CRITICAL: NEVER interfere with form submit
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            document.body.classList.remove('page-exit-active');
        });
    });

    // Animate only SAFE links
    document.querySelectorAll(
        'a[href]:not([target="_blank"]):not([data-no-transition])'
    ).forEach(link => {
        link.addEventListener('click', function (e) {

            // Never touch form-related or auth links
            if (this.closest('form')) return;

            const href = this.getAttribute('href');
            if (!href ||
                href.startsWith('#') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                this.classList.contains('ajax-add-to-cart')
            ) return;

            e.preventDefault();
            document.body.classList.add('page-exit-active');

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });

});