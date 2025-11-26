document.addEventListener("DOMContentLoaded", function () {
    const paragraph = document.querySelector(".hide-text");
    const btn = document.querySelector(".hide-text-btn");

    btn.addEventListener("click", function (e) {
        e.preventDefault();
        paragraph.classList.add("show-text");
        btn.style.display = "none";
    });
});



// For Counter
(function () {
  const duration = 2000; // total animation time (ms)
  const easing = t => (--t) * t * t + 1; // easeOutCubic easing

  function parseParts(text) {
    const match = text.match(/-?\d+(\.\d+)?/);
    if (!match) return { prefix: text, number: 0, suffix: '' };
    const numStr = match[0];
    const start = match.index;
    const end = start + numStr.length;
    return {
      prefix: text.slice(0, start),
      number: parseFloat(numStr),
      suffix: text.slice(end),
      raw: numStr
    };
  }


  function formatNumber(value, templateStr) {
    const decimalsMatch = templateStr.match(/\.(\d+)/);
    if (decimalsMatch) {
      return value.toFixed(decimalsMatch[1].length);
    }
    if (templateStr.indexOf('.') !== -1) {
      const decimals = templateStr.split('.')[1].length;
      return value.toFixed(decimals);
    }
    return Math.round(value).toString();
  }

  function animateValue(el, from, to, template, prefix, suffix, duration) {
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = easing(t);
      const current = from + (to - from) * eased;
      el.textContent = prefix + formatNumber(current, template) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + formatNumber(to, template) + suffix;
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(el => {
      const original = el.textContent.trim();
      const parts = parseParts(original);
      animateValue(el, 0, parts.number, parts.raw, parts.prefix, parts.suffix, duration);

      // Add fade-in animations
      el.classList.add('fadeInDownBig');
      const subtitle = el.closest('div')?.querySelector('.counter-sub');
      if (subtitle) subtitle.classList.add('fadeIn');
    });
  }

  document.addEventListener('DOMContentLoaded', initCounters);
})();


// FAQS accordian
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    // If already active (from HTML), set height
    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }

    btn.addEventListener("click", () => {
      const section = item.closest(".faq-section");
      const faqs = section.querySelectorAll(".faq-item");

      const isActive = item.classList.contains("active");

      // Close all first
      faqs.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".faq-answer").style.maxHeight = null;
        i.querySelector(".icon").textContent = "+";
      });

      // Open clicked
      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        item.querySelector(".icon").textContent = "X";
      }

      // If all closed → open first FAQ in this section
      const anyOpen = [...faqs].some(i => i.classList.contains("active"));
      if (!anyOpen) {
        openFirstFAQ(section);
      }
    });
  });

  // ✅ Call auto open for first visible tab
  document.querySelectorAll(".faq-section").forEach(section => {
    // Only if section is visible
    if (section.offsetParent !== null) {
      openFirstFAQ(section);
    }
  });

  // ✅ When tab changes, auto-open first FAQ in new tab
  const tabInputs = document.querySelectorAll('input[name="slider"]');

  tabInputs.forEach(tab => {
    tab.addEventListener("change", () => {
      setTimeout(() => {
        document.querySelectorAll(".faq-section").forEach(section => {
          if (section.offsetParent !== null) {
            openFirstFAQ(section);
          }
        });
      }, 50);
    });
  });
});

function openFirstFAQ(section) {
  const firstItem = section.querySelector(".faq-item");
  if (!firstItem) return;

  const answer = firstItem.querySelector(".faq-answer");
  const icon = firstItem.querySelector(".icon");

  // Close all
  section.querySelectorAll(".faq-item").forEach(i => {
    i.classList.remove("active");
    i.querySelector(".faq-answer").style.maxHeight = null;
    i.querySelector(".icon").textContent = "+";
  });

  // ✅ Open first item
  firstItem.classList.add("active");
  icon.textContent = "X";

  requestAnimationFrame(() => {
    answer.style.maxHeight = answer.scrollHeight + "px";
  });
}


// For Smooth Scroll on Menu Links Clicked
document.querySelectorAll('#navbarMenu .nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


// For Fade in Animation
document.addEventListener("DOMContentLoaded", () => {
  const fadeItems = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 0.2}s`;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  fadeItems.forEach(item => observer.observe(item));
});



//For Countdown

document.addEventListener("DOMContentLoaded", function() {
  const countdown = document.getElementById("countdown");
  const targetDateStr = countdown.getAttribute("data-target");
  const targetDate = new Date(targetDateStr).getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      countdown.innerHTML = "<h2>Event Started!</h2>";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  const timer = setInterval(updateCountdown, 1000);
  updateCountdown(); // initial call
});


//Timeline

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-item");

  items.forEach((item, index) => {
    const btn = item.querySelector(".toggle-btn");

    // Open first item on page load
    if (index === 0 || item.classList.contains("active")) {
      item.classList.add("active");
    }

    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all items
      items.forEach(i => i.classList.remove("active"));

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
      } else {
        // If clicked active → check if all closed → reopen first item
        const anyOpen = Array.from(items).some(i => i.classList.contains("active"));
        if (!anyOpen) items[0].classList.add("active");
      }
    });
  });
});


//Curve Text 
document.addEventListener("DOMContentLoaded", () => {
  const text = document.querySelector(".slogan textPath");
  text.setAttribute("startOffset", "50%"); // 👈 start centered

  // Scroll animation
  document.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const move = Math.sin(scrollY * 0.001) * 100; 
    text.setAttribute("startOffset", `${50 + move}%`);
  });
});


// Homepage video button

 document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bgVideo");
  const pauseBtn = document.getElementById("pauseBtn");
  const playBtn = document.getElementById("playBtn");

  if (!video || !pauseBtn || !playBtn) {
    console.error("Video or buttons not found!");
    return;
  }

  // Pause button clicked
  pauseBtn.addEventListener("click", () => {
    video.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
  });

  // Play button clicked
  playBtn.addEventListener("click", () => {
    video.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
  });
});


// Header 

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navbarMenu = document.getElementById("navbarMenu");

  menuToggle.addEventListener("click", function () {
    navbarMenu.classList.toggle("active");

    // Toggle icon (☰ ↔ ✖)
    if (navbarMenu.classList.contains("active")) {
      menuToggle.textContent = "✖";
    } else {
      menuToggle.textContent = "☰";
    }
  });

  // Optional: close menu when clicking a link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("active");
      menuToggle.textContent = "☰";
    });
  });
});

// FOOTER SVG DRAW
  
window.addEventListener('load', () => {
  const path = document.getElementById('myPath');

  // ensure no fill (in case inline svg or external CSS adds it)
  path.style.fill = 'none';

  // get exact length and set dash properties
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  // CSS animation via JS (so length is exact)
  path.style.transition = 'stroke-dashoffset 2.2s ease';

  // Trigger reflow and start animation
  requestAnimationFrame(() => {
    path.style.strokeDashoffset = '0';
  });
});



// <!-- For footer svg -->



document.addEventListener("DOMContentLoaded", () => {
  const footerSection = document.querySelector(".svg-footer");
  if (!footerSection) return;

  // Pause SVG initially
  const svgs = footerSection.querySelectorAll("svg");
  svgs.forEach(svg => svg.pauseAnimations());

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        svgs.forEach(svg => svg.unpauseAnimations());
        observer.unobserve(entry.target); // run once
      }
    });
  }, { threshold: 0.1 });

  observer.observe(footerSection);
});

//for Timeline smooth transiitons 
