<template>
  <q-dialog :backdrop-filter="backDropfilter" square v-model="isOpen" class="flex flex-center rounded-borders">
    <q-card class="my-card">
      <q-toolbar class="bg-primary text-white rounded-borders q-pa-md">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup class="text-white hover-scale" />
      </q-toolbar>

      <q-card-section class="q-pa-md">
        <slot name="content"></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
const isOpen = defineModel('isOpen', {
  type: Boolean,
  required: true
})

defineProps({
  title: {
    type: String,
    required: true
  },
  backDropfilter: {
    type: String,
    default: 'blur(5px)'
  }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
  border-radius: 24px
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2)
  background: white
  transition: transform 0.3s ease

.hover-scale:hover
  transform: scale(1.1)

.q-dialog__inner--minimized
  align-items: center
</style>
