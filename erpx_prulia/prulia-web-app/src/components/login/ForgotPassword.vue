<template>
  <v-form @submit.prevent="onSubmit" v-model="valid">
    <v-card>
      <v-card-title class="primary--text">
        Forgot Password
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text v-if="!showConfirm" class="px-8 pb-8">
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
          id="nric_number"
          name="nric_number"
          v-model="nric_number"
          label="NRIC Number"
          v-mask="`######-##-####`"
          required
          persistent-hint
          prepend-icon="mdi-card-account-details"
          :rules="[
            val => !!val || 'NRIC Number is required',
            val => String(val).length >= 7 || 'Invalid NRIC Number'
          ]"
        />
        <v-row>
          <v-spacer />
          <v-btn
            color="primary"
            rounded
            small
            class="mt-4"
            text
            @click="$emit('login')"
            >Go to Login</v-btn
          >
        </v-row>
      </v-card-text>
      <v-card-text v-else class="px-8 pb-8 subtitle-1">
        {{ confirmMessage }}
      </v-card-text>

      <v-divider />

      <v-card-actions class="primary">
        <v-spacer></v-spacer>
        <v-btn
          class="white--text"
          type="submit"
          :disabled="!valid || showConfirm"
          :loading="loading"
          rounded
          text
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data: () => ({
    valid: false,
    loading: false,
    prudential_id: '',
    nric_number: '',
    showConfirm: false,
    confirmMessage: ''
  }),
  methods: {
    onSubmit() {
      this.loading = true

      const { prudential_id, nric_number } = this

      this.$store
        .dispatch('auth/forgotPassword', {
          prulia_id: prudential_id,
          nric_number
        })
        .then(response => {
          let { data } = response
          let { message } = data
          this.confirmMessage = message
          this.showConfirm = true
        })
        .catch(error => {
          try {
            let { data } = error.response
            // let error = JSON.parse(response._server_messages)
            let msgs = JSON.parse(data._server_messages)
            let msg = JSON.parse(msgs[0])

            this.showSnackbar(
              msg.message.replace('None', this.prudential_id),
              'error'
            )
          } catch (e) {
            console.error(e)
            this.showSnackbar(
              `PRULIA Member ${this.prudential_id} not found!`,
              'error'
            )
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped></style>
