<template>
  <v-container>
    <v-row v-if="all.length" class="primary">
      <v-col
        align-self="center"
        class="pa-6"
        cols="12"
        sm="6"
        md="4"
        v-for="(pedia, index) in all"
        :key="`pedia-${index}`"
      >
        <v-card
          min-height="100"
          class="dusk"
          hover
          :to="{ name: 'PediaDetails', params: { id: pedia.name } }"
        >
          <v-card-subtitle class="pb-0">
            <h3>
              <text-truncate>{{ pedia.title }}</text-truncate>
            </h3>
          </v-card-subtitle>
          <v-card-actions class="">
            <v-spacer />
            <span class="subtitle-2 pa-2 text--darken-4">
              {{ pedia.published_date | formatDate('DD MMM YYYY') }}
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      v-else
      justify="center"
      align="center"
      class="vanilla pb-12 fill-height"
    >
      <span class="pt-4">
        Oops, no Pedia available :(
      </span>
    </v-row>
    <v-slide-y-reverse-transition>
      <v-btn color="primary" fab fixed bottom right @click="showDialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>
    <add-dialog v-model="showDialog" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AddDialog from './AddDialog'

export default {
  name: 'Pedia',
  components: { AddDialog },
  data: () => ({
    showDialog: false
  }),
  computed: {
    ...mapGetters('pedia', ['all'])
  },
  mounted() {
    this.$store.dispatch('pedia/load')
    this.$store.dispatch('pedia/loadMeta')
  }
}
</script>

<style scoped></style>
