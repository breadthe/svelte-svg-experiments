<script>
  import { uuid, pixelToViewport } from "./utils";
  import ColorPicker from "./components/inputs/ColorPicker.svelte";
  import Dropdown from "./components/inputs/Dropdown.svelte";
  import Checkbox from "./components/inputs/Checkbox.svelte";
  import Slider from "./components/inputs/Slider.svelte";

  const initial = {
    viewboxX: 400,
    viewboxY: 300,
    strokeWidth: 1,
    strokeLinecap: "round", // butt, round, square
    strokeLinejoin: "round", // miter, round, bevel, miter-clip, arcs
    strokeColor: "#f00000", // default = red
    fill: false,
    fillColor: "#000000", // default = black
    fillRule: "nonzero", // nonzero, evenodd
    // originX: 0,
    // originY: 72,
    points: [{ x: 50, y: 3 }, { x: 21, y: 90 }, { x: 98, y: 35 }],
    pickedVertex: { x: null, y: null } // coordinates of a vertex that was "picked", i.e. click-n-hold
  };

  const mouse = {
    x: 0,
    y: 0
  };

  let init = () => JSON.parse(JSON.stringify(initial));

  let selected = init();

  $: reset = () => (selected = init());

  $: points = () => {
    let points = [];

    for (var i = 0; i < selected.points.length; i++) {
      points.push(`${selected.points[i].x},${selected.points[i].y}`);
    }

    if (points.length) {
      return points.join(" ");
    }
    return "";
  };

  $: fill = () => (selected.fill ? selected.fillColor : "none");

  $: addPoint = () => {
    selected.points.push({
      x: Math.round(Math.random() * initial.viewboxX),
      y: Math.round(Math.random() * initial.viewboxY),
      id: uuid()
    });

    selected.points = selected.points;
  };

  $: removePoint = id => {
    let points = selected.points;
    let ix = points.findIndex(i => i.id === id);
    points.splice(ix);

    selected.points = points;
  };

  $: svg = `<svg id="svg" viewBox="0 0 ${selected.viewboxX},${
    selected.viewboxY
  }" xmlns="http://www.w3.org/2000/svg">
  <polygon
    fill="${fill()}"
    fill-rule="${selected.fillRule}"
    stroke="${selected.strokeColor}"
    stroke-width="${selected.strokeWidth}"
    stroke-linecap="${selected.strokeLinecap}"
    stroke-linejoin="${selected.strokeLinejoin}"
    points="${points()}" />
</svg>`;

  // Track the mouse coordinates relative to the viewport
  function trackMouse(event) {
    [mouse.x, mouse.y] = pixelToViewport(
      event.offsetX,
      event.offsetY,
      document.getElementById("svg"),
      initial.viewboxX,
      initial.viewboxY
    );
  }

  function pickVertex(event) {
    // Viewport position of the "picked" vertex = position of mouse when button is clicked
    const [x, y] = pixelToViewport(
      event.offsetX,
      event.offsetY,
      document.getElementById("svg"),
      initial.viewboxX,
      initial.viewboxY
    );

    // Do the coordinates at the mouse position match any of the polygon's vertices?
    const ix = selected.points.findIndex(p => p.x === x && p.y === y);
    if (ix > -1) {
      [selected.pickedVertex.x, selected.pickedVertex.y] = [x, y];
    }
  }

  function dropVertex(event) {
    // Exit early if no vertex was picked in the first place
    if (!selected.pickedVertex) return;

    // Viewport Position of the "dropped" vertex = position of mouse when button is released
    const [x, y] = pixelToViewport(
      event.offsetX,
      event.offsetY,
      document.getElementById("svg"),
      initial.viewboxX,
      initial.viewboxY
    );

    // Find the initial coordinates of the picked vertex...
    const ix = selected.points.findIndex(
      p => p.x === selected.pickedVertex.x && p.y === selected.pickedVertex.y
    );

    if (ix > -1) {
      // ...and update them with the dropped coordinates
      [selected.points[ix].x, selected.points[ix].y] = [x, y];

      // reset the picked vertex
      selected.pickedVertex = initial.pickedVertex;
    }
  }
