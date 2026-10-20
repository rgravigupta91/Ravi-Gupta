function initThemeToggle() {
    var btn  = document.getElementById('themeToggle');
    var icon = document.getElementById('themeIcon');
    if (!btn) return;

    function updateIcon() {
        var isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        icon.className = isDark ? 'bi bi-sun-fill fs-5' : 'bi bi-moon-stars-fill fs-5';
    }

    updateIcon();

    btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-bs-theme');
        var next    = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-bs-theme', next);
        localStorage.setItem('theme', next);
        updateIcon();
    });
}

function initCodeCopyButtons() {
    document.querySelectorAll('.code-block-copy').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var pre = btn.closest('.code-block').querySelector('pre');
            navigator.clipboard.writeText(pre.innerText).then(function() {
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(function() {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });
}

function initTermTooltips() {
    var tooltip = document.getElementById('term-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'term-tooltip';
        tooltip.className = 'term-tooltip';
        tooltip.innerHTML =
            '<div class="term-tooltip-title"></div>' +
            '<p class="term-tooltip-def"></p>' +
            '<a class="term-tooltip-link" href="#">Read more &rarr;</a>';
        document.body.appendChild(tooltip);
    }

    var hideTimer;
    var activeTerm = null;

    function show(el) {
        clearTimeout(hideTimer);
        tooltip.querySelector('.term-tooltip-title').textContent = el.getAttribute('data-title');
        tooltip.querySelector('.term-tooltip-def').textContent  = el.getAttribute('data-def');

        var link    = el.getAttribute('data-link') || '';
        var linkEl  = tooltip.querySelector('.term-tooltip-link');
        if (link) {
            linkEl.style.display = 'inline-block';
            linkEl.onclick = function(e) {
                e.preventDefault();
                hideNow();
                navigateByUrl(link);
            };
        } else {
            linkEl.style.display = 'none';
        }

        tooltip.classList.add('visible');
        position(el);
        activeTerm = el;
    }

    function position(el) {
        var rect = el.getBoundingClientRect();
        var gap  = 10;
        var tH   = tooltip.offsetHeight;
        var tW   = tooltip.offsetWidth;

        var top  = rect.bottom + gap;
        var left = rect.left;

        if (top + tH > window.innerHeight - 10) {
            top = rect.top - gap - tH;
        }
        if (left + tW > window.innerWidth - 10) {
            left = window.innerWidth - tW - 10;
        }
        if (left < 10) left = 10;

        tooltip.style.top  = top  + 'px';
        tooltip.style.left = left + 'px';
    }

    function hide()    { hideTimer = setTimeout(hideNow, 200); }
    function hideNow() { tooltip.classList.remove('visible'); activeTerm = null; }

    tooltip.addEventListener('mouseenter', function() { clearTimeout(hideTimer); });
    tooltip.addEventListener('mouseleave', hide);

    document.querySelectorAll('.term').forEach(function(el) {
        el.addEventListener('mouseenter', function() { show(el); });
        el.addEventListener('mouseleave',  hide);
        el.addEventListener('click', function(e) {
            e.stopPropagation();
            if (tooltip.classList.contains('visible') && activeTerm === el) {
                hideNow();
            } else {
                show(el);
            }
        });
    });

    document.addEventListener('click', hideNow);
}

var yearsOfExperience1 = 0;
function yearsOfExperience() {
    const startDate = new Date("2014-01-06");
    const today = new Date();
    let years = today.getFullYear() - startDate.getFullYear();
    const anniversaryThisYear = new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate());
    if (today < anniversaryThisYear) {
        years--;
    }
    yearsOfExperience2 = years;
    return yearsOfExperience2;
}