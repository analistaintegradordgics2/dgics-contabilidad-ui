import http from './src/mixins/http'
import mensajes from './src/mixins/mensajes'

import Input from './src/components/input.vue'
import InputDecimal from './src/components/inputdecimal.vue'
import Money from './src/components/money.vue'
import NewModal from './src/components/newmodal.vue'
import Select from './src/components/select.vue'
import SelectApi from './src/components/selectApi.vue'
import SelectRest from './src/components/selectRest.vue'
import Table from './src/components/table.vue'
import TipoDocumento from './src/components/tipoDocumento.vue'
import InmueblesAsociados from './src/components/inmueblesasociados.vue'

const install = (Vue) => {

  // registrar componentes globales
  Vue.component('l-input', Input)
  Vue.component('l-inputdecimal', InputDecimal)
  Vue.component('l-money', Money)
  Vue.component('l-modal', NewModal)
  Vue.component('l-select', Select)
  Vue.component('l-select-api', SelectApi)
  Vue.component('l-select-rest', SelectRest)
  Vue.component('l-table', Table)
  Vue.component('l-tipo-documento', TipoDocumento)
  Vue.component('l-inmuebles-asociados', InmueblesAsociados)

  // registrar mixins globales
  Vue.mixin(http)
  Vue.mixin(mensajes)

}

export default { install }