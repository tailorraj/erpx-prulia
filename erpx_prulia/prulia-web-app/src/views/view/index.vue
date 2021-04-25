<template>
  <v-container v-if="article">
    <v-row class="dusk"><v-img contain :src="article.image"/></v-row>
    <v-row class="vanilla py-3" justify="center">
      <h2>{{ article.title }}</h2>
    </v-row>
    <v-row justify="center" class="pb-12">
      <v-col>
        <v-fade-transition>
          <div
            style="width: 100%"
            v-if="article.content"
            v-html="article.content"
          ></div>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'index.vue',
  computed: {
    ...mapGetters('home', { home: 'all' }),
    article() {
      return this.home.find(item => item.name === this.$route.params.id)
    }
  }
}
</script>
