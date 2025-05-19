<template>
  <div class="custom-input">
    <q-input
      v-model="model"
      standout="bg-gray-1 text-black"
      :label="label"
      :hint="hint"
      outlined
      dense
      input-class="text-weight-medium text-grey-9"
      label-class="text-grey-7"
      hint-class="text-grey-6 q-pl-xs"
      class="q-mb-sm rounded-borders"
      type="text"
      prefix="R$"
    >
      <template v-slot:prepend>
        <q-icon name="attach_money" size="xs" color="grey-6" />
      </template>
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

<style scoped>
.custom-input .q-field--outlined .q-field__control:before {
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: border-color 0.3s ease;
}

.custom-input .q-field--focused .q-field__control:before {
  border: 1px solid var(--q-primary) !important;
}
</style>