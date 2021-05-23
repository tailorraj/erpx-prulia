<template>
  <v-container>
    <v-row no-gutters justify="end" align="center" class="pa-0">
      <v-col><h3>Pedia</h3></v-col>
      <v-spacer />
      <v-col cols="9" md="3">
        <v-text-field
          v-model="search"
          @input="onSearch"
          placeholder="Search"
          prepend-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="all.length" class="primary" align="start">
      <v-col
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
          <v-card-text class="pb-0">
            <div class="display-5 text--primary">
              <text-truncate>{{ pedia.title }}</text-truncate>
            </div>
            <p class="pb-0">By {{ pedia.full_name }}</p>
            <v-chip v-if="pedia.category" class="my-1 mr-2"
              ><text-truncate>{{ pedia.category }}</text-truncate></v-chip
            >
            <v-chip v-if="pedia.other_cat" class="my-1"
              ><text-truncate>{{ pedia.other_cat }}</text-truncate></v-chip
            >
          </v-card-text>
          <v-card-actions class="px-4">
            <v-spacer />
            <span class="caption pa-2">
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
import debounce from 'lodash/debounce'

export default {
  name: 'Pedia',
  components: { AddDialog },
  data: () => ({
    search: '',
    showDialog: false
  }),
  computed: {
    ...mapGetters('pedia', ['all'])
  },
  mounted() {
    this.$store.dispatch('pedia/load')
    this.$store.dispatch('pedia/loadMeta')
  },
  methods: {
    onSearch: debounce(function() {
      this.$store.dispatch('pedia/load', this.search)
    }, 400)
  }
}
</script>

<style scoped></style>
