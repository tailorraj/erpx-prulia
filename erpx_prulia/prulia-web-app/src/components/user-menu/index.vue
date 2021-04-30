<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        class="elevation-0 px-2"
        large
        v-on="on"
        v-bind="attrs"
      >
        <h4 class="text-capitalize hidden-sm-and-down">
          <text-truncate>
            {{ $store.getters['auth/member'].full_name }}
          </text-truncate>
        </h4>
        <user-avatar
          class="ml-3"
          right
          :src="$store.getters['auth/member'].profile_photo"
        />
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item class="hidden-md-and-up">
        <v-list-item-title class="primary--text text-capitalize">
          <text-truncate>
            {{ $store.getters['auth/member'].full_name }}
          </text-truncate>
        </v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ name: 'Profile' }">
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Change password</v-list-item-title>
      </v-list-item>
      <v-list-item
        href="https://form.jotform.me/80987924533469"
        target="_blank"
      >
        <v-list-item-title>Feedback</v-list-item-title>
      </v-list-item>
      <!--      <v-list-item @click.stop="darkMode">-->
      <!--        <v-list-item-title>Dark theme</v-list-item-title>-->
      <!--        <v-list-item-action>-->
      <!--          <v-switch-->
      <!--            disabled-->
      <!--            color="secondary"-->
      <!--            v-model="$vuetify.theme.dark"-->
      <!--          ></v-switch>-->
      <!--        </v-list-item-action>-->
      <!--      </v-list-item>-->
      <v-list-item @click="logout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import UserAvatar from '@/components/common/UserAvatar'
export default {
  name: 'UserMenu',
  components: { UserAvatar },
  beforeCreate() {
    this.$vuetify.theme.dark = this.$localStorage.get('dark-mode')
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.replace({ name: 'Home' }).catch(() => {})
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.$localStorage[this.$vuetify.theme.dark ? 'set' : 'remove'](
        'dark-mode',
        1
      )
    }
  }
}
</script>

<style scoped></style>
