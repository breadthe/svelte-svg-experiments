<script>
  export let checked;
  export let label = null;
</script>

<label class="flex-1 flex justify-between text-xs">
  {#if label}{label}{/if}
  <input type="checkbox" bind:checked />
</label>
