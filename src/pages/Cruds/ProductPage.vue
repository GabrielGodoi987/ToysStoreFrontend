<template>
  <q-page class="q-pa-md">
    <div>
      <div class="text-h3 q-pa-md">Administração - brinquedos</div>
    </div>

    <section>
      <ToysTable v-model:create-dialog="createDialog" />
      <div class="w-full">
        <AbsoluteBottomLeftButton label="Adicionar" color="secondary" width="350px"
          @click="createDialog = !createDialog" />
      </div>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import AbsoluteBottomLeftButton from 'src/components/buttons/AbsoluteBottomLeftButton.vue';
import ToysTable from './toys/ToysTable.vue';
import { ref } from 'vue'

const createDialog = ref<boolean>(false);

</script>

<style></style>
