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

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  position: relative;
  display: block;
  overflow: hidden;
}

::slotted(*) {
  display: none;
  position: absolute;
  top:0;
  right:0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

::slotted(.prev),
::slotted(.next),
::slotted(.active) {
  display: block;
}

::slotted(.left) {
  transform: translateX(-100%);
  transition: transform 0.6s;
}
::slotted(.next.active) {
  left: 100%;
}

::slotted(.right) {
  transform: translateX(100%);
  transition: transform 0.6s;
}
::slotted(.prev.active) {
  left: -100%;
}

:host([crossfade]) ::slotted(*) {
  display: block;
  transition: opacity 0.6s;
  opacity: 0;
}
:host([crossfade]) ::slotted(.active) {
  opacity: 1;
  transform: none;
  left: 0;
}
</style>
<slot>No slides</slot>
`;

class HunchCarousel extends HTMLElement {
  active: number = 0;
  timer: number = -1;
  touchStartScreenX: number = 0;
  interval: number = 4000;

  static get observedAttributes() {
    return ["interval"];
  }

  attributeChangedCallback(name, _, newVal) {
    if (name === "interval") {
      this.interval = newVal;
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.render();
    this.addControls();
    this.addEventListener("touchstart", this.onTouchStart);
    this.addEventListener("touchend", this.onTouchEnd);
  }

  restartTimer = () => {
    window.clearInterval(this.timer);
    this.timer = window.setTimeout(() => {
      this.next();
    }, this.interval);
  };

  getSlides = () => {
    return this.children;
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

    if (this.shadowRoot) {
      this.shadowRoot.appendChild(controlPrev);
      this.shadowRoot.appendChild(controlNext);
    }
  };

  onTouchStart = (e: TouchEvent) => {
    const touches = e.changedTouches;
    if (touches.length === 1) {
      const touch = touches[0];
      this.touchStartScreenX = touch.screenX;
    }
  };

  onTouchEnd = (e: TouchEvent) => {
    const touches = e.changedTouches;
    if (touches.length === 1) {
      const touch = touches[0];
      if (Math.abs(touch.screenX - this.touchStartScreenX) > 30) {
        if (touch.screenX < this.touchStartScreenX) {
          this.next();
        } else {
          this.prev();
        }
      }
    }
  };

  prev = () => {
    this.render(false);
  };

  next = () => {
    this.render();
  };

  getPrevIndex = () => {
    const prev = this.active - 1;
    return prev < 0 ? this.getSlides().length - 1 : prev;
  };

  getNextIndex = () => {
    const next = this.active + 1;
    const total = this.getSlides().length;
    return next >= total ? 0 : next;
  };

  render(next = true) {
    const positionCls = next ? "next" : "prev";
    const transitionCls = next ? "left" : "right";
    const slides = this.getSlides();
    const length = slides.length;
    if (this.timer === -1) {
      const el = slides[0] as HTMLElement;
      el.classList.add("active");
    } else {
      const nextIndex = next ? this.getNextIndex() : this.getPrevIndex();
      const elCurrent = slides[this.active] as HTMLElement;
      const elNext = slides[nextIndex] as HTMLElement;
      elCurrent.classList.add(positionCls);
      elCurrent.classList.remove("active");
      elNext.classList.add("active", positionCls);
      setTimeout(() => {
        elCurrent.classList.add(transitionCls);
        elNext.classList.add(transitionCls);
      });
      setTimeout(() => {
        for (let i = 0; i < length; i++) {
          const el = slides[i] as HTMLElement;
          el.classList.remove("left", "right", "next", "prev");
        }
        this.active = nextIndex;
      }, 600);
    }
    this.restartTimer();
  }
}

customElements.define("hunch-carousel", HunchCarousel);
