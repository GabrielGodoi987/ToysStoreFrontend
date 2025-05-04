<template>
  <div>
    <q-input
      v-model="data"
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
const data = defineModel('model', {
  type: String,
  default: '',
  required: true
});
</script>

<style></style>
