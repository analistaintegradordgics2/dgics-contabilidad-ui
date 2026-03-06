import http from './mixins/http'
import mensajes from './mixins/mensajes'

const requireComponent = require.context(
  './components/l', 
  false,
  /\.vue$/
)

export default {
  install(Vue) {

    requireComponent.keys().forEach(fileName => {

      const componentConfig = requireComponent(fileName)

      const component = componentConfig.default || componentConfig

      Vue.component(component.name, component)

    })

    Vue.mixin(http)
    Vue.mixin(mensajes)

  }
}