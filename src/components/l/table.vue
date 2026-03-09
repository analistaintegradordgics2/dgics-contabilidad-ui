<template>
  <div :class="`col-${col} ${class_pri}`">
    <div :class="`col-${col} ${class_val}`">
      <q-table
        class="my-sticky-header-column-table"
        :style="`max-width: ${ancho};max-height: ${alto} !important;`"
        :title="title"
        :data="asignar_estados"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        :loading="loading"
        :filter="filter"
        @request="onRequest"
        virtual-scroll
        :rows-per-page-options="[0]"
        :expanded.sync="expanded"
        :hide-header="ocultar_header"
        :hide-bottom="ocultar_bottom"
        dense
        :flat="flat"
        :bordered="bordered"
      >
        <template v-slot:top-right v-if="ocultar_titulo === false">
          <slot name="antesbuscar"  />
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <slot name="despuesbuscar"  />
        </template>
        <!-- HEADER DE LA TABLA  -->
        <template v-slot:header="props">
          <q-tr :props="props" :style="estilos">
            <q-th v-if="estado === true"  class="bg-primary text-white" style="padding: 7px 6px !important;" /> <!-- ESTA ETIQUETA ES OBLIGATORIA CUANDO SE QUIERE QUE LA COLUMNA TENGA DEPLEGABLE   -->
            <q-th v-if="detalle === true" class="bg-primary text-white" style="padding: 7px 6px !important;" /> <!-- ESTA ETIQUETA ES OBLIGATORIA CUANDO SE QUIERE QUE LA COLUMNA TENGA DEPLEGABLE   -->
            <q-th
              class="bg-primary text-white"
              :style="estilos"
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th class="bg-primary text-white" v-if="opciones === true" :style="estilos" > <!-- ESTA ETIQUETA ES OBLIGATORIA CUANDO SE QUIERE QUE LA FILA TENGA PARA OPCIONES   -->
              {{opciones_texto}}
            </q-th>
          </q-tr>
        </template>
        <!-- FINAL DEL HEADER DE LA TABLA  -->
        <!-- BODY DE LA TABLA  -->
        <template v-slot:body="props">
          <q-tr :props="props" :style="estilos" >
            <q-td  v-if="estado === true" class="justify-around" style="padding: 7px 6px !important;" >
              <slot name="estado"  v-bind:row="props.row" />
            </q-td>
            <q-td  v-if="detalle === true" class="bg-grey-2 ellipsis" style="padding: 7px 6px !important;"  >
              <q-btn size="sm" color="blue-9" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" /> <!-- ESTA ETIQUETA ES OBLIGATORIA CUANDO SE QUIERE QUE LA COLUMNA TENGA DEPLEGABLE   -->
            </q-td>

            <q-td
              :style="estilos"
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
              <q-popup-edit v-if="col.edit_input" v-model="props.row[col.name]" :title="col.label" buttons>
                <q-input v-model="props.row[col.name]" dense autofocus counter />
              </q-popup-edit>
              <q-popup-edit v-if="col.edit_money" v-model="props.row[col.name]" :title="col.label" buttons>
                <l-money col="3" v-model="props.row[col.name]"  :danse="true"  />
              </q-popup-edit>
              <q-popup-edit v-if="col.edit_number" v-model="props.row[col.name]" :title="col.label" buttons>
                <q-input type="number" v-model="props.row[col.name]" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td auto-width v-if="opciones === true" :style="estilos" ><!-- ESTA ETIQUETA ES OBLIGATORIA CUANDO SE QUIERE QUE LA FILA TENGA PARA OPCIONES   -->
              <slot name="opciones"  v-bind:row="props.row" />
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props" v-if="detalle === true" >
            <q-td colspan="100%">
              <slot name="detalle"  v-bind:row="props.row" />
            </q-td>
          </q-tr>
        </template>
        <!-- FINAL DEL BODY DE LA TABLA  -->
      </q-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LTable',
  props: {
    col: {
      type: String,
      default: '12'
    },
    title: {
      type: String,
      default: ''
    },
    class_val: {
      type: String,
      default: ''
    },
    class_pri: {
      type: String,
      default: 'q-pa-md'
    },
    columns: {
      type: [Array, Object],
      default: () => ([])
    },
    data_externo: {
      type: [Array, Object],
      default: () => ([])
    },
    ruta: {
      type: String,
      default: ''
    },
    ancho: {
      type: String,
      default: '100%'
    },
    alto: {
      type: String,
      default: '100%'
    },
    detalle: {
      type: Boolean,
      default: false
    },
    estado: {
      type: Boolean,
      default: false
    },
    opciones: {
      type: Boolean,
      default: false
    },
    opciones_texto: {
      type: String,
      default: 'Acciones'
    },
    ocultar_bottom: {
      type: Boolean,
      default: false
    },
    ocultar_header: {
      type: Boolean,
      default: false
    },
    ocultar_titulo: {
      type: Boolean,
      default: false
    },
    estados_siguientes: {
      type: Boolean,
      default: false
    },
    estilos: {
      type: String,
      default: 'padding: 7px 6px !important;font-size: 15px;height: 45px'
    },
    flat: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      model: {},
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      listado: [],
      original: [],
      expanded: [ // Array of row keys
        'carlos david quintero ramirez'
      ],
      estados: []
    }
  },
  mounted () {
    if (this.data_externo.length === 0) {
      this.getLoad()
    } else {
      this.listado = this.data_externo
    }
    if (this.estados_siguientes) {
      this.getEstados()
    }
  },
  computed: {
    asignar_estados () {
      const $this = this
      return this._.map(this.listado, item => {
        item.estados_siguientes = $this._.filter($this.estados, ['padre', item.estado_actual_id])
        return item
      })
    }
  },
  methods: {
    async getLoad () {
      try {
        const data = await this.Get(this.ruta)
        this.listado = data.results
        // this.asignar_estados()
        this.pagination.rowsNumber = data.count
      } catch ({ message }) {
      }
    },
    async onRequest (props) {
      if (this.data_externo.length === 0) {
        const filter = props.filter
        const { page } = props.pagination
        const opciones = {
          page: page,
          search: filter
        }
        const data = await this.Get(this.ruta, opciones)
        this.listado = data.results
        // this.asignar_estados()
        this.pagination.rowsNumber = data.count
        this.pagination.page = page
        this.pagination.rowsPerPage = 10
        this.loading = false
      } else {

      }
    },
    async getEstados () {
      try {
        this.estados = await this.Get('public/estados')
        // this.asignar_estados()
      } catch ({ message }) {
        console.error(message)
      }
    }
  }
}
</script>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 100%

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #f5f5f5 !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #f5f5f5

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 45px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
