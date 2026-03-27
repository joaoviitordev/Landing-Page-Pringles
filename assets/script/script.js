gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

/* Variáveis Js */
const latasMenores = document.querySelectorAll(".latas img:nth-child(2)");
const slides = document.querySelectorAll(".slides");
const botaoSlideEsquerda = document.querySelectorAll(".buttonSlideEsq");
const botaoSlideDireita = document.querySelectorAll(".buttonSlideDir");

let contadorSlide = 0;
let isAnimating = false; // variável para controle de tempo

/* Hamburger Menu Toggle */
const hamburger = document.getElementById("hamburger");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");

if (hamburger && mobileNavOverlay) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNavOverlay.classList.toggle("active");
  });

  // Close menu when a link is clicked
  mobileNavOverlay.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileNavOverlay.classList.remove("active");
    });
  });
}

/* Variáveis Gsap */
const textoSplitH = document.querySelectorAll(".textSplit");
const textSplitP = document.querySelectorAll(".textSplitP");
const buttonStyle = document.querySelectorAll(".buttonStyle");

botaoSlideDireita.forEach((botaoDireita) => {
  botaoDireita.onclick = () => {
    if (isAnimating) return; // Se estiver animando, ignora o clique
    isAnimating = true;

    const slideActive = document.querySelector(".slides.active");
    // Remove active do navbar DO SLIDE ATUAL
    const navSlideActive = slideActive.querySelector(".navSlideBar.active");
    if (navSlideActive) navSlideActive.classList.remove("active");
    // Remove classe active do slide
    slideActive.classList.remove("active");

    if (contadorSlide == 3) {
      contadorSlide = 0;
    } else {
      contadorSlide = contadorSlide + 1;
    }
    
    // Adiciona active ao novo slide
    slides[contadorSlide].classList.add("active");
    // Adiciona active ao navbar correto DO NOVO SLIDE (baseado no índice)
    const navBarsDoNovoSlide = slides[contadorSlide].querySelectorAll(".navSlideBar");
    if (navBarsDoNovoSlide[contadorSlide]) navBarsDoNovoSlide[contadorSlide].classList.add("active");

    animationHero();

    // Libera para o próximo clique após 1.2 segundos (1200ms)
    setTimeout(() => {
      isAnimating = false;
    }, 1200);
  };
});

botaoSlideEsquerda.forEach((botaoEsquerda) => {
  botaoEsquerda.onclick = () => {
    if (isAnimating) return;
    isAnimating = true;

    const slideActive = document.querySelector(".slides.active");
    // Remove active do navbar DO SLIDE ATUAL
    const navSlideActive = slideActive.querySelector(".navSlideBar.active");
    if (navSlideActive) navSlideActive.classList.remove("active");
    // Remove classe active do slide
    slideActive.classList.remove("active");

    if (contadorSlide == 0) {
      contadorSlide = 3;
    } else {
      contadorSlide = contadorSlide - 1;
    }

    // Adiciona active ao novo slide
    slides[contadorSlide].classList.add("active");
    // Adiciona active ao navbar correto DO NOVO SLIDE (baseado no índice)
    const navBarsDoNovoSlide = slides[contadorSlide].querySelectorAll(".navSlideBar");
    if (navBarsDoNovoSlide[contadorSlide]) navBarsDoNovoSlide[contadorSlide].classList.add("active");

    animationHero();

    setTimeout(() => {
      isAnimating = false;
    }, 1200);
  };
});

latasMenores.forEach((lataMenor) => {
  lataMenor.onclick = () => {
    if (isAnimating) return; // Se estiver animando, ignora o clique
    isAnimating = true;

    const slideActive = document.querySelector(".slides.active");
    // Remove active do navbar DO SLIDE ATUAL
    const navSlideActive = slideActive.querySelector(".navSlideBar.active");
    if (navSlideActive) navSlideActive.classList.remove("active");
    // Remove classe active do slide
    slideActive.classList.remove("active");

    if (contadorSlide == 3) {
      contadorSlide = 0;
    } else {
      contadorSlide = contadorSlide + 1;
    }

    // Adiciona active ao novo slide
    slides[contadorSlide].classList.add("active");
    // Adiciona active ao navbar correto DO NOVO SLIDE (baseado no índice)
    const navBarsDoNovoSlide = slides[contadorSlide].querySelectorAll(".navSlideBar");
    if (navBarsDoNovoSlide[contadorSlide]) navBarsDoNovoSlide[contadorSlide].classList.add("active");

    animationHero();

    // Libera para o próximo clique após 1.2 segundos (1200ms)
    setTimeout(() => {
      isAnimating = false;
    }, 1200);
  };
});

function animationHero() {
  // Animação do H1
  textoSplitH.forEach((TextosIndividualSplitH) => {
    const splitH = SplitText.create(TextosIndividualSplitH, {
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

  // Animação do P
  textSplitP.forEach((TextosIndividualSplitP) => {
    const splitP = SplitText.create(TextosIndividualSplitP, {
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
  buttonStyle.forEach((buttonBox) => {
    gsap.from(buttonBox, {
      y: 65,
      opacity: 0,
      stagger: 0.4,
      duration: 0.8,
    });
  });
}
