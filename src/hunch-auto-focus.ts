class HunchAutoFocus extends HTMLElement {
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

    const el = this.querySelector("[autofocus]");
    if (el) {
      setTimeout(() => (el as HTMLElement).focus(), 100);
    }
  }
}

customElements.define("hunch-auto-focus", HunchAutoFocus);

export {};
