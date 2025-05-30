<template>
  <q-page>
    <div
      class="hero-section q-pa-xl text-white row items-center no-wrap"
      style="background-image: url('/images/imageToyStory.png'); background-size: cover; background-position: center; min-height: 400px"
    >
      <div class="col-12 col-md-6 q-pr-lg">
        <h1 class="text-h3 text-weight-bolder q-mb-md">PIXAR Loja de Brinquedos</h1>
        <p class="text-h6 q-mb-lg" style="max-width: 500px;">
          Ao infinito e além! Explore os brinquedos da Pixar, roupas, itens colecionáveis e mais. Descubra a magia dos filmes da Pixar com nossa coleção exclusiva de produtos inspirados em Toy Story e muito mais.
        </p>
        <q-btn
          label="Explorar mais"
          color="yellow-8"
          text-color="black"
          size="lg"
          no-caps
          @click="goToCatalog()"
        />
      </div>
    </div>

    <div class="q-pa-xl q-pt-md">
      <h2 class="text-h4 text-weight-bold q-mb-lg">Produtos em destaque</h2>

<div v-if="toys.length > 0" class="row q-col-gutter-lg justify-center">
      <div
  class="col-12 col-sm-6 col-md-3"
  v-for="(product, index) in toys"
  :key="product.id ?? index"
  @click="product.id !== null && goToToys(product.id)"
  style="cursor: pointer"
>
  <q-card flat bordered class="product-card">
    <q-img
      :src="product.photos?.[0]?.path"
      ratio="1"
      class="product-image"
      fit="contain"
      style="background: #fafafa"
    />
    <q-card-section class="text-center q-pt-sm">
      <div class="text-subtitle1 text-weight-medium text-dark">{{ product.name }}</div>
      <div class="text-h6 text-weight-bolder text-green-8 q-mt-sm">
        R$ {{ product.price?.toFixed(2) }}
      </div>
    </q-card-section>
  </q-card>
</div>
</div>
      <div v-else class="text-center text-grey-7 q-mt-lg">
        Nenhum produto em destaque no momento.
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import type { IToys } from 'src/interfaces/IToys';
import { ToysService } from 'src/services/ToysService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const toysService: ToysService = new ToysService("/toys");
const toys = ref<IToys[]>([]);
const router = useRouter();

const goToToys = (id: number) => {
  return router.push({ path: `/toy/${id}` });
}

const goToCatalog = () => {
  void router.push({ path: '/catalog' });
}

const fetchToys = async () => {
  const response = await toysService.getAll();
  if (response.status !== 200) {
    console.error("Erro ao buscar brinquedos:", response);
    Notify.create({
      message: "Erro ao buscar brinquedos",
      color: "negative",
      position: "top-right",
      timeout: 2000,
    });
    return [];
  }
  return response.data;
}

onMounted(async () => {
  const allToys = await fetchToys();
  toys.value = allToys.filter((t: { id: null; }) => t.id !== null);
});
</script>

<style scoped>

</style>