<template>
  <!-- :bg-color="(['', null, undefined].includes(value)) ? 'blue-grey-2': '' " -->
  <div :class="`col-${col} ${class_val}`" class="q-px-sm" :style="style_val">
    <q-select
      rounded 
      dense
      ref="inputSelect"
      :outlined="outlined"
      :value="value"
      :options="options_list"
      :emit-value="emitvalue"
      map-options
      @input="input($event)"
      @input-value="inputValue($event)"
      :option-value="optionValue"
      :option-label="optionLabel"
      use-input
      input-debounce="0"
      @filter="filterFn"
      :rules="rules"
      :disable="disable"
      :readonly="readonly"
      hide-selected
      fill-input
      @keydown="$emit('keydown', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @keyup.enter="$emit('keyup-enter', value)"
      :input-class="class_input"
      :color="color"
      :placeholder="placeholder"
      :label="label"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section>
            <div class="row">
              <div class="col-6 flex items-center">
                <span class="text-grey">No Encontrado</span>
              </div>
              <div class="col-6 text-right" v-if="addnew">
                <q-btn
                  unelevated
                  dense
                  round
                  color="green"
                  icon="add"
                  size="13px"
                  @click="$emit('crear-selectapi')"
                >
                  <q-tooltip>Crear</q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:prepend v-if="icon">
        <q-icon color="grey-5" :size="size_icon" :name="icon" />
      </template>
      <template v-if="clearable && !disable && !readonly" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop="eventclearable"
          class="cursor-pointer"
        />
      </template>
    </q-select>
  </div>
</template>

<script>
import { debounce } from "lodash";
export default {
  name: "LSelectAPi",
  props: {
    options: {
      type: [Array],
      default: () => [],
    },
    optionValue: {
      type: [String, Number],
      default: "id",
    },
    optionLabel: {
      type: [String],
      default: "nombre",
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
    style_val: {
      type: String,
      default: "",
    },
    rules: {
      type: [Array, Object],
      default: () => [],
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
    emitvalue: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    size_icon: {
      type: String,
      default: "24px",
    },
    class_input: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "primary",
    },
    addnew: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "Buscar...",
    },
    params: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      setTimeout: null,
      options_list: [],
      options_data: [],
    };
  },
  watch: {
    async url() {
      if (!this._.isNull(this.url)) await this.load();
    },
    async value(newVal, oldVal) {
      if (this.value == null) {
        if (!this._.isNull(this.url)) await this.load();
      }
      if (newVal && oldVal == null) {
        this.value = newVal;
        if ([null, undefined].includes(oldVal)) await this.load();
        const optionsData = this.options_data;
        this.options_list = this._.orderBy(
          optionsData,
          [this.optionLabel],
          ["asc"]
        );
      }
    },
  },
  async mounted() {
    this.options_data = [...this.options];
    if (!this._.isNull(this.url)) await this.load();
    this.options_list = this._.orderBy(
      this.options_data,
      [this.optionLabel],
      ["asc"]
    );
  },
  methods: {
    eventclearable() {
      if (this.readonly == false && this.disable == false) {
        this.$emit("input", null);
        this.$refs.inputSelect.updateInputValue("");
        this.$emit("selected", null);
      }
    },
    input(event) {
      this.$emit("input", event);
      try {
        let result = this.options_list.filter((f) => eval(`f.${this.optionValue}`) === event);
        this.$emit("selected", result.length > 0 ? result[0] : null);
      } catch (error) {}
    },
    inputValue(event) {
      if (this.emitvalue == true) {
        if (
          typeof event == typeof this.value ||
          this.value == null ||
          (this.value != null && typeof this.value == "object")
        ) {
          this.$emit("input", event);
        }
      }
    },
    // inputValue (val) {
    //   var uc = val.toUpperCase()
    //   if (uc !== val) this.$refs.inputSelect.updateInputValue(uc)
    // },
    async load(val = null) {
      try {
        const params = { search: val, "otros": {...this.params} };
        if (this.emitvalue) {
          if (!["", null, undefined].includes(this.value))
            params.init = this.value;
        }
        const data = await this.Get(this.url, params);
        this.options_data = [...data];
      } catch ({ message }) {
      }
    },
    filterFn: debounce(function(val, update, abort) {
      if (this.setTimeout !== null) {
        clearTimeout(this.setTimeout);
        abort();
      }
      this.setTimeout = setTimeout(() => {
        update(async () => {
          if (!this._.isNull(val) && val !== "") {
            const needle = val.toUpperCase();
          } else {
            const needle = val;
          }

          const temp = "v." + this.optionLabel;
          if (!this._.isNull(this.url) && val !== "") {
            await this.load(val);
          }
          const optionsData = this.options_data;
          // const optionsData = this.options_data.filter(v => {
          //   return eval(temp).toUpperCase().indexOf(needle) > -1 || v.id === this.value
          // })
          this.options_list = this._.orderBy(
            optionsData,
            [this.optionLabel],
            ["asc"]
          );
          this.setTimeout = null;
        });
      }, 500);
    },  500),
  },
};
</script>
<style scoped>
</style>
