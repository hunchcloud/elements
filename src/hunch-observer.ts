export interface ObservableElement extends HTMLElement {
  load: () => void;
}

export class HunchObserver {
  observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as ObservableElement;
            target.load();
          }
        });
      },
      {
        rootMargin: "0px 0px 120px 0px"
      }
    );
  }

  observe(el: ObservableElement) {
    this.observer.observe(el);
  }

  unobserve(el: ObservableElement) {
    this.observer.unobserve(el);
  }
}

export const hunchObserver = new HunchObserver();
