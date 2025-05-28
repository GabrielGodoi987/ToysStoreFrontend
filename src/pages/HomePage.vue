<template>
  <q-page>
    <div
      class="hero-section q-pa-xl text-white row items-center no-wrap"
      style="background-image: url('/images/imageToyStory.png'); background-size: cover; background-position: center; min-height: 400px"
    >
      <div class="col-12 col-md-6 q-pr-lg">
        <h1 class="text-h3 text-weight-bolder q-mb-md">PIXAR Loja de Binquedos</h1>
        <p class="text-h6 q-mb-lg" style="max-width: 500px;">
          Ao infinito e além! Explore os brinquedos da Pixar, roupas, itens colecionáveis e mais. Descubra a magia dos filmes da Pixar com nossa coleção exclusiva de produtos inspirados em Toy Story e muito mais.
        </p>
        <q-btn
          label="Explorar mais"
          color="yellow-8"
          text-color="black"
          size="lg"
          no-caps
          @click="goToCatalog"
        />
      </div>
    </div>

    <div class="q-pa-xl q-pt-md">
      <h2 class="text-h4 text-weight-bold q-mb-lg">Produtos em destaque</h2>

      <div class="row q-col-gutter-lg justify-center">
        <div class="col-12 col-sm-6 col-md-3" v-for="product in featuredProducts" :key="product.id">
          <q-card flat bordered class="product-card">
            <q-card-section class="q-pb-none flex justify-end">
              <q-btn
                :icon="product.isFavorite ? 'favorite' : 'favorite_border'"
                :color="product.isFavorite ? 'red' : 'grey-6'"
                flat
                round
                @click="toggleFavorite(product)"
              />
            </q-card-section>
            <q-img :src="product.image" ratio="1" class="product-image" fit="contain" />

            <q-card-section class="text-center q-pt-sm">
              <div class="text-subtitle1 text-weight-medium text-dark">{{ product.name }}</div>
              <div class="text-h6 text-weight-bolder text-green-8 q-mt-sm">{{ product.price }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  isFavorite: boolean;
}

export default defineComponent({
  name: 'PixarStorePage',
  setup() {
    const router = useRouter();

    const featuredProducts = ref<Product[]>([
      {
        id: 1,
        name: 'Boneco Woody Toy Store',
        price: 'R$ 1.210,39',
        image: '/images/woody.avif',
        isFavorite: false,
      },
      {
        id: 2,
        name: 'Boneca Jessie Toy Store',
        price: 'R$ 1.210,39',
        image: '/images/jessie.png',
        isFavorite: false,
      },
      {
        id: 3,
        name: 'Boneco Buzz Toy Store',
        price: 'R$ 1.210,39',
        image: '/images/buzz.png',
        isFavorite: false,
      },
      {
        id: 4,
        name: 'Sra Cabeça De Batata Potato Toy Store',
        price: 'R$ 1.210,39',
        image: '/images/Batata.png',
        isFavorite: false,
      },
    ]);

    const toggleFavorite = (product: Product) => {
      product.isFavorite = !product.isFavorite;
    };

    const goToCatalog = async () => {
      await router.push({ name: 'catalog' });
    };


    return {
      featuredProducts,
      toggleFavorite,
      goToCatalog,
    };
  },
});
</script>

<style scoped>
.hero-section {
  background-color: #3b2c6a;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
}

.product-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  border-radius: 8px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-height: 200px;
  margin: 0 auto;
  display: block;
}

.q-card-section.text-center {
  padding-top: 8px;
  padding-bottom: 16px;
}
</style>
