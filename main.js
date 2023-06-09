async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    // faz requisições para a API 
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // faz a requisição para a API
        var consultaCepConvert = await consultaCep.json(); // converte a informação para JSON

        // mostra mensagem de erro caso o CEP esteja estruturalmente correto, mas não existe 
        if (consultaCepConvert.erro) {
            throw Error('CEP não encontrado!');
        }

        //encontra os campos pelo id
        var endereco = document.getElementById('endereco')
        var bairro = document.getElementById('bairro')
        var cidade = document.getElementById('cidade')
        var estado = document.getElementById('estado')

        //substitui os valores por aqueles encontrados na API de acordo com o CEP digitado
        endereco.value = consultaCepConvert.logradouro
        bairro.value = consultaCepConvert.bairro
        cidade.value = consultaCepConvert.localidade
        estado.value = consultaCepConvert.uf

        return consultaCepConvert;
        // mostra mensagem de erro caso o CEP esteja estruturalmente incorreto
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido! Verifique os valores digitados.</p>`
    }
}

var cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))

buscaEndereco();
