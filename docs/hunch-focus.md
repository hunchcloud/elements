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
    <hunch-focus class="panel" for=".input-1">panel1<input class="input-1"></hunch-focus>
    <hunch-focus class="panel" for="#input-2">panel2<input id="input-2"></hunch-focus>
  </div>
</hunch-tabs>

<script src="../src/hunch-focus.ts"></script>
<script src="../src/hunch-tabs.ts"></script>
