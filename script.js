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

    btn.addEventListener("click", () => {
      // Close other FAQ items in the same tab
      const visibleSection = item.closest(".text");
      const visibleFaqs = visibleSection.querySelectorAll(".faq-item");

      visibleFaqs.forEach(i => {
        if (i !== item) {
          i.classList.remove("active");
          i.querySelector(".icon").textContent = "+";
        }
      });

      // Toggle current one
      item.classList.toggle("active");
      const icon = item.querySelector(".icon");
      icon.textContent = item.classList.contains("active") ? "X" : "+";
    });
  });
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

    btn.addEventListener("click", () => {
      // If this item is already open → close it
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      } else {
        // Close all others
        items.forEach(i => i.classList.remove("active"));
        // Open the clicked one
        item.classList.add("active");
      }
    });

    // First item open by default
    if (index === 0) item.classList.add("active");
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
      const toggleBtn = document.getElementById("videoToggle");

      if (!video || !toggleBtn) {
        console.error("Video or toggle button not found!");
        return;
      }

      toggleBtn.addEventListener("click", () => {
        console.log("Button clicked!");
        if (video.paused) {
          video.play();
          toggleBtn.src = "img/pause-icon.svg";
        } else {
          video.pause();
          toggleBtn.src = "img/pause-icon.svg";
        }
      });
    });


