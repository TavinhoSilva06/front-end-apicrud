async function carregarFuncionarios() {
    // Faz a requisição GET ao backend
    const response = await fetch('http://localhost:8080/funcionarios');
    
    // Converte o resultado da requisição para JSON
    const funcionarios = await response.json();

    // Pega o elemento da lista onde os dados serão exibidos
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; // limpa a lista antes de preencher novamente

    // Para cada funcionário retornado do backend...
    funcionarios.forEach(func => {
        const li = document.createElement('li'); // cria um item de lista
        li.innerText = `${func.nome} - ${func.profissao} - ${func.modelo} - R$ ${func.salario}`;

        // Cria botão de excluir ao lado de cada funcionário
        const botaoExcluir = document.createElement('button');
        botaoExcluir.innerText = 'Excluir';

        // Ao clicar, chama deletarFuncionario() com o ID do funcionário
        botaoExcluir.onclick = () => deletarFuncionario(func.id);

        // Adiciona o botão e o item na lista
        li.appendChild(botaoExcluir);
        lista.appendChild(li);
    });
}

async function adicionarFuncionario() {

    // Monta o objeto funcionário com os dados do formulário
    const funcionario = {
        nome: document.getElementById('nome').value,
        profissao: document.getElementById('profissao').value,
        modelo: document.getElementById('modelo').value,
        salario: document.getElementById('salario').value
    };

    // Envia os dados para o backend com método POST
    await fetch('http://localhost:8080/funcionarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funcionario)
    });

    // Após enviar ao servidor, recarrega a lista
    carregarFuncionarios();
}

async function deletarFuncionario(id) {

    // Caixa de confirmação: evita exclusões acidentais
    if (!confirm("Deseja realmente excluir este funcionário?")) {
        return; // Se cancelar, para a função
    }

    // Requisição DELETE ao backend
    await fetch(`http://localhost:8080/funcionarios/${id}`, {
        method: 'DELETE'
    });

    // Atualiza a lista após remover
    carregarFuncionarios();
}
