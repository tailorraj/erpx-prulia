<template>
  <v-dialog v-model="model" max-width="600">
    <v-card>
      <v-card-title class="primary--text">
        Add New Pedia
        <v-spacer />
        <v-btn icon @click="model = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text v-if="!mode">
        <v-row no-gutters justify="center" align="center" class="pa-6">
          <v-col class="px-3">
            <v-card @click="mode = 'help'">
              <v-card-text class="pt-9">
                <v-row justify="center">
                  <v-btn x-large fab class="primary elevation-0">
                    <v-icon size="36">mdi-help</v-icon>
                  </v-btn>
                </v-row>
                <v-row justify="center" class="pt-3">
                  <p class="display-5 px-2">I need help</p>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col class="px-3">
            <v-card @click="mode = 'feedback'">
              <v-card-text class="pt-9">
                <v-row justify="center">
                  <v-btn x-large fab class="indigo elevation-0">
                    <v-icon class="white--text" size="36"
                      >mdi-message-alert</v-icon
                    >
                  </v-btn>
                </v-row>
                <v-row justify="center" class="pt-3">
                  <p class="display-5 px-2">I would like to provide feedback</p>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else class="pa-0">
        <v-stepper
          class="elevation-0"
          v-if="steps.length"
          v-model="currentStep"
          vertical
          non-linear
          flat
        >
          <template v-for="(step, index) in steps">
            <v-stepper-step
              :rules="[() => validity[index] !== false]"
              editable
              color="primary"
              :step="index + 1"
              :key="`stepper-${index}`"
            >
              <small>{{ step.label }}</small>
            </v-stepper-step>
            <v-stepper-content
              editable
              :step="index + 1"
              :key="`stepper-content-${index}`"
            >
              <v-form v-model="validity[index]">
                <v-row no-gutters class="pr-6">
                  <v-col
                    class="py-0 px-2"
                    :cols="field.columns || 12"
                    v-for="(field, field_index) in step.fields"
                    :key="`field-${index}-${field_index}`"
                  >
                    <v-checkbox
                      dense
                      v-if="field.fieldtype === 'Check'"
                      :label="field.description || field.label"
                      v-model="data[field.fieldname]"
                    />
                    <v-text-field
                      v-if="field.fieldtype === 'Data'"
                      :label="field.label"
                      v-model="data[field.fieldname]"
                      :rules="isRequired(field)"
                    ></v-text-field>
                    <v-select
                      v-if="field.fieldtype === 'Select'"
                      :label="field.label"
                      v-model="data[field.fieldname]"
                      :rules="isRequired(field)"
                      :items="field.options.split(/\n/)"
                    >
                    </v-select>
                    <v-textarea
                      rows="2"
                      v-if="field.fieldtype === 'Long Text'"
                      :label="field.label"
                      v-model="data[field.fieldname]"
                      :rules="isRequired(field)"
                    >
                    </v-textarea>

                    <v-menu
                      v-if="field.fieldtype === 'Date'"
                      v-model="dates[field.fieldname]"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      nudge-bottom="48"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="data[field.fieldname]"
                          :label="field.label"
                          :rules="isRequired(field)"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="data[field.fieldname]"
                        @input="dates[field.fieldname] = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-form>
            </v-stepper-content>
          </template>
        </v-stepper>
      </v-card-text>

      <v-card-actions class="primary">
        <v-btn v-if="mode" class="white--text" @click="mode = null" rounded text
          >Back</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          class="white--text"
          @click="onSubmit"
          :disabled="!mode || !!validity.filter(item => item === false).length"
          :loading="loading"
          rounded
          text
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

const data = () => ({
  validity: [],
  mode: null,
  loading: false,
  data: {},
  currentStep: 1,
  dates: {}
})

export default {
  name: 'AddDialog',
  data: () => data(),
  props: {
    value: {
      type: Boolean
    }
  },

  computed: {
    ...mapGetters('pedia', ['meta']),
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
    },
    steps() {
      let sections = []
      let index = -1

      if (!this.mode) return []

      this.meta?.forEach(_meta => {
        if (_meta.fieldtype === 'Section Break') {
          index++
          sections[index] = {
            ..._meta,
            fields: []
          }
        } else if (sections[index]?.fields) {
          sections[index].fields.push(_meta)
        }
      })

      return sections.filter(
        section => section.fields.length && section.options?.includes(this.mode)
      )
    }
  },
  methods: {
    isRequired(field) {
      return field.reqd ? [v => !!v || `${field.label} is required`] : []
    },
    onSubmit() {
      this.loading = true

      this.$store
        .dispatch('pedia/createPedia', this.data)
        .then(() => {
          this.showSnackbar('Pedia submitted successfully!', 'success')
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

<style scoped></style>
