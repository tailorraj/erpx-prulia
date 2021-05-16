<template>
  <v-container v-if="currentTraining">
    <v-row class="secondary" justify="center">
      <v-img
        max-height="450px"
        position="start center"
        :src="currentTraining.training_image"
      />
      <status-chip
        class="hidden-md-and-up"
        :event="currentTraining"
        status-key="training_status"
        absolute
      />
    </v-row>
    <v-row class="secondary" justify="center">
      <v-col class="grow" align-self="center">
        <span class="text-h6 pa-3 pb-0 white--text">
          <text-truncate>
            {{ currentTraining.training_name }}
          </text-truncate>
        </span>
      </v-col>
      <v-col class="shrink hidden-sm-and-down">
        <status-chip :event="currentTraining" status-key="training_status" />
      </v-col>
      <v-col cols="12" class="pt-0">
        <v-chip class="ma-2">
          <v-icon>mdi-map-marker</v-icon>
          <span class="ml-2 subtitle-2">
            {{ currentTraining.venue }}
          </span>
        </v-chip>
        <v-chip
          class="ma-2"
          v-if="
            currentTraining.training_with_fees &&
              (currentTraining.early_fees || currentTraining.fees)
          "
        >
          <v-icon>mdi-currency-usd</v-icon>
          <span class="ml-2 subtitle-2">
            {{ currentTraining.currency }}
            {{
              currentTraining.early_fees ||
                currentTraining.fees | formatCurrency
            }}
          </span>
        </v-chip>
        <v-chip class="ma-2">
          <v-icon>mdi-clock</v-icon>
          <span class="ml-2 caption">
            {{
              currentTraining.start_date_time
                | formatDate('D MMM YYYY, hh:mm a')
            }}
            -
            {{
              currentTraining.end_date_time | formatDate('D MMM YYYY, hh:mm a')
            }}
          </span>
        </v-chip>
      </v-col>
    </v-row>
    <v-row class="primary py-3" justify="center">
      <v-btn
        v-if="
          !currentTraining.register &&
            currentTraining.training_status === 'Open For Registration'
        "
        @click="registerEvent = true"
        large
        rounded
        dark
      >
        Register
      </v-btn>
    </v-row>
    <v-row class="primary white--text pa-3">
      <v-col cols="12" sm="9" v-if="currentTraining.description">
        <div v-html="currentTraining.description"></div>
      </v-col>
      <v-col cols="12" sm="3" class="pa-12 pa-sm-4" align-self="center">
        <v-img
          v-if="currentTraining.register"
          :src="
            `https://api.qrserver.com/v1/create-qr-code/?size=300x300&bgcolor=F1646C&data=${
              currentTraining.name
            }/${member.prudential_id}/${member.agency_no || ''}`
          "
        />
      </v-col>
      <v-col
        cols="12"
        :sm="currentTraining.description ? 12 : 9"
        class="pa-1"
        v-if="currentTraining.register"
      >
        <v-form v-model="valid" @submit.prevent="onSubmit">
          <v-list color="primary" dense>
            <v-list-item>
              <v-list-item-title>
                <h3>
                  Registration Details
                </h3>
              </v-list-item-title>
              <v-list-item-action>
                <v-btn
                  icon
                  :disabled="loading"
                  @click="formDisabled = !formDisabled"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-select
                color="secondary"
                v-model="currentTraining.meal_option"
                label="Meal Option"
                :items="MEAL_OPTIONS"
                :disabled="formDisabled"
              >
              </v-select>
            </v-list-item>
            <v-list-item v-if="currentTraining.display_shirt_option">
              <v-select
                color="secondary"
                v-model="currentTraining.shirt_size"
                label="Shirt Size"
                :items="SHIRT_SIZE"
                :disabled="formDisabled"
              >
              </v-select>
            </v-list-item>
            <v-list-item v-if="currentTraining.display_accomodation_option">
              <v-select
                color="secondary"
                v-model="currentTraining.accomodation"
                label="Accomodation"
                :items="ACCOMODATION"
                :disabled="formDisabled"
              >
              </v-select>
            </v-list-item>
            <v-list-item v-if="currentTraining.break_up_session">
              <v-select
                color="secondary"
                v-model="currentTraining.pref_lang"
                label="Break Up Session Preferred language"
                :items="langList"
                :disabled="formDisabled"
              >
              </v-select>
            </v-list-item>
            <v-list-item>
              <v-spacer />
              <v-btn
                dark
                rounded
                v-if="!formDisabled"
                :loading="loading"
                type="submit"
                >Save</v-btn
              >
            </v-list-item>
          </v-list>
        </v-form>
      </v-col>
    </v-row>
    <register-event v-model="registerEvent" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import isEqual from 'lodash/isEqual'
import StatusChip from '@/components/common/StatusChip/index'
import { MEAL_OPTIONS, SHIRT_SIZE, ACCOMODATION } from '@/const'
import RegisterEvent from './RegisterDialog'

export default {
  name: 'Details',
  components: { RegisterEvent, StatusChip },
  data: () => ({
    loading: false,
    valid: false,
    formDisabled: true,
    registerEvent: false,
    MEAL_OPTIONS,
    SHIRT_SIZE,
    ACCOMODATION
  }),
  computed: {
    ...mapGetters('training', ['all', 'loaded']),
    ...mapGetters('auth', ['member']),
    currentTraining() {
      return this.all.find(training =>
        isEqual(this.$route.params.id, training.name)
      )
    }
  },
  mounted() {
    if (!this.loaded) {
      this.$store.dispatch('training/load')
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$store
        .dispatch('training/updatePref', {
          trainee_name: this.currentTraining.trainee_name,
          meal_option: this.currentTraining.meal_option || null,
          shirt_size: this.currentTraining.shirt_size || null,
          accomodation: this.currentTraining.accomodation || null,
          pref_lang: this.currentTraining.pref_lang || null
        })
        .then(() => {
          this.formDisabled = true
          this.showSnackbar('Registration updated successfully!', 'success')
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

<style scoped></style>
