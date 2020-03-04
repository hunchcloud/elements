# &lt;hunch-navbar>

A responsive navbar element.

## Usage

```html
<hunch-navbar>
  <span>Logo</span>
  <ul slot="nav">
    <li>Link 1</li>
    <li>Link 2</li>
  </ul>
  <button slot="toggle">Toggle</button>
</hunch-navbar>
```

## Live Example

<live-element class="grid-cols-1">
<textarea>
<hunch-navbar class="bg-green-200 py-1 px-3">
  <span class="text-lg">Logo</span>
  <ul slot="nav" class="text-sm">
    <li class="mx-4">Link 1</li>
    <li class="mx-4">Link 2</li>
  </ul>
  <button slot="toggle" class="bg-transparent flex p-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
  </button>
</hunch-navbar>
</textarea>
</live-element>

<script type="module" src="../src/hunch-navbar/index.ts"></script>
