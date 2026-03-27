/* ==============================================
   main.js
   Ponto de entrada JS — inicializa GSAP e importa módulos
   ============================================== */

// Registro dos plugins GSAP (deve ocorrer antes de qualquer uso)
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Módulos da aplicação
import './slider.js';
import './mobile-nav.js';
