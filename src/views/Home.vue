<template>
<div class="content">
    <v-card class="ml-3 mr-3 ">
        <v-card-title style="justify-content: center" class="pt-4">
            <h1 style="color: #2196F3; font-size: 24px">
                {{ 'Contact us' }}
            </h1>
        </v-card-title>
        <v-card class="pa-8 mb-3 ">
            <v-form ref="form">
                <div>
                    <v-row style="justify-content: center">
                        <v-col cols="4" md="4">
                            <v-text-field v-model="firstName" dense outlined autocomplete="off" label="First Name*" validate-on-blur />
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field v-model="lastName" dense outlined autocomplete="off" validate-on-blur label="Last Name*" />
                        </v-col>
                    </v-row>
                    <v-row style="justify-content: center">
                        <v-col cols="4" md="4">
                            <v-text-field v-model="companyName" autocomplete="off" validate-on-blur dense outlined label="Company*" />
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field v-model="email" dense outlined autocomplete="off" validate-on-blur label="Email*" />
                        </v-col>
                    </v-row>
                    <v-row style="justify-content: center">
                        <v-col cols="4" md="4">
                            <v-text-field v-model="phoneNumber" v-mask="maskCel" dense outlined autocomplete="off" validate-on-blur label="Phone*" />
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field v-model="industry" autocomplete="off" validate-on-blur dense outlined label="Industry" />
                        </v-col>
                    </v-row>
                    <v-row style="justify-content: center">
                        <v-col cols="8" md="8">
                            <v-text-field v-model="address" autocomplete="off" validate-on-blur dense outlined label="Address" />
                        </v-col>
                    </v-row>
                    <v-row class="pa-3" justify="center" justify-sm="end">
                        <v-btn color="#2196F3" @click="submitForm" class="white--text">
                            {{ 'Submit'}}
                        </v-btn>
                    </v-row>
                </div>
            </v-form>
        </v-card>
    </v-card>
</div>
</template>

<script>
import Costumer from '../services/costumer'

export default {
    data() {
        return {
            maskCel: '(##) #####-####',
            firstName: null,
            lastName: null,
            companyName: null,
            industry: null,
            phoneNumber: null,
            address: null,
            email: null,
        }
    },

    methods: {
        submitForm() {
            console.log("oi")

            this.Swal.fire({
                title: 'Sending data!',
                timerProgressBar: true,
                showConfirmButton: false,
                willOpen: () => {
                    this.Swal.showLoading()
                },
                didOpen: () => {
                    const auxiliar = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        industry: this.industry,
                        phoneNumber: this.phoneNumber,
                        address: this.address,
                        companyName: this.companyName,
                    };

                    (() => {
                        return (
                            Costumer.salvar(auxiliar)
                        )
                    })().then(data => {
                        if (!data.data.error) {
                            this.Swal.fire({
                                title: 'Registered data, soon our team will contact you!',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 2000,
                            })
                            this.firstName = null,
                                this.lastName = null,
                                this.email = null,
                                this.industry = null,
                                this.phoneNumber = null,
                                this.address = null,
                                this.companyName = null

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
    }
}
</script>
