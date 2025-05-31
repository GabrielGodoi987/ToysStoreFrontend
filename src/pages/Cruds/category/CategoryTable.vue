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

  <!-- EDITAR CATEGORIA -->
  <section v-if="category">
    <CardModal 
      :title="`Editar categoria ${category.name}`" 
      back-dropfilter="blur(5px)" 
      v-model:is-open="openEditDialog"
    >
      <template #content>
        <form @submit.prevent="editCategory">
          {{ category }}
          <InputComponent 
            label="Editar nome" 
            v-model="category.name" 
            hint="Coloque o novo nome da categoria" 
          />
          <div class="row justify-center q-mt-md">
            <ConfirmActionButton 
              label="Editar Categoria" 
              color="secondary" 
              @click="editCategory" 
            />
          </div>
        </form>
      </template>
    </CardModal>
  </section>

  <!-- DELETAR CATEGORIA -->
  <section>
    <CardModal 
      title="Exclusão de categoria" 
      back-dropfilter="blur(5px)" 
      v-model:is-open="openDeleteDialog"
    >
      <template #content>
        <form @submit.prevent="deleteCategory">
          <div class="text-h5 text-weight-light">
            Tem certeza que quer deletar a categoria {{ category.name }}?
          </div>
          <div class="row justify-center q-mt-xl">
            <ConfirmActionButton 
              label="Excluir" 
              color="negative" 
              @click="deleteCategory" 
            />
          </div>
        </form>
      </template>
    </CardModal>
  </section>

  <!-- ADICIONAR CATEGORIA -->
  <section>
    <CardModal 
      title="Adicionar Categoria" 
      :isOpen="createDialog"
    >
      <template #content>
        <form @submit.prevent="createCategory">
          <InputComponent 
            v-model="category.name" 
            label="Nome da categoria" 
            hint="Digite o nome da categoria" 
          />

          <q-file
            filled
            v-model="category.file"
            accept="image/*"
            label="Escolha uma imagem"
            @update:model-value="onFileChange"
          />

          <div v-if="imagePreview" class="q-mt-md">
            <q-img :src="imagePreview" :ratio="16/9" contain />
          </div>

          <div class="row q-mt-lg justify-center">
            <ConfirmActionButton 
              label="Salvar" 
              color="secondary" 
              @click="createCategory" 
            />
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

const category = ref<any>({
  id: null,
  name: '',
  url: '',
  file: null
});

const imagePreview = ref<string | null>(null);

const createDialog = defineModel('createDialog', {
  type: Boolean,
  default: false,
  required: true
});

const openEditDialog = ref<boolean>(false);
const openDeleteDialog = ref<boolean>(false);

const onFileChange = (file: File) => {
  if (file) {
    imagePreview.value = URL.createObjectURL(file);
  } else {
    imagePreview.value = null;
  }
};

const openEditCategoryDialog = (id: number) => {
  category.value = {
    id: null,
    name: '',
    url: '',
    file: null
  };
  const element = rows.value.find(e => e.id === id);
  if (element) {
    category.value = { ...element, file: null };
    openEditDialog.value = true;
  }
};

const openDeleteCategoryDialog = (id: number) => {
  const element = rows.value.find(e => e.id === id);
  if (element) {
    category.value = element;
    openDeleteDialog.value = true;
  }
};

const fetchCategories = async () => {
  try {
    const response = await categoryService.getCategories();
    if (response.status !== 200) {
      Notify.create({ type: 'negative', message: 'Erro ao buscar categorias', position: 'top-right' });
      return [];
    }
    Notify.create({ type: 'positive', message: 'Categorias carregadas com sucesso', position: 'top-right' });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};

const createCategory = async () => {
  if (!category.value.name || !category.value.file) {
    Notify.create({ message: 'Preencha todos os campos', color: 'negative', position: 'top-left' });
    return;
  }

  const formData = new FormData();
  formData.append('name', category.value.name);
  formData.append('file', category.value.file);

  const res = await categoryService.createCategory(formData);
  if (res.status !== 201) {
    Notify.create({ message: 'Categoria não foi criada', color: 'negative', position: 'top-left' });
    return;
  }

  Notify.create({ message: 'Categoria criada com sucesso', color: 'positive', position: 'top-left' });

  rows.value.push(res.data);
  createDialog.value = false;

  category.value = { id: null, name: '', url: '', file: null };
  imagePreview.value = null;
};

const deleteCategory = async () => {
  if (category.value.id == null) {
    Notify.create({ message: 'Categoria inválida', color: 'negative', timeout: 2000 });
    return;
  }

  const res = await categoryService.deleteCategory(category.value.id);
  if (res.status !== 204) {
    Notify.create({ message: 'Erro ao deletar categoria', color: 'negative' });
    return;
  }

  rows.value = rows.value.filter(e => e.id !== category.value.id);
  Notify.create({ message: 'Categoria deletada com sucesso', color: 'positive' });
  openDeleteDialog.value = false;
};

const editCategory = async () => {
  if (!category.value.name || category.value.id == null) {
    Notify.create({ message: 'Nome inválido', color: 'warning', position: 'top-right' });
    openEditDialog.value = false;
    return;
  }

  const res = await categoryService.updateCategory(category.value.id, category.value.name);
  if (res.status !== 200) {
    Notify.create({ message: 'Erro ao editar categoria', color: 'negative' });
    return;
  }

  
  Notify.create({ message: 'Categoria editada com sucesso', color: 'positive' });
  openEditDialog.value = false;
};

onMounted(async () => {
  rows.value = await fetchCategories();
});

watch(createDialog, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    category.value = { id: null, name: '', url: '', file: null };
    imagePreview.value = null;
  }
});
</script>
