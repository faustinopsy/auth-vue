export default {
    template: `
      <div>
  <h2>Administração de Produtos</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Quantidade</th>
        <th>Preço</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="produto in produtos" :key="produto.id">
        <td>{{ produto.id }}</td>
        <td>
          <input v-model="produto.nome" />
        </td>
        <td>
          <input type="number" v-model="produto.quantidade" />
        </td>
        <td>
          <input type="number" step="0.01" v-model="produto.preco" />
        </td>
        <td>
          <button @click="atualizarProduto(produto)">Atualizar</button>
          <button @click="deletarProduto(produto.id)">Deletar</button>
        </td>
      </tr>
    </tbody>
  </table>
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
      async atualizarProduto(produto) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:3000/products/${produto.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              nome: produto.nome,
              quantidade: produto.quantidade,
              preco: produto.preco,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            alert('Produto atualizado com sucesso!');
          } else {
            alert(data.error || 'Erro ao atualizar produto');
          }
        } catch (error) {
          alert('Erro na conexão com o servidor');
        }
      },
      async deletarProduto(id) {
        if (!confirm('Tem certeza que deseja deletar este produto?')) return;
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            alert('Produto deletado com sucesso!');
            this.fetchProdutos();
          } else {
            alert(data.error || 'Erro ao deletar produto');
          }
        } catch (error) {
          alert('Erro na conexão com o servidor');
        }
      },
    },
    created() {
      this.fetchProdutos();
    },
  };
  