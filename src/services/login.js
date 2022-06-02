import { http } from './config'

export default {
    login: (email, password) => {
        return new Promise((resolve, reject) => {
          http
            .post('/login', { email, password })
            .then(response => {
              resolve(response.data)
            })
            .catch(_err => {
              reject(_err.data)
            })
        })
      },
}
