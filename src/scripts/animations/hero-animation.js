/* ==============================================
   ANIMATIONS / hero-animation.js
   Animações GSAP para título, parágrafo e botão do hero
   ============================================== */

/**
 * Dispara as animações de entrada dos elementos do slide ativo.
 * Utiliza GSAP SplitText para animar palavra a palavra (h2) e linha a linha (p).
 */
export function animationHero() {
  const textoSplitH = document.querySelectorAll(".textSplit");
  const textSplitP = document.querySelectorAll(".textSplitP");
  const buttonStyle = document.querySelectorAll(".buttonStyle");

  // Animação do H2 — palavra por palavra
  textoSplitH.forEach((el) => {
    const splitH = SplitText.create(el, {
      type: "lines, words, chars",
      mask: "lines",
    });

    gsap.from(splitH.words, {
      y: 45,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
    });
  });

  // Animação do parágrafo — linha por linha
  textSplitP.forEach((el) => {
    const splitP = SplitText.create(el, {
      type: "lines, words, chars",
      mask: "lines",
    });

    gsap.from(splitP.lines, {
      y: 55,
      opacity: 0,
      stagger: 0.3,
      duration: 0.6,
    });
  });

  // Animação do botão
  buttonStyle.forEach((btn) => {
    gsap.from(btn, {
      y: 65,
      opacity: 0,
      stagger: 0.4,
      duration: 0.8,
    });
  });
}
