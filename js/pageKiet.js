
// Hiệu ứng gõ chữ động
  document.addEventListener('DOMContentLoaded', function() {
  const typingText = document.querySelector('.typing-text');
  const cursor = document.querySelector('.typing-cursor');
  const professions = [
    'Frontend Developer',
    'Web Designer',
    'Tech Lover',
    'Coding Newbie'
  ];
  
  let professionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function type() {
    const currentProfession = professions[professionIndex];
    
    // Hiển thị text
    typingText.textContent = isDeleting 
      ? currentProfession.substring(0, charIndex - 1)
      : currentProfession.substring(0, charIndex + 1);
    
    // Điều chỉnh index
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    // Logic chuyển đổi
    if (!isDeleting && charIndex === currentProfession.length) {
      isDeleting = true;
      typingSpeed = 1000; // Dừng trước khi xóa
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      professionIndex = (professionIndex + 1) % professions.length;
      typingSpeed = 500; // Dừng trước khi gõ tiếp
    } else {
      typingSpeed = isDeleting ? 50 : 150;
    }

    setTimeout(type, typingSpeed);
  }

  // Bắt đầu hiệu ứng
  setTimeout(type, 1000);
});
    
    // Tạo particles
    function createParticles() {
      const particlesEl = document.getElementById('particles');
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random kích thước và vị trí
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * window.innerWidth;
        const delay = Math.random() * 15;
        const alpha = Math.random() * 0.5 + 0.1;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.bottom = `-${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = alpha;
        
        // Random màu sắc
        const colors = ['#6C63FF', '#4D44DB', '#FF6584', '#2F2E41'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        
        particlesEl.appendChild(particle);
      }
    }
    
    // Hiệu ứng scroll
    function checkScroll() {
      const sections = document.querySelectorAll('section');
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight / 1.5;
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerPoint) {
          section.classList.add('show');
        }
      });
      
      // Thay đổi style navbar khi scroll
      const navbar = document.querySelector('.navbar-custom');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Highlight active nav link
    function highlightNavLink() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    // Khởi tạo
    window.addEventListener('DOMContentLoaded', () => {
      createParticles();
      type();
      checkScroll();
    });
    
    window.addEventListener('scroll', () => {
      checkScroll();
      highlightNavLink();
    });
  
// Dark Mode Toggle - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Kiểm tra localStorage hoặc system preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
    updateParticlesColor(true); // Cập nhật màu particles
  }

  // Bắt sự kiện toggle
  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      updateParticlesColor(true);
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      updateParticlesColor(false);
    }
  });

  // Hàm cập nhật màu particless
  function updateParticlesColor(isDark) {
    const particles = document.querySelectorAll('.particle');
    const colors = isDark 
      ? ['#7c4dff', '#5e35b1', '#ff6e6e', '#ffffff'] 
      : ['#6C63FF', '#4D44DB', '#FF6584', '#2F2E41'];
    
    particles.forEach(particle => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
    });
  }
});