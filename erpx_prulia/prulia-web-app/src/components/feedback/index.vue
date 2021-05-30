<template>
  <v-dialog v-model="model" max-width="450px">
    <v-form v-if="model" ref="form" @submit.prevent="onSubmit" v-model="valid">
      <v-card rounded>
        <v-card-title class="primary--text">
          Submit feedback
          <v-spacer />
          <v-btn icon @click="model = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider />

        <v-card-text class="px-8 pb-8">
          <v-select
            v-model="category"
            label="Category"
            :items="all"
            item-text="name"
            item-value="category"
            required
          />
          <v-textarea
            v-model="remark"
            label="Question / Comment"
            required
            :rules="[val => !!val || 'Feedback is required']"
            counter
          >
          </v-textarea>
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
import { mapGetters } from 'vuex'

const data = () => ({
  valid: false,
  loading: false,
  remark: '',
  category: ''
})

export default {
  name: 'Feedback',
  data: () => data(),

  props: {
    value: {
      type: Boolean
    }
  },

  computed: {
    ...mapGetters('feedback', ['all']),
    model: {
      get() {
        this.$store.dispatch('feedback/load')
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
      let { remark, category } = this
      this.$store
        .dispatch('feedback/submit', {
          remark,
          category
        })
        .then(() => {
          this.model = false
          this.showSnackbar('Feedback submitted successfully', 'success')
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
