<script>
  export let min = 0;
  export let max = 100;
  export let value;
  export let label = null;
</script>

<label class="flex-1 flex justify-between text-xs">
  {#if label}{label}{/if}
  <div class="flex items-center space-x-2">
    <input type="range" class="" {min} {max} bind:value />
    <input type="number" class="text-xs px-1 border" {min} {max} bind:value />
  </div>
</label>
