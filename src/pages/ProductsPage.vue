<template>
  <q-page class="q-pa-md">
    <div>
      <div class="text-h4 text-weight-bold q-mb-sm">Bonecos</div>
      <div class="text-subtitle2 text-grey-7 q-mb-xl">
        Reviva a magia de Toy Story com os incríveis bonecos dos personagens mais amados da franquia!
      </div>
    </div>

    <section class="row q-col-gutter-lg q-gutter-y-lg justify-center">
      <div v-for="toy in toys" :key="toy.id || 0" class="col-xs-12 col-sm-6 col-md-4 col-lg-2 text-center">
        <div @click="goTo(toy.id || 0)">
          <q-img :src="'https://picsum.photos/200/300'" class="q-mb-md" style="max-height: 140px; object-fit: contain"
            fit="contain" />
          <div class="text-body1 text-weight-medium">{{ toy.name }}</div>
          <div class="text-green text-subtitle2 q-mt-xs">R$ {{ toy.price.toFixed(2) }}</div>
        </div>
      </div>
    </section>
  </q-page>
</template>


<script lang="ts" setup>
import type { IToys } from 'src/interfaces/IToys';
import { ToysService } from 'src/services/ToysService';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const toysService: ToysService = new ToysService("/toys");
const route = useRoute();
const router = useRouter();
const toys = ref<IToys[]>([]);



const goTo = (id: number) => {
  return router.push({ path: `/toy/${id}` });
}

const fetchToys = async () => {
  const response = await toysService.getByCategoryId(Number(route.params.id));
  if (response.status !== 200) {
    console.error("Error fetching toys:", response);
    return [];
  }
  return response.data;
}

onMounted(async () => {
  toys.value = await fetchToys();
  console.log(toys.value);
})
</script>

<style lang="sass" scoped>
</style>
