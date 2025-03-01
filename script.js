let currentSlide = 0;

const slides = document.querySelectorAll(".slide");

function nextSlide() {
  slides[currentSlide].classList.remove("active");

  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.add("active");
}

function restart() {
  slides[currentSlide].classList.remove("active");

  currentSlide = 0;

  slides[currentSlide].classList.add("active");
}

document
  .getElementById("imageUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = document.createElement("img");

        img.src = e.target.result;

        const preview = document.getElementById("imagePreview");

        preview.innerHTML = "";

        preview.appendChild(img);
      };

      reader.readAsDataURL(file);
    }
  });

// MULAI ANIMASI DAN MUSIK

function startBirthday() {
  document.getElementById("birthdaySong").play();

  nextSlide();

  createLoveAnimation();

  createBalloonAnimation();
}

// ANIMASI LOVE DI BACKGROUND

function createLoveAnimation() {
  const canvas = document.getElementById("loveCanvas");

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

  let hearts = [];

  function Heart(x, y) {
    this.x = x;

    this.y = y;

    this.alpha = 1;

    this.size = Math.random() * 20 + 10;

    this.speedY = Math.random() * 2 + 1;
  }

  function drawHeart(heart) {
    ctx.fillStyle = `rgba(255, 0, 100, ${heart.alpha})`;

    ctx.beginPath();

    ctx.arc(heart.x, heart.y, heart.size, 0, Math.PI * 2);

    ctx.fill();
  }

  function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach((heart, index) => {
      heart.y -= heart.speedY;

      heart.alpha -= 0.02;

      drawHeart(heart);

      if (heart.alpha <= 0) hearts.splice(index, 1);
    });

    requestAnimationFrame(animateHearts);
  }

  setInterval(() => {
    hearts.push(new Heart(Math.random() * canvas.width, canvas.height));
  }, 200);

  animateHearts();
}

// ANIMASI BALON

function createBalloonAnimation() {
  const canvas = document.getElementById("balloonCanvas");

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

  let balloons = [];

  function Balloon(x, color) {
    this.x = x;

    this.y = canvas.height;

    this.color = color;

    this.speedY = Math.random() * 2 + 1;
  }

  function drawBalloon(balloon) {
    ctx.fillStyle = balloon.color;

    ctx.beginPath();

    ctx.arc(balloon.x, balloon.y, 20, 0, Math.PI * 2);

    ctx.fill();
  }

  function animateBalloons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balloons.forEach((balloon, index) => {
      balloon.y -= balloon.speedY;

      drawBalloon(balloon);

      if (balloon.y < 0) balloons.splice(index, 1);
    });

    requestAnimationFrame(animateBalloons);
  }

  setInterval(() => {
    let colors = ["red", "blue", "yellow", "green", "purple"];

    let color = colors[Math.floor(Math.random() * colors.length)];

    balloons.push(new Balloon(Math.random() * canvas.width, color));
  }, 300);

  animateBalloons();
}