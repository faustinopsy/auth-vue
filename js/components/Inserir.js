export default {
    template: `
      <div>
        <h2>Inserir Produto</h2>
        <form @submit.prevent="inserirProduto">
          <div>
            <label>Nome:</label>
            <input type="text" v-model="nome" required />
          </div>
          <div>
            <label>Quantidade:</label>
            <input type="number" v-model="quantidade" required />
          </div>
          <div>
            <label>Preço:</label>
            <input type="number" step="0.01" v-model="preco" required />
          </div>
          <button type="submit">Inserir</button>
        </form>
      </div>
    `,
    data() {
      return {
        nome: '',
        quantidade: '',
        preco: '',
      };
    },
    methods: {
      async inserirProduto() {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              nome: this.nome,
              quantidade: this.quantidade,
              preco: this.preco,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            alert('Produto inserido com sucesso!');
            this.nome = '';
            this.quantidade = '';
            this.preco = '';
          } else {
            alert(data.error || 'Erro ao inserir produto');
          }
        } catch (error) {
          alert('Erro na conexão com o servidor');
        }
      },
    },
  };
  