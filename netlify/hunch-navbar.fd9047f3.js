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
})({"alQS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const css = `:host{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;}::slotted([slot=nav]){display:flex;flex-direction:column;list-style:none;margin:0;padding:0;}#collapse{flex-basis:100%;height:0;overflow:hidden;transition:height 0.2s;}::slotted([slot=toggle]){cursor:pointer;}@media (min-width:992px){::slotted([slot=nav]){flex-direction:row;}::slotted([slot=toggle]){display:none !important;}#collapse{flex-basis:initial;height:auto;}}`;
exports.default = css;
},{}],"uifV":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const index_css_1 = __importDefault(require("./index-css"));

const template = document.createElement("template");
template.innerHTML = `
<style>${index_css_1.default}</style>
<slot></slot>
<slot name="toggle"></slot>
<div id="collapse">
  <slot name="nav"></slot>
</div>
`;

class HunchNavbar extends HTMLElement {
  constructor() {
    var _a;

    super();
    this.navSlot = null;
    this.toggleSlot = null;
    this.$collapse = null;

    this.onClickToggle = () => {
      var _a;

      const nav = (_a = this.navSlot) === null || _a === void 0 ? void 0 : _a.assignedElements()[0];

      if (nav && this.$collapse) {
        this.$collapse.classList.toggle("open");

        if (this.$collapse.classList.contains("open")) {
          this.$collapse.style.height = nav.clientHeight + "px";
        } else {
          this.$collapse.style.height = "";
        }
      }
    };

    const shadow = this.attachShadow({
      mode: "open"
    });
    shadow.appendChild(template.content.cloneNode(true));
    this.navSlot = shadow.querySelector('slot[name="nav"]');
    this.toggleSlot = shadow.querySelector('slot[name="toggle"]');
    (_a = this.toggleSlot) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.onClickToggle);
    this.$collapse = shadow.querySelector("#collapse");
  }

}

customElements.define("hunch-navbar", HunchNavbar);
},{"./index-css":"alQS"}]},{},["uifV"], null)
//# sourceMappingURL=/hunch-navbar.fd9047f3.js.map