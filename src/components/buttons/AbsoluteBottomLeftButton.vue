<template>
  <div class="absolute-bottom-left q-pa-md">
    <q-btn class="q-mb-md q-pa-md" :style="`width: ${width}`" rounded :color="color" :label="label" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: String,
  color: String,
  width: String,
});
</script>

<style></style>
