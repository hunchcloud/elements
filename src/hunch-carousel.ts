const observerOptions = {
  childList: true,
  attributes: false,
  subtree: false
};

// Icons from https://material.io/resources/icons
const iconPrev = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>`;
const iconNext = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>`;

const controlStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "6rem",
  cursor: "pointer",
  zIndex: 1
};

class HunchCarousel extends HTMLElement {
  active: number = 0;
  timer: number = -1;

  connectedCallback() {
    const observer = new MutationObserver(this.handleMutation);
    observer.observe(this, observerOptions);
    this.addControls();
  }

  handleMutation = (mutationList: Array<MutationRecord>) => {
    mutationList.forEach(mutation => {
      switch (mutation.type) {
        case "childList":
          this.render();
      }
    });
  };

  restartTimer = () => {
    window.clearInterval(this.timer);

    this.timer = window.setInterval(() => {
      this.next();
    }, 3000);
  };

  getSlides = () => {
    return this.querySelectorAll(".slide");
  };

  addControls = () => {
    const controlPrev = document.createElement("div");
    controlPrev.innerHTML = iconPrev;
    Object.assign(controlPrev.style, controlStyles, {
      left: 0
    });
    controlPrev.addEventListener("click", this.prev);
    const controlNext = document.createElement("div");
    controlNext.innerHTML = iconNext;
    Object.assign(controlNext.style, controlStyles, {
      right: 0
    });
    controlNext.addEventListener("click", this.next);

    this.appendChild(controlPrev);
    this.appendChild(controlNext);
  };

  prev = () => {
    const prev = this.active - 1;
    this.active = prev < 0 ? this.getSlides().length - 1 : prev;
    this.render();
  };

  next = () => {
    const next = this.active + 1;
    const total = this.getSlides().length;
    this.active = next === total ? 0 : next;
    this.render();
  };

  render() {
    const slides = this.getSlides();
    const length = slides.length;
    for (let i = 0; i < length; i++) {
      const el = slides[i] as HTMLElement;
      if (this.active === i) {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
      }
    }
    this.restartTimer();
  }
}

customElements.define("hunch-carousel", HunchCarousel);
