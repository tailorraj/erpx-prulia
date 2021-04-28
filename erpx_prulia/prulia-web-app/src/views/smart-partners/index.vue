<template>
  <v-container>
    <v-row class="dusk"
      ><v-img contain src="@/assets/banners/PRULIA_BannerSmartPartner.jpg"
    /></v-row>
    <v-row v-if="all.length" class="primary">
      <v-col
          align-self="center"
          class="pa-4"
          cols="12"
          md="6"
          v-for="(banner, index) in all"
          :key="`banner-${index}`"
      >
        <a :href="banner.type === 'Link' && banner.link" target="_blank" class="text-decoration-none">
          <v-card
              class="dusk"
              hover
              @click="goTo(banner)"
          >
            <v-img
                contain
                width="100%"
                height="200"
                position="center center"
                :src="banner.image"
            ></v-img>
            <v-card-subtitle class="text-center">
              <h3>
                <text-truncate>{{ banner.banner_name }}</text-truncate>
              </h3>
            </v-card-subtitle>
          </v-card>
        </a>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'SmartPartners',
  computed: {
    ...mapGetters('smartPartners', ['all', 'loaded'])
  },
  mounted() {
    if (!this.loaded) {
      this.$store.dispatch('smartPartners/load')
    }
  },
  methods: {
    goTo(banner) {
      if (banner.type === 'Link') return;
      console.log(banner);
      this.$router.push({ name: 'SmartPartnersDetails', params: { id: banner.name } });
    }
  }
}
</script>