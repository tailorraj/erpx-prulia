<template>
  <v-avatar :size="size" :right="right" :left="left">
    <v-img
      v-if="src && src !== defaultSrc && !error"
      :src="src"
      @error="error = true"
      :max-width="size"
      :max-height="size"
      cover
    />
    <v-icon class="transparent" :color="color" v-else :size="size - 6">
      mdi-account
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  data: () => ({
    error: false,
    defaultSrc: '"../www/assets/imgs/avatar_placeholder-1.png"'
  }),
  props: {
    src: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '28'
    },
    right: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'grey'
    }
  }
}
</script>

<style scoped></style>
