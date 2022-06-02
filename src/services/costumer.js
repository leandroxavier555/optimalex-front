import { http } from './config'

export default {
    listar: () => {
        return http.get('costumers')
    },
    get: (id) => {
        return http.get('costumer/' + id)
    },
    update: (costumer, id) => {
        return http.put('costumer/' + id, costumer)
    },
    salvar: (costumer) => {
        return http.post('costumer/store', costumer)
    },
    delete: (costumer) => {
        return http.delete('costumer/' + costumer)
    },
}
