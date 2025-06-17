// Make the text move
var typed = new Typed(".text", {
  strings: ["Backend Developer", "Student", "Web Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// The shooting star effect only starts running when scrolling
// to the banner section, and turns off when exiting that area.
document.addEventListener("DOMContentLoaded", () => {
  const bannerSection = document.querySelector("#home");
  const stars = document.querySelectorAll(".shooting-star");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stars.forEach((star) => star.classList.add("active"));
        } else {
          stars.forEach((star) => star.classList.remove("active"));
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  if (bannerSection) {
    observer.observe(bannerSection);
  }
});
