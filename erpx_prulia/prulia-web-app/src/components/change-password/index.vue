<template>
  <v-dialog v-model="model" max-width="450px">
    <v-form v-if="model" ref="form" @submit.prevent="onSubmit" v-model="valid">
      <v-card>
        <v-card-title class="primary--text">
          Change Password
          <v-spacer />
          <v-btn icon @click="model = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider />

        <v-card-text class="px-8 pb-8">
          <v-text-field
            id="password"
            name="password"
            v-model="old_password"
            label="Current password"
            required
            persistent-hint
            prepend-icon="mdi-lock-open"
            :rules="[
              val => !!val || 'Password is required',
              val => String(val).length >= 6 || 'Minimum 6 characters required'
            ]"
            :type="showPassword.old_password ? '' : 'password'"
            :append-outer-icon="
              showPassword.old_password ? 'mdi-eye' : 'mdi-eye-off'
            "
            @click:append-outer="
              showPassword.old_password = !showPassword.old_password
            "
          />
          <v-text-field
            v-model="new_password"
            label="New password"
            required
            persistent-hint
            prepend-icon="mdi-lock"
            :rules="[
              val => !!val || 'Password is required',
              val =>
                String(val).length >= 8 ||
                'Password must be 8 characters or longer'
            ]"
            :type="showPassword.new_password ? '' : 'password'"
            :append-outer-icon="
              showPassword.new_password ? 'mdi-eye' : 'mdi-eye-off'
            "
            @click:append-outer="
              showPassword.new_password = !showPassword.new_password
            "
          />
          <v-text-field
            v-model="confirm_password"
            label="Confirm password"
            required
            persistent-hint
            prepend-icon="mdi-lock-check"
            :rules="[
              val => !!val || 'Password is required',
              val =>
                String(val).length >= 8 ||
                'Password must be 8 characters or longer',
              val =>
                String(val) === String(new_password) ||
                'Confirm password not matching new password'
            ]"
            :type="showPassword.confirm_password ? '' : 'password'"
            :append-outer-icon="
              showPassword.confirm_password ? 'mdi-eye' : 'mdi-eye-off'
            "
            @click:append-outer="
              showPassword.confirm_password = !showPassword.confirm_password
            "
          />
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
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
const data = () => ({
  valid: false,
  loading: false,
  old_password: '',
  new_password: '',
  confirm_password: '',
  showPassword: {
    old_password: false,
    new_password: false,
    confirm_password: false
  }
})

export default {
  name: 'ChangePassword',
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
        }
        this.$emit('input', val)
      }
    }
  },

  methods: {
    onSubmit() {
      this.loading = true
      let { old_password, new_password } = this

      this.$store
        .dispatch('auth/changePassword', {
          old_password,
          new_password
        })
        .then(() => {
          this.showSnackbar('Password changed successfully!', 'success')
          this.model = false
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
