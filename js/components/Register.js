export default {
    template: `
      <div>
        <h2>Registrar</h2>
        <form @submit.prevent="register">
          <div>
            <label>Nome:</label>
            <input type="text" v-model="nome" required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" v-model="email" required />
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" v-model="senha" required />
          </div>
          <div>
            <label>Perfil:</label>
            <select v-model="perfil" required>
              <option value="listar">Listar</option>
              <option value="inserir">Inserir</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    `,
    data() {
      return {
        nome: '',
        email: '',
        senha: '',
        perfil: 'listar',
      };
    },
    methods: {
      async register() {
        try {
          const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nome: this.nome,
              email: this.email,
              senha: this.senha,
              perfil: this.perfil,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            alert('Registro realizado com sucesso! Faça login.');
            this.$router.push('/login');
          } else {
            alert(data.error || 'Erro no registro');
          }
        } catch (error) {
          alert('Erro na conexão com o servidor');
        }
      },
    },
  };
  