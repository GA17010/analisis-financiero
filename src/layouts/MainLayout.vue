<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-purple-5">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Analisis Financiero </q-toolbar-title>

        <div>Universidad de El Salvador</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> FMOcc </q-item-label>

        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple :to="menuItem.to">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>

        <!--Indicadores Financieros-->
        <q-item-label header class="q-mt-md">
          Indicadores Financieros
        </q-item-label>
        <template v-for="(menuItem, index) in menuIndicador" :key="index">
          <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

const menuList = [
  {
    icon: "home",
    label: "INICIO",
    separator: true,
    to: "/",
  },
  {
    icon: "account_balance",
    label: "BALANCE GENERAL",
    separator: true,
    to: "/balance_general",
  },
  {
    icon: "trending_up",
    label: "ESTADO DE RESULTADOS",
    separator: true,
    to: "/estado_resultados",
  },
];

const menuIndicador = [
  {
    icon: "trending_up",
    label: "INDICADORES DE LIQUIDEZ",
    separator: true,
    to: "/indicadores-liquidez",
  },
  {
    icon: "trending_up",
    label: "INDICADORES DE ENDEUDAMIENTO",
    separator: true,
    to: "/indicadores-endeudamiento",
  },
  {
    icon: "trending_up",
    label: "INDICADORES DE ACTIVIDAD",
    separator: true,
    to: "/indicadores-actividad",
  },
  {
    icon: "trending_up",
    label: "INDICADORES DE RENTABILIDAD",
    separator: true,
    to: "/indicadores-rentabilidad",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      drawer: ref(false),
      menuList,
      menuIndicador,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
