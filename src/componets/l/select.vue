<template>
  <!-- :bg-color="(['', null, undefined].includes(value)) ? 'blue-grey-2': '' " -->
  <div :class="`col-${col} ${class_val}`" class="q-px-sm" :style="style_val">
    <!-- {{ label }} -->
    <q-select
      :class="`${class_q_input}`"
      dense
      ref="inputSelect"
      :rounded="round"
      :outlined="outlined"
      use-input
      input-debounce="0"
      emit-value
      :map-options="map_options"
      hide-selected
      fill-input
      :value="value"
      :options="options_list"
      :clearable="clearable"
      :readonly="readonly"
      :input-class="class_input"
      :placeholder="placeholder"
      :option-value="optionValue"
      :option-label="optionLabel"
      :option-disable="optionDisable"
      :rules="rules"
      :disable="disable"
      :hide-bottom-space="hide_bottom_space"
      @filter="filterFn"
      @focus="$emit('focus', $event)"
      @keydown="$emit('keydown', $event)"
      @blur="$emit('blur', $event)"
      :label="label"
      @input="emitValue($event)"
    >
      <!-- @input-value="inputValue" -->
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No Encontrado </q-item-section>
        </q-item>
      </template>
      <template v-slot:prepend v-if="icon || dif_icon == true">
        <q-icon color="primary" :size="size_icon" :name="icon" v-if="dif_icon == false"/>
        <slot name="dif_icon" v-if="dif_icon == true"></slot>
      </template>
    </q-select>
  </div>
</template>

<script>
import { setTimeout } from "timers";
/* eslint-disable no-eval */
export default {
  name: "LSelect",
  props: {
    options: {
      type: [Array],
      default: () => [],
    },
    optionValue: {
      type: [String, Number, Object],
      default: "id",
    },
    optionLabel: {
      type: [String, Object],
      default: "nombre",
    },
    optionDisable: {
      type: String,
      default: undefined,
    },
    label: {
      type: [String],
      default: undefined,
    },
    value: {
      type: [String, Number, Object],
      default: null,
    },
    col: {
      type: String,
      default: "12",
    },
    url: {
      type: String,
      default: null,
    },
    class_val: {
      type: String,
      default: "",
    },
    class_input: {
      type: String,
      default: "",
    },
    rules: {
      type: [Array, Object],
      default: () => [true],
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    size_icon: {
      type: String,
      default: "24px",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    style_val: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Seleccione...",
    },
    round: {
      type: Boolean,
      default: true,
    },
    hide_bottom_space: {
      type: Boolean,
      default: false,
    },
    map_options: {
      type: Boolean,
      default: true,
    },
    dif_icon: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    class_q_input: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      options_list: [],
    };
  },
  mounted() {
    // this.options_list = this.options
  },
  created() {
    this.options_list = this.options;
  },
  watch: {
    value(val) {
      if (val != null && val != "") {
        var result = this.options.filter((filter) => filter.id == this.value);
        if (result.length > 0) {
          let Tnombre = "result[0]." + this.optionLabel;
          try {
            setTimeout(() => {
              this.$refs.inputSelect.inputValue = eval(Tnombre);
            }, 500);
          } catch (error) {}
        }
      }
      
    },
    options: {
      handler() {
        setTimeout(() => {
          var result = this.options.filter((filter) => filter.id == this.value);
          
          if (result.length > 0) {
            let Tnombre = "result[0]." + this.optionLabel;
            try {
              this.$refs.inputSelect.updateInputValue(eval(Tnombre));
            } catch (error) {}
          }
        }, 1000);
        // this.options.forEach(element => {
        //   if (element.id == this.value) {
        //     let Tnombre = "element." + this.optionLabel
        //     try {
        //       this.$refs.inputSelect.updateInputValue(eval(Tnombre));
        //     } catch (error) {}
        //   }
        // });
      },
      deep: true,
    },
  },
  methods: {
    // inputValue (val) {
    //   if (this.options.length == 0) {
    //     this.inputValue(val);
    //   } else {
    //     this.options.forEach(element => {
    //       if (element.id == val) {
    //         let Tnombre = "element." + this.optionLabel
    //         try {
    //           this.$refs.inputSelect.updateInputValue(eval(Tnombre));
    //         } catch (error) {}
    //       }
    //     });
    //   }
    // },
    emitValue(e) {
      this.$emit("input", e);
      this.$emit("emitValue", e);
      try {
        let result = this.options_list.filter(
          (filter) => eval(`filter.${this.optionValue}`) === e
        );
        this.$emit("selected", result.length > 0 ? result[0] : null);
      } catch (error) {}
    },
    filterFn(val, update, abort) {
      update(async () => {
        var needle = null;
        if (typeof val == "string") {
          needle = val.toUpperCase();
        } else {
          needle = val;
        }
        const temp = "v." + this.optionLabel;
        this.options_list = this.options.filter((v) => {
          if (typeof eval(temp) == "string") {
            return eval(temp).toUpperCase().indexOf(needle) > -1;
          } else {
            let teval = String(eval(temp));
            return teval.indexOf(needle) > -1;
          }
          // return eval(temp).toUpperCase().indexOf(needle) > -1
        });
      });
    },
  },
};
</script>
<style scoped>
</style>
