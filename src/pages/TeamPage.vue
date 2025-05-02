<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md">
      <div class="text-h3  text-weight-bolder q-px-lg">Sobre a equipe</div>
    </div>
    <section class="q-pa-md">
      <div class="row justify-center q-pa-lg q-gutter-x-lg">
        <div v-for="i in userConfig" :key="i.id" class="column items-center q-pa-md text-center" style="width: 250px;">
          <q-avatar size="150px">
            <img :src="i.image" alt="Avatar" />
          </q-avatar>
          <div class="text-h5 text-weight-bolder q-mt-xs">
            {{ i.name }}
          </div>

          <div class="text-subtitle text-weight-bolder q-mt-xs q-mb-xs">
            {{ i.description }}
          </div>
          <div class="row justify-center q-gutter-sm">
            <q-btn round flat size="lg" icon="mdi-github" :href="i.social.github" target="_blank" aria-label="GitHub" />
            <q-btn round flat size="lg" icon="mdi-linkedin" :href="i.social.linkedin" target="_blank" color="blue" />
          </div>
        </div>
      </div>
    </section>

  </q-page>
</template>

<script lang="ts" setup>
import { userConfig } from './users/config/user.config';


</script>

<style></style>
