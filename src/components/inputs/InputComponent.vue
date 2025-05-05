<template>
  <div>
    <q-input
      v-model="model"
      standout="bg-transparent text-black"
      :label="label"
      :hint="hint"
      input-class="text-black">
    </q-input>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    required: true
  }
})
const model = defineModel<any>();
</script>

<style></style>
