<template>
  <div class="q-pa-md">
    <q-breadcrumbs class="text-grey-8 q-mb-md">
      <q-breadcrumbs-el label="Catálogo" />
      <q-breadcrumbs-el label="Bonecos" />
      <q-breadcrumbs-el :label="toy?.name" class="text-bold" />
    </q-breadcrumbs>

    <div class="row q-col-gutter-xl">
      <!-- Coluna da imagem e miniaturas -->
      <div class="col-12 col-md-5">
        <div class="column items-center">
          <q-btn flat round icon="favorite_border" color="grey-6" class="self-start q-mb-md">
            <q-tooltip>Favoritar</q-tooltip>
          </q-btn>

          <!--
          <q-img

            :src="toy?.photos"
            style="max-height: 220px; max-width: 100%; object-fit: contain"
            class="q-mb-md"
          />

          <div class="row q-col-gutter-sm justify-center">
            <q-img
              v-for="(img, index) in toy?.photos ?? [toy?.photos]"
              :key="index"
              :src="img"
              style="width: 60px; height: 60px; object-fit: contain"
              class="rounded-borders shadow-1"
            />
          </div>
          -->
        </div>
      </div>

      <!-- Coluna do conteúdo -->
      <div class="col-12 col-md-7">
        <div class="text-h6 text-weight-bold q-mb-xs">{{ toy?.name }}</div>
        <div class="row items-center q-mb-sm">
          <q-icon name="star" color="yellow" size="20px" v-for="n in 5" :key="n" />
          <span class="q-ml-sm text-weight-bold">5.0</span>
          <span class="q-ml-sm text-grey">Avaliar</span>
        </div>

        <div class="text-body1 text-grey-8 q-mb-md" style="max-width: 500px;">
          Brinquedos Com o boneco do Vaqueiro Woody os pequenos vão poder recriar as cenas dos filmes
          e imaginar diversas aventuras com seus personagens favoritos!
        </div>

        <div class="text-h6 text-green text-weight-bold q-mb-lg">
          R$ {{ toy?.price.toFixed(2) }}
        </div>

        <div class="text-subtitle2 text-grey-8 text-weight-bold q-mb-xs">
          Detalhes do produto
        </div>
        <div class="text-caption q-mb-sm">
          Boneco woody toy story – líder brinquedos
        </div>
        <div class="text-body2 q-mb-md">
          Ele é todo em vinil e tem articulação nos braços e cintura. Com o Cowboy Woody a diversão está garantida!
        </div>

        <div class="text-subtitle2 text-grey-8 text-weight-bold q-mb-xs">ESPECIFICAÇÕES:</div>
        <ul class="text-body2 q-mb-lg">
          <li>Recomendado à partir de 03 anos</li>
          <li>Altura aprox do boneco: 17 cm</li>
          <li>Filme: Toy Story</li>
          <li>Franquia: Disney</li>
        </ul>

        <q-btn flat label="mais..." class="text-grey-6" />
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { Notify } from 'quasar';
import type { IToys } from 'src/interfaces/IToys';
import { ToysService } from 'src/services/ToysService';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const toysService: ToysService = new ToysService("/toys");
const route = useRoute();
const router = useRouter();
const toy = ref<IToys>();

const fetchToy = async () => {
  const response = await toysService.getById(Number(route.params.id));
  if (response.status !== 200) {
    console.error("Error fetching toy:", response);
    Notify.create({
      message: "Erro ao buscar brinquedo",
      color: 'red',
      position: 'top-right',
      timeout: 2000,
    })

    await router.push({ path: 'catalog' });
    return null;
  }
  Notify.create({
    message: 'Boneco encontrado com sucesso!',
    color: 'green',
    position: 'top-right',
    timeout: 2000,
  });
  return response.data;
}


onMounted(async () => {
  toy.value = await fetchToy();
  console.log(toy.value);
})
</script>

<style></style>
