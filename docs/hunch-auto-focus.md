# &lt;hunch-auto-focus>

Focus the first child element with the `autofocus` attribute.

Normally the `autofocus` only works when the element was first rendered. For example, if you have an `<input autofocus>` inside a modal, it works when opening the modal for the first time, but not afterwards.

With `<hunch-auto-focus>`, auto focusing works when attached to DOM or `hidden` attribute changes from false to true.

## Observed attributes

| name | type |
| --- | --- |
| hidden | boolean |

## Usage

```html
<hunch-auto-focus>
  An input with autofocus attribute
  <input autofocus>
</hunch-auto-focus>
```

## Live Example

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

<live-element>
<textarea>
<hunch-tabs style="display: block; border: 1px solid lightgray; padding: 1rem">
  <div slot="tabs" class="tabs">
    <div>Tab 0</div>
    <div>Tab 1</div>
    <div>Tab 2</div>
  </div>
  <div slot="panels" class="panels">
    <div>Select Tab 1 or Tab 2 to see it works</div>
    <hunch-auto-focus>
      Panel 1: Auto focus input <input autofocus>
    </hunch-auto-focus>
    <hunch-auto-focus>
      Panel 2: Auto focus textarea
      <input>
      &lt;textarea class="block" autofocus>&lt;/textarea>
    </hunch-auto-focus>
  </div>
</hunch-tabs>
</textarea>
</live-element>

<script src="../src/hunch-auto-focus.ts"></script>
<script src="../src/hunch-tabs.ts"></script>
