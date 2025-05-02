<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-primary q-pa-md">
      <q-list v-for="(i, index) in menuConfig" :key="index">
        <q-item>
          <q-item-section class="text-h5 text-white q-pa-sm" @click="goTo(i.path)">
            <q-tabs
              indicator-color="transparent"
              active-bg-color="accent"
              class="rounded-borders row"
            >
              <q-route-tab
                class="text-white item-center"
                :class="{ 'text-green': $route.path === i.path }"
                :label="i.name"
                :icon="i.icon"
                :to="i.path"
                exact
              />
            </q-tabs>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { menuConfig } from "./config/menu.config"
const leftDrawerOpen = ref<boolean>(true)
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (route: string) => {
  return router.push({ path: route, replace: true })
}
</script>
