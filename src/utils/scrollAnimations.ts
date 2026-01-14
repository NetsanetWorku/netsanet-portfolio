// Utility functions for scroll-based animations
import React from 'react';

/**
 * Intersection Observer utility for scroll animations
 */
export class ScrollAnimationObserver {
  private observer: IntersectionObserver;
  private elements: Map<Element, string> = new Map();

  constructor(options: IntersectionObserverInit = {}) {
    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const animationClass = this.elements.get(entry.target);
        if (animationClass) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        }
      });
    }, defaultOptions);
  }

  /**
   * Observe an element for scroll animations
   */
  observe(element: Element, animationClass: string = 'scroll-fade-in'): void {
    this.elements.set(element, animationClass);
    element.classList.add(animationClass);
    this.observer.observe(element);
  }

  /**
   * Stop observing an element
   */
  unobserve(element: Element): void {
    this.elements.delete(element);
    this.observer.unobserve(element);
  }

  /**
   * Disconnect the observer
   */
  disconnect(): void {
    this.observer.disconnect();
    this.elements.clear();
  }
}

/**
 * React hook for scroll animations
 */
export const useScrollAnimation = (
  animationClass: string = 'scroll-fade-in',
  options?: IntersectionObserverInit
) => {
  const elementRef = React.useRef<HTMLElement>(null);
  const observerRef = React.useRef<ScrollAnimationObserver | null>(null);

  React.useEffect(() => {
    if (elementRef.current) {
      observerRef.current = new ScrollAnimationObserver(options);
      observerRef.current.observe(elementRef.current, animationClass);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [animationClass, options]);

  return elementRef;
};

/**
 * Staggered animation utility
 */
export const staggerElements = (
  elements: NodeListOf<Element> | Element[],
  baseClass: string = 'scroll-fade-in',
  delay: number = 100
): void => {
  const observer = new ScrollAnimationObserver();
  
  elements.forEach((element, index) => {
    // Add stagger delay
    (element as HTMLElement).style.animationDelay = `${index * delay}ms`;
    observer.observe(element, baseClass);
  });
};

/**
 * Parallax scroll effect
 */
export const createParallaxEffect = (
  element: HTMLElement,
  speed: number = 0.5
): (() => void) => {
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * speed;
    element.style.transform = `translateY(${parallax}px)`;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Smooth scroll to element
 */
export const smoothScrollTo = (
  target: string | Element,
  offset: number = 0,
  duration: number = 1000
): void => {
  const element = typeof target === 'string' 
    ? document.querySelector(target) 
    : target;

  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  // Easing function
  const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

/**
 * Scroll progress indicator
 */
export const createScrollProgress = (
  progressElement: HTMLElement,
  container: HTMLElement = document.body
): (() => void) => {
  const updateProgress = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = container.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressElement.style.width = `${Math.min(scrollPercent, 100)}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress(); // Initial call

  return () => {
    window.removeEventListener('scroll', updateProgress);
  };
};

/**
 * Reveal text animation
 */
export const revealText = (
  element: HTMLElement,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
  } = {}
): void => {
  const { delay = 0, stagger = 50 } = options;
  const text = element.textContent || '';
  const words = text.split(' ');
  
  element.innerHTML = words
    .map((word, index) => 
      `<span class="word" style="animation-delay: ${delay + index * stagger}ms">${word}</span>`
    )
    .join(' ');
  
  element.classList.add('text-reveal');
};

/**
 * Typing animation
 */
export const typeWriter = (
  element: HTMLElement,
  text: string,
  speed: number = 50,
  callback?: () => void
): void => {
  let i = 0;
  element.textContent = '';
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  };
  
  type();
};

/**
 * Counter animation
 */
export const animateCounter = (
  element: HTMLElement,
  target: number,
  duration: number = 2000,
  startValue: number = 0
): void => {
  const startTime = performance.now();
  const difference = target - startValue;
  
  const updateCounter = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(startValue + difference * easeOut);
    
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  };
  
  requestAnimationFrame(updateCounter);
};