// Bật/tắt chế độ tối
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode'); // Đổi class dark-mode cho body
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode')); // Lưu trạng thái vào localStorage

  // Đổi icon mặt trăng/thái dương
  const icon = document.querySelector('.bi-moon-fill, .bi-sun-fill');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('bi-moon-fill');
    icon.classList.add('bi-sun-fill');
  } else {
    icon.classList.remove('bi-sun-fill');
    icon.classList.add('bi-moon-fill');
  }
}

// Khi tải trang, kiểm tra trạng thái darkMode trong localStorage
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  const icon = document.querySelector('.bi-moon-fill');
  if (icon) {
    icon.classList.remove('bi-moon-fill');
    icon.classList.add('bi-sun-fill');
  }
}

// Khi cuộn trang, đổi màu navbar và hiển thị nút back to top
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
  document.querySelector('.back-to-top').classList.toggle('active', window.scrollY > 300);
});

// Mượt khi click vào liên kết có id
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Hàm tạo hiệu ứng tiến độ kỹ năng (thanh ngang)
const skillBars = document.querySelectorAll('.skill-progress');
function animateSkills() {
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0'; // reset về 0
    setTimeout(() => {
      bar.style.width = width; // chạy lại hiệu ứng width
    }, 100);
  });
}

// Hiển thị hiệu ứng khi phần tử được cuộn tới (Intersection Observer)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.id === 'skills') animateSkills(); // nếu đang quan sát phần skills thì animate
      entry.target.classList.add('fade-in'); // thêm hiệu ứng fade
    }
  });
}, { threshold: 0.1 });

// Gán observer cho mỗi section
document.querySelectorAll('section').forEach(section => observer.observe(section));

// Hiệu ứng gõ chữ
const nameElement = document.getElementById('animatedName');
const cursorElement = document.getElementById('typingCursor');
const name = "Nhu Trieu";
const colors = ['#ff6b6b', '#4ecdc4', '#45aaf2', '#a55eea', '#fd9644', '#26de81', '#fc5c65', '#778ca3', '#e84393', '#6ab04c', '#f9ca24', '#e056fd', '#30336b', '#95afc0'];
let isTyping = true, currentIndex = 0, currentColorIndex = 0;

// Hàm chạy hiệu ứng gõ và xóa tên
function typeEffect() {
  if (isTyping) {
    if (currentIndex < name.length) {
      nameElement.textContent = name.substring(0, currentIndex + 1);
      currentIndex++;
      setTimeout(typeEffect, 200);
    } else {
      isTyping = false;
      setTimeout(typeEffect, 1500); // đợi rồi bắt đầu xóa
    }
  } else {
    if (currentIndex > 0) {
      nameElement.textContent = name.substring(0, currentIndex - 1);
      currentIndex--;
      setTimeout(typeEffect, 100);
    } else {
      isTyping = true;
      changeColor(); // đổi màu khi gõ lại
      setTimeout(typeEffect, 500);
    }
  }
}

// Khi trang sẵn sàng, vẽ vòng tròn kỹ năng
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  circles.forEach(circle => {
    const progress = circle.querySelector(".progress");
    const percent = parseInt(circle.getAttribute("data-percent")); // lấy % từ HTML
    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    progress.setAttribute("stroke-dasharray", circumference); // tổng chiều dài đường tròn
    progress.setAttribute("stroke-dashoffset", circumference); // bắt đầu từ 0

    const offset = circumference - (percent / 100) * circumference; // phần hiển thị
    progress.setAttribute("stroke-dashoffset", offset);

    circle.querySelector(".circle-text").textContent = percent + "%";
  });
});

// Đổi màu accent và tên gõ mỗi lần lặp
function changeColor() {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  nameElement.style.color = colors[currentColorIndex];
  document.documentElement.style.setProperty('--accent', colors[currentColorIndex]);
}

// Bắt đầu hiệu ứng gõ chữ sau 1 giây
setTimeout(typeEffect, 1000);
