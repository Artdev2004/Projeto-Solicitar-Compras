class Mask {
    inputTelefone = '';
    inputHora = '';

    constructor(telefone, inputHora) {
        this.inputTelefone = telefone;
        this.inputHora = inputHora;
    }

    maskPhone() {
        $(`#${this.inputTelefone.id}`).mask("(00) 00000-0000");
    };

    maskHora() {
        $(`#${this.inputHora.id}`).mask("00:00");
    }
}

function aplicaMaskPhone() {
    const contatos = $(".contatos-items");
    const telefone = contatos[contatos.length - 1].children[4].children[0];

    const mascara = new Mask(telefone, null);
    mascara.maskPhone();
}

function aplicaMaskHora() {
    const reunioes = $(".reuniao-items");
    const hora = reunioes[reunioes.length - 1].children[0].children[1].children[2].children[1]

    const mascara = new Mask(null, hora);
    mascara.maskHora();
}

