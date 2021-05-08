<template>
  <v-container>
    <v-row v-if="all.length"> </v-row>
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
      <v-btn color="primary" fab fixed bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pedia',
  computed: {
    ...mapGetters('pedia', ['all'])
  },
  mounted() {
    this.$store.dispatch('pedia/loadMeta')
  }
}
</script>

<style scoped></style>
