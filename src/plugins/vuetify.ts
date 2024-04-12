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
      sm: 490,
      md: 540,
      lg: 800,
      xl: 1280,
    },
  },
  defaults: {
    VBtn: { class: 'text-body-1', color: 'blue-darken-2', rounded: "sm", density: "comfortable", variant: "elevated" },
  },
  theme: {
    defaultTheme: 'light',
  },
})
