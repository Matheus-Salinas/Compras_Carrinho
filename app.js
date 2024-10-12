// Array de produtos
let produtos = [
    { nome: 'Alface', preco: 50, quantidade: 10 },
    { nome: 'Arroz', preco: 30, quantidade: 5 },
    { nome: 'Feijão', preco: 70, quantidade: 2 },
    { nome: 'Macarrão', preco: 20, quantidade: 15 },
    { nome: 'Sabonete', preco: 40, quantidade: 8 }
];

// Carrinho de compras
let carrinho = [];

// Função para listar produtos disponíveis
function listarProdutos() {
    const listaProdutos = document.getElementById('produtos-disponiveis');
    listaProdutos.innerHTML = '';
    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.textContent = `${produto.nome} - Preço: R$${produto.preco} - Estoque: ${produto.quantidade}`;
        listaProdutos.appendChild(li);
    });
}

// Função para buscar produto
function buscarProduto() {
    const nomeProduto = document.getElementById('buscar-produto').value;
    const produtoEncontrado = produtos.find(produto => produto.nome.toLowerCase() === nomeProduto.toLowerCase());

    if (produtoEncontrado) {
        adicionarAoCarrinho(produtoEncontrado);
    } else {
        alert('Produto não encontrado');
    }
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    if (produto.quantidade > 0) {
        carrinho.push({ nome: produto.nome, preco: produto.preco });
        produto.quantidade--;
        listarProdutos();
        atualizarCarrinho();
    } else {
        alert('Produto esgotado');
    }
}

// Função para remover produto do carrinho
function removerDoCarrinho(indice) {
    const produtoRemovido = carrinho.splice(indice, 1)[0];
    const produtoOriginal = produtos.find(prod => prod.nome === produtoRemovido.nome);
    produtoOriginal.quantidade++;
    listarProdutos();
    atualizarCarrinho();
}

// Função para atualizar o carrinho e calcular o total
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('carrinho');
    listaCarrinho.innerHTML = '';

    carrinho.forEach((produto, indice) => {
        const li = document.createElement('li');
        li.textContent = `${produto.nome} - Preço: R$${produto.preco}`;
        li.appendChild(criarBotaoRemover(indice));
        listaCarrinho.appendChild(li);
    });

    calcularTotal();
}

// Função para calcular o total do carrinho
function calcularTotal() {
    const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
    document.getElementById('total').textContent = `Total: R$${total}`;
}

// Função para criar o botão de remover
function criarBotaoRemover(indice) {
    const botao = document.createElement('button');
    botao.textContent = 'Remover';
    botao.onclick = () => removerDoCarrinho(indice);
    return botao;
}

// Inicializa a lista de produtos
listarProdutos();
