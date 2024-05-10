/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'

// Composables
import { createVuetify } from 'vuetify'

export default createVuetify({
  blueprint: md3,
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  defaults: {
    VBtn: { color: 'blue-darken-2', rounded: "lg", density: "comfortable", variant: "elevated" },
  },
  theme: {
    defaultTheme: 'light',
  },
})
