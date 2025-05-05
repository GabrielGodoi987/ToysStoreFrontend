<template>
  <main class="q-pa-md">
    {{ category }}
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
        <form @submit.prevent="editCategory">
          <InputComponent label="Editar nome" v-model="category.name" hint="Coloque o novo nome da categoria" />
          <div class="row justify-center q-mt-md">
            <ConfirmActionButton label="Editar Categoria" color="secondary" @click="editCategory" />
          </div>
        </form>
      </template>
    </CardModal>
  </section>

  <section>
    <CardModal title="Exclusão de categoria" back-dropfilter="blur(5px)" v-model:is-open="openDeleteDialog">
      <template #content>
        <form @submit.prevent="deleteCategory">
          <div class="text-h5 text-weight-light">
            Tem certeza que quer deletar a categoria {{ category.name }}?
          </div>
          <div class="row justify-center q-mt-xl">
            <ConfirmActionButton label="Excluir" color="negative" @click="deleteCategory" />
          </div>
        </form>
      </template>
    </CardModal>
  </section>

  <!--Quando clicar no botão de adicionar acionamos esse cara e após isso abrimos o formulário para adicionar novas categorias de brinquedos e tudo mais-->
  <section>
    <CardModal title="Adicionar Categoria" :isOpen="createDialog">
      <template #content>
        <form action="post" @submit.prevent="createCategory">
          <InputComponent v-model="category.name" label="Nome da categoria" hint="Digite o nome da categoria" />
          <div class="row q-mt-lg justify-center">
            <ConfirmActionButton label="Salvar" color="secondary" @click="createCategory" />
          </div>
        </form>
      </template>
    </CardModal>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { columns } from './config/categoryColumns.config';
import { CategoryService } from 'src/services/CategoryService';
import type { ICategory } from 'src/interfaces/ICategory';
import { Notify } from 'quasar';
import CardModal from 'src/components/modals/CardModal.vue';
import InputComponent from 'src/components/inputs/InputComponent.vue';
import ConfirmActionButton from 'src/components/buttons/ConfirmActionButton.vue';

const categoryService: CategoryService = new CategoryService('/categories');
const rows = ref<ICategory[]>([]);
const category = ref<ICategory>({
  id: null,
  name: '',
  url: ''
});
const createDialog = defineModel('createDialog', {
  type: Boolean,
  default: false,
  required: true
})
const openEditDialog = ref<boolean>(false);
const openDeleteDialog = ref<boolean>(false);

const openEditCategoryDialog = (id: number) => {
  category.value = {
    id: null,
    name: '',
    url: ''
  };
  const element = rows.value.find(e => e.id === id);
  if (element) {
    category.value = element;
    openEditDialog.value = !openEditDialog.value;
  } else {
    console.warn(`Categoria com id ${id} não encontrada.`);
  }
}

const openDeleteCategoryDialog = (id: number) => {
  const element = rows.value.find(e => e.id === id);
  if (element) {
    category.value = element;
    openDeleteDialog.value = !openDeleteDialog.value;
  } else {
    console.warn(`Categoria com id ${id} não encontrada.`);
  }
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

const createCategory = async () => {
  const res = await categoryService.createCategory(category.value);
  if (res.status !== 201) {
    console.log(res)
    Notify.create({
      message: "Categoria não foi criada",
      color: "negative",
      position: "top-left",
      timeout: 2000
    })
  }
  Notify.create({
    message: "Categoria criada com sucesso",
    color: "positive",
    position: "top-left",
    timeout: 2000
  })

  rows.value.push(res.data)

  createDialog.value = false;

  category.value = {
    id: 0,
    url: '',
    name: ''
  }
}

const deleteCategory = async () => {
  if (category.value.id == null) {
    Notify.create({
      message: 'Não podem ter campos vazios',
      color: 'negative',
      timeout: 2000,
      position: 'bottom-left'
    })
    return;
  }
  const res = await categoryService.deleteCategory(category.value.id);
  if (res.status !== 204) {
    Notify.create({
      message: `Erro ao deletar categoria ${category.value.id}`,
      color: "negative",
      position: "top-left",
      timeout: 2000
    })
  }
  const index = rows.value.findIndex(e => e.id == category.value.id);
  rows.value.splice(index, 1)
  Notify.create({
    message: "Categoria deletada com sucesso",
    color: "positive",
    position: "top-left",
    timeout: 2000
  })

  openDeleteDialog.value = false
}

const editCategory = async () => {
  if (category.value.id == null || category.value.name == '') {
    Notify.create({
      message: "Digite um nome válido para a categoria",
      caption: "A categoria foi enviada vazia, o sistema não aceita isso",
      color: 'warning',
      position: "top-right",
      timeout: 2000
    })
    openEditDialog.value = false
    return;
  }
  const res = await categoryService.updateCategory(category.value.id, category.value)
  if (res.status !== 200) {
    Notify.create({
      message: `Erro ao editar categoria: ${category.value.name}`,
      color: "negative",
      position: "top-left",
      timeout: 2000
    })
  }
  Notify.create({
    message: "Categoria Editada com sucesso",
    color: "positive",
    position: "top-left",
    timeout: 2000
  })
  openEditDialog.value = false
}


onMounted(async () => {
  rows.value = await fetchCategories();
  console.log(rows.value);
})

watch(createDialog, (newValue, oldValue) => {
  if (newValue != oldValue) {
    category.value = {
      id: null,
      name: '',
      url: ''
    }
  }
})
</script>

<style></style>
