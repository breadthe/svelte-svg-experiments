<script>
  import { onMount } from "svelte";

  const colorPickers = ["#bg-color", "#stroke-color"]; //"#fill-color",

  // initial values
  const initial = {
    height: 200,
    width: 200,
    bg: "#fff",
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 100,
      y: 100
    },
    fill: {
      color: "#fff"
    },
    stroke: {
      width: 1,
      color: "#f80"
    }
  };

  const reset = () => {
    const init = JSON.parse(JSON.stringify(initial));
    return init;
  };

  // user selections
  let selected = reset();

  let shapes = [{}];

  $: makeShape = () => `<svg
  height=${selected.height}
  width=${selected.height}
  viewBox="0 0 100 100"
  style="background-color: ${selected.bg}"
  stroke-width=${selected.stroke.width}>
  <path
    d="M ${selected.start.x},${selected.start.y} L ${selected.end.x},${selected.end.y}"
    fill="${selected.fill.color}"
    stroke="${selected.stroke.color}"
  />
</svg>`; // class="fill-current stroke-current text-black"

  onMount(() => {
    // var colorPickers = ["#bg-color", "#stroke-color"]; //"#fill-color",

    for (var i = 0; i < colorPickers.length; i++) {
      var hueb = new Huebee(colorPickers[i], {
        notation: "hex",
        saturations: 2
      });
      hueb.on("change", function(color) {
        switch (this.anchor.id) {
          case "bg-color":
            selected.bg = color;
            break;
          // case "fill-color":
          // selected.fill.color = color;
          // break;
          case "stroke-color":
            selected.stroke.color = color;
            break;
        }
      });
    }
  });
</script>

<style lang="scss">

</style>

<div class="w-full flex flex-row">
  <div class="max-w-xs flex flex-col mr-8">
    <button type="button" on:click={() => (selected = reset())}>reset</button>

    <hr class="my-2" />

    <div class="flex flex-col items-start bg-gray-100 p-2 rounded">
      <strong>Background</strong>
      <label class="w-full flex items-center justify-between">
        Color
        <input
          type="text"
          id="bg-color"
          class="px-1 w-20 shadow-inner border rounded"
          bind:value={selected.bg} />
      </label>
    </div>

    <hr class="my-2" />

    <div class="flex flex-col items-start bg-gray-100 p-2 rounded">
      <strong>Start</strong>
      <label class="w-full flex items-center justify-between">
        X
        <input
          type="range"
          min={initial.start.x}
          max={initial.end.x}
          bind:value={selected.start.x} />
        <input
          type="number"
          class="px-1 shadow-inner border rounded"
          min={initial.start.x}
          max={initial.end.x}
          bind:value={selected.start.x} />
      </label>
      <label class="w-full flex items-center justify-between">
        Y
        <input
          type="range"
          min={initial.start.y}
          max={initial.end.y}
          bind:value={selected.start.y} />
        <input
          type="number"
          class="px-1 shadow-inner border rounded"
          min={initial.start.y}
          max={initial.end.y}
          bind:value={selected.start.y} />
      </label>

      <strong>End</strong>
      <label class="w-full flex items-center justify-between">
        X
        <input type="range" min="0" max="100" bind:value={selected.end.x} />
        <input
          type="number"
          class="px-1 shadow-inner border rounded"
          min={initial.start.x}
          max={initial.end.x}
          bind:value={selected.end.x} />
      </label>
      <label class="w-full flex items-center justify-between">
        Y
        <input type="range" min="0" max="100" bind:value={selected.end.y} />
        <input
          type="number"
          class="px-1 shadow-inner border rounded"
          min={initial.start.y}
          max={initial.end.y}
          bind:value={selected.end.y} />
      </label>
    </div>

    <hr class="my-2" />

    <div class="flex flex-col items-start bg-gray-100 p-2 rounded">
      <strong>Stroke</strong>
      <label class="w-full flex items-center justify-between">
        Width
        <input
          type="range"
          min="1"
          max="5"
          bind:value={selected.stroke.width} />
        <input
          type="number"
          class="px-1 shadow-inner border rounded"
          min="1"
          max="5"
          bind:value={selected.stroke.width} />
      </label>

      <label class="w-full flex items-center justify-between">
        Color
        <input
          type="text"
          id="stroke-color"
          class="px-1 w-20 shadow-inner border rounded"
          bind:value={selected.stroke.color} />
      </label>
    </div>
  </div>

  <div class="relative flex-1 flex">
    <div class="absolute bg-white">
      {@html makeShape()}
    </div>
  </div>
</div>

<hr class="my-2" />

<div class="text-left">
  <strong>Output</strong>
  <pre class="bg-gray-100 rounded p-2 overflow-auto text-left">
    {makeShape()}
  </pre>
</div>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  style="background-color: white; margin-top:100px">
  <!-- <circle cx="10" cy="10" r="10" stroke="aquamarine" fill="pink" stroke-width="1" /> -->
  <!-- <circle cx="10" cy="10" r="5" fill="chocolate" /> -->
  <!-- <rect x="10" y="10" width="10" height="10" fill="plum" stroke="powderblue" stroke-width="1" /> -->
  <!-- <path d="M0,30 L50,50 l0-20 Z" fill="chartreuse" stroke="beige" stroke-width="1" /> -->
  <!-- <path d="M100,100 L50,50 l0-20 Z" fill="darksalmon" stroke="darkslateblue" stroke-width="1" /> -->
  <!-- <path d="M20,20 C0,120,180,0,5,15 " fill="gold" stroke="forestgreen" stroke-width="1" /> -->
  <!-- <path d="M40,50 C140,-10,80,130,20,90,10,-20,90,30,90,80 z" fill="goldenrod" stroke="magenta" stroke-width="1" /> -->
  <!-- <path d="M40,50 C140,-10,80,130,20,90,120,-30,110,50,30,70" fill="mediumspringgreen" stroke="navy" stroke-width="1" /> -->
  <ellipse id="elip" cx="50" cy="50" rx="40" ry="10" fill="olive" />
  <use href="#elip" x="10" y="10" fill-opacity="0.3" stroke="peru" />
  <use href="#elip" x="-10" y="-10" fill-opacity="0.5" stroke="blueviolet" />
  <!-- <polyline points="0,0 20,50 50,50 100,100 90,40" fill="" fill-opacity="0.3" stroke="olivedrab" stroke-width="2" stroke-linecap="round" /> -->
  <!-- <polygon points="0,0 20,50 50,50 100,100 90,40 30,60 60,30" fill="peachpuff" fill-opacity="0.5" stroke="orangered" /> -->

  <style>
    .txt {
      fill: red;
      font-size: 10px;
    }
  </style>
  <text x="25" y="25" class="txt">blueviolet</text>
</svg>

<hr class="my-2" />
