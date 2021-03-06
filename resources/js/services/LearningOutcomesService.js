/*
 *  Bu yazılım Elektrik Elektronik Teknolojileri Alanı/Elektrik Öğretmeni Hakan GÜLEN tarafından geliştirilmiş olup
 *  geliştirilen bütün kaynak kodlar
 *  Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) ile lisanslanmıştır.
 *   Ayrıntılı lisans bilgisi için https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.tr sayfasını ziyaret edebilirsiniz.2019
 */

/*
 *  Bu yazılım Elektrik Elektronik Teknolojileri Alanı/Elektrik Öğretmeni Hakan GÜLEN tarafından geliştirilmiş olup
 *  geliştirilen bütün kaynak kodlar
 *  Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) ile lisanslanmıştır.
 *   Ayrıntılı lisans bilgisi için https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.tr sayfasını ziyaret edebilirsiniz.2019
 */

/*
 * Bu yazılım Elektrik Elektronik Teknolojileri Alanı/Elektrik Öğretmeni Hakan GÜLEN tarafından geliştirilmiş olup geliştirilen bütün kaynak kodlar
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) ile lisanslanmıştır.
 * Ayrıntılı lisans bilgisi için https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.tr sayfasını ziyaret edebilirsiniz.2019
 */

import http from '../helpers/axios'
import Messenger from '../helpers/messenger'
import { MessengerConstants } from '../helpers/constants'

const LearningOutcomesService = {
  findById (loId) {
    return new Promise((resolve, reject) => {
      http.get(`/learning_outcomes/${loId}`)
        .then(value => resolve(value.data))
        .catch(reason => reject(reason.message))
    })
  },
  findByContent (content, callback) {
    if (content.length >= 3) {
      http.get('/learning_outcomes', {
        params: {
          searchTerm: content
        }
      }).then(response => {
        callback(response.data)
      }).catch(error => {
        Messenger.showError(MessengerConstants.errorMessage)
        console.log(error)
      })
    }
  },
  findByCode (code, callback) {
    if (code.length >= 3) {
      http.get('/learning_outcomes', {
        params: {
          searchTerm: code
        }
      }).then(response => {
        callback(response.data)
      }).catch(error => {
        Messenger.showError(MessengerConstants.errorMessage)
        console.log(error)
      })
    }
  },
  findByCodeOrContent (search) {
    return new Promise((resolve, reject) => {
      http.get('learning_outcomes/find_by', { params: search })
          .then(response => resolve(response.data))
          .catch(error => reject(error))
    })
  },
  findByCodeOrContentWithPaging (search) {
    return new Promise((resolve, reject) => {
      http.get('learning_outcomes/find_by/content', { params: search })
          .then(res => resolve(res.data))
          .catch(error => reject(error))
    })
  },
  getLastSavedLOs (size) {
    return new Promise((resolve, reject) => {
      http.get(`/learning_outcomes/last_saved/${size}`)
          .then(res => resolve(res.data))
          .catch(error => reject(error))
    })
  },
  save (lo) {
    return new Promise((resolve, reject) => {
      http.post('/learning_outcomes', lo)
          .then(response => resolve(response.data))
          .catch(error => reject(error))
    })
  },
  update (id, lo, callback) {
    http.put(`/learning_outcomes/${id}`, lo)
      .then(response => { callback(response.data) })
      .catch(error => {
        Messenger.showError(MessengerConstants.errorMessage)
        console.log(error)
      })
  },
  delete (id, callback) {
    http.delete(`/learning_outcomes/${id}`)
      .then(response => { callback(response.data) })
      .catch(error => {
        Messenger.showError(MessengerConstants.errorMessage)
        console.log(error)
      })
  }
}

export default LearningOutcomesService
