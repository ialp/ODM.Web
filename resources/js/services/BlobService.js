/*
 * Bu yazılım Elektrik Elektronik Teknolojileri Alanı/Elektrik Öğretmeni Hakan GÜLEN tarafından geliştirilmiş olup geliştirilen bütün kaynak kodlar
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) ile lisanslanmıştır.
 * Ayrıntılı lisans bilgisi için https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.tr sayfasını ziyaret edebilirsiniz.2019
 */

import http from '../helpers/axios'
// import ld from 'lodash/debounce'

const BlobService = {
  getByPath (path, callback) {
    http.post('blobs', {
      blob_path: path
    }).then(value => {

    }).catch(e => {

    })
  }
}

export default BlobService
