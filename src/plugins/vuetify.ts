import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { PurpleTheme } from '@/theme/LightTheme';

export const vuetify = createVuetify({
    components,
    directives,

    theme: {
        defaultTheme: 'PurpleTheme',
        themes: {
            PurpleTheme
        }
    }
})