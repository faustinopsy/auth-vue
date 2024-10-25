export default {
    template: `
      <nav>
        <ul>
          <li v-if="!Autenticado"><a href="#/login">Login</a></li>
          <li v-if="!Autenticado"><a href="#/register">Registrar</a></li>
          <li v-if="Autenticado"><a href="#/listar">Listar Produtos</a></li>
          <li v-if="Autenticado && (userRole === 'inserir' || userRole === 'admin')">
            <a href="#/inserir">Inserir Produto</a>
          </li>
          <li v-if="Autenticado && userRole === 'admin'"><a href="#/admin">Admin</a></li>
          <li v-if="Autenticado"><a href="#" @click.prevent="logout">Logout</a></li>
        </ul>
      </nav>
    `,
    data() {
      return {
        Autenticado: false,
        userRole: null,
      };
    },
    methods: {
      logout() {
        import('../utils/autorizacao.js').then(({ logout }) => {
          logout();
          this.Autenticado = false;
          this.userRole = null;
          this.$router.push('/login');
        });
      },
    },
    created() {
      import('../utils/autorizacao.js').then(({ Autenticado, Autorizacao }) => {
        this.Autenticado = Autenticado();
        this.userRole = Autorizacao();
      });
    },
    watch: {
      '$route'() {
        import('../utils/autorizacao.js').then(({ Autenticado, Autorizacao }) => {
          this.Autenticado = Autenticado();
          this.userRole = Autorizacao();
        });
      },
    },
  };
  