import { createApp } from 'vue';
import App from './App.vue';
import vuetifyApp from './plugins/vuetify';
import router from './router';
import store from './store';
// import graphModule from './modules/graph/graphStore';
// import authModule from './modules/auth/authStore';
// import dashboardModule from './modules/dashboard/dashboardStore'
import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.css';

// import 'vue-toastification/dist/index.css';
// import listener from './modules/mixins/listener';
// import Toast from 'vue-toastification';





const app = createApp(App);


app.use(router);
app.use(store);
// app.use(listener);
// app.use(graphModule);
// app.use(authModule);
// app.use(dashboardModule);
// app.use(Toast);
app.use(Vuetify);



app.use(vuetifyApp);


app.mount('#app');


