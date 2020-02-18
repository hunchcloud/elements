class HunchFocus extends HTMLElement {
  static get observedAttributes() {
    return ["hidden"];
  }

  attributeChangedCallback() {
    this.focus();
  }

  connectedCallback() {
    this.focus();
  }

  focus() {
    if (this.getAttribute("hidden") != null) return;

    const selector = this.getAttribute("for");
    if (selector) {
      const el = this.querySelector(selector);
      if (el) {
        setTimeout(() => (el as HTMLElement).focus(), 100);
      }
    }
  }
}

customElements.define("hunch-focus", HunchFocus);

export {};
