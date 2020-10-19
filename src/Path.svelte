<script>
  import { uuid } from "./utils";
  import Dropdown from "./components/inputs/Dropdown.svelte";
  import Slider from "./components/inputs/Slider.svelte";

  const initial = {
    viewboxX: 500,
    viewboxY: 100,
    strokeWidth: 1,
    strokeLinecap: "round", // butt, round, square
    strokeLinejoin: "round", // miter, round, bevel, miter-clip, arcs
    fill: false,
    fillRule: "nonzero", // nonzero, evenodd
    originX: 0,
    originY: 72,
    startX: 9,
    startY: 34,
    endX: 38,
    endY: 11,
    tX: 40,
    tY: 10,
    iterations: 5,
    connect: false
  };

  let init = () => JSON.parse(JSON.stringify(initial));

  let selected = init();

  $: reset = () => (selected = init());

  $: iter = () => {
    let str = [];

    for (var i = 0; i < selected.iterations; i++) {
      str.push(`${selected.tX},${selected.tY}`);
    }

    if (str.length) {
      return "t" + str.join(" ");
    }
    return "";
  };

  $: connect = () => (selected.connect ? "z" : "");
  $: fill = () => (selected.fill ? "black" : "none");

  $: svg = `<svg viewBox="0 0 ${selected.viewboxX},${
    selected.viewboxY
  }" xmlns="http://www.w3.org/2000/svg">
<path
  fill="${fill()}"
  fill-rule="${selected.fillRule}"
  stroke="red"
  stroke-width="${selected.strokeWidth}"
  stroke-linecap="${selected.strokeLinecap}"
  stroke-linejoin="${selected.strokeLinejoin}"
  d="
    M ${selected.originX},${selected.originY}
    Q ${selected.startX},${selected.startY} ${selected.endX},${selected.endY}
    ${iter()}
    ${connect()}
  " />
</svg>`;
</script>

<style lang="scss">

</style>

<div>
  <div class="flex flex-col">
    <div class="flex justify-between">
      <button type="button" class="border px-2 bg-gray-200" on:click={reset()}>
        reset
      </button>
    </div>
    <div class="flex justify-between">
      <em class="text-xs text-left">Stroke Width</em>
      <Slider min="0" max="10" bind:value={selected.strokeWidth} />
    </div>
    <div class="flex justify-between">
      <em class="text-xs text-left">Stroke Linecap</em>
      <Dropdown
        values={['butt', 'round', 'square']}
        bind:selected={selected.strokeLinecap} />
    </div>
    <div class="flex justify-between">
      <em class="text-xs text-left">Stroke Linejoin</em>
      <Dropdown
        values={['miter', 'round', 'bevel', 'miter-clip', 'arcs']}
        bind:selected={selected.strokeLinejoin} />
    </div>
    <div class="flex justify-between">
      <em class="text-xs text-left">Connect</em>
      <input type="checkbox" bind:checked={selected.connect} />
    </div>
    <div class="flex justify-between">
      <em class="text-xs text-left">Fill</em>
      <input type="checkbox" bind:checked={selected.fill} />
    </div>
    <div class="flex justify-between">
      <em class="text-xs text-left">Fill Rule</em>
      <Dropdown
        values={['nonzero', 'evenodd']}
        bind:selected={selected.fillRule} />
    </div>
    <div class="flex flex-col">
      <em class="text-xs text-left">
        <strong>M</strong>
        Origin
      </em>
      <Slider min="0" max={selected.viewboxX} bind:value={selected.originX} />
      <Slider min="0" max={selected.viewboxY} bind:value={selected.originY} />
    </div>
    <div class="flex flex-col">
      <em class="text-xs text-left">
        <strong>Q</strong>
        Start
      </em>
      <Slider min="0" max={selected.viewboxX} bind:value={selected.startX} />
      <Slider min="0" max={selected.viewboxY} bind:value={selected.startY} />
    </div>
    <div class="flex flex-col">
      <em class="text-xs text-left">End</em>
      <Slider
        min={-selected.viewboxX}
        max={selected.viewboxX}
        bind:value={selected.endX} />
      <Slider
        min={-selected.viewboxY}
        max={selected.viewboxY}
        bind:value={selected.endY} />
    </div>
    <div class="flex flex-col">
      <em class="text-xs text-left">Control point</em>
      <Slider
        min={-selected.viewboxX}
        max={selected.viewboxX}
        bind:value={selected.tX} />
      <Slider
        min={-selected.viewboxY}
        max={selected.viewboxY}
        bind:value={selected.tY} />
    </div>
    <div class="flex flex-col">
      <em class="text-xs text-left">
        <strong>t</strong>
        Iterations
      </em>
      <Slider min="0" max="10" bind:value={selected.iterations} />
    </div>

    {@html svg}

    <pre class="text-xs text-left overflow-auto">{svg}</pre>
  </div>
</div>
