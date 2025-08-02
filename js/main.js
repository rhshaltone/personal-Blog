// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. Responsive Nav Toggle
  const navLinks = document.querySelector(".nav-links");
  const menuBtn = document.createElement("button");
  menuBtn.innerHTML = "☰";
  menuBtn.style.fontSize = "2rem";
  menuBtn.style.background = "none";
  menuBtn.style.color = "white";
  menuBtn.style.border = "none";
  menuBtn.style.cursor = "pointer";

  navLinks.parentElement.insertBefore(menuBtn, navLinks);

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // 2. Live Clock
  function updateClock() {
    const clock = document.getElementById("live-clock");
    if (clock) {
      const now = new Date();
      clock.innerText = now.toLocaleTimeString();
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // 3. Contact Form Submit
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("✅ Thanks, your message has been received!");
      contactForm.reset();
    });
  }

  // 4. Comment Form Submit
  const commentForm = document.getElementById("commentForm");
  const commentList = document.getElementById("commentList");

  if (commentForm && commentList) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("commentName").value.trim();
      const text = document.getElementById("commentText").value.trim();

      if (name && text) {
        const newComment = document.createElement("p");
        newComment.innerHTML = `<strong>${name}:</strong> ${text}`;
        commentList.appendChild(newComment);
        commentForm.reset();
      }
    });
  }
});
