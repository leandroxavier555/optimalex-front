<template>
  <v-app>
    <div
      style="position: fixed; height: 100vh; width: 100vw; background-color: #2196F3"
    />
    <v-container
      id="fundo"
      class="p-0 fill-height"
      fluid
    >
      <v-row
        class="fill-height"
        align="center"
        justify="center"
      >
        <v-col
          cols="11"
          sm="8"
          md="5"
          lg="4"
          xl="3"
          style="padding: 0px"
        >
          <v-container :style="$vuetify.breakpoint.xs ? 'padding: 4px' : ''">
            <v-container class="pb-4">
              <v-row
                class="layout-logos-login fill-height px-4 height"
                align="center"
                justify="center"
              />
            </v-container>
            <v-card
              color="white"
              style="padding: 12px"
            >
              <div style="width: 100%; text-align: center">
                <span
                  style="font-size: 16px; text-align: center; font-weight: 500"
                >Login</span>
              </div>
              <div v-if="!loader">
                <v-form
                  id="form_login"
                  ref="form_login"
                  v-model="valid"
                  @submit="postLogin"
                >
                  <v-container class="p-4">
                    <v-text-field
                      v-model="email"
                      light
                      label="Email"
                      name="email"
                      prepend-inner-icon="mdi-account"
                      validate-on-blur
                    />
                    <v-text-field
                      v-model="password"
                      light
                      prepend-inner-icon="mdi-key"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      name="password"
                      label="Password"
                      counter
                      @click:append="show2 = !show2"
                    />
                    <v-row
                      justify="center"
                      class="pt-2"
                    >
                      <v-btn
                        color="success"
                        type="submit"
                      >
                        <span style="font-weight: 600">Login</span>
                      </v-btn>
                    </v-row>
                  </v-container>
                </v-form>
              </div>
              <v-container v-else>
                <v-row
                  style="height: 229px"
                  justify="center"
                  align="center"
                >
                  <v-progress-circular
                    :size="100"
                    :width="8"
                    color="primary"
                    :indeterminate="true"
                  />
                </v-row>
              </v-container>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
      <v-snackbar
        v-model="snackbar"
        top
        right
        :timeout="4000"
        color="error"
        transition="slide-x-reverse-transition"
      >
        <v-row
          justify="space-between"
          align="center"
        >
          <div class="d-flex align-center">
            <v-icon class="mx-2">
              mdi-alert-circle-outline
            </v-icon>
            <span style="font-size: 14px; font-weight: 500">{{ message }}</span>
          </div>
          <v-btn
            small
            icon
            dark
            text
            @click="snackbar = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-snackbar>
    </v-container>
  </v-app>
</template>
<script>
  import log from '../services/login'
  import { login } from '../services/Auth'
  export default {
    data () {
      return {
        password: null,
        email: null,
        formEnv: null,
        emailRules: [v => /.+@.+/.test(v) || ''],
        requiredRules: [v => !!v || ''],
        user: null,
        snackbar: false,
        message: '',
        loader: false,
        valid: null,
        show1: false,
        show2: false,
      }
    },
    computed: {
      ErrorsVal () {
        const errors = []
        /* const boolEmail = email(this.userEntrada)
        if (!boolEmail) {
          errors.push('Favor inserir um email válido ')
        } */

        return errors
      },
    },
    methods: {
       postLogin () {
          this.loader = true
          log.login(this.email, this.password).then(response => {
            login(response.user, response.access_token)
            this.$emit('logStatus', true)
            this.$router.push('/')
          })
            .catch(_err => {
              this.message = _err.message
              this.snackbar = true
              this.loader = false
            })
      },
    },
  }
</script>
