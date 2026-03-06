<template>
  <div :class="`col-${col} ${class_val}`" class="q-px-sm">
    <!-- {{label}} -->
    <q-input
      dense
      outlined
      :mask="mask"
      :fill-mask="fillmask"
      reverse-fill-mask
      :value="value"
      @input="$emit('input',$event)"
      @keyup="$emit('keyup',$event)"
      @blur="$emit('blur',$event)"
      :rows="rows"
      :rules="rules"
      lazy-rules
      :readonly="readonly"
      :disable="disable"
      :maxlength="maxlength"
      input-class="text-right"
      :label="label"
      :suffix="suffix"
      rounded
    >
      <template v-slot:append>
        <slot/>
      </template>
      <template v-slot:prepend v-if="icon">
        <q-icon color="primary" :size="size_icon" :name="icon" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'LInputDecimal',
  props: {
    value: {
      type: String
    },
    mask: {
      type: String,
      default: "#.##"
    },
    fillmask: {
      type: [String, Number],
      default: "0"
    },
    col: {
      type: String,
      default: '12'
    },
    label: {
      type: String,
      default: ''
    },
    class_val: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Array, Object],
      default: () => ([])
    },
    readonly: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    rows: {
      type: String,
      default: '1'
    },
    maxlength: {
      type: [Number, String],
      default: ''
    },
    size_icon: {
      type: String,
      default: '24px'
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  watch: {
    value (val) {
      if (val != undefined) {
        if (this.type == 'text') {
          var uc = val.toUpperCase()
          if (uc !== val) this.$emit('input', uc)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
