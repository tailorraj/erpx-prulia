<template>
  <v-dialog v-model="model" max-width="600">
    <v-card rounded>
      <v-card-title class="primary--text">
        Add New Pedia
        <v-spacer />
        <v-btn icon @click="model = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text v-if="!mode">
        <v-row no-gutters justify="center" align="center" class="pa-6">
          <v-col class="px-3">
            <v-card @click="changeMode('help')">
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
            <v-card @click="changeMode('feedback')">
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
              editable
              color="primary"
              :step="index + 1"
              :key="`stepper-${index}`"
            >
              <small
                >{{ step.label
                }}<span
                  class="red--text font-weight-medium"
                  v-if="validity[index] === false"
                  >&nbsp;(Required fields)</span
                ></small
              >
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
                      :rules="isRequired(field, 'Please check here')"
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
                      :items="field.options.split(/\n/).filter(item => item)"
                    >
                      <template #item="{item, on, attrs}">
                        <template v-if="item.startsWith('*')">
                          <v-list-item disabled>
                            <v-list-item-title class="font-weight-medium">
                              {{ item.slice(1) }}
                            </v-list-item-title>
                          </v-list-item>
                        </template>
                        <v-list-item
                          class="pl-8"
                          v-else
                          v-on="on"
                          v-bind="attrs"
                        >
                          <v-list-item-content>
                            {{ item }}
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-select>

                    <v-textarea
                      v-if="field.fieldtype === 'Long Text'"
                      :label="field.label"
                      :value="field.default || ''"
                      @change="data[field.fieldname] = $event"
                      :readonly="!!field.default"
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

                    <v-file-input
                      v-if="field.fieldtype === 'Attach'"
                      :label="field.label"
                      @change="attachments[field.fieldname] = $event"
                    >
                    </v-file-input>
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
  attachments: {},
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
          if (!_meta.hidden) sections[index].fields.push(_meta)
        }
      })

      return sections.filter(
        section => section.fields.length && section.options?.includes(this.mode)
      )
    }
  },
  methods: {
    isRequired(field, label) {
      if (!label) label = `${field.label} is required`
      return field.reqd ? [v => !!v || label] : []
    },
    changeMode(mode) {
      this.mode = mode
      this.validity = []
    },
    onSubmit() {
      this.loading = true

      this.$store
        .dispatch('pedia/createPedia', this.data)
        .then(({ data }) => {
          const tasks = []
          const { message } = data
          const { name } = message //get pedia ID

          Object.keys(this.attachments)
            .filter(key => this.attachments[key])
            .forEach(key => {
              tasks.push(
                this.toBase64(this.attachments[key]).then(filedata => {
                  this.$store.dispatch('pedia/uploadAttachment', {
                    doctype: 'PRULIA Pedia',
                    docname: name,
                    fieldname: key,
                    filename: this.attachments[key].name,
                    file_size: this.attachments[key].size,
                    filedata
                  })
                })
              )
            })

          return Promise.all(tasks).then(() => {
            this.showSnackbar('Pedia submitted successfully!', 'success')
            this.model = false
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
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () =>
          resolve(
            reader.result
              .split('base64,')
              .pop()
              .trim()
          )
        reader.onerror = error => reject(error)
      })
    }
  }
}
</script>

<style scoped></style>
