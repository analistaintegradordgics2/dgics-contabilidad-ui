<template>
  <!-- :bg-color="(['', null, undefined].includes(value)) ? 'blue-grey-2': '' " -->
  <div :class="`col-${col} ${class_val}`" class="q-px-sm" :style="style_val">
    <!-- {{label}} -->
    <q-input
      dense
      :class="`${norequerido == true ? 'norequerido' : ''} ${class_q_input}`"
      :value="value"
      @input="$emit('input', $event)"
      @keyup="$emit('keyup', $event)"
      @keypress="$emit('keypress', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      :readonly="readonly"
      :type="type"
      :rounded="round"
      :outlined="outlined"
      lazy-rules
      :rules="rules"
      :disable="disable"
      :rows="rows"
      :maxlength="maxlength"
      :min="min"
      :max="max"
      :input-class="class_input"
      :hint="hint"
      :bg-color="bgcolor"
      :input-style="style_input"
      @keydown="$emit('keydown', $event)"
      :color="color"
      :label="label"
      :placeholder="placeholder"
      @keyup.enter="$emit('keyup.enter', $event)"
      @click="$emit('click', $event)"
    >
      <template v-slot:append>
        <slot />
        
      </template>
      <template v-slot:prepend v-if="icon">
        <q-icon color="grey-5" :size="size_icon" :name="icon" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: "LInput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: [String, Number],
    },
    col: {
      type: String,
      default: "12"
    },
    label: {
      type: String,
      default: undefined
    },
    class_val: {
      type: String,
      default: ""
    },
    style_input: {
      type: String,
      default: "",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [Array, Object],
      default: () => [true],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    rows: {
      type: String,
      default: "1",
    },
    maxlength: {
      type: [Number, String],
      default: "",
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: undefined,
    },
    size_icon: {
      type: String,
      default: "24px",
    },
    class_input: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: undefined,
    },
    bgcolor: {
      type: String,
      default: "",
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    round: {
      type: Boolean,
      default: true
    },
    style_val: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    placeholder: {
      type: String,
      default: ""
    },
    norequerido:{
      type: Boolean,
      default: false
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
    class_q_input: {
      type: String,
      default: undefined,
    },
  },
  watch: {
    value(val) {
      if (val != undefined) {
        if (this.type == "text") {
          if (this.uppercase) {
            var uc = val.toUpperCase();
            if (uc !== val) this.$emit("input", uc);
          }
        } else if (this.type=="date"){
            if (val.trim()==""){
              this.$emit("input", null);
            }
        }
      }
    }
  }
};
</script>

<style>
label.norequerido.q-field {
  padding-bottom: 0px;
}
label.norequerido.q-field
  div.q-field__bottom.row.items-start.q-field__bottom--animated {
  display: none;
}
</style>
