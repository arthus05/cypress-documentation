<template>
  <div :class="$style.embedContainer">
    <slot />
  </div>
</template>

<style module>
.embedContainer {
  position: relative;
  padding-bottom: 56.25%;
  overflow: hidden;
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
  box-shadow: 0 0 3px rgb(0 0 0 / 30%);
  border: 1px solid #ddd;
}

.embedContainer iframe,
.embedContainer object,
.embedContainer embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
