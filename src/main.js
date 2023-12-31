import { createApp } from 'vue';
import App from './App.vue';
import vuetifyApp from './plugins/vuetify';
import router from './router';
import store from './store';
import { provideEventBus } from '@/utils/eventBus';

import Vuetify from 'vuetify';
// import Toast from 'vue-toastification';
// import 'vue-toastification/dist/index.css';


const app = createApp(App);
provideEventBus()
app.use(router);
app.use(store);
// app.use(Toast);
app.use(Vuetify);



app.use(vuetifyApp);


app.mount('#app');


