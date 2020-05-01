// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Ly8z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Icons from https://material.io/resources/icons

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
  constructor() {
    super(...arguments);
    this.active = 0;
    this.timer = -1;
    this.touchStartScreenX = 0;
    this.interval = 4000;

    this.restartTimer = () => {
      window.clearInterval(this.timer);
      this.timer = window.setTimeout(() => {
        this.next();
      }, this.interval);
    };

    this.getSlides = () => {
      return this.children;
    };

    this.addControls = () => {
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

    this.onTouchStart = e => {
      const touches = e.changedTouches;

      if (touches.length === 1) {
        const touch = touches[0];
        this.touchStartScreenX = touch.screenX;
      }
    };

    this.onTouchEnd = e => {
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

    this.prev = () => {
      this.render(false);
    };

    this.next = () => {
      this.render();
    };

    this.getPrevIndex = () => {
      const prev = this.active - 1;
      return prev < 0 ? this.getSlides().length - 1 : prev;
    };

    this.getNextIndex = () => {
      const next = this.active + 1;
      const total = this.getSlides().length;
      return next >= total ? 0 : next;
    };
  }

  static get observedAttributes() {
    return ["interval"];
  }

  attributeChangedCallback(name, _, newVal) {
    if (name === "interval") {
      this.interval = newVal;
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: "open"
    });
    shadow.appendChild(template.content.cloneNode(true));
    this.render();
    this.addControls();
    this.addEventListener("touchstart", this.onTouchStart);
    this.addEventListener("touchend", this.onTouchEnd);
  }

  render(next = true) {
    const positionCls = next ? "next" : "prev";
    const transitionCls = next ? "left" : "right";
    const slides = this.getSlides();
    const length = slides.length;

    if (this.timer === -1) {
      const el = slides[0];
      el.classList.add("active");
    } else {
      const nextIndex = next ? this.getNextIndex() : this.getPrevIndex();
      const elCurrent = slides[this.active];
      const elNext = slides[nextIndex];
      elCurrent.classList.add(positionCls);
      elCurrent.classList.remove("active");
      elNext.classList.add("active", positionCls);
      setTimeout(() => {
        elCurrent.classList.add(transitionCls);
        elNext.classList.add(transitionCls);
      });
      setTimeout(() => {
        for (let i = 0; i < length; i++) {
          const el = slides[i];
          el.classList.remove("left", "right", "next", "prev");
        }

        this.active = nextIndex;
      }, 600);
    }

    this.restartTimer();
  }

}

customElements.define("hunch-carousel", HunchCarousel);
},{}]},{},["Ly8z"], null)
//# sourceMappingURL=/hunch-carousel.e99679d4.js.map