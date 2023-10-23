<template>
  <div class="text-h4 text-center q-my-md">
    <q-icon name="account_balance" size="3rem" />
    Balance General
  </div>
  <div class="q-pa-md">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="2018" label="Balance 2018" />
        <q-tab name="2019" label="Balance 2019" />
        <q-tab name="2020" label="Balance 2020" />
        <q-tab name="2021" label="Balance 2021" />
        <q-tab name="2022" label="Balance 2022" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="2018" class="q-pa-none">
          <div>
            <!-- tabla de balance general 2018-->
            <q-table
              :columns="columns0"
              :rows="rows0"
              row-key="name"
              hide-bottom
              class="shadow-2"
              title="Balance General SARAM S.A. de C.V. (2018)"
            />

            <!-- tabla de Activo circulante-->
            <q-item>
              <q-item-section>
                <span class="text-h6">Activo</span>
              </q-item-section>
            </q-item>
            <template v-for="item in activo1" :key="item">
              <div class="row q-ml-lg">
                <div class="col-7">{{ item.name }}</div>
                <div class="col q-mr-sm text-right">$</div>
                <div class="col text">{{ item.value }}</div>
                <div class="col-1">{{ item.porcentaje }}%</div>
              </div>
            </template>
            <!-- tabla de Activo no circulante-->
            <template v-for="item in activo2" :key="item">
              <div class="row q-ml-lg">
                <div class="col-7">{{ item.name }}</div>
                <div class="col q-mr-sm text-right">$</div>
                <div class="col text">{{ item.value }}</div>
                <div class="col-1">{{ item.porcentaje }}%</div>
              </div>
            </template>
          </div>
        </q-tab-panel>

        <q-tab-panel name="2019">
          <!-- tabla de balance general 2019-->
          <q-table
            :columns="columns0"
            :rows="rows0"
            row-key="name"
            hide-bottom
            class="shadow-2"
            title="Balance General SARAM S.A. de C.V. (2019)"
          />
        </q-tab-panel>

        <q-tab-panel name="2020">
          <!-- tabla de balance general 2020-->
          <q-table
            :columns="columns0"
            :rows="rows0"
            row-key="name"
            hide-bottom
            class="shadow-2"
            title="Balance General SARAM S.A. de C.V. (2020)"
          />
        </q-tab-panel>
        <q-tab-panel name="2021">
          <!--tabla de balance general 2021-->
          <q-table
            :columns="columns0"
            :rows="rows0"
            row-key="name"
            hide-bottom
            class="shadow-2"
            title="Balance General SARAM S.A. de C.V. (2021)"
          />
        </q-tab-panel>
        <q-tab-panel name="2022">
          <!--tabla de balance general 2022-->
          <q-table
            :columns="columns0"
            :rows="rows0"
            row-key="name"
            hide-bottom
            class="shadow-2"
            title="Balance General SARAM S.A. de C.V. (2022)"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../boot/database";

// Titulo de la tabla
const columns0 = [
  {
    name: "name",
    required: true,
    label: "En dólares de los Estados Unidos de América",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "value",
    align: "center",
    label: "$",
    field: "value",
    sortable: true,
  },
  {
    name: "porcentaje",
    align: "center",
    label: "%",
    field: "porcentaje",
    sortable: true,
  },
];
const rows0 = [];

export default defineComponent({
  name: "BalanceGeneral",
  components: {},
  methods: {
    async cargarDatos() {
      // cargar datos de balance general 2018
      const activocirculante2018 = collection(db, "activocirculante2018");
      const activo1 = await getDocs(activocirculante2018);
      activo1.forEach((doc) => {
        this.activo1.push({
          name: doc.data().name,
          value: doc.data().value,
        });
      });
      const activonocirculante2018 = collection(db, "activonocirculante2018");
      const activo2 = await getDocs(activonocirculante2018);
      activo2.forEach((doc) => {
        this.activo2.push({
          name: doc.data().name,
          value: doc.data().value,
        });
      });

      // ordenar listado de documentos
      this.activo1.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.activo2.sort((a, b) => (a.name > b.name ? 1 : -1));

      // calcular total de activo
      let totalActivo1 = 0;
      this.activo1.forEach((element) => {
        totalActivo1 += element.value;
      });
      let totalActivo2 = 0;
      this.activo2.forEach((element) => {
        totalActivo2 += element.value;
      });
      // obtener un porcentaje de cada elemento
      const totalActivo = totalActivo1 + totalActivo2;
      this.activo1.forEach((element) => {
        element.porcentaje = ((element.value / totalActivo) * 100).toFixed(1);
      });
      this.activo2.forEach((element) => {
        element.porcentaje = ((element.value / totalActivo) * 100).toFixed(1);
      });
      // obtener un porcentaje de activo circulante y no circulante
      const totalActivoCirculante = totalActivo1;
      const totalActivoNoCirculante = totalActivo2;

      // agregar total de activo circulante y no circulante
      this.activo1.push({
        name: "Total Activo Circulante",
        value: totalActivo1,
        porcentaje: ((totalActivo1 / totalActivo) * 100).toFixed(1),
      });
      this.activo2.push({
        name: "Total Activo No Circulante",
        value: totalActivo2,
        porcentaje: ((totalActivo2 / totalActivo) * 100).toFixed(1),
      });
      // agregar total de activo
      this.activo2.push({
        name: "Total Activo",
        value: totalActivo,
        porcentaje: 100,
      });
    },
  },

  mounted() {
    this.cargarDatos();
  },

  setup() {
    return {
      tab: ref("2018"),
      columns0,
      rows0,
      activo1: ref([]),
      activo2: ref([]),
    };
  },
});
</script>

<style></style>
