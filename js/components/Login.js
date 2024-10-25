export default {
    template: `
      <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div>
            <label>Email:</label>
            <input type="email" v-model="email" required />
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" v-model="senha" required />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    `,
    data() {
      return {
        email: '',
        senha: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              senha: this.senha,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem('token', data.token);
            this.$router.push('/listar');
          } else {
            alert(data.error || 'Erro no login');
          }
        } catch (error) {
          alert('Erro na conexão com o servidor');
        }
      },
    },
  };
  