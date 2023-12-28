import { createVuetify } from 'vuetify';
import * as components from 'vuetify/lib/components';
import 'vue-material-design-icons/styles.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css'



export default createVuetify({
  components,
  themes: {
    light: {
      primary: '#3f51b5', // set your primary color
      secondary: '#b0bec5', // set your secondary color
    },
  },
  icons: {
    iconfont: "md, mdi",
  },
});


