<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-row>
          <v-slide-x-transition>
            <v-btn
              v-if="showBack"
              class="mr-1 ml-1 hidden-sm-and-down"
              @click="$router.back()"
              icon
              ><v-icon size="40">mdi-chevron-left</v-icon></v-btn
            >
          </v-slide-x-transition>
          <v-menu v-if="member" offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                class="hidden-md-and-up mr-1 ml-1"
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-menu
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                :to="link.route"
                :key="`topbar-link-sm-${index}`"
                v-for="(link, index) in topBarLinks"
              >
                <v-list-item-title>{{ link.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div @click="$router.push({ name: 'Home' })" style="cursor: pointer">
            <v-img
              style="display: inline-block"
              alt="PRULIA"
              class="shrink mx-4 mt-2"
              contain
              src="@/assets/logo.png"
              transition="scale-transition"
              width="32"
            />
          </div>
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
    <popup />

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
    <v-footer color="secondary" padless class="justify-center" width="100%">
      <v-card flat class="secondary text-center">
        <v-card-text class="white--text">
          Copyright © {{ new Date().getFullYear() }}
          Prudential Life Insurance Agency Association. All rights reserved.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Login from '@/components/login/index'
import { sync } from 'vuex-pathify'
import UserMenu from '@/components/user-menu/index'
import { mapGetters } from 'vuex'
import Popup from '@/components/popup/index'

export default {
  name: 'App',

  components: { Popup, UserMenu, Login },

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
    this.$store.dispatch('home/load')
    this.$store.dispatch('news/load')
    this.$store.dispatch('news/loadPopup')
    this.$store.dispatch('auth/load').finally(() => {
      this.$store.dispatch('news/togglePopup', true)
    })
  },

  watch: {
    $route(to) {
      if (to.name === 'Login') this.showLogin = true
    }
  },

  methods: {
    openLogin() {
      this.$store.dispatch('news/togglePopup', false)
      this.$router.push({ name: 'Home' }).catch(() => {})
      this.$nextTick(() => {
        this.$router.push({ name: 'Login' }).catch(() => {})
      })
    }
  }
}
</script>
