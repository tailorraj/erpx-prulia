<template>
  <v-container>
    <v-row class="dusk"
      ><v-img max-height="450px" position="start center" :src="book.book_image"
    /></v-row>
    <v-row class="primary">
      <v-col cols="12" class="pb-0 white--text">
        <h2>{{ book.title }}</h2>
      </v-col>
      <v-col cols="12" class="pt-0 white--text">
        <h5>{{ book.publish_date | formatDate('DD MMM YYYY') }}</h5>
      </v-col>
    </v-row>
    <v-row justify="center" class="vanilla pb-12">
      <v-col>
        <v-fade-transition>
          <div
            style="width: 100%"
            v-if="book.content"
            v-html="book.content"
          ></div>
        </v-fade-transition>
      </v-col>
    </v-row>
    <v-btn
      v-if="book.link"
      :href="book.link"
      target="_blank"
      icon
      fab
      fixed
      bottom
      right
      color="secondary"
      class="primary"
      ><v-icon>mdi-open-in-new</v-icon></v-btn
    >
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import isEqual from 'lodash/isEqual'

export default {
  name: 'index.vue',
  computed: {
    ...mapGetters('book', ['all', 'loaded']),
    book() {
      return this.all.find(item => isEqual(this.$route.params.id, item.name))
    }
  },
  mounted() {
    if (!this.loaded) {
      this.$store.dispatch('book/load')
    }
  }
}
</script>

<style scoped></style>
