import Input from './components/l/input.vue'
import InputDecimal from './components/l/inputdecimal.vue'
import Table from './components/l/table.vue'
import TipoDocumento from './componets/l/tipoDocumento.vue'

import http from './mixins/http'
import mensajes from './mixins/mensajes'

export default {
  install(Vue) {

    Vue.component(Input.name, Input)
    Vue.component(InputDecimal.name, InputDecimal)
    Vue.component(Table.name, Table)
    Vue.component(TipoDocumento.name, TipoDocumento)

    Vue.mixin(http)
    Vue.mixin(mensajes)

  }
}