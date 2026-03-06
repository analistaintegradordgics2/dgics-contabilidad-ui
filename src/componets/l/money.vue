<template>
  <div :class="`col-${col} ${class_val}`" class="q-px-sm" :style="style_val">
    <!-- {{ label }} -->
    <q-field
      dense
      :outlined="outlined"
      :value="value"
      @input="change($event)"
      @keyup="$emit('keyup', $event)"
      @blur="$emit('blur', value)"
      lazy-rules
      :rules="rules"
      :disable="disable"
      :readonly="readonly"
      @keydown="$emit('keydown', $event)"
      :bg-color="bgcolor"
      :color="color"
      :input-class="class_input"
      :input-style="input_style"
      :label="label"
      :hint="hint"
      rounded
    >
      <template v-slot:control="{ id, floatingLabel, value, emitValue }">
        <money
          :id="id"
          :class="`q-field__input text-right ${class_input}`"
          :style="input_style"
          :value="value"
          @input="emitValue"
          @keydown="$emit('keydown', $event)"
          v-bind="moneyFormatForDirective"
          v-show="floatingLabel"
          :disabled="disable"
          valor="Valor"
          :readonly="readonly"
        />
      </template>
      <!-- <template v-slot:prepend v-if="icon">
        <q-icon color="primary" size="24px" :name="icon" />
      </template> -->
      <template v-slot:prepend>
        <span v-if="valor" class="q-px-xl text-weight-bold" style="font-size:16px;color:#194880;padding-left:60px"> {{tituloinput}} </span>
        <span v-if="valorMoney" class="q-px-md text-weight-bold" style="font-size:14px;color:#194880;padding-left:7px"> {{tituloinput}} </span>
        <slot name="dif_icon" v-if="dif_icon == true"></slot>
      </template>
    </q-field>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LMoney",
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    col: {
      type: String,
      default: "12",
    },
    label: {
      type: String,
      default: undefined,
    },
    class_val: {
      type: String,
      default: "",
    },
    class_input: {
      type: String,
      default: "",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [Array, Object],
      default: () => [true],
    },
    prefijo: {
      type: String,
      default: "$ ",
    },
    sufijo: {
      type: String,
      default: "",
    },
    precision: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: "",
    },
    valor: {
      type: String,
      default: "",
    },
    valorMoney: {
      type: String,
      default: "",
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    bgcolor: {
      type: String,
      default: "",
    },
    style_val: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "primary",
    },
    class_input: {
      type: String,
      default: "",
    },
    input_style: {
      type: String,
      default: "",
    },
    decimal: {
      type: String,
      default: ".",
    },
    thousands: {
      type: String,
      default: ",",
    },
    tituloinput:{
      type: String,
      default:"Valor Total:",
    },
    hint: {
      type: String,
      default: undefined,
    },
    dif_icon: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      moneyFormatForDirective: {
        decimal: this.decimal,
        thousands: this.thousands,
        prefix: this.prefijo,
        precision: this.precision, 
        suffix: this.sufijo,
        masked: false,
      },
    };
  },
  computed: {
    ...mapState("parametros", ["centavos_contabilidad", "centabos_plataforma"]),
  },
  methods: {
    ...mapActions("parametros", ["getProcesos"]),
    change(event) {
      this.$emit('input', event);
      this.$emit('change', event);
    }
  },
  // async created() {
  //   await this.getProcesos("008");
  //   await this.getProcesos("009");
  // }
};
</script>

<style scoped>
</style>
