<template>
  <q-page class="q-pa-lg">
    <div>
      <div class="text-h3 text-weight-bolder">Catálogo</div>
    </div>
    <section class="row justify-center items-start q-gutter-lg q-mt-xl">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="i in categories" :key="i.id">
        <div @click="goTo(i.id)" class="cursor-pointer">
          <q-img :src="i.url" />
          <div class="text-center text-h5 text-weight-bolder q-pa-md">
            {{ i.name }}
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import type { ICategory } from 'src/interfaces/ICategory';
import { CategoryService } from 'src/services/CategoryService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const categoryService: CategoryService = new CategoryService("/categories");
const categories = ref<ICategory[]>([])
const router = useRouter();


const goTo = (id: number) => {
  return router.push({ path: `/catalog/${id}` });
}

const fetchCategories = async () => {
  const response = await categoryService.getCategories();
  if (response.status !== 200) {
    console.error("Error fetching categories:", response);
    return [];
  }
  Notify.create({
    message: "Categorías cargadas correctamente",
    color: "green",
    position: "top-right",
    timeout: 2000,
  })
  return response.data;
}


onMounted(async () => {
  categories.value = await fetchCategories();
  console.log(categories.value);
});
</script>

<style></style>
