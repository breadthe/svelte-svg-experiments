<script>
  export let value;
  export let label = null;
</script>

<label class="flex-1 flex justify-between text-xs">
  {#if label}{label}{/if}
  <input type="color" bind:value />
</label>
