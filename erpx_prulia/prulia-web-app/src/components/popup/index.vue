<template>
  <v-dialog
    v-model="model"
    max-width="80%"
    content-class="popup-dialog elevation-0"
  >
    <v-card class="transparent elevation-0">
      <v-btn
        class="dusk"
        color="secondary"
        @click="model = false"
        fab
        icon
        top
        absolute
        right
        small
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-carousel
        cycle
        continuous
        hide-delimiters
        hide-delimiter-background
        :show-arrows="popups.length > 1"
        show-arrows-on-hover
        interval="5000"
        height="450px"
      >
        <v-carousel-item
          class="pa-0"
          v-for="(popup, i) in popups"
          :key="`popup-${i}`"
        >
          <v-row class="fill-height" no-gutters align="center" justify="center">
            <v-img :src="popup.news_image" contain max-height="100%" />
          </v-row>
        </v-carousel-item>
        <template #prev="{on}">
          <v-btn v-on="on" class="dusk" color="secondary" fab icon small
            ><v-icon>mdi-chevron-left</v-icon></v-btn
          >
        </template>
        <template #next="{on}">
          <v-btn v-on="on" class="dusk" color="secondary" fab icon small
            ><v-icon>mdi-chevron-right</v-icon></v-btn
          >
        </template>
      </v-carousel>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Popup',

  computed: {
    ...mapGetters('news', ['popups', 'shouldShowPopup']),
    model: {
      get() {
        return this.shouldShowPopup
      },
      set(val) {
        !val && this.$store.dispatch('news/togglePopup', val)
      }
    }
  }
}
</script>

<style lang="scss">
.popup-dialog {
  overflow: visible !important;
}
</style>
