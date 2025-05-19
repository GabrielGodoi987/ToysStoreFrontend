<template>
  <q-page class="q-pa-lg catalog-page">
    <div class="text-center q-mb-xl">
      <div class="text-h3 text-weight-bold text-primary catalog-title">
        Catálogos
      </div>
    </div>

    <section class="row justify-center items-start q-gutter-xl q-mt-md">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="i in categories"
        :key="i.id || 0"
      >
        <div
          @click="goTo(i.id || 0)"
          class="catalog-card cursor-pointer"
        >
          <q-card class="full-height card-style">
            <div class="image-container">
              <q-img
                :src="i.url"
                :ratio="4/3"
                class="card-img"
              />
              <div class="hover-overlay"></div>
              <q-icon 
                name="arrow_forward" 
                class="hover-icon" 
                color="white"
                size="lg"
              />
            </div>
            <q-card-section class="text-center card-content">
              <div class="text-h6 text-weight-bold card-title">
                {{ i.name }}
              </div>
            </q-card-section>
          </q-card>
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


<style lang="scss">
.catalog-page {
  background-color: #f8f9fa;
}

.catalog-title {
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  
  .title-underline {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--q-primary) 0%, #4facfe 100%);
    border-radius: 2px;
  }
}

.catalog-card {
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}

.card-style {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: none;
  
  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    
    .hover-overlay {
      opacity: 0.7;
    }
    
    .hover-icon {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    
    .card-title {
      color: var(--q-primary);
    }
  }
}

.image-container {
  position: relative;
  
  .hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--q-primary);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .hover-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 2;
  }
}

.card-content {
  padding: 20px;
  background: white;
}

.card-title {
  color: #333;
  transition: color 0.3s ease;
}

.card-img {
  transition: transform 0.3s ease;
  
  .card-style:hover & {
    transform: scale(1.05);
  }
}
</style>