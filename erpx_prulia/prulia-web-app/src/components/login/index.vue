<template>
  <v-dialog v-model="model" max-width="450px">
    <v-form
      v-if="model && !showForgotPassword"
      ref="form"
      @submit.prevent="onSubmit"
      v-model="valid"
      autocomplete="on"
    >
      <v-card>
        <v-card-title class="primary--text">
          Login
          <v-spacer />
          <v-btn icon @click="model = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider />

        <v-card-text class="px-8 pb-8">
          <v-text-field
            id="prudential_id"
            name="prudential_id"
            v-model="prudential_id"
            label="Prudential ID"
            required
            persistent-hint
            prepend-icon="mdi-account"
            :rules="[
              val => !!val || 'Prudential ID is required',
              val => String(val).length >= 7 || 'Invalid Prudential ID'
            ]"
          />
          <v-text-field
            id="password"
            name="password"
            v-model="password"
            label="Password"
            required
            persistent-hint
            prepend-icon="mdi-lock"
            :rules="[
              val => !!val || 'Password is required',
              val => String(val).length >= 6 || 'Invalid password'
            ]"
            :type="showPassword ? '' : 'password'"
            :append-outer-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-outer="showPassword = !showPassword"
          />
          <v-row>
            <v-spacer />
            <v-btn
              color="primary"
              rounded
              small
              class="mt-4"
              text
              @click="showForgotPassword = true"
              >Forgot password?</v-btn
            >
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions class="primary">
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            type="submit"
            :disabled="!valid"
            :loading="loading"
            rounded
            text
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
    <forgot-password
      v-if="showForgotPassword"
      @login="showForgotPassword = false"
      @close="model = false"
    />
  </v-dialog>
</template>

<script>
import ForgotPassword from '@/components/login/ForgotPassword'
const data = () => ({
  valid: false,
  loading: false,
  prudential_id: '',
  password: '',
  showPassword: false,
  showForgotPassword: false
})

export default {
  name: 'Login',
  components: { ForgotPassword },
  data: () => data(),

  props: {
    value: {
      type: Boolean
    }
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        if (!val) {
          this.resetComponentData(data)
          this.$router.push({ name: 'Home' }).catch(() => {})
        }
        this.$emit('input', val)
      }
    }
  },

  methods: {
    onSubmit() {
      this.loading = true
      this.$store
        .dispatch('auth/login', {
          usr: this.prudential_id,
          pwd: this.password
        })
        .then(() => {
          this.model = false
          this.$nextTick(() => {
            this.$router.push({ name: 'Home' }).catch(() => {})
            this.$store.dispatch('news/togglePopup', true)
          })
        })
        .catch(error => {
          let { data } = error.response
          let { message } = data

          this.showSnackbar(message, 'error')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
