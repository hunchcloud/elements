import { ObservableElement, hunchObserver } from "./observer";

class HunchImg extends HTMLElement implements ObservableElement {
  loaded: boolean = false;
  img: HTMLImageElement = document.createElement("img");

  static get observedAttributes() {
    return ["data-src"];
  }

  attributeChangedCallback() {
    this.appendChild(this.img);
    this.render();
  }

  connectedCallback() {
    this.render();
    hunchObserver.observe(this);
  }

  load() {
    this.loaded = true;
    this.render();
  }

  render() {
    for (let key in this.dataset) {
      const value = this.dataset[key];
      if (key === "class" && value) {
        this.img.className = value;
      } else if (key === "src" && this.loaded) {
        this.img.src = value || "";
      } else {
        this.img.dataset[key] = value;
      }
    }
  }
}

customElements.define("hunch-img", HunchImg);
