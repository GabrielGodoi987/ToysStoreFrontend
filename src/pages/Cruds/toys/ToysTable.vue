<template>
  <main class="q-pa-md">
    <q-table flat bordered :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <div class="row justify-center items-center q-gutter-x-md">
            <q-btn flat color="negative" round dense icon="delete" @click="openDeleteDialog(props.row.id)" />
            <q-btn flat color="primary" round dense icon="edit" @click="openEditDialog(props.row.id)" />
          </div>
        </q-td>
      </template>
    </q-table>
  </main>

  <!--dialog de criar brinquedo-->
  <section>
    <CardModal title="Adicionar Produto" v-model:is-open="createDialog">
      <template #content>
        <form>
          <div class="q-gutter-md">
            <InputComponent label="Título do Produto" hint="Título" v-model:model="toy.name" />
            <InputComponent label="Categoria do Produto" hint="Categoria" v-model:model="toy.categoryId.name" />
            <InputComponent label="Preço do Produto" hint="Preço" v-model:model="toy.price" />
          </div>

          <div class="q-mt-md flex justify-center">
            <ConfirmActionButton label="Adicionar" color="secondary" type="submit" class="text-white" />
          </div>
        </form>
      </template>
    </CardModal>
  </section>

  <!--dialog para editar brinquedo-->
  <section>
    <CardModal title="Editar Produto" v-model:is-open="editDialog">
      <template #content>
        <form @submit.prevent="editToy">
          <div class="q-gutter-md">
            <InputComponent label="Título do Produto" hint="Título" v-model="toy.name" />
            <InputComponent label="Categoria do Produto" hint="Categoria" v-model="toy.categoryId.name" />
            <InputComponent label="Preço do Produto" hint="Preço" v-model="toy.price" />
          </div>
          <div class="q-mt-md row justify-center">
            <ConfirmActionButton label="Salvar" color="secondary" type="submit" class="text-white" @click="editToy" />
          </div>
        </form>
      </template>
    </CardModal>
  </section>

  <!--Dialog para deletar brinquedo-->
  <section>
    <CardModal title="Deletar categoria" v-model:is-open="deleteDialog">
      <template #content>
        <form @submit.prevent="deleteToy">
          <div class="text-h5 text-weight-light">
            Tem certeza que quer deletar a categoria {{ toy.categoryId.name }}?
          </div>
          <div class="row justify-center q-mt-xl">
            <ConfirmActionButton label="Excluir" color="negative" @click="deleteToy" />
          </div>
        </form>
      </template>
    </CardModal>
  </section>

  <!--Dialog para deletar vários brinquedos-->
  <section>
    <CardModal title="Adicionar Produto" v-model:is-open="createDialog">
      <template #content>
        <form @submit.prevent="createToy">
          <div class="q-gutter-md">
            <InputComponent label="Título do Produto" hint="Título" v-model:model="toy.name" />
            <InputComponent label="Categoria do Produto" hint="Categoria" v-model:model="toy.categoryId.name" />
            <InputComponent label="Preço do Produto" hint="Preço" v-model:model="toy.price" />
          </div>

          <div class="q-mt-md row justify-center">
            <ConfirmActionButton label="Adicionar" color="secondary" type="submit" class="text-white"
              @click="createToy" />
          </div>
        </form>
      </template>
    </CardModal>
  </section>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import type { IToys } from 'src/interfaces/IToys';
import { ToysService } from 'src/services/ToysService';
import { onMounted, ref, watch } from 'vue';
import { columns } from './config/toyColumns.config';
import CardModal from 'src/components/modals/CardModal.vue';
import InputComponent from 'src/components/inputs/InputComponent.vue';
import ConfirmActionButton from 'src/components/buttons/ConfirmActionButton.vue';

const rows = ref<IToys[]>([]);
const toysService: ToysService = new ToysService('/toys');
const createDialog = defineModel('createDialog', {
  type: Boolean,
  default: false,
  required: true,
})
const editDialog = ref<boolean>(false);
const deleteDialog = ref<boolean>(false);

const toy = ref<IToys>({
  id: null,
  name: '',
  description: '',
  shortDescription: '',
  price: 0,
  specifications: [],
  categoryId: {
    id: null,
    name: '',
    url: ''
  },
  photos: []
})

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

const openEditDialog = (id: number) => {
  const element = rows.value.find(e => e.id == id);
  if (element) {
    toy.value = element;
    console.log(toy.value)
    editDialog.value = !editDialog.value;
  } else {
    Notify.create({
      message: "Elemento não encontrado na lista",
      caption: "O elemento já foi deletado",
      color: 'warning',
      timeout: 2000,
      position: 'top-left'
    })
  }
}

const openDeleteDialog = (id: number) => {
  const element = rows.value.find(e => e.id == id);
  if (element) {
    toy.value = element;
    deleteDialog.value = !deleteDialog.value
  } else {
    Notify.create({
      message: "O brinquedo não foi encontrado",
      caption: 'O brinquedo pode ter sido deletado anteriormente',
      color: 'warning',
      position: 'top-left',
      timeout: 2000
    })
  }
}
const editToy = async () => {
  if (toy.value.id == null || toy.value.name == '') {
    Notify.create({
      message: "Digite um nome válido para o brinquedo",
      caption: "O brinquedo foi enviado vazio, o sistema não aceita isso",
      color: 'warning',
      position: "top-right",
      timeout: 2000
    })
    editDialog.value = false;
    return;
  }
  const res = await toysService.updateToy(toy.value.id, toy.value)
  if (res.status !== 200) {
    Notify.create({
      message: "Erro ao editar novo brinquedo",
      color: "negative",
      position: "top-left",
      timeout: 200
    })
    editDialog.value = false
    return;
  }

  Notify.create({
    message: 'Brinquedo editado com sucesso',
    color: "positive",
    position: 'top-left',
    timeout: 2000
  })
  editDialog.value = false;
}

const createToy = async () => {
  const res = await toysService.createToy(toy.value);
  if (res.status !== 200) {
    Notify.create({
      message: "Erro ao criar novo brinquedo",
      color: "negative",
      position: "top-left",
      timeout: 200
    })
    createDialog.value = false
    return;
  }
  rows.value.push(res.data);
  Notify.create({
    message: 'Brinquedo criado com sucesso',
    color: "positive",
    position: 'top-left',
    timeout: 2000
  })
  createDialog.value = false;
}


const deleteToy = async () => {
  if (toy.value.id == null) {
    return;
  }
  const res = await toysService.deleteOneToy(toy.value.id);
  if (res.status !== 204) {
    Notify.create({
      message: "Erro ao deletar brinquedo",
      color: "negative",
      position: "top-left",
      timeout: 200
    })
    deleteDialog.value = false
    return;
  }
  const index = rows.value.findIndex(e => e.id == toy.value.id);
  rows.value.splice(index, 1)
  Notify.create({
    message: 'Brinquedo deletado com sucesso',
    color: "positive",
    position: 'top-left',
    timeout: 2000
  })
  deleteDialog.value = false;
}



onMounted(async () => {
  rows.value = await fetchToys();
})

watch(createDialog, (newValue, oldValue) => {
  if (newValue != oldValue) {
    toy.value = {
      id: null,
      name: '',
      description: '',
      shortDescription: '',
      price: 0,
      specifications: [],
      categoryId: {
        id: null,
        name: '',
        url: ''
      },
      photos: []
    }
  }
})
</script>

<style></style>
