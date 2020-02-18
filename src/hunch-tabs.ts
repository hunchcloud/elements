const template = document.createElement("template");

template.innerHTML = `
<slot name="tabs"></slot>
<slot name="panels"></slot>
`;

class HunchTabs extends HTMLElement {
  active: number = 0;
  tabsSlot: HTMLSlotElement | null;
  panelsSlot: HTMLSlotElement | null;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    this.tabsSlot = shadow.querySelector('slot[name="tabs"]');
    this.tabsSlot?.addEventListener("click", this.onClickTabs);
    this.panelsSlot = shadow.querySelector('slot[name="panels"]');

    this.render(0);
  }

  onClickTabs = e => {
    const parent = e.target.parentElement;
    const index = [...parent.children].indexOf(e.target);
    this.render(index);
  };

  render(index) {
    this.active = index;

    const tabsWrap = this.tabsSlot?.assignedNodes()[0];
    for (let i = 0; i < tabsWrap.children.length; i++) {
      const el = tabsWrap.children[i];
      if (i === this.active) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    }
    const panelsWrap = this.panelsSlot.assignedNodes()[0];
    for (let i = 0; i < panelsWrap.children.length; i++) {
      const el = panelsWrap.children[i];
      if (i === this.active) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    }
  }
}

customElements.define("hunch-tabs", HunchTabs);
