<template>
  <div class="q-pa-md">
    <q-table flat bordered :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <div class="row justify-center items-center q-gutter-x-md">
            <q-btn flat color="negative" round dense icon="delete" />
            <q-btn flat color="primary" round dense icon="edit" />

          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from './config/categoryColumns.config';
import { CategoryService } from 'src/services/CategoryService';
import type { ICategory } from 'src/interfaces/ICategory';
import { Notify } from 'quasar';

const categoryService: CategoryService = new CategoryService('/categories');
const rows = ref<ICategory[]>([]);

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
