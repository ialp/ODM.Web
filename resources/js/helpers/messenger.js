/*
 * Bu yazılım Elektrik Elektronik Teknolojileri Alanı/Elektrik Öğretmeni Hakan GÜLEN tarafından geliştirilmiş olup geliştirilen bütün kaynak kodlar
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) ile lisanslanmıştır.
 * Ayrıntılı lisans bilgisi için https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.tr sayfasını ziyaret edebilirsiniz.2019
 */

import swal from 'sweetalert'

const Messenger = {
  showError (message, callback = null) {
    swal({
      title: 'Hata mesajı!',
      text: message,
      icon: 'error',
      button: 'Tamam'
    }).then(value => {
      if (callback !== null) callback(value)
    })
  },
  showInfo (message, callback = null) {
    swal({
      title: 'Bilgi mesajı!',
      text: message,
      icon: 'info',
      button: 'Tamam'
    }).then(value => {
      if (callback !== null) callback(value)
    })
  },
  showInfoV2 (message) {
    return new Promise((resolve, reject) => {
      swal({
        title: 'Bilgi mesajı!',
        text: message,
        icon: 'info',
        button: 'Tamam'
      }).then(value => resolve(value))
        .catch(err => reject(err))
    })
  },
  showSuccess (message, callback = null) {
    return new Promise((resolve, reject) => {
      swal({
        title: 'Başarı mesajı!',
        text: message,
        icon: 'success',
        button: 'Tamam'
      }).then(value => resolve(value))
        .catch(reason => reject(reason))
    })
  },
  showWarning (message, callback = null) {
    swal({
      title: 'Uyarı mesajı!',
      text: message,
      icon: 'info',
      button: 'Tamam'
    }).then(value => {
      if (callback !== null) callback(value)
    })
  },
  showPrompt (message, buttons) {
    return new Promise((resolve, reject) => {
      swal({
        title: 'Dikkat!',
        text: message,
        icon: 'warning',
        buttons: buttons
      }).then(value => resolve(value))
        .catch(reason => reject(reason))
    })
  },
  showInput (message) {
    return new Promise((resolve, reject) => {
      swal({
        title: 'Dikkat!',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        closeOnConfirm: false,
        content: 'input',
        buttons: {
          cancel: 'İptal',
          confirm: {
            text: 'Tamam'
          }
        }
      }).then((value) => {
        resolve(value)
      }).catch(reason => {
        reject(reason)
      })
    })
  }
}

export default Messenger
