<template>
<div class="content">
    <v-card class="ml-3 mr-3">
        <v-card-title style="justify-content: center" class="pt-4">
            <h1 style="color: #2196F3; font-size: 24px">
                Contact in progress
            </h1>
        </v-card-title>
        <v-card>

            <v-card-text fluid class="mt-3">
                <v-card v-for="contact in contacts" :key="contact.id" color="#ECEFF1" class="mb-3">
                    <v-card-title> {{ contact.companyName}} - {{contact.industry}} </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="4" md="4">
                                <p><b>Contact Person: </b> {{contact.firstName}} {{contact.lastName}} </p>
                                <p><b>Phone:</b> {{contact.phoneNumber}}</p>
                                <p><b>Contact started in:</b> {{contact.date}}</p>
                            </v-col>
                            <v-col cols="4" md="4">
                                <p><b>Email: </b> {{contact.email }}</p>
                                <p><b>Address: </b> {{contact.address}}</p>
                                <p><b>Stage: </b> <b class="green--text">{{contact.stage}}</b> </p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="end" class="mb-2 mr-3">
                            <v-dialog v-model="dialog" persistent max-width="800px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mr-2" @click="contactEsc = contact">
                                        Interactions
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title style="justify-content: center">
                                        <span style="color: #2196F3; font-size: 24px">Interactions</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col>
                                                    <b> Company:</b> {{contactEsc!=null ? contactEsc.companyName : ''}}
                                                </v-col>

                                                <v-col>
                                                    <b> First Contact Date:</b> {{contactEsc!=null ? contactEsc.date : ''}}
                                                </v-col>
                                                <v-col v-if="contactEsc !=null">
                                                    <v-autocomplete v-model="contactEsc.stage" :items="stages" dense outlined label="Stage*" clearable autocomplete="off" validate-on-blur>
                                                    </v-autocomplete>
                                                </v-col>
                                            </v-row>
                                            <div v-if="contactEsc !=null" class="mb-3 mt-3">
                                                <v-card v-for="interaction in contactEsc.interactions" :key="interaction.id" class="mb-3 mt-5 pa-5">
                                                    <v-row>
                                                        <v-col cols="4">
                                                            <v-autocomplete v-model="interaction.type" :items="types" dense outlined label="Type*" clearable autocomplete="off" validate-on-blur>
                                                            </v-autocomplete>
                                                        </v-col>
                                                        <v-col cols="4" md="4">
                                                            <v-text-field v-model="interaction.date" v-mask="maskData" dense outlined autocomplete="off" validate-on-blur label="Date*" />
                                                        </v-col>
                                                        <v-col>
                                                            <v-row style="justify-content: end">
                                                                <v-btn icon text color="red darken-3" @click="removeInteraction(interaction.id_aux)">
                                                                    <v-icon>
                                                                        mdi-close
                                                                    </v-icon>
                                                                </v-btn>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col cols="12" md="12">
                                                            <v-text-field v-model="interaction.description" autocomplete="off" validate-on-blur dense outlined label="Description*" />
                                                        </v-col>
                                                    </v-row>
                                                </v-card>
                                            </div>
                                            <v-col>
                                                <div align="end">
                                                    <v-btn class="ml-20" fab dark small color="accent" @click="addInteraction">
                                                        <v-icon dark>
                                                            mdi-plus
                                                        </v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-col>

                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green lighten-1" text @click="saveInteractions">
                                            Save
                                        </v-btn>
                                        <v-btn color="red darken-1" text @click="dialog = false">
                                            Close
                                        </v-btn>

                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-btn color="#90A4AE" @click="removeCostumer(contact.id)" class="white--text">
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
import Contact from '../services/contact'
import Costumer from '../services/costumer'
import { v4 } from 'uuid'
export default {
    data() {
        return {
            contacts: [],
            seller: null,
            dialog: false,
            filter: false,
            contactEsc: null,
            types: ["LinkedIn Message", "Phone Call", "Email", "Text Message", "Other"],
            stages: ["Inbound", "Lead", "Opportunity", "Account"],
            maskData: '##/##/####',
        }
    },
    created() {
        this.seller = localStorage.getItem('id')
    },
    mounted() {
        Contact.listar(this.seller).then(resposta => {
            console.log(resposta);
            resposta.data.forEach(element => {
                let aux = element.contact.first_contact_date.split('-')
                let dt = aux[1] + "/" + aux[2] + "/" + aux[0]
                let intAux = []
                element.interactions.forEach(int => {
                    let aux2 = int.date.split('-')
                    let dt2 = aux2[1] + "/" + aux2[2] + "/" + aux2[0]
                    int.date = dt2
                    int.id_aux = v4()
                    intAux.push(int)
                })

                this.contacts.push({
                    firstName: element.costumer.firstName,
                    lastName: element.costumer.lastName,
                    companyName: element.costumer.companyName,
                    address: element.costumer.address,
                    phoneNumber: element.costumer.phoneNumber,
                    email: element.costumer.email,
                    industry: element.costumer.industry,
                    id: element.costumer.id,
                    stage: element.contact.stage,
                    contactId: element.contact.id,
                    date: dt,
                    interactions: intAux,
                })
            })
        })
    },

    methods: {
        saveInteractions() {
            this.Swal.fire({
                title: 'Saving changes!',
                timerProgressBar: true,
                showConfirmButton: false,
                willOpen: () => {
                    this.Swal.showLoading()
                },
                didOpen: () => {
                    let auxInt = []
                    this.contactEsc.interactions.forEach(ele => {
                        let aux = ele.date.split('/')
                        let dt = aux[2] + "-" + aux[0] + "-" + aux[1]
                        ele.date = dt
                        auxInt.push(ele)
                    })
                    this.contactEsc.interactions = auxInt;

                    (() => {
                        return (
                            Contact.changeInteractions(this.contactEsc)
                        )
                    })().then(data => {
                        if (!data.data.error) {
                            this.Swal.fire({
                                title: 'Changes saved!',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 2000,
                            })
                            let auxInt = []
                            this.contactEsc.interactions.forEach(ele => {
                                let aux = ele.date.split('-')
                                let dt = aux[1] + "/" + aux[2] + "/" + aux[0]
                                ele.date = dt
                                auxInt.push(ele)
                            })
                            this.contactEsc.interactions = auxInt

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
        addInteraction() {
            let int = {
                id_aux: v4(),
                type: null,
                description: null,
                date: null,
            }
            this.contactEsc.interactions.push(int);
        },
        removeInteraction(id) {
            const index = this.contactEsc.interactions.findIndex(v => v.id_aux === id)
            this.contactEsc.interactions.splice(index, 1);
        },
        removeCostumer(id) {
            const index = this.contacts.findIndex(v => v.id === id)
            this.Swal.fire({
                title: 'Are you sure you want to remove this contact and costumer?',
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
                                text: 'It was not possible to delete this contact and customer',
                            })
                        },
                    )
                },
            }).then(
                result => {
                    if (result.isConfirmed) {
                        this.Swal.fire(
                            'Excluded!',
                            'The contact and customer was successfully deleted',
                            'success',
                        )
                        this.contacts.splice(index, 1)
                    }
                },
            )
        },
    }

}
</script>
