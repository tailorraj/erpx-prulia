<template>
  <v-dialog v-model="model" max-width="600">
    <v-card>
      <v-card-title class="primary--text">
        Add New Pedia
        <v-spacer />
        <v-btn icon @click="model = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text class="pa-0">
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
                <template v-for="(field, field_index) in step.fields">
                  <v-checkbox
                    dense
                    :key="`field-${index}-${field_index}`"
                    v-if="field.fieldtype === 'Check'"
                    :label="field.description || field.label"
                    v-model="data[field.fieldname]"
                  />
                  <v-text-field
                    :key="`field-${index}-${field_index}`"
                    v-if="field.fieldtype === 'Data'"
                    :label="field.label"
                    v-model="data[field.fieldname]"
                    :rules="isRequired(field)"
                  ></v-text-field>
                  <v-select
                    :key="`field-${index}-${field_index}`"
                    v-if="field.fieldtype === 'Select'"
                    :label="field.label"
                    v-model="data[field.fieldname]"
                    :rules="isRequired(field)"
                    :items="field.options.split(/\n/)"
                  >
                  </v-select>
                  <v-textarea
                    rows="2"
                    :key="`field-${index}-${field_index}`"
                    v-if="field.fieldtype === 'Long Text'"
                    :label="field.label"
                    v-model="data[field.fieldname]"
                    :rules="isRequired(field)"
                  >
                  </v-textarea>
                </template>
              </v-form>
            </v-stepper-content>
          </template>
        </v-stepper>
      </v-card-text>

      <v-card-actions class="primary">
        <v-spacer></v-spacer>
        <v-btn
          class="white--text"
          @click="onSubmit"
          :disabled="!!validity.filter(item => item === false).length"
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
  loading: false,
  data: {},
  currentStep: 1
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

      //remove member details
      sections.splice(1, 1)

      //remove member comment section
      sections.pop()

      return sections.filter(item => item.fields.length)
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
