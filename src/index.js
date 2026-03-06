import http from './mixins/http'
import mensajes from './mixins/mensajes'

import Input from './components/input.vue'
import InputDecimal from './components/inputdecimal.vue'
import Money from './components/money.vue'
import NewModal from './components/newmodal.vue'
import Select from './components/select.vue'
import SelectApi from './components/selectApi.vue'
import SelectRest from './components/selectRest.vue'
import Table from './components/table.vue'
import TipoDocumento from './components/tipoDocumento.vue'
import InmueblesAsociados from './components/inmueblesasociados.vue'

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