/* ==============================================
   slider.js
   Lógica de navegação do slider (setas e clique nas latas)
   ============================================== */

import { animationHero } from './animations/hero-animation.js';
import { SLIDE_COUNT, ANIMATION_DURATION } from './utils/constants.js';

const slides = document.querySelectorAll(".slides");
const botaoSlideDireita = document.querySelectorAll(".buttonSlideDir");
const botaoSlideEsquerda = document.querySelectorAll(".buttonSlideEsq");
const latasMenores = document.querySelectorAll(".latas img:nth-child(2)");

let contadorSlide = 0;
let isAnimating = false;

/**
 * Troca o slide ativo para o índice fornecido.
 * @param {number} novoIndice - índice do próximo slide (0 a SLIDE_COUNT-1)
 */
function trocarSlide(novoIndice) {
  if (isAnimating) return;
  isAnimating = true;

  const slideAtivo = document.querySelector(".slides.active");

  // Remove estado ativo do slide e do indicador atual
  const barraAtiva = slideAtivo.querySelector(".navSlideBar.active");
  if (barraAtiva) barraAtiva.classList.remove("active");
  slideAtivo.classList.remove("active");

  contadorSlide = novoIndice;

  // Adiciona estado ativo ao novo slide e indicador
  slides[contadorSlide].classList.add("active");
  const barrasNovoSlide = slides[contadorSlide].querySelectorAll(".navSlideBar");
  if (barrasNovoSlide[contadorSlide]) {
    barrasNovoSlide[contadorSlide].classList.add("active");
  }

  animationHero();

  setTimeout(() => {
    isAnimating = false;
  }, ANIMATION_DURATION);
}

// --- Botão → (direita) ---
botaoSlideDireita.forEach((btn) => {
  btn.addEventListener("click", () => {
    const proximo = contadorSlide === SLIDE_COUNT - 1 ? 0 : contadorSlide + 1;
    trocarSlide(proximo);
  });
});

// --- Botão ← (esquerda) ---
botaoSlideEsquerda.forEach((btn) => {
  btn.addEventListener("click", () => {
    const anterior = contadorSlide === 0 ? SLIDE_COUNT - 1 : contadorSlide - 1;
    trocarSlide(anterior);
  });
});

// --- Clique na lata menor (avança slide) ---
latasMenores.forEach((lata) => {
  lata.addEventListener("click", () => {
    const proximo = contadorSlide === SLIDE_COUNT - 1 ? 0 : contadorSlide + 1;
    trocarSlide(proximo);
  });
});
