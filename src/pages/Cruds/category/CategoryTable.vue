<template>
  <main class="q-pa-md">
    <q-table flat bordered :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <div class="row justify-center items-center q-gutter-x-md">
            <q-btn flat color="negative" round dense icon="delete" @click="openDeleteCategoryDialog(props.row.id)" />
            <q-btn flat color="primary" round dense icon="edit" @click="openEditCategoryDialog(props.row.id)" />
          </div>
        </q-td>
      </template>
    </q-table>
  </main>
  <section v-if="category">
    <CardModal :title="`Editar categoria ${category.name}`" back-dropfilter="blur(5px)"
      v-model:is-open="openEditDialog">
      <template #content>
        <form>
          <InputComponent label="Editar nome" v-model:model="category.name" hint="Coloque o novo nome da categoria" />
          <div class="row">
            <ConfirmActionButton label="Editar Categoria" color="secondary" />
          </div>
        </form>
      </template>
    </CardModal>
  </section>

  <section>
    <CardModal title="Exclusão de categoria" back-dropfilter="blur(5px)" v-model:is-open="openDeleteDialog">
      <template #content>
        <div class="text-h6">
          Tem certeza que quer deletar a categoria x?
        </div>
        <div class="text-center">
          <q-btn label="Deletar" color="negative" rounded class="q-pa-md" />
        </div>
      </template>
    </CardModal>
  </section>

  <!--Quando clicar no botão de adicionar acionamos esse cara e após isso abrimos o formulário para adicionar novas categorias de brinquedos e tudo mais-->
  <section>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from './config/categoryColumns.config';
import { CategoryService } from 'src/services/CategoryService';
import type { ICategory } from 'src/interfaces/ICategory';
import { Notify } from 'quasar';
import CardModal from 'src/components/modals/CardModal.vue';
import InputComponent from 'src/components/inputs/InputComponent.vue';
import ConfirmActionButton from 'src/components/buttons/ConfirmActionButton.vue';

const categoryService: CategoryService = new CategoryService('/categories');
const rows = ref<ICategory[]>([]);
const category = ref<ICategory | null>({
  id: 0,
  name: '',
  url: ''
});
const openEditDialog = ref<boolean>(false);
const openDeleteDialog = ref<boolean>(false);

const openEditCategoryDialog = (id: number) => {
  category.value = null;
  const element = rows.value.find(e => e.id === id);
  if (element) {
    category.value = element;
    openEditDialog.value = !openEditDialog.value;
  } else {
    console.warn(`Categoria com id ${id} não encontrada.`);
  }
}

const openDeleteCategoryDialog = (id: number) => {
  openDeleteDialog.value = !openDeleteDialog.value;
  alert(id);
}

const fetchCategories = async () => {
  try {
    const response = await categoryService.getCategories();
    if (response.status !== 200) {
      Notify.create({
        type: 'negative',
        message: 'Erro ao buscar categorias',
        position: 'top-right',
      });
      return null;
    }
    Notify.create({
      type: 'positive',
      message: 'Categorias buscadas com sucesso',
      position: 'top-right',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};


onMounted(async () => {
  rows.value = await fetchCategories();
  console.log(rows.value);
})
</script>

<style></style>
