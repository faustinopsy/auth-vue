export default {
    template: `
      <div>
        <h2>Lista de Produtos</h2>
        <ul>
          <li v-for="produto in produtos" :key="produto.id">
            {{ produto.nome }} - {{ produto.quantidade }} - R$ {{ produto.preco }}
          </li>
        </ul>
      </div>
    `,
    data() {
      return {
        produtos: [],
      };
    },
    methods: {
      async fetchProdutos() {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:3000/products', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            this.produtos = data;
          } else {
            alert(data.error || 'Erro ao listar produtos');
            this.$router.push('/login');
          }
        } catch (error) {
          alert('Erro na conexão com o servidor');
          this.$router.push('/login');
        }
      },
    },
    created() {
      this.fetchProdutos();
    },
  };
  