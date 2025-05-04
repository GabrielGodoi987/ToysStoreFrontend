<template>
  <q-dialog :backdrop-filter="backDropfilter" square v-model="isOpen" class="row">
    <q-card class="q-pa-lg col-md-12 col-lg-6 col-xl-4 my-card">
      <q-toolbar>
          <div class="text-h5">{{ title }}</div>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
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
  max-width: 50%
  border-radius: 40px
</style>
