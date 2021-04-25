export default {
  methods: {
    showSnackbar(text, type = 'default') {
      this.$store.dispatch('home/showSnackbar', { text, type })
    },
    resetComponentData(data) {
      Object.assign(this.$data, data())
    },
    log($event) {
      console.log($event)
    }
  }
}
