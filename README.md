# Pandemicjs

Pandemicjs is a simple pandemic simulation.

![Image](https://github.com/moekidev/pandemicjs/blob/main/docs/image.gif)

## Installation

```
npm i -D pandemicjs
```

or

```
yarn add -D pandemicjs
```

or

```html
<script type="module">
  import { Pandemic } from 'https://cdn.jsdelivr.net/npm/pandemicjs@1.0.0/dist/index.esm.min.js'
</script>
```

## Usage

```html
<div class="world" style="height: 800px; width: 800px;"></div>
```

```js
import { Pandemic } from 'pandemicjs'

new Pandemic(',world', {
  n: 800,
  fps: 30,
  play: false, // you can manipulate a virus source
  hospital: false,
  splashDistance: 30,
  infectionRate: 0.1,
  onsetPeriod: 100,
  antiBodyPeriod: 200
})
```
