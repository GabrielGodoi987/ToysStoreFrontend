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
import { Notify } from 'quasar';
import type { IToys } from 'src/interfaces/IToys';
import { ToysService } from 'src/services/ToysService';
import { onMounted, ref } from 'vue';
import { columns } from './config/toyColumns.config';

const rows = ref<IToys[]>([]);
const toysService = new ToysService('/toys');

const fetchToys = async () => {
  try {
    const response = await toysService.getAll();
    if (response.status !== 200) {
      Notify.create({
        type: 'negative',
        message: 'Erro ao buscar brinquedos',
        position: 'top-right',
      });
      return null;
    }
    Notify.create({
      type: 'positive',
      message: 'Brinquedos buscados com sucesso',
      position: 'top-right',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching toys:', error);
    return [];
  }
};

onMounted(async () =>{
  rows.value = await fetchToys();
  console.log(rows.value);
})
</script>

<style>

</style>
