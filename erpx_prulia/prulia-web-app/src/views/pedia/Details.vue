<template>
  <v-container v-if="currentPedia" class="pt-0 px-0">
    <v-list>
      <v-list-item>
        <v-list-item-title>
          <div>
            {{ currentPedia.title }}
          </div>
          <div class="caption">
            {{ currentPedia.published_date | formatDate('DD MMM YYYY') }}
          </div>
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-expansion-panels accordion multiple>
      <template v-for="(section, index) in fields">
        <v-expansion-panel
          v-if="section.fields.length"
          :key="`section-${index}`"
        >
          <v-expansion-panel-header>
            <v-subheader>{{
              section.label.replace(/STEP *\d+ *\:/, '')
            }}</v-subheader>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="py-0 px-3" dense>
              <v-col
                cols="12"
                v-for="(field, field_index) in section.fields"
                :key="`field-${index}-${field_index}`"
              >
                <v-checkbox
                  dense
                  v-if="field.fieldtype === 'Check'"
                  :label="field.description || field.label"
                  v-model="currentPedia[field.fieldname]"
                  disabled
                />
                <v-text-field
                  dense
                  v-if="
                    field.fieldtype === 'Data' || field.fieldtype === 'Select'
                  "
                  :label="field.label"
                  v-model="currentPedia[field.fieldname]"
                  disabled
                ></v-text-field>
                <v-textarea
                  dense
                  v-if="field.fieldtype === 'Long Text'"
                  :label="field.label"
                  v-model="currentPedia[field.fieldname]"
                  disabled
                >
                </v-textarea>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </template>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import isEqual from 'lodash/isEqual'

export default {
  name: 'Details',
  computed: {
    ...mapGetters('pedia', ['all', 'meta', 'loaded', 'metaLoaded']),
    currentPedia() {
      return this.all?.find(pedia => isEqual(this.$route.params.id, pedia.name))
    },
    fields() {
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

      //remove member details section
      sections.splice(1, 1)

      //remove member comment section
      sections.pop()

      return sections.filter(item => item.fields.length)
    }
  },
  mounted() {
    if (!this.loaded) {
      this.$store.dispatch('pedia/load')
    }
    if (!this.metaLoaded) {
      this.$store.dispatch('pedia/loadMeta')
    }
  }
}
</script>

<style scoped></style>
