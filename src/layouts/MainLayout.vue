<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-primary q-pa-md">
      <q-list>

        <!-- Itera sobre cada item do menu -->
        <div v-for="(i, index) in menuConfig" :key="index" class="q-mb-sm">

          <!-- Itens normais -->
          <q-item v-if="!i.isDropdown" clickable @click="goTo(i.path)" class="text-white" :active="$route.path === i.path" active-class="text-green">
            <q-item-section avatar>
              <q-icon :name="i.icon" />
            </q-item-section>
            <q-item-section>
              {{ i.name }}
            </q-item-section>
          </q-item>

          <!-- Dropdown -->
          <q-expansion-item
            v-else
            expand-separator
            icon="arrow_drop_down"
            :label="i.name"
            :header-class="['text-white', 'bg-primary']"
            switch-toggle-side
            dense
          >
            <q-list>
              <q-item
                v-for="(j, idx) in i.children"
                :key="idx"
                clickable
                @click="goTo(j.path)"
                class="text-white"
                :active="$route.path === j.path"
                active-class="text-green"
              >
                <q-item-section avatar>
                  <q-icon :name="j.icon" />
                </q-item-section>
                <q-item-section>
                  {{ j.name }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { menuConfig } from './config/menu.config'

const leftDrawerOpen = ref<boolean>(true)
const router = useRouter()

const goTo = (route: string) => {
  return router.push({ path: route })
}
</script>
