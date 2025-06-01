<template>
  <q-page class="q-pa-md">
    <main class="row q-col-gutter-xl" v-if="toy">
      <!-- Coluna da imagem e miniaturas -->
      <div class="col-12 col-md-5">
        <div class="column items-center">
          <q-btn flat round icon="favorite_border" color="grey-6" class="self-start q-mb-md">
            <q-tooltip>Favoritar</q-tooltip>
          </q-btn>

          <div v-if="toy.photos.length > 0">
            <q-img :src="toy.photos[0]?.path" style="max-height: 450px; max-width: 100%; object-fit: contain"
              class="q-mb-md" />

            <div class="row q-col-gutter-sm justify-center">
              <q-img v-for="(img, index) in toy?.photos ?? [toy?.photos]" :key="index" :src="img.path"
                style="width: 100px; height: 100px; object-fit: contain" class="rounded-borders shadow-1" />
            </div>
          </div>

          <div v-else>
            <q-img
              src="https://toymania.vtexassets.com/arquivos/ids/965823-1200-auto?v=637871976187200000&width=1200&height=auto&aspect=true"
              style="max-height: 450px; max-width: 100%; object-fit: contain" class="q-mb-md" />

            <div class="row q-col-gutter-sm justify-center q-gutter-lg">
              <q-img
                src="https://toymania.vtexassets.com/arquivos/ids/965823-1200-auto?v=637871976187200000&width=1200&height=auto&aspect=true"
                style="width: 100px; height: 100px; object-fit: contain" class="rounded-borders shadow-1" />
              <q-img
                src="https://toymania.vtexassets.com/arquivos/ids/965823-1200-auto?v=637871976187200000&width=1200&height=auto&aspect=true"
                style="width: 100px; height: 100px; object-fit: contain" class="rounded-borders shadow-1" />
              <q-img
                src="https://toymania.vtexassets.com/arquivos/ids/965823-1200-auto?v=637871976187200000&width=1200&height=auto&aspect=true"
                style="width: 100px; height: 100px; object-fit: contain" class="rounded-borders shadow-1" />
            </div>
          </div>
        </div>
      </div>

      <!-- Coluna do conteúdo -->
      <div class="col-12 col-md-7">
        <div class="text-h6 text-weight-bold q-mb-xs">{{ toy.name }}</div>
        <div class="row items-center q-mb-sm">
          <q-icon name="star" color="yellow" size="20px" v-for="n in 5" :key="n" />
          <span class="q-ml-sm text-weight-bold">5.0</span>
          <span class="q-ml-sm text-grey">Avaliar</span>
        </div>

        <div class="text-body1 text-grey-8 q-mb-md" style="max-width: 500px;">
          {{ toy.description }}
        </div>

        <div class="text-h6 text-green text-weight-bold q-mb-lg">
          R$ {{ toy.price }}
        </div>

        <q-btn
          class="q-mt-xl home-btn animate-pulse"
          color="green"
          text-color="white"
          icon="payments"
          label="Comprar Agora"
          unelevated
          to="/"
          no-caps
        />
      </div>
      <!--Parte de detalhes do produto-->
      <section>
        <div class="text-subtitle2 text-grey-8 text-weight-bold q-mb-xs">
          Detalhes do produto
        </div>
        <div class="text-h6 q-mb-sm">
          {{ toy.name }} – {{ toy.description }}
        </div>
        <div class="text-body2 q-mb-md">
          {{ toy.shortDescription }}
        </div>

        <div class="text-subtitle2 text-grey-8 text-weight-bold q-mb-xs">ESPECIFICAÇÕES:</div>
        <ul class="text-body2 q-mb-lg">
          <li v-for="(i, index) in toy.specifications" :key="index">
            {{ i }}
          </li>
        </ul>

        <q-btn flat label="mais..." class="text-grey-6" />
      </section>
    </main>
    <main v-else>
      <div class="text-h3 q-pa-lg text-weight-bold">Brinquedo não encontrado</div>
    </main>
  </q-page>
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
