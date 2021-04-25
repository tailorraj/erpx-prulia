<template>
  <v-chip
    class="ma-2 black--text"
    :style="absolute ? 'position: absolute;top:6px;right:6px;' : ''"
    style="opacity: 0.8;"
    :color="getStatusColor(event)"
    >{{ getStatus(event) }}</v-chip
  >
</template>

<script>
export default {
  name: 'StatusChip',
  props: {
    event: {
      type: Object
    },
    statusKey: {
      type: String,
      default: 'event_status'
    },
    absolute: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getStatus(event) {
      if (event.register) {
        return 'Registered'
      } else {
        if (event[this.statusKey] === 'Registration Closed') {
          return 'Registration Closed'
        } else {
          if (
            event[this.statusKey] === 'Publish' &&
            !event.show_open_for_registration
          ) {
            return 'Coming soon'
          } else {
            return 'Ready for Registration'
          }
        }
      }
    },
    getStatusColor(event) {
      if (event.register) {
        return 'amber'
      } else {
        if (event[this.statusKey] === 'Registration Closed') {
          return 'primary'
        } else {
          if (
            event[this.statusKey] === 'Publish' &&
            !event.show_open_for_registration
          ) {
            return 'amber'
          } else {
            return 'green'
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
