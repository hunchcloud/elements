const css = require("fs").readFileSync("./src/hunch-navbar/index.css", {
  encoding: "UTF-8"
});

const template = document.createElement("template");

template.innerHTML = `
<style>${css}</style>
<slot></slot>
<slot name="toggle"></slot>
<div id="collapse">
  <slot name="nav"></slot>
</div>
`;

class HunchNavbar extends HTMLElement {
  navSlot: HTMLSlotElement | null = null;
  toggleSlot: HTMLSlotElement | null = null;
  $collapse: HTMLElement | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    this.navSlot = shadow.querySelector('slot[name="nav"]');
    this.toggleSlot = shadow.querySelector('slot[name="toggle"]');
    this.toggleSlot?.addEventListener("click", this.onClickToggle);
    this.$collapse = shadow.querySelector("#collapse");
  }

  onClickToggle = () => {
    const nav = this.navSlot?.assignedElements()[0];
    if (nav && this.$collapse) {
      this.$collapse.classList.toggle("open");
      if (this.$collapse.classList.contains("open")) {
        this.$collapse.style.height = nav.clientHeight + "px";
      } else {
        this.$collapse.style.height = "";
      }
    }
  };
}

customElements.define("hunch-navbar", HunchNavbar);

export {};
