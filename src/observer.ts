export interface ObservableElement extends HTMLElement {
  load: () => void;
}

class HunchObserver {
  observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(
      (entries, self) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as ObservableElement;
            target.load();
            self.unobserve(target);
          }
        });
      },
      {
        rootMargin: "0px 0px 120px 0px"
      }
    );
  }

  observe(root: ObservableElement) {
    this.observer.observe(root);
  }
}

export const hunchObserver = new HunchObserver();
