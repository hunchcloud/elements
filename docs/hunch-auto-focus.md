# &lt;hunch-auto-focus>

Focus the first child element with `autofocus` attribute.

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
    <hunch-auto-focus class="panel">panel1 <input autofocus></hunch-auto-focus>
    <hunch-auto-focus class="panel">panel2 <input autofocus></hunch-auto-focus>
  </div>
</hunch-tabs>

<script src="../src/hunch-auto-focus.ts"></script>
<script src="../src/hunch-tabs.ts"></script>
