import { http } from './config'

export default {
    listar: (id) => {
        return http.get('contact/listBySeller/' + id)
    },
    get: (id) => {
        return http.get('contact/' + id)
    },
    update: (contact, id) => {
        return http.put('contact/' + id, contact)
    },
    salvar: (contact) => {
        return http.post('contact/store', contact)
    },
    delete: (contact) => {
        return http.delete('contact/' + contact)
    },
    changeInteractions: (contact) => {
        return http.post('contact/changeInteractions', contact)
    }
}
