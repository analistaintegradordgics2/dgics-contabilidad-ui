<template>
  <q-dialog
    ref="modal"
    @before-hide="$emit('before-hide')"
    :persistent="persistent"
    :full-width="full_width"
    :full-height="full_height"
  >
    <q-card :style="`width: ${width}; max-width: 90vw; border-radius: 15px; height: ${height}`">
      <q-card-section class="row items-center" >
        <div class="col text-center">
          <slot name="title">
            <div
              v-if="titulo != null"
              class="text-weight-bold text-uppercase titulomodal"
            >
              {{ titulo }}
            </div>
            <div v-else class="text-weight-bold text-uppercase titulomodal">
              MODAL
            </div>
          </slot>
        </div>
        <q-space />
        <div class="col-auto flex items-center justify-center">
          <div>
            <q-btn dense flat round color="white" @click="close(true)">
              <q-icon name="close" class="colorico" />
              <q-tooltip>Cerrar</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator style="height: 3px !important; background: #6bb7e0" />
      <q-card-section :style="full_height ? `max-height: 100%` : `max-height: ${footer ? max_height : ''}`" style="padding: 0" :class="`scroll ${body_class}`">
        <slot name="body"></slot>
      </q-card-section>
      <q-card-section v-if="footer" :class="footer_class">
        <div v-if="btn_listo">
          <div class="row justify-center">
            <div class="col-3">
              <q-btn
                rounded
                class="full-width btnlisto"
                @click="close(true)"
              >
                <span class="qbtn-label">¡Listo!</span>
              </q-btn>
            </div>
          </div>
        </div>
        <slot name="footer"></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import Swal from "sweetalert2/src/sweetalert2.js";
export default {
  props: {
    titulo: {
      type: String,
      default: null,
    },
    footer: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "700px",
    },
    max_height: {
      type: String,
      default: "70vh",
    },
    height: {
      type: String,
      default: null,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    validar_salir: {
      type: Boolean,
      default: true,
    },
    full_width: {
      type: Boolean,
      default: false,
    },
    full_height: {
      type: Boolean,
      default: false,
    },
    btn_listo: {
      type: Boolean,
      default: false,
    },
    body_class:{
      type: String,
      default: undefined,
    },
    footer_class:{
      type: String,
      default: undefined,
    }
  },
  data() {
    return {
      is_mobile: this.$q.platform.is.mobile
    }
  },
  methods: {
    open() {
      this.$refs.modal.show();
    },
    close(from_btn_close = false) {
      if (this.validar_salir && from_btn_close) {
        Swal.fire({
          // icon: "question",
          title: "",
          text: "¿Esta seguro de salir del formulario actual? ¡Puede perder los cambios!",
          showCancelButton: true,
          confirmButtonText:
            '<span style="font-size: 30px; color: white" class="material-icons">check_circle</span>',
          confirmButtonColor: "#ffff",
          cancelButtonText:
            '<span style="font-size: 30px; color: #194880" class="material-icons">cancel</span>',
          cancelButtonColor: "none",
          allowOutsideClick: true,
          allowEscapeKey: true,
          background: "#6BB7E0",
          reverseButtons: true,
          position: "top",
          focusConfirm: false,
          customClass: {
            popup: "alertModal",
          },
        }).then(async (result) => {
          if (result.dismiss != Swal.DismissReason.cancel) {
            this.$refs.modal.hide();
          }
        });
      } else {
        this.$refs.modal.hide();
      }
    },
    // close() {
    //   this.$refs.modal.hide();
    // },
  },
};
</script>

<style lang="scss">
.colorico {
  color: #194880 !important;
  opacity: 1;
}
.titulomodal {
  color: #194880;
  font-size: 18px;
}
.btnlisto {
  background: #f5b21d;
  width: 500px;
  color: white;
  &:hover {
    & .qbtn-label {
      position: relative;
      &::before {
        content: "\e86c";
        font-family: "Material Icons";
        position: absolute;
        left: -25px;
        font-size: 18px;
      }
    }
  }
}
</style>