<template>
  <v-container>
    <v-row class="dusk"
      ><v-img
        max-height="450px"
        position="start center"
        :src="currentNews.news_image"
    /></v-row>
    <v-row class="primary">
      <v-col cols="12" class="pb-0 white--text">
        <h2>{{ currentNews.title }}</h2>
      </v-col>
      <v-col cols="12" class="pt-0 white--text">
        <h5>{{ currentNews.publish_data | formatDate('DD MMM YYYY') }}</h5>
      </v-col>
    </v-row>
    <v-row justify="center" class="vanilla pb-12">
      <v-col>
        <v-fade-transition>
          <div
            style="width: 100%"
            v-if="currentNews.content"
            v-html="currentNews.content"
          ></div>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import isEqual from 'lodash/isEqual'

export default {
  name: 'index.vue',
  computed: {
    ...mapGetters('news', { allNews: 'all', loaded: 'loaded' }),
    currentNews() {
      return this.allNews.find(news =>
        isEqual(this.$route.params.id, news.name)
      )
    }
  },
  mounted() {
    if (!this.loaded) {
      this.$store.dispatch('news/load')
    }
  },
}
</script>

<style scoped></style>
