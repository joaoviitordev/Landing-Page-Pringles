/* ==============================================
   PRINGLES LANDING PAGE - Script Principal
   Organização: Constantes -> Navegação -> Animações -> Slider
   ============================================== */

const smoother = ScrollSmoother.create({
  smooth: 1.5,
  effects: true
});

// --- 1. CONSTANTES E CONFIGURAÇÕES ---
const SLIDE_COUNT = 4;
const ANIMATION_DURATION = 1200; // ms — duração da transição de slide

// --- 2. REGISTRO DE PLUGINS GSAP ---
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
}

// --- 3. NAVEGAÇÃO MOBILE (MENU HAMBÚRGUER) ---
const hamburger = document.getElementById("hamburger");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");

if (hamburger && mobileNavOverlay) {
  // Abre/fecha o menu ao clicar no hambúrguer
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNavOverlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Fecha o menu ao clicar em qualquer item da lista
  mobileNavOverlay.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileNavOverlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });
}

// --- 4. ANIMAÇÕES HERO (GSAP) ---
/**
 * Dispara as animações de entrada dos elementos do slide ativo.
 * Utiliza GSAP SplitText para animar palavra a palavra (h2) e linha a linha (p).
 */
function animationHero() {
  const slideAtivo = document.querySelector(".slides.active");
  if (!slideAtivo) return;

  const textoSplitH = slideAtivo.querySelectorAll(".textSplit");
  const textSplitP = slideAtivo.querySelectorAll(".textSplitP");
  const buttonStyle = slideAtivo.querySelectorAll(".buttonStyle");

  // Animação do H2 — palavra por palavra
  textoSplitH.forEach((el) => {
    const splitH = SplitText.create(el, {
      type: "lines, words, chars",
      mask: "lines",
    });

    gsap.from(splitH.words, {
      y: 65,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
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
      duration: 0.9,
    });
  });
}

// --- 5. LÓGICA DO SLIDER ---
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

  // Executa animações do novo slide
  animationHero();

  setTimeout(() => {
    isAnimating = false;
  }, ANIMATION_DURATION);
}

// Eventos de clique nas setas e latas
botaoSlideDireita.forEach((btn) => {
  btn.addEventListener("click", () => {
    const proximo = (contadorSlide + 1) % SLIDE_COUNT;
    trocarSlide(proximo);
  });
});

botaoSlideEsquerda.forEach((btn) => {
  btn.addEventListener("click", () => {
    const anterior = (contadorSlide - 1 + SLIDE_COUNT) % SLIDE_COUNT;
    trocarSlide(anterior);
  });
});

latasMenores.forEach((lata) => {
  lata.addEventListener("click", () => {
    const proximo = (contadorSlide + 1) % SLIDE_COUNT;
    trocarSlide(proximo);
  });
});

// --- 6. INICIALIZAÇÃO AO CARREGAR ---
document.addEventListener("DOMContentLoaded", () => {
  animationHero();
});

// --- 7. ANIMAÇÕES SEGUNDA SEÇÃO ---

// Texto faixa vermelha
gsap.to("textPath", {
  attr: { startOffset: "-20%" },
  scrollTrigger: {
    trigger: ".marquee-inner",
    start: "top 70%",
    end: "bottom top",
    scrub: 2,
  },
});

// LINHA VETORIAL
const linhaPath = document.querySelector(".middleSection-vetorial svg path");

if (linhaPath) {
  const linhaComprimento = linhaPath.getTotalLength();

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".middleSection",
      start: "30% 80%",
      end: "bottom 50%",
      scrub: 3,
    },
  });

  gsap.set(linhaPath, {
    strokeDasharray: linhaComprimento,
    strokeDashoffset: linhaComprimento,
  });

  timeline.fromTo(
    linhaPath,
    {
      strokeDashoffset: linhaComprimento,
    },
    {
      strokeDashoffset: 0,
      duration: 5,
    }
  );

  timeline.to(
    ".site-footer",
    {
      backgroundColor: "rgba(255, 255, 255, 1)",
      duration: 0.2,
    },
    "-=.6"
  );
}

// Lata Paprika
gsap.to(".laranja .lataEtapa", {
  rotate: "0deg",
  y: -80,
  scrollTrigger: {
    trigger: ".laranja",
    start: "top 70%",
    end: "bottom top",
    scrub: 2,
  },
});

// Lata Salt&Vinegar
gsap.to(".azul .lataEtapa", {
  rotate: "10deg",
  y: -30,
  scrollTrigger: {
    trigger: ".azul",
    start: "top 70%",
    end: "bottom top",
    scrub: 2,
  },
});

// Lata Cheese&Onion
gsap.to(".verde .lataEtapa", {
  rotate: "0deg",
  y: 100,
  scrollTrigger: {
    trigger: ".verde",
    start: "top 70%",
    end: "bottom top",
    scrub: 2,
  },
});

// --- 8. ROLAGEM SUAVE PARA CONTATO ---
const linksContato = document.querySelectorAll(".link-contato");
linksContato.forEach(link => {
  link.addEventListener("click", () => {
    // Se o menu mobile estiver aberto, fechamos ele primeiro
    if (mobileNavOverlay && mobileNavOverlay.classList.contains("active")) {
      hamburger.classList.remove("active");
      mobileNavOverlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
    
    // Rola suavemente até a seção do rodapé
    if (typeof smoother !== "undefined") {
      // Usa o ScrollSmoother para animar até o final da página (alinhando o final da tela com o final do contato)
      smoother.scrollTo("#contato", true, "bottom bottom");
    }
  });
});