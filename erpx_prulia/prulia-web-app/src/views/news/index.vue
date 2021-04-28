<template>
  <v-container>
    <v-row class="dusk"
      ><v-img contain src="@/assets/banners/PRULIA_BannerNews.jpg"
    /></v-row>
    <v-row v-if="allNews.length" class="primary">
      <v-col
        align-self="center"
        class="pa-6"
        cols="12"
        sm="6"
        md="4"
        v-for="(news, index) in allNews"
        :key="`news-${index}`"
      >
        <v-card
          class="dusk"
          hover
          :to="{ name: 'NewsDetails', params: { id: news.name } }"
        >
          <v-img
            contain
            width="100%"
            height="200"
            position="center center"
            :src="news.news_image"
          ></v-img>
          <v-card-subtitle class="text-center pb-0">
            <h3>
              <text-truncate>{{ news.title }}</text-truncate>
            </h3>
          </v-card-subtitle>
          <v-card-actions class="">
            <v-spacer />
            <span class="subtitle-2 pa-2 text--darken-4">
              {{ news.publish_date | formatDate('DD MMM YYYY') }}
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else justify="center" class="vanilla pb-12">
      Oops, no latest news available :(
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'News',
  computed: {
    ...mapGetters('news', { allNews: 'all' })
  },
}
</script>

<style scoped></style>
