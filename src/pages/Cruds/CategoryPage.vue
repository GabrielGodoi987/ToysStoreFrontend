<template>
  <q-page class="q-pa-md">
    <div>
      <div class="text-h3 text-weight-bold text-primary catalog-title">Administração de Categoria</div>
    </div>

    <section>
      <CategoryTable v-model:createDialog="createDialog"/>
      <div class="w-full">
        <AbsoluteBottomLeftButton
          label="Adicionar Categoria"
          color="secondary"
          width="350px"
          @click="createDialog = !createDialog"
        />
      </div>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import AbsoluteBottomLeftButton from 'src/components/buttons/AbsoluteBottomLeftButton.vue';
import CategoryTable from './category/CategoryTable.vue';
import { ref } from 'vue';
const createDialog = ref<boolean>(false);

</script>

<style></style>
