<template>
  <l-newmodal
    ref="modalinmoasociados"
    width="1000px"
    :validar_salir="false"
    titulo="Inmuebles Asociados a la persona"
    footer
    btn_listo
    persistent
  >
    <template slot="body">
      <div class="row q-pa-md">
        <div class="col-12 text-right">
          <div class="row justify-end">
            <l-input
              col="4"
              v-model="filter"
              placeholder="Búsqueda"
              :rules="[true]"
            />
          </div>
        </div>
        <div class="col-12">
          <q-table
            flat
            bordered
            :data="inmuebles_asociados"
            :columns="columns_inmo"
            :pagination.sync="pagination_inmo"
            :filter="filter"
            row-key="name"
          >
            <template v-slot:body-cell-estado="props">
              <q-td :props="props">
                <q-badge
                  :style="`background-color: rgb(${props.row.estado.color})`"
                  :label="props.row.estado.nombre"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-accion="props">
              <q-td :props="props">
                <q-btn
                  unelevated
                  dense
                  icon="east"
                  @click="asignarInmoAsociado(props.rowIndex, props.row)"
                >
                  <q-tooltip>Asignar Inmueble</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </template>
  </l-newmodal>
</template>

<script>
export default {
  name: "inmueblesasociados",
  data() {
    return {
      filter: null,
      inmuebles_asociados: [],
      pagination_inmo: {
        rowsPerPage: 10,
      },
      columns_inmo: [
        {
          name: "id",
          label: "Id",
          align: "center",
          field: "id",
        },
        {
          name: "label",
          label: "Dirección",
          align: "left",
          field: "label",
          classes: "white-space",
        },
        {
          name: "estado",
          label: "Estado",
          align: "left",
          field: (row) => (row.estado != null ? row.estado.nombre : ""),
        },
        {
          name: "tipo",
          label: "Tipo",
          align: "left",
          field: "tipo",
        },
        {
          name: "accion",
          label: "Acciones",
          align: "center",
        },
      ],
    };
  },
  methods: {
    abrirModal(model) {
      this.inmuebles_asociados = model;
      this.$refs.modalinmoasociados.open();
    },
    cerrarModal() {
      this.$refs.modalinmoasociados.close();
    },
    asignarInmoAsociado(index, model) {
      this.$emit("selected", {index, model});
      this.cerrarModal();
    }
  }
};
</script>

<style>
</style>