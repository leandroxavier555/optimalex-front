
import { http, setBearerToken } from './config'

const logout = () => {
    return new Promise(resolve => {
      const forceLogout = () => {
        localStorage.removeItem('user-token')
        localStorage.removeItem('id')
        localStorage.removeItem('nome')
        setBearerToken('')
      }
      http
      .post('logout')
      .then(response => {
        forceLogout()
        resolve()
        console.log('res',response)
      })
      .catch(_err => {
        forceLogout()
        resolve()
        console.log(_err)
      })
    })
  }
  
  const login = (user, token) => {
    setBearerToken(token)
    localStorage.setItem('user-token', token)
    localStorage.setItem('id', user.id)
    localStorage.setItem('nome', user.name)
  }
  const guard = function (to, from, next) {
    // check for valid auth token
    http.get('checkAuthToken').then(response => {
        // Token is valid, so continue
        console.log('responseGuard', response)
        next()
    }).catch(error => {
        // There was an error so redirect
        console.log(error)
        logout()
    })
  }
  export {  login, logout, guard }