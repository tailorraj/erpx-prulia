<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-row>
          <v-slide-x-transition>
            <v-btn
              v-if="showBack"
              class="mr-1 ml-1"
              @click="$router.back()"
              icon
              ><v-icon size="40">mdi-chevron-left</v-icon></v-btn
            >
          </v-slide-x-transition>

          <a href="/">
            <v-img
              style="display: inline-block"
              alt="PRULIA"
              class="shrink mx-4 mt-2"
              contain
              src="@/assets/logo.png"
              transition="scale-transition"
              width="32"
            />
          </a>
        </v-row>
      </div>
      <span class="hidden-sm-and-down ml-3" v-if="member">
        <v-btn
          text
          rounded
          small
          class="mr-2"
          :to="link.route"
          :key="`topbar-link-${index}`"
          v-for="(link, index) in topBarLinks"
        >
          {{ link.title }}
        </v-btn>
      </span>

      <v-spacer></v-spacer>
      <v-btn href="https://www.facebook.com/prulia.staff" target="_blank" icon
        ><v-icon>mdi-facebook</v-icon></v-btn
      >
      <template v-if="$store.getters['auth/member']">
        <user-menu />
      </template>
      <template v-else>
        <v-btn text rounded small class="mx-2" href="/member-registration">
          New Registration
        </v-btn>
        <v-btn text rounded small @click="openLogin">
          Login
        </v-btn>
      </template>
    </v-app-bar>
    <v-main class="grey">
      <router-view />
    </v-main>

    <login v-model="showLogin" />

    <v-snackbar
      v-model="snackbar.status"
      :timeout="snackbar.timeout"
      :color="snackbar.type"
      multi-line
      bottom
      left
      :max-width="400"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar.status = false"
          rounded
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Login from '@/components/login/index'
import { sync } from 'vuex-pathify'
import UserMenu from '@/components/user-menu/index'
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  components: { UserMenu, Login },

  data: () => ({
    showLogin: false
  }),

  computed: {
    ...mapGetters('auth', ['member']),
    snackbar: sync('home/snackbar'),
    showBack() {
      return this.$route.meta?.showBack
    },
    topBarLinks() {
      return [
        {
          title: 'News',
          route: { name: 'News' }
        },
        {
          title: 'Events',
          route: { name: 'Events' }
        },
        {
          title: 'Training',
          route: { name: 'Training' }
        },
        {
          title: 'Smart Partners',
          route: { name: 'SmartPartners' }
        }
      ]
    }
  },

  mounted() {
    this.$store.dispatch('auth/load').then(() => {
      this.$store.dispatch('news/load')
      this.$store.dispatch('home/load')
    })
  },

  watch: {
    $route(to) {
      if (to.name === 'Login') this.showLogin = true
    }
  },

  methods: {
    openLogin() {
      this.$router.push({ name: 'Home' }).catch(() => {})
      this.$nextTick(() => {
        this.$router.push({ name: 'Login' }).catch(() => {})
      })
    }
  }
}
</script>
