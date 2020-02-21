const template = document.createElement("template");

template.innerHTML = `
<style>
:host {
  display: block;
}
</style>
<slot name="tabs"></slot>
<slot name="panels"></slot>
`;

class HunchTabs extends HTMLElement {
  active: number = 0;
  tabsSlot: HTMLSlotElement | null = null;
  panelsSlot: HTMLSlotElement | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    this.tabsSlot = shadow.querySelector('slot[name="tabs"]');
    this.tabsSlot?.addEventListener("click", this.onClickTabs);
    this.panelsSlot = shadow.querySelector('slot[name="panels"]');
  }

  connectedCallback() {
    this.render(0);
  }

  onClickTabs = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const parent = target.parentElement;
    if (parent) {
      const index = [...parent.children].indexOf(target);
      this.render(index);
    }
  };

  render(index: number) {
    this.active = index;

    const tabsWrap = this.tabsSlot?.assignedElements()[0];
    if (tabsWrap) {
      for (let i = 0; i < tabsWrap.children.length; i++) {
        const el = tabsWrap.children[i];
        if (i === this.active) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    }

    const panelsWrap = this.panelsSlot?.assignedElements()[0];
    if (panelsWrap) {
      for (let i = 0; i < panelsWrap.children.length; i++) {
        const el = panelsWrap.children[i] as HTMLElement;
        if (i === this.active) {
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      }
    }
  }
}

customElements.define("hunch-tabs", HunchTabs);

export {};
