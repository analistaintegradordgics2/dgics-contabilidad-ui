import http from './mixins/http'
import mensajes from './mixins/mensajes'

const requireComponent = require.context(
  './components/l',
  true,
  /\.vue$/
)

const ContabilidadUI = {
  install(Vue) {

    requireComponent.keys().forEach(fileName => {

      const componentConfig = requireComponent(fileName)

      const component = componentConfig.default || componentConfig

      if (component.name) {
        Vue.component(component.name, component)
      }

    })

    Vue.mixin(http)
    Vue.mixin(mensajes)

  }
}

export default ContabilidadUI