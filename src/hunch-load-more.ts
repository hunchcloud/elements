import { hunchObserver } from "./hunch-observer";

class HunchLoadMore extends HTMLElement {
  static get observedAttributes() {
    return ["loading"];
  }

  attributeChangedCallback(
    name: string,
    oldVal: string | null,
    newVal: string
  ) {
    if (name === "loading") {
      if (oldVal === "false" && newVal === "true") {
        hunchObserver.unobserve(this);
      } else if (oldVal === "true" && newVal === "false") {
        hunchObserver.observe(this);
      }
    }
  }

  connectedCallback() {
    hunchObserver.observe(this);
  }

  load() {
    if (this.getAttribute("loading") === "false") {
      this.dispatchEvent(new Event("load"));
    }
  }
}

customElements.define("hunch-load-more", HunchLoadMore);
