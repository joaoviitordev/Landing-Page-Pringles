/* ==============================================
   mobile-nav.js
   Toggle do menu hambúrguer (mobile)
   ============================================== */

const hamburger = document.getElementById("hamburger");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");

if (hamburger && mobileNavOverlay) {
  // Abre/fecha o menu ao clicar no hambúrguer
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNavOverlay.classList.toggle("active");
  });

  // Fecha o menu ao clicar em qualquer item da lista
  mobileNavOverlay.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileNavOverlay.classList.remove("active");
    });
  });
}
