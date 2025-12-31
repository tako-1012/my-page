// --- フェードインアニメーション ---
const targets = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
targets.forEach(t => observer.observe(t));

// --- カルーセル（自動切り替え） ---
const carousel = document.getElementById('carousel');
const dots = document.querySelectorAll('.dot');
let scrollAmount = 0;
let slideIndex = 0;

function autoScroll() {
  if (!carousel) return;

  const slideWidth = carousel.clientWidth;
  slideIndex++;

  // 最後の画像の次は最初に戻る
  if (slideIndex >= 3) {
    slideIndex = 0;
  }

  // スクロール実行
  carousel.scrollTo({
    left: slideWidth * slideIndex,
    behavior: 'smooth'
  });

  updateDots(slideIndex);
}

function updateDots(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  if(dots[index]) dots[index].classList.add('active');
}

// 3.5秒ごとに切り替え
let autoSlideInterval = setInterval(autoScroll, 3500);

// ユーザーが手動でスクロールしたら自動再生を一時停止する
carousel.addEventListener('touchstart', () => {
  clearInterval(autoSlideInterval);
});
