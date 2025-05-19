<template>
  <main class="q-pa-md">
    <q-table
      flat
      bordered
      dense
      :rows="rows"
      :columns="columns"
      row-key="id"
      class="shadow-2 rounded-borders"
    >
      <template v-slot:body-cell-edit="props">
        <q-td :props="props" class="text-center">
          <div class="row justify-center items-center q-gutter-sm">
            <q-btn
              flat
              color="negative"
              round
              dense
              icon="delete"
              @click="openDeleteDialog(props.row.id)"
            />
            <q-btn
              flat
              color="primary"
              round
              dense
              icon="edit"
              @click="openEditDialog(props.row.id)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </main>

  <!-- Dialog para editar brinquedo -->
  <section>
    <CardModal title="Editar Produto" v-model:is-open="editDialog">
      <template #content>
        <form @submit.prevent="editToy" class="q-gutter-md">
          <InputComponent
            label="Título do Produto"
            hint="Título"
            v-model="toy.name"
          />

          <q-select
            v-model="toy.categoryId"
            :options="categoryOptions"
            label="Categoria"
            option-label="name"
            option-value="id"
            standout
            use-input
            input-debounce="0"
            dense
            borderless
            rounded
            input-class="text-black"
            class="q-mb-md"
            :popup-content-class="'bg-white text-black'"
          >
            <template #option="props">
              <q-item v-bind="props.itemProps">
                <q-item-section>
                  {{ props.opt.name }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <InputComponent
            label="Preço do Produto"
            hint="Preço"
            v-model="toy.price"
          />

          <div class="q-mt-md row justify-center">
            <ConfirmActionButton
              label="Salvar"
              color="secondary"
              type="submit"
              class="text-white"
            />
          </div>
        </form>
      </template>
    </CardModal>
  </section>

  <!-- Dialog para deletar brinquedo -->
  <section>
    <CardModal title="Deletar categoria" v-model:is-open="deleteDialog">
      <template #content>
        <form @submit.prevent="deleteToy">
          <div class="text-h6 text-grey-8 q-mb-md text-center">
            Tem certeza que quer deletar a categoria <strong>{{ toy.categoryId.name }}</strong>?
          </div>
          <div class="row justify-center q-mt-xl">
            <ConfirmActionButton
              label="Excluir"
              color="negative"
              type="submit"
            />
          </div>
        </form>
      </template>
    </CardModal>
  </section>

  <!-- Dialog para adicionar brinquedo -->
  <section>
    <CardModal title="Adicionar Brinquedo" v-model:is-open="createDialog">
      <template #content>
        <form @submit.prevent="createToy" class="q-gutter-md">
          <q-uploader
            accept="image/*"
            label="Enviar imagens"
            multiple
            @added="handleImageChange"
            flat
            bordered
            class="rounded-borders"
          />

          <div v-if="imagePreviews.length" class="row q-col-gutter-sm q-mt-md">
            <div
              v-for="(src, index) in imagePreviews"
              :key="index"
              class="col-auto"
            >
              <q-img
                :src="src"
                alt="Pré-visualização"
                :ratio="1"
                class="rounded-borders shadow-1"
                style="max-width: 100px"
              />
            </div>
          </div>

          <InputComponent
            label="Título do Brinquedo"
            hint="Título"
            v-model="toy.name"
          />

            <q-select
              standout
              v-model="toy.categoryId"
              :options="categoryOptions"
              label="Selecione a Categoria"
              option-label="name"
              option-value="id"
              use-input
              input-debounce="0"
              dense
              rounded
              borderless
              input-class="text-weight-bold text-h6 text-black"
              label-class="text-weight-bold text-h6"
              class="q-mb-md"
              :popup-content-class="'bg-gray text-black '"
            >
            <template #option="props">
              <q-item v-bind="props.itemProps">
                <q-item-section>
                  {{ props.opt.name }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <InputComponent
            label="Descrição do produto"
            hint="Descrição maior"
            v-model="toy.description"
          />

          <InputComponent
            label="Breve descrição do produto"
            hint="Descrição menor"
            v-model="toy.shortDescription"
          />

          <InputComponentPrice
            label="Preço do Produto"
            hint="Preço"
            v-model="toy.price"
          />

          <div class="q-mb-md">
            <q-input
              filled
              v-model="specInput"
              label="Adicionar especificação"
              @keyup.enter="addSpecification"
              dense
              clearable
              class="q-mb-sm"
            >
              <template #append>
                <q-btn
                  icon="add"
                  round
                  dense
                  color="primary"
                  @click="addSpecification"
                />
              </template>
            </q-input>

            <div>
              <q-chip
                v-for="(spec, index) in toy.specifications"
                :key="index"
                removable
                @remove="removeSpecification(index)"
                color="primary"
                text-color="white"
                class="q-mr-sm q-mb-sm"
              >
                {{ spec }}
              </q-chip>
            </div>
          </div>

          <div class="q-mt-md row justify-center">
            <ConfirmActionButton
              label="Adicionar"
              color="secondary"
              type="submit"
              class="text-white"
            />
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
import InputComponentPrice from 'src/components/inputs/InputComponentPrice.vue';
import ConfirmActionButton from 'src/components/buttons/ConfirmActionButton.vue';
import { CategoryService } from 'src/services/CategoryService';
import type { ICategory } from 'src/interfaces/ICategory';

const rows = ref<IToys[]>([]);
const categoryOptions = ref<ICategory[]>([]);
const toysService: ToysService = new ToysService('/toys');
const categoryService: CategoryService = new CategoryService('/categories');

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

const photoFiles = ref<File[] | null>([]);
const imagePreviews = ref<any>([])

const handleImageChange = (event: any) => {
  const files: File[] = Array.from(event.target.files)
  photoFiles.value = files
  imagePreviews.value = files.map((file: any) => URL.createObjectURL(file))
}

const specInput = ref('')

const addSpecification = () => {
  const value = specInput.value.trim()
  if (value !== '') {
    toy.value.specifications.push(value)
    specInput.value = ''
  }
}

const removeSpecification = (index: number) => {
  toy.value.specifications.splice(index, 1)
}

const buildFormData = () => {
  const formData = new FormData();
  formData.append('name', toy.value.name);
  formData.append('price', String(toy.value.price));
  formData.append('categoryId', String(toy.value.categoryId.id));
  formData.append('description', toy.value.description);
  formData.append('shortDescription', toy.value.shortDescription);
  if (toy.value.shortDescription.length > 0) {
    formData.append('specifications', JSON.stringify(toy.value.specifications));
  } else {
    formData.append('specifications', "");
  }

  if (photoFiles.value) {
    photoFiles.value.forEach((file, index) => {
      formData.append('photos', file);
      console.log(index)
    });
  }
  return formData;
};


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

const openEditDialog = (id: number) => {
  const element = rows.value.find(e => e.id == id);
  if (element) {
    toy.value = element;
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
  const formData = buildFormData();
  const res = await toysService.updateToy(toy.value.id, formData)
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
  const formData = buildFormData();
  const res = await toysService.createToy(formData);
  if (res.status !== 201) {
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
  categoryOptions.value = await fetchCategories();
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
