import http from '../helpers/axios'

const QuestionEvaluationService = {
  saveElectors (id, electors) {
    return new Promise((resolve, reject) => {
      http.post(`questions/${id}/evaluations`, { electors: electors })
        .then(value => { resolve(value.data) })
        .catch(reason => reject(reason.data))
    })
  },
  save (id, data) {
    return new Promise((resolve, reject) => {
      http.put(`/questions/${id}/evaluations`, data)
        .then(response => { resolve(response.data) })
        .catch(error => reject(error))
    })
  },
  deleteByCode (questionId, code) {
    return new Promise((resolve, reject) => {
      http.delete(`/questions/${questionId}/evaluations/${code}`)
        .then(value => resolve(value.data))
        .catch(reason => reject(reason.data))
    })
  },
  findByQuestionId (id) {
    return new Promise((resolve, reject) => {
      http.get(`/questions/${id}/evaluations`)
        .then(response => { resolve(response.data) })
        .catch(error => reject(error))
    })
  }
}

export default QuestionEvaluationService
