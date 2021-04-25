import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#F1646C',
        secondary: '#212121',
        accent: '#F3B047',

        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',

        vanilla: '#fcecdd',
        dusk: '#EBF5EE',
        sky: '#90caf9',
        amber: '#F8D675',
        grey: '#eceff1',
        black: '#212121',
        dark: '#424242'
      },
      dark: {
        primary: '#263238',
        secondary: '#F1646C',

        accent: '#F3B047',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',

        vanilla: '#263238',
        dusk: '#263238',
        sky: '#01579b',
        amber: '#F8D675',
        grey: '#37474f',
        black: '#212121'
      }
    }
  }
})
