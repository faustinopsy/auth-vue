import router from './router.js';
import Navbar from './components/Navbar.js';

const app = Vue.createApp({
  components: {
    Navbar,
  },
  template: `
    <div>
      <Navbar />
      <router-view></router-view>
    </div>
  `,
});

app.use(router);
app.mount('#app');
