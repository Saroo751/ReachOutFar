// Select elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const amountButtons = document.querySelectorAll('.amount-btn');
const customAmountInput = document.getElementById('customAmount');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Handle preset donation amount selection
amountButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove active class from all buttons
    amountButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    button.classList.add('active');

    // Update custom amount input to empty (clear it)
    customAmountInput.value = '';
  });
});

// Clear preset selection if user types in custom amount
customAmountInput.addEventListener('input', () => {
  amountButtons.forEach(btn => btn.classList.remove('active'));
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;
let testimonialTimer;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial =
    (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}

document
  .getElementById('nextTestimonial')
  .addEventListener('click', () => {
    nextTestimonial();
    resetTestimonialTimer();
  });

document
  .getElementById('prevTestimonial')
  .addEventListener('click', () => {
    prevTestimonial();
    resetTestimonialTimer();
  });

function resetTestimonialTimer() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(nextTestimonial, 5000); // 5s
}

// Initialize
showTestimonial(currentTestimonial);
testimonialTimer = setInterval(nextTestimonial, 5000);


document.addEventListener("DOMContentLoaded", function () {
  const presetButtons = document.querySelectorAll(".amount-btn");
  const donationForm = document.getElementById("donationForm");
  const customAmountInput = document.getElementById("customAmount");

  const telegramUsername = "https://t.me/ReachOutFar"; // change this

  // 🔔 Toast notification function
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#0b132b";
    toast.style.color = "#fff";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "6px";
    toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    toast.style.zIndex = 9999;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2000);
  }

  // 🔁 Get selected frequency
  function getFrequency() {
    const selected = document.querySelector('input[name="frequency"]:checked');
    return selected ? selected.value : "once";
  }

  // 📤 Telegram redirection with toast + localStorage
  function sendToTelegram(amount, frequency) {
    const message = `I would like to donate $${amount} (${frequency}). Please send me the steps.`;
    const telegramLink = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;

    // Save to localStorage
    localStorage.setItem("lastDonationAmount", amount);
    localStorage.setItem("lastDonationFrequency", frequency);

    // Show toast and redirect
    showToast("Redirecting to Telegram...");
    setTimeout(() => {
      window.open(telegramLink, "_blank");
    }, 1200); // Wait a bit for toast to show
  }

  // 🟦 Handle preset amount buttons
  presetButtons.forEach(button => {
    button.addEventListener("click", function () {
      const amount = this.textContent.replace(/\$/g, '');
      const frequency = getFrequency();
      sendToTelegram(amount, frequency);
    });
  });

  // 🟧 Handle form submit (custom amount)
  donationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = customAmountInput.value;
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    const frequency = getFrequency();
    sendToTelegram(amount, frequency);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector("#contact form");
  const nameInput = contactForm.querySelector('input[type="text"]');
  const emailInput = contactForm.querySelector('input[type="email"]');
  const messageInput = contactForm.querySelector("textarea");

  // Create the success/error message container
  const messageBox = document.createElement("div");
  messageBox.className = "form-message";
  contactForm.appendChild(messageBox);

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showMessage("Please fill in all fields.", false);
      return;
    }

    // Simulate successful send
    showMessage("Message successfully sent!", true);

    // Clear form
    contactForm.reset();
  });

  function showMessage(text, success = true) {
    messageBox.textContent = text;
    messageBox.style.backgroundColor = success ? "#28a745" : "#dc3545";
    messageBox.style.color = "#fff";
    messageBox.style.padding = "10px 15px";
    messageBox.style.marginTop = "15px";
    messageBox.style.borderRadius = "4px";
    messageBox.style.textAlign = "center";
    messageBox.style.transition = "opacity 0.5s ease";
    messageBox.style.opacity = "1";

    setTimeout(() => {
      messageBox.style.opacity = "0";
    }, 3000);
  }
});




const donationForm = document.getElementById('donationForm');
const donationPopup = document.getElementById('donationPopup');
const closePopupBtn = document.getElementById('closePopupBtn');

donationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // You can do any validation here if you want

  // Show popup
  donationPopup.style.display = 'flex';
});

closePopupBtn.addEventListener('click', () => {
  donationPopup.style.display = 'none';
});







document.addEventListener('DOMContentLoaded', () => {
  const donationForm = document.getElementById('donationForm');
  const presetBtns = document.querySelectorAll('.amount-btn');
  const customAmountInput = document.getElementById('customAmount');
  const thankYouMsg = document.getElementById('thankYouMsg');
  const submitBtn = donationForm.querySelector('button[type="submit"]');

  let selectedAmount = null;

  // When a preset amount button is clicked
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove selected class from all buttons
      presetBtns.forEach(b => b.classList.remove('selected'));

      // Add selected class to clicked button
      btn.classList.add('selected');

      // Set selectedAmount from button text (remove $)
      selectedAmount = btn.textContent.replace('$', '').trim();

      // Clear custom amount input
      customAmountInput.value = '';
    });
  });

  // When user types in custom amount input
  customAmountInput.addEventListener('input', () => {
    // Remove selected class from all preset buttons
    presetBtns.forEach(b => b.classList.remove('selected'));

    // Update selectedAmount to custom input value
    selectedAmount = customAmountInput.value.trim();
  });

  // On form submit
  donationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate selectedAmount is a positive number
    if (!selectedAmount || isNaN(selectedAmount) || Number(selectedAmount) <= 0) {
      alert('Please select or enter a valid donation amount.');
      return;
    }

    // Show thank you message
    thankYouMsg.style.display = 'block';

    // Disable submit button to avoid multiple clicks
    submitBtn.disabled = true;

    // After 2.5 seconds, redirect to Telegram URL with amount
    setTimeout(() => {
      const telegramUsername = "https://t.me/ReachOutFar"; // Replace this with your Telegram username
      const url = `https://t.me/${telegramUsername}?start=donation_${selectedAmount}`;
      window.location.href = url;
    }, 2500);
  });
});




// Initialize with some example values
let totalGoal = 10000; // $10,000 goal
let currentRaised = 3500; // example current amount raised

function updateProgressBar() {
  const progressBar = document.getElementById('progressBar');
  const donationRaised = document.getElementById('donationRaised');

  const percent = Math.min((currentRaised / totalGoal) * 100, 100);
  progressBar.style.width = percent + '%';

  donationRaised.textContent = `$${currentRaised.toLocaleString()}`;
}

// Call this once on page load
updateProgressBar();


// Animate counters when scrolled into view
const counters = document.querySelectorAll('.counter');

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  let count = 0;
  const increment = target / 200; // adjust speed here

  function update() {
    count += increment;
    if (count < target) {
      counter.textContent = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      counter.textContent = target.toLocaleString();
    }
  }
  update();
}

function checkCounters() {
  counters.forEach(counter => {
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight && !counter.classList.contains('started')) {
      animateCounter(counter);
      counter.classList.add('started');
    }
  });
}

window.addEventListener('scroll', checkCounters);
window.addEventListener('load', checkCounters);



const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMessage = document.getElementById('newsletterMessage');

newsletterForm.addEventListener('submit', e => {
  e.preventDefault();

  if (newsletterEmail.value.trim() === '') {
    newsletterMessage.textContent = 'Please enter a valid email address.';
    newsletterMessage.style.color = 'red';
    return;
  }

  // Simulate successful subscription
  newsletterMessage.textContent = 'Thank you for subscribing!';
  newsletterMessage.style.color = 'lightgreen';

  // Clear input
  newsletterEmail.value = '';
});



document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;

    // If already open, close it, else open it
    const isOpen = answer.classList.contains('open');

    // Close all answers first
    document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
      openAnswer.classList.remove('open');
    });

    // Toggle current if it was closed
    if (!isOpen) {
      answer.classList.add('open');
    }
  });
});


// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

// Show button after scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Scroll to top on click
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



// Initialize Swiper AFTER DOM is fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    const swiper = new Swiper('.swiper', {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 1500,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });




  


 
