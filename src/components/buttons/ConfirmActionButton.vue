<template>
  <div>
    <q-btn class="col-6 q-pa-md" :label="label" :color="color" rounded />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})
</script>

<style></style>
