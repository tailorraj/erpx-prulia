<template>
  <v-dialog v-model="model" max-width="450px">
    <v-form
      v-if="model"
      ref="form"
      @submit.prevent="onSubmit"
      v-model="valid"
      autocomplete="on"
    >
      <v-card>
        <v-card-title class="primary--text">
          Register Event
          <v-spacer />
          <v-btn icon @click="model = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider />

        <v-card-text class="px-2 pb-2 pt-0">
          <v-list dense class="pt-0">
            <v-list-item>
              <v-select
                v-model="trainingData.meal_option"
                label="Meal Option"
                :items="MEAL_OPTIONS"
                :rules="[
                  () => !!trainingData.meal_option || 'Meal options is required'
                ]"
              >
              </v-select>
            </v-list-item>
            <v-list-item v-if="currentTraining.display_shirt_option">
              <v-select
                v-model="trainingData.shirt_size"
                label="Shirt Size"
                :items="SHIRT_SIZE"
                :rules="[
                  () => !!trainingData.shirt_size || 'Shirt options is required'
                ]"
              >
              </v-select>
            </v-list-item>
            <v-list-item v-if="currentTraining.display_accomodation_option">
              <v-select
                v-model="trainingData.accomodation"
                label="Accomodation"
                :items="ACCOMODATION"
                :rules="[
                  () =>
                    !!trainingData.accomodation ||
                    'Accommodation options is required'
                ]"
              >
              </v-select>
            </v-list-item>
            <v-list-item v-if="currentTraining.break_up_session">
              <v-select
                v-model="trainingData.pref_lang"
                label="Break Up Session Preferred language"
                :items="langList"
                :rules="[
                  () =>
                    !!trainingData.pref_lang ||
                    'Preferred language options is required'
                ]"
              >
              </v-select>
            </v-list-item>
            <v-list-item class="pt-2">
              <span class="caption" style="text-align: justify;">
                I declare that the information given herein are correct to the
                best of my knowledge and belief. I agree to be govern by the
                rules and regulations of PRULIA as they now exist as they may
                hereafter be altered.
              </span>
            </v-list-item>

            <v-list-item>
              <v-list-item-title
                >I agree to the statement above</v-list-item-title
              >
              <v-list-item-action>
                <v-checkbox
                  v-model="acknowledge"
                  hide-details
                  :rules="[
                    () => !!acknowledge || 'Acknowledgement options is required'
                  ]"
              /></v-list-item-action>
            </v-list-item>
          </v-list>
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
            >Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import isEqual from 'lodash/isEqual'
import { MEAL_OPTIONS, SHIRT_SIZE, ACCOMODATION } from '@/const'
import { mapGetters } from 'vuex'

const data = () => ({
  trainingData: {},
  valid: false,
  loading: false,
  acknowledge: false,
  MEAL_OPTIONS,
  SHIRT_SIZE,
  ACCOMODATION
})

export default {
  name: 'RegisterEvent',

  data: () => data(),

  props: {
    value: {
      type: Boolean
    }
  },

  computed: {
    ...mapGetters('training', ['all', 'lang']),
    ...mapGetters('auth', ['member']),
    model: {
      get() {
        return this.value
      },
      set(val) {
        if (!val) this.resetComponentData(data)
        this.$emit('input', val)
      }
    },
    langList() {
      return this.lang.map(item => {
        let { language } = item

        return {
          text: language,
          value: language
        }
      })
    },

    currentTraining() {
      return this.all.find(training =>
        isEqual(this.$route.params.id, training.name)
      )
    }
  },

  methods: {
    onSubmit() {
      this.loading = true
      this.$store
        .dispatch('training/register', {
          member: this.member.name,
          member_name: this.member.full_name,
          event: this.currentTraining.name,
          meal: this.trainingData.meal_option || null,
          shirt: this.trainingData.shirt_size || null,
          accomodation: this.trainingData.accomodation || null,
          pref_lang: this.trainingData.pref_lang || null
        })
        .then(() => {
          this.loading = false
          this.model = false
          this.showSnackbar('Registered successfully!', 'success')
        })
        .catch(error => {
          let { data } = error.response
          let { message } = data

          this.showSnackbar(message, 'error')
        })
    }
  }
}
</script>
