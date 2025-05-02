<template>
  <q-page class="q-pa-md">
    <div>
      <div class="q-pa-md text-h3">Administração - Categoria</div>
    </div>

    <section>
      <CategoryTable />
      <div class="w-full">
        <AbsoluteBottomLeftButton label="Adicionar Categoria" color="secondary" width="350px" />
      </div>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import AbsoluteBottomLeftButton from 'src/components/AbsoluteBottomLeftButton.vue';
import CategoryTable from './category/CategoryTable.vue';

</script>

<style></style>
