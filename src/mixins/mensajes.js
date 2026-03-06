import { Dialog } from 'quasar'
import Swal from 'sweetalert2/src/sweetalert2.js'

const TEXTCOLOR = "#194880";

export default {
  methods: {
    LInfo(icon, message, title = '',) {
      Swal.fire({
        // icon: icon,
        title: title,
        html: `<label style="color: ${TEXTCOLOR}; text-align: center; font-weight: bold;">${message}</label>`,
        position: "top",
        confirmButtonColor: '#42a5f5',
        background: "#6BB7E0",
        confirmButtonText:
            '<span style="font-size: 30px; color: white" class="material-icons">check_circle</span>',
        confirmButtonColor: "#ffff",
        customClass: {
          popup: "alertconfirm",
        }
      })
    },
    LInfollamada(icon, message, title = '',) {
      Swal.fire({
        // icon: icon,
        title: title,
        text: message,
        position: "top",
        confirmButtonColor: '#42a5f5',
        background: "#F5B21D",
        confirmButtonText:
            '<span style="font-size: 30px; color: white" class="material-icons">check_circle</span>',
        confirmButtonColor: "#ffff",
        customClass: {
          popup: "alertconfirm",
        }
      })
    },
    LInfoHtml(icon, message, title = '') {
      Swal.fire({
        // icon: icon,
        title: title,
        html: message,
        // confirmButtonColor: '#fff',
        confirmButtonText:
            '<span style="font-size: 30px; color: white" class="material-icons">check_circle</span>',
        confirmButtonColor: "#ffff",
        background: "#F5B21D",
        position: "top",
        customClass: {
          popup: "alertconfirm",
        }
      })
    },
    LInfoHtmlOK(icon, message, callback, persistent = true, title = '') {
      Swal.fire({
        // icon: icon,
        title: title,
        html: message,
        // confirmButtonColor: '#42a5f5',
        confirmButtonText:
            '<span style="font-size: 30px; color: white" class="material-icons">check_circle</span>',
        confirmButtonColor: "#ffff",
        allowOutsideClick: persistent,
        allowEscapeKey: persistent,
        background: "#F5B21D",
        position: "top",
        customClass: {
          popup: "alertconfirm",
        }
        
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
    },
    LConfim(message, callback, cancel, persistent = true, title = '', icon = '') {
      Swal.fire({
        // icon: icon != '' ? icon : "question",
        title: title,
        html: `<label style="color: ${TEXTCOLOR}; text-align: center; font-weight: bold;">${message}</label>`,
        showCancelButton: true,
        confirmButtonText:
            '<span style="font-size: 30px; color: white" class="material-icons">check_circle</span>',
        confirmButtonColor: "#ffff",
        cancelButtonText:
            '<span style="font-size: 30px; color: #194880" class="material-icons">cancel</span>',
        cancelButtonColor: "none",
        background: "#6BB7E0",
        allowOutsideClick: persistent,
        allowEscapeKey: persistent,
        reverseButtons: true,
        position: "top",
        focusConfirm: false,
        customClass: {
          popup: "alertconfirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          cancel();
        }
      });
    },
    LConfimOK(icon = null, message, callback, persistent = true, title = '',  html = false) {
      Swal.fire({
        title: title,
        text: message,
        confirmButtonText:
        '<span style="font-size: 30px; color: white" class="material-icons">check_circle</span>',
        confirmButtonColor: "#ffff",
        background: "#F5B21D",
        html: !html ? undefined : message,
        allowOutsideClick: persistent,
        allowEscapeKey: persistent,
        position: "top",
        focusConfirm: false,
        customClass: {
          popup: "alertconfirm",
        }
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
    },
    LFinish(message, callback, persistent = true, title = '', icon = '') {
      Swal.fire({
        // icon: icon != '' ? icon : "success",
        title: title,
        text: message,
        confirmButtonText:
            '<span style="font-size: 30px; color: white" class="material-icons">check_circle</span>',
        confirmButtonColor: "#ffff",
        cancelButtonText:
            '<span style="font-size: 30px; color: #194880" class="material-icons">cancel</span>',
        cancelButtonColor: "none",
        background: "#F5B21D",
        allowOutsideClick: persistent,
        allowEscapeKey: persistent,
        reverseButtons: true,
        position: "top",
        focusConfirm: false,
        customClass: {
          popup: "alertconfirm",
        }
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });

    },
    async LConfimInput(input = 'input', icon, message, callback, cancel, persistent = true, errormessage = '', title = '') {
      await Swal.fire({
        // icon: icon != '' ? icon : "question",
        title: title,
        input: input,
        inputLabel: message,
        // showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#42a5f5',
        confirmButtonText: 'Continuar',
        // cancelButtonColor: '#f44336',
        // cancelButtonText: 'CANCELAR',
        allowOutsideClick: persistent,
        allowEscapeKey: persistent,
        customClass: {
          popup: "AlertInput",
        },
        inputValidator: (value) => {
          if (!value) {
            return 'El campo de texto no puede ser vacío.'
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          callback(result.value);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          cancel();
        }
      });
    },
    LWarning(icon = '', message = '', callback = () => {}) {
      let msg = `Se ha detectado una inconsistencia${message != '' ? ` ${message}` :''}. Si el problema persiste, por favor, comuníquese con el área de soporte.`;
      Swal.fire({
        // icon: icon != '' ? icon : 'warning',
        text: msg,
        confirmButtonText:
        '<span style="font-size: 30px; color: white" class="material-icons">check_circle</span>',
        confirmButtonColor: '#42a5f5',
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: "#6BB7E0",
        position: "top"
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
    },
    // Camilo Garzon 06/05/2024 - Se crea esta nueva alerta para cuando se usa el fetch y rertorne error con la nueva funcion creada por Nelson handle_response_and_error
    LError(message = '', content, callback = () => {}) {
      Swal.fire({
        icon: "error",
        html: content["status_code"] != 401 ? `
        <div style="text-align: center;">
            <label>Parece que hay un problema en nuestro servidor.<br />Por favor, comuniquese con nuestro equipo de soporte.</label>
            ${content["code_error"] != "" ? `<div style="margin-top: 8px;"><strong>ID de error: </strong>${content["code_error"]}</div>` : ''}
            <div style="margin-top: 15px; max-height: 150px; overflow-y: auto; border: 1px solid lightgrey; padding: 5px;">${content["msg"]}</div>
        </div>
        ` : content["msg"],
        title: "¡Oops! Algo salió mal",
        confirmButtonText:
        '<span style="font-size: 30px; color: white" class="material-icons">check_circle</span>',
        confirmButtonColor: '#42a5f5',
        allowOutsideClick: false,
        background: "#6BB7E0",
        position: "top",
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
    },
    LAlert(title = '', message = '', callback, callback_can, cancel = true, persistent = true) {
      Dialog.create({
        title: title,
        message: message,
        cancel: cancel,
        persistent: persistent,
        html: true
      }).onOk(callback).onCancel(callback_can).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
      // setTimeout(() => {
      //   dialog.hide()
      // }, 3000)
    },
    LPrompt(title = '', message = '', length = 10, callback) {
      this.$q.dialog({
        title: title,
        message: message,
        prompt: {
          model: '',
          type: 'text',
          isValid: val => val.length > length
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        callback(data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    LRadio(title = '', message = '', opc, callback) {
      this.$q.dialog({
        title: title,
        message: message,
        options: {
          type: 'radio',
          model: '1',
          // inline: true
          items: opc
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        callback(data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    LConfirm(message, btnConfirmar = '', btnCancelar='', callback, cancel, persistent = true, title = '', icon = '', ) {
      Swal.fire({
        title: title,
        html: `<label style="color: ${TEXTCOLOR}; text-align: center; font-weight: bold;">${message}</label>`,
        showCancelButton: true,
        confirmButtonText:
            `<button style="border-radius: 8px; border:none; background: #d0e6f2; font-size: 12px; min-height:40px; min-width: 100px; cursor: pointer;" >${btnConfirmar}</button>`,
        confirmButtonColor: "#ffff",
        cancelButtonText:
            `<button style="border-radius: 8px; border:none; background: #4eb0e6; font-size: 12px; min-height:40px; min-width: 100px; cursor: pointer; " >${btnCancelar}</button>`,
        cancelButtonColor: "none",
        background: "#6BB7E0",
        allowOutsideClick: persistent,
        allowEscapeKey: persistent,
        reverseButtons: true,
        position: "top",
        focusConfirm: false,
        customClass: {
          popup: "alertconfirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          cancel();
        }
      });
    },
  }
}
