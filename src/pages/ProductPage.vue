<template>
  <div>
    {{ route.params.id }}
  </div>
</template>

<script lang="ts" setup>
import type { IToys } from 'src/interfaces/IToys';
import { ToysService } from 'src/services/ToysService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const toysService: ToysService = new ToysService("/toys");
const route = useRoute();
const toys = ref<IToys[]>([]);


const fetchToys = async () => {
  const response = await toysService.getByCategoryId(Number(route.params.id));
  if (response.status !== 200) {
    console.error("Error fetching toys:", response);
    return [];
  }
  return response.data;
}

onMounted(async () => {
  toys.value =  await fetchToys();
  console.log(toys.value);
})
</script>

<style>

</style>
