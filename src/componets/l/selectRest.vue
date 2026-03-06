<template>
  <div :class="`col-${col} ${class_val}`" class="q-px-sm" :style="style_val">
    <!-- <span>{{ label }}</span> -->
    <q-select
      dense
      use-input
      input-debounce="0"
      emit-value
      map-options
      hide-selected
      fill-input
      :outlined="outlined"
      :options="options"
      :option-value="optionValue"
      :option-label="optionLabel"
      :rules="rules"
      :disable="disable"
      :readonly="readonly"
      :input-class="class_input"
      :hide-bottom-space="hide_bottom_space"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
      @filter="filterFn"
      @keydown="$emit('keydown', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', { event: $event, model: model })"
      :value="value"
      :label="label"
      rounded 
      ref="inputSelect"
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
      <template v-slot:prepend v-if="icon || dif_icon == true">
        <q-icon color="primary" :size="size_icon" :name="icon" v-if="dif_icon == false" />
        <slot name="dif_icon" v-if="dif_icon == true"></slot>
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
import { mapActions, mapState } from "vuex";
import { debounce } from "lodash";
export default {
  name: "LselectRest",
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    col: {
      type: String,
      default: "12",
    },
    class_val: {
      type: String,
      default: "",
    },
    style_val: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: "Buscar...",
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    optionValue: {
      type: [String, Number],
      default: "value",
    },
    optionLabel: {
      type: [String],
      default: "label",
    },
    addnew: {
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
    rules: {
      type: Array,
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
    class_input: {
      type: String,
      default: "",
    },
    hide_bottom_space: {
      type: Boolean,
      default: false,
    },
    dif_icon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      options: [],
      temp_options: [],
      model: null
    };
  },
  computed: {
    ...mapState("auth", ["token"]),
  },
  methods: {
    filterFn: debounce(function (val, update) {
      if (val === "") {
        update(() => {
          this.options = this.temp_options;
        });
        return;
      }
      update(() => {
        this.search(val);
      });
    }, 500),
    async search(val) {
      if (this.url != null) {
        await this.Post(`${this.url}/search`, { search: val }).then((resp) => {
          this.options = resp != null && resp != "" ? resp : [];
          this.temp_options = resp != null && resp != "" ? resp : [];
        });
      }
    },
    async search_by_Id(val) {
      // Buscar por id cuando se carga la vista ejemplo(cuando se va a editar)
      if (this.url != null) {
        let params = {
          id: val,
        };
        fetch(`api/${this.url}/${val}/`, {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${this.$store.getters["auth/token"]}`,
          },
        })
          .then((res) => res.json())
          .then((resp) => {
            this.options = resp;
            this.$refs.inputSelect.updateInputValue(
              eval(`resp[0].${this.optionLabel}`)
            );
            try {
              this.model = this.options[0];
              this.$emit("emitselecte", this.options[0]);
            } catch (error) {}
          });
      }
    },
    eventclearable() {
      if (this.disable == false && this.readonly == false) {
        this.$emit("input", null);
        this.$refs.inputSelect.updateInputValue("");
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.inputSelect.updateInputValue("");
      if (this.value != null) {
        this.search_by_Id(this.value);
      } else {
        if (this.disable == false) {
          this.search("");
        }
      }
    });
  },
  watch: {
    value(val) {
      try {
        this.$refs.inputSelect.updateInputValue("");
      } catch (error) {}
      if (val === null) {
        this.search("");
        this.$emit("emitselecte", null);
      } else {
        this.search_by_Id(this.value);
      }
    },
  },
  created() {},
};
</script>

<style>
</style>
