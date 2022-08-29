
export function valida (input) {
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    }else{
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    }
}
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]
const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio',
        typeMismatch: 'O email digitado não é válido'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estrar vazio',
        patternMismatch: 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, não deve conter caracteres especiais como "!?#*$%^&=+-_" e deve ter entre 6 e 12 caracteres.'
    },
    dataNascimento: {
        valueMissing: 'O campo data de nascimento não pode estar vazio',
        customError: 'Você deve ser maior que 18 anos para se cadastrar'
    }



}

const validadores = {
    dataNascimento: input => validaDataNascimento(input)
}

function mostraMensagemDeErro (tipoDeInput, input){
    let mensagem = '';
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    return mensagem;
}

function validaDataNascimento (input){
    const dataRecebida = new Date(input.value);
    var mensagem = '';
    
    if(!maiorQue18(dataRecebida)){
        var mensagem= 'você deve ser maior que 18 anos para se cadastrar';
    }

    input.setCustomValidity(mensagem);
   
}

function maiorQue18 (data){
    const dataAtual = new Date();
    const dataMaisque18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataMaisque18 <= dataAtual;

}