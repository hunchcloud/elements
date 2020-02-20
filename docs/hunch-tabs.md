# &lt;hunch-tabs>

A tabs container element.

## Observed attributes

None.

## Usage

```html
<hunch-tabs>
  <div slot="tabs">
    <div>tab 1</div>
    <div>tab 2</div>
  </div>
  <div slot="panels">
    <div>panel1</div>
    <div>panel2</div>
  </div>
</hunch-tabs>
```

## Example

<style>
  .tabs {
    display: flex;
    cursor: pointer;
    border-bottom: 1px solid lightgray;
  }
  .tabs > * {
    padding: 0.5rem 1rem;
  }
  .tabs > *.active {
    color: royalblue;
    border-bottom: 2px solid currentcolor;
  }
  .panels {
    padding: 1rem;
  }
</style>

<hunch-tabs style="display: block; border: 1px solid lightgray; padding: 1rem">
  <div slot="tabs" class="tabs">
    <div>tab 1</div>
    <div>tab 2</div>
  </div>
  <div slot="panels" class="panels">
    <div>panel1</div>
    <div>panel2</div>
  </div>
</hunch-tabs>

<script src="../src/hunch-tabs.ts"></script>
