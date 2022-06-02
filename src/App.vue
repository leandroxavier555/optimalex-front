<template>
<v-app id="inspire">
    <v-app-bar app color="#37474F" flat height="80">
        <v-container class="py-0 fill-height">
            <v-img class="mr-3 mt-2" src="@/assets/opt.webp" height="60" />

            <v-btn v-for="link in links" :key="link.title" :to="link.to" text color="white">
                {{ link.title }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn text class="px-0" @click="log" color="white">
                {{logado ? 'Logout' : 'Login' }}
                <v-icon right dark color="white">
                    mdi-logout
                </v-icon>
            </v-btn>
        </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
        <v-container>
            <v-row>

                <v-col>
                        <router-view @logStatus="logado = $event" />
               
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import {
    logout
} from '@/services/Auth'
export default {
    data: () => ({
        links: [{
                title: 'Home',
                to: '/'
            },
            {
                title: 'Potential Customers',
                to: '/costumers'
            },
            {
                title: 'Contact in progress',
                to: '/contact'
            },
            {
                title: 'Results',
                to: '/results'
            },
        ],
        logado: false,
    }),
    mounted() {
        if (localStorage.getItem('user-token') !== null) {
            this.logado = true;
            console.log('log', this.logado)
        }
    },

    methods: {
        log() {
            if (localStorage.getItem('user-token') !== null) {
                logout()
                this.logado = false;
            }

            this.$router.push({
                path: '/login',
            })
        },
    }
}
</script>
