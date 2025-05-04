<template>
  <q-page class="q-pa-md">
    <div>
      <div class="q-pa-md text-h3">Administração - Categoria</div>
    </div>

    <section>
      <CategoryTable />
      <div class="w-full">
        <AbsoluteBottomLeftButton label="Adicionar Categoria" color="secondary" width="350px"
          @click="createDialog = !createDialog" />
      </div>
    </section>

    <section>
      <CardModal title="Adicionar Categoria" :isOpen="createDialog">
        <template #content>
          <form action="post">
            <InputComponent v-model:model="nome" label="Nome da categoria" hint="Digite o nome da categoria" />
            <div class="row q-mt-lg justify-center">

            </div>
          </form>
        </template>
      </CardModal>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import AbsoluteBottomLeftButton from 'src/components/AbsoluteBottomLeftButton.vue';
import CategoryTable from './category/CategoryTable.vue';
import { ref } from 'vue';
import CardModal from 'src/components/modals/CardModal.vue';
import InputComponent from 'src/components/inputs/InputComponent.vue';

const createDialog = ref<boolean>(false);
const nome = ref<string>('');

</script>

<style></style>
