# &lt;hunch-carousel>

A carousel/slider element.

## Observed attributes

| name | type |
| --- | --- |
| interval | number |

## Usage

```html
<hunch-carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
</hunch-carousel>
```

## Example

<style>
.slide {
object-fit: cover;
}
</style>

### Default

<template id="live-style">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism.min.css" />
  <style>
  ::slotted(*) {
    overflow: hidden;
  }
  </style>
</template>

<live-element style-template-id="live-style">
<textarea>
<hunch-carousel style="height: 15rem;" interval="2000">
  <img
    src="https://images.unsplash.com/photo-1581252397779-5d758caff3cb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNDY4M30"
    class="slide"
  />
  <img
    src="https://images.unsplash.com/photo-1581252165204-d54f656e8ce8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNDY4M30"
    class="slide"
  />
  <img
    src="https://images.unsplash.com/photo-1581465823028-58e550a703a0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNDY4M30"
    class="slide"
  />
</hunch-carousel>
</textarea>
</live-element>

### Crossfade

<live-element style-template-id="live-style">
<textarea>
<hunch-carousel style="height: 15rem;" crossfade>
  <img
    src="https://images.unsplash.com/photo-1581252397779-5d758caff3cb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNDY4M30"
    class="slide"
  />
  <img
    src="https://images.unsplash.com/photo-1581252165204-d54f656e8ce8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNDY4M30"
    class="slide"
  />
  <img
    src="https://images.unsplash.com/photo-1581465823028-58e550a703a0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNDY4M30"
    class="slide"
  />
</hunch-carousel>
</textarea>
</live-element>

<script src="../src/hunch-carousel.ts"></script>
