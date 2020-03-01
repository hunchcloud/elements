import { hunchObserver } from "./hunch-observer";

class HunchImg extends HTMLElement {
  loaded: boolean = false;
  img: HTMLImageElement = document.createElement("img");
  elStyle: HTMLStyleElement = document.createElement("style");

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "closed" });
    this.elStyle.textContent =
      "img { width: 100%; height: 100%; object-fit: inherit; }";
    shadow.appendChild(this.elStyle);
    shadow.appendChild(this.img);
  }

  static get observedAttributes() {
    return ["src", "srcset", "sizes"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
    hunchObserver.observe(this);
  }

  load() {
    this.loaded = true;
    this.render();
    hunchObserver.unobserve(this);
  }

  render() {
    for (let key of HunchImg.observedAttributes) {
      const value = this.getAttribute(key);
      if (value && this.loaded) this.img.setAttribute(key, value);
    }
  }
}

customElements.define("hunch-img", HunchImg);
