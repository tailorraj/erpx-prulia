<template>
  <v-container>
    <v-row class="dusk"
      ><v-img src="@/assets/banners/PRULIA_BannerEvents.jpg"
    /></v-row>
    <v-row class="vanilla py-3" justify="center">
      <h2>Events</h2>
    </v-row>

    <v-row v-if="all.length" justify="start" class="primary">
      <v-col
        align-self="center"
        class="pa-6"
        cols="12"
        sm="6"
        md="4"
        v-for="(event, index) in all"
        :key="`event-${index}`"
      >
        <v-card
          rounded
          hover
          :to="{ name: 'EventDetails', params: { id: event.name } }"
        >
          <v-row no-gutters class="secondary">
            <v-img
              width="100%"
              height="200"
              position="center center"
              contain
              :src="event.event_image"
            ></v-img>
          </v-row>

          <status-chip :event="event" absolute />
          <v-card-subtitle class="text-center pb-0">
            <h3>
              <text-truncate>{{ event.event_name }}</text-truncate>
            </h3>
          </v-card-subtitle>
          <v-card-text class="pt-3">
            <v-row justify="center" class="caption pa-1 text--darken-4">
              {{ event.start_date_time | formatDate('D MMM YYYY, hh:mm a') }}
            </v-row>
            <v-row justify="center" class="caption text--darken-4">
              to
            </v-row>
            <v-row justify="center" class="caption pa-1  text--darken-4">
              {{ event.end_date_time | formatDate('D MMM YYYY, hh:mm a') }}
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else justify="center" class="vanilla pb-12">
      Oops, no latest events available :(
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import StatusChip from '@/components/common/StatusChip/index'

export default {
  name: 'Events',
  components: { StatusChip },
  computed: {
    ...mapGetters('events', ['all'])
  },
  mounted() {
    this.$store.dispatch('events/load')
  }
}
</script>

<style scoped></style>
