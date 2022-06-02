<template>
<div class="content">
    <v-card class="ml-3 mr-3">
        <v-card-title style="justify-content: center" class="pt-4">
            <h1 style="color: #2196F3; font-size: 24px">
                Potencial Custumers
            </h1>
        </v-card-title>
        <v-card>
            <v-card-text fluid class="mt-3">
                <v-card v-for="costumer in costumers" :key="costumer.email" color="#ECEFF1" class="mb-3">
                    <v-card-title> {{ costumer.companyName}} - {{costumer.industry}} </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="4" md="4">
                                <p><b>Contact Person: </b> {{costumer.firstName}} {{costumer.lastName}} </p>
                                <p><b>Phone:</b> {{costumer.phoneNumber}}</p>
                            </v-col>
                            <v-col cols="4" md="4">
                                <p><b>Email: </b> {{costumer.email }}</p>
                                <p><b>Address: </b> {{costumer.address}}</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="end" class="mb-2 mr-3">
                            <v-btn color="#2196F3" @click="submitForm(costumer.id)" class="mr-2 white--text">
                                Start Contact
                            </v-btn>
                            <v-btn color="#90A4AE" @click="removeCostumer(costumer.id)" class="white--text">
                                Remove
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-card-text>
        </v-card>
    </v-card>
</div>
</template>

<script>
import Costumer from '../services/costumer'
import Contact from '../services/contact'
export default {
    data() {
        return {
            costumers: [],
            seller: null,
        }
    },
    created(){
        this.seller = localStorage.getItem('id')
    },
    mounted() {
        Costumer.listar().then(resposta => {
            resposta.data.forEach(element => {
                this.costumers.push({
                    firstName: element.firstName,
                    lastName: element.lastName,
                    companyName: element.companyName,
                    address: element.address,
                    phoneNumber: element.phoneNumber,
                    email: element.email,
                    industry: element.industry,
                    id: element.id,
                })
            })
        })
    },

    methods: {
        submitForm(id) {
            const index = this.costumers.findIndex(v => v.id === id)
            this.Swal.fire({
                title: 'Adding customer to your contact in progress page!',
                timerProgressBar: true,
                showConfirmButton: false,
                willOpen: () => {
                    this.Swal.showLoading()
                },
                didOpen: () => {
                    let date = new Date().toLocaleDateString();
                    const auxiliar = {
                        id_costumer: id,
                        id_sales_person: this.seller,
                        first_contact_date: date.split('/').reverse().join('-'),
                    };

                    (() => {
                        return (
                            Contact.salvar(auxiliar)
                        )
                    })().then(data => {
                        if (!data.data.error) {
                            this.Swal.fire({
                                title: 'Customer added to your contacts in progress page!',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 2000,
                            })
                            this.costumers.splice(index, 1);

                        } else {
                            this.Swal.fire({
                                icon: 'error',
                                title: 'Erro',
                                text: data.data.message,
                            })
                        }
                    })
                },
            })
        },
        removeCostumer(id) {
        const index = this.costumers.findIndex(v => v.id === id)
        this.Swal.fire({
          title: 'Are you sure you want to remove this costumer?',
          icon: 'warning',
          showCancelButton: true,
          showLoaderOnConfirm: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          preConfirm: () => {
            return Costumer.delete(id).then(
              result => result,
              () => {
                this.Swal.fire({
                  icon: 'error',
                  title: 'An Error Occurred!',
                  text: 'It was not possible to delete this customer',
                })
              },
            )
          },
        }).then(
          result => {
            if (result.isConfirmed) {
              this.Swal.fire(
                'Excluded!',
                'The customer was successfully deleted',
                'success',
              )
              this.costumers.splice(index, 1)
            }
          },
        )
      },
    }

}
</script>
