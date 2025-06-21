// === LOADING SCREEN ===
// window.addEventListener("load", () => {
//   const loadingScreen = document.querySelector(".loading-screen")
//   if (loadingScreen) {
//     setTimeout(() => {
//       loadingScreen.classList.add("fade-out")
//       setTimeout(() => {
//         loadingScreen.style.display = "none"
//       }, 500)
//     }, 1000)
//   }
// })

// === PARTICLES BACKGROUND ===
function createParticles() {
  const particlesContainer = document.querySelector(".particles")
  if (!particlesContainer) return

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 6 + "s"
    particle.style.animationDuration = Math.random() * 3 + 3 + "s"
    particlesContainer.appendChild(particle)
  }
}

// === SCROLL ANIMATIONS ===
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target

      // Add animate class to trigger animations
      target.classList.add("animate")

      // Special handling for different sections
      if (target.id === "skills") {
        animateSkills()
        animateCircleSkills()
      }

      if (target.id === "projects") {
        animateProjects()
      }

      // Animate child elements with stagger effect
      const animateElements = target.querySelectorAll(".scroll-animate, .slide-left, .slide-right, .scale-in")
      animateElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("animate")
        }, index * 800)
      })
    }
  })
}, observerOptions)

// === SKILL ANIMATIONS ===
function animateSkills() {
  const skillItems = document.querySelectorAll(".skill-item")
  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate")
    }, index * 200)
  })

  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar, index) => {
  const targetWidth = bar.getAttribute("data-width") || "0"
   bar.style.width = "0%"
  setTimeout(() => {
  bar.style.width = targetWidth + "%"
}, index * 200 + 500)
})
}

function animateCircleSkills() {
  const circles = document.querySelectorAll(".circle")
  circles.forEach((circle, index) => {
    setTimeout(() => {
      const progress = circle.querySelector(".progress")
      const percent = Number.parseInt(circle.getAttribute("data-percent"))
      const radius = 50
      const circumference = 2 * Math.PI * radius

      progress.setAttribute("stroke-dasharray", circumference)
      progress.setAttribute("stroke-dashoffset", circumference)

      const offset = circumference - (percent / 100) * circumference
      progress.setAttribute("stroke-dashoffset", offset)

      // Animate counter
      const textElement = circle.querySelector(".circle-text")
      animateCounter(textElement, 0, percent, 2000)
    }, index * 300)
  })
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now()

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const current = Math.floor(start + (end - start) * progress)

    element.textContent = current + "%"

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }

  requestAnimationFrame(updateCounter)
}

// === PROJECT ANIMATIONS ===
function animateProjects() {
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("animate")
    }, index * 200)
  })
}

// === NAVBAR SCROLL EFFECT ===
let lastScrollTop = 0
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  const backToTop = document.querySelector(".back-to-top")
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Navbar background change
  navbar.classList.toggle("scrolled", scrollTop > 50)

  // Back to top button
  backToTop.classList.toggle("active", scrollTop > 300)

  // Parallax effect for hero section
  const heroImage = document.querySelector(".hero-image img")
  if (heroImage && scrollTop < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrollTop * 0.5}px)`
  }

  lastScrollTop = scrollTop
})

// === SMOOTH SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// === DARK MODE TOGGLE ===
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode")
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"))

  const icon = document.querySelector(".bi-moon-fill, .bi-sun-fill")
  if (document.body.classList.contains("dark-mode")) {
    icon.classList.remove("bi-moon-fill")
    icon.classList.add("bi-sun-fill")
  } else {
    icon.classList.remove("bi-sun-fill")
    icon.classList.add("bi-moon-fill")
  }
}

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode")
  const icon = document.querySelector(".bi-moon-fill")
  if (icon) {
    icon.classList.remove("bi-moon-fill")
    icon.classList.add("bi-sun-fill")
  }
}

// === TYPING EFFECT ===
const nameElement = document.getElementById("animatedName")
const cursorElement = document.getElementById("typingCursor")
const name = "Nhu Trieu"
const colors = [
  "#ff6b6b",
  "#4ecdc4",
  "#a55eea",
  "#fd9644",
  "#26de81",
  "#fc5c65",
  "#778ca3",
  "#e84393",
  "#6ab04c",
  "#f9ca24",
  "#e056fd",
  "#30336b",
  "#95afc0",
]
let isTyping = true,
  currentIndex = 0,
  currentColorIndex = 0

function typeEffect() {
  if (isTyping) {
    if (currentIndex < name.length) {
      nameElement.textContent = name.substring(0, currentIndex + 1)
      currentIndex++
      setTimeout(typeEffect, 200)
    } else {
      isTyping = false
      setTimeout(typeEffect, 1500)
    }
  } else {
    if (currentIndex > 0) {
      nameElement.textContent = name.substring(0, currentIndex - 1)
      currentIndex--
      setTimeout(typeEffect, 100)
    } else {
      isTyping = true
      changeColor()
      setTimeout(typeEffect, 500)
    }
  }
}

function changeColor() {
  currentColorIndex = (currentColorIndex + 1) % colors.length
  nameElement.style.color = colors[currentColorIndex]
  document.documentElement.style.setProperty("--accent", colors[currentColorIndex])
}

// === INITIALIZE EVERYTHING (GỘP DOMContentLoaded) ===
document.addEventListener("DOMContentLoaded", () => {
  // Scroll observer
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })
  document.querySelectorAll(".scroll-animate, .slide-left, .slide-right, .scale-in").forEach((el) => {
    observer.observe(el)
  })

  // Hiệu ứng hạt
  createParticles()

  // Hiệu ứng gõ tên
  setTimeout(typeEffect, 1000)

  // Thêm class scroll-animate cho hover-card
  document.querySelectorAll(".hover-card").forEach((card, index) => {
    card.classList.add("scroll-animate")
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Thêm class scale-in cho project-card
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.classList.add("scale-in")
    card.style.animationDelay = `${index * 0.2}s`
  })
})

// === PERFORMANCE OPTIMIZATION ===
let ticking = false
function updateAnimations() {
  ticking = false
}
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateAnimations)
    ticking = true
  }
})
