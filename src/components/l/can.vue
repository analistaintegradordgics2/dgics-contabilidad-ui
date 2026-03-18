<template>
  <span v-if="can">
    <slot/>
  </span>
</template>

<script>
// import { Cookies } from 'quasar'
import _ from 'lodash'

export default {
  name: 'can',
  props: ['permiso'],
  computed: {
    can () {
      if (this.permiso === '') {
        return true
      } else {
        const permisosStorage = JSON.parse(localStorage.getItem('permisos'))
        const superuser = _.get(JSON.parse(localStorage.getItem('user')), 'is_superuser', false)
        const permiso = permisosStorage.includes(this.permiso)
        return superuser || permiso
      }
    }
  }
}
</script>

<style scoped>

</style>
