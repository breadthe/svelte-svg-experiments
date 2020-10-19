<script>
  export let values;
  export let selected;
  export let label = null;
</script>

<style lang="scss">

</style>

<label class="flex-1 flex justify-between text-xs">
  {#if label}{label}{/if}
  <select class="border" bind:value={selected}>
    {#each values as value}
      <option {value}>{value}</option>
    {/each}
  </select>
</label>