</script>

<style lang="scss">

</style>

<div class="space-y-4 p-0 sm:p-4">
  <h1 class="text-center">SVG Polygon builder</h1>

  <!-- Stroke & Fill controls -->
  <section class="max-w-sm mx-auto bg-white shadow p-2 space-y-2">

    <div class="flex justify-between items-center">
      <h2>Stroke + Fill</h2>
      <button type="button" class="btn--indigo" on:click={reset()}>
        reset
      </button>
    </div>

    <div class="space-y-2">
      <Slider
        label="Stroke Width"
        min="0"
        max="10"
        bind:value={selected.strokeWidth} />

      <Dropdown
        label="Stroke Linecap"
        values={['butt', 'round', 'square']}
        bind:selected={selected.strokeLinecap} />

      <Dropdown
        label="Stroke Linejoin"
        values={['miter', 'round', 'bevel', 'miter-clip', 'arcs']}
        bind:selected={selected.strokeLinejoin} />

      <ColorPicker label="Stroke Color" bind:value={selected.strokeColor} />

      <div class="flex flex-col">
        <Checkbox label="Fill" bind:checked={selected.fill} />

        {#if selected.fill}
          <ColorPicker bind:value={selected.fillColor} />
        {/if}
      </div>

      <Dropdown
        label="Fill Rule"
        values={['nonzero', 'evenodd']}
        bind:selected={selected.fillRule} />
    </div>
  </section>

  <!-- Points -->
  <section class="bg-white shadow p-2 space-y-2">
    <div class="flex justify-between items-center">
      <h2>Points</h2>
      <button type="button" class="btn--indigo" on:click={addPoint()}>
        add point
      </button>
    </div>

    {#each selected.points as point, i}
      <div class="flex flex-col">
        <em class="flex items-center space-x-2 text-xs text-left">
          <span>point {i + 1} (x,y)</span>

          {#if typeof selected.points[i].id !== 'undefined'}
            <button
              type="button"
              class="text-red-600"
              on:click={removePoint(selected.points[i].id)}>
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15">
                <path
                  d="M4 7.5h7m-3.5 7a7 7 0 110-14 7 7 0 010 14z"
                  stroke="currentColor" />
              </svg>
            </button>
          {/if}
        </em>
        <Slider
          min="0"
          max={selected.viewboxX}
          bind:value={selected.points[i].x} />
        <Slider
          min="0"
          max={selected.viewboxY}
          bind:value={selected.points[i].y} />
      </div>
    {/each}
  </section>

  <!-- Rendered SVG output -->
  <section class="flex flex-col">
    <div class="flex justify-between items-center">
      <!-- Mouse -->
      <div class="space-x-2 text-xs font-mono">
        <span>x: {mouse.x}</span>
        <span>y: {mouse.y}</span>
      </div>

      <!-- Download -->
      <a
        href="data:image/svg+xml;charset=UTF-8,{svg}"
        download="polygon.svg"
        class="flex text-white font-mono text-xs px-1 bg-pink-500 border-4
        border-pink-500 hover:border-pink-600 hover:shadow">
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15">
          <path
            d="M7.5 10.5l-3.25-3m3.25 3l3-3m-3 3V1m6 6v6.5h-12V7"
            stroke="currentColor" />
        </svg>
        &nbsp;.SVG
      </a>
    </div>

    <div
      class="bg-white shadow"
      on:mousemove={trackMouse}
      on:mousedown={pickVertex}
      on:mouseup={dropVertex}>
      {@html svg}
    </div>
  </section>

  <!-- Generated SVG code -->
  <section class="bg-white shadow">
    <pre class="text-xs text-left overflow-auto shadow-inner p-2 bg-white">
      {svg}
    </pre>
  </section>
</div>
