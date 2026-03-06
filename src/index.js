import LInput from './components/input.vue'
import LInputDecimal from './components/inputdecimal.vue'
import LMoney from './components/money.vue'
import LNewModal from './components/newmodal.vue'
import LSelect from './components/select.vue'
import LSelectApi from './components/selectApi.vue'
import LSelectRest from './components/selectRest.vue'
import LTable from './components/table.vue'
import LTipoDocumento from './components/tipoDocumento.vue'
import LInmueblesAsociados from './components/inmueblesasociados.vue'

import http from './mixins/http'
import mensajes from './mixins/mensajes'

const components = [
  LInput,
  LInputDecimal,
  LMoney,
  LNewModal,
  LSelect,
  LSelectApi,
  LSelectRest,
  LTable,
  LTipoDocumento,
  LInmueblesAsociados
]

export default {
  install(Vue) {

    components.forEach(component => {
      Vue.component(component.name, component)
    })

    Vue.mixin(http)
    Vue.mixin(mensajes)

  }
}