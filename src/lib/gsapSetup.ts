import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Animate all `[data-animate]` elements inside a root (defaults to document).
 * Returns a cleanup function that kills related ScrollTriggers / tweens.
 */
export function runGsapAnimations(root: ParentNode | null = document) {
  if (!root || prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    // Hero / page-load entrance
    gsap.utils.toArray<HTMLElement>('[data-animate="hero"]').forEach((el) => {
      gsap.from(el, {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: Number(el.dataset.delay || 0),
        clearProps: "all",
      });
    });

    // Fade up on scroll
    gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]').forEach((el) => {
      gsap.from(el, {
        y: 56,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: Number(el.dataset.delay || 0),
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        clearProps: "all",
      });
    });

    // Fade in
    gsap.utils.toArray<HTMLElement>('[data-animate="fade-in"]').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        delay: Number(el.dataset.delay || 0),
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        clearProps: "all",
      });
    });

    // From left
    gsap.utils
      .toArray<HTMLElement>('[data-animate="fade-left"]')
      .forEach((el) => {
        gsap.from(el, {
          x: -48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          clearProps: "all",
        });
      });

    // From right
    gsap.utils
      .toArray<HTMLElement>('[data-animate="fade-right"]')
      .forEach((el) => {
        gsap.from(el, {
          x: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          clearProps: "all",
        });
      });

    // Scale in
    gsap.utils
      .toArray<HTMLElement>('[data-animate="scale-in"]')
      .forEach((el) => {
        gsap.from(el, {
          scale: 0.92,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          clearProps: "all",
        });
      });

    // Stagger children
    gsap.utils.toArray<HTMLElement>('[data-animate="stagger"]').forEach((el) => {
      const marked = el.querySelectorAll<HTMLElement>("[data-animate-child]");
      const children = marked.length
        ? marked
        : el.querySelectorAll<HTMLElement>(":scope > *");
      if (!children.length) return;

      gsap.from(children, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: Number(el.dataset.stagger || 0.12),
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        clearProps: "all",
      });
    });

    // Soft parallax backgrounds
    gsap.utils
      .toArray<HTMLElement>('[data-animate="parallax"]')
      .forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.speed || 12),
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
  }, root as Element | undefined);

  ScrollTrigger.refresh();

  return () => {
    ctx.revert();
  };
}
