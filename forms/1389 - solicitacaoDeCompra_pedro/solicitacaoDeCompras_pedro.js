const dataVencto = FLUIGC.calendar('#dataVencto');
$("#gestor-container").hide();
$("#rh-container").hide();
$("#anexo").click(() => {
    JSInterface.showCamera(`nota_fiscal`);
    window.parent.$('#tab-attachments').first().click();
});


$("#cep").blur(function () {
    $.getJSON("https://viacep.com.br/ws/" + $("#cep").val() + "/json/", function(data) {
        if(data.logradouro == undefined) {
            $("#cep").parent().addClass('has-error');
            $("#cep").val("");
            FLUIGC.toast({
                message: 'CEP invalido',
                type: 'danger'
            });
        } else {
            $("#endereco").val(data.logradouro);
            $("#cidade").val(data.localidade);
            $("#estado").val(data.uf);
        }
    });
});

$("#cnpj").blur(function () {
    var cnpj = $("#cnpj").val();
    $.ajax({
        'url': 'https://receitaws.com.br/v1/cnpj/'+ cnpj.replace(/[^0-9]/g,''),
        'type': "GET",
        'dataType' : 'jsonp',
        'success' : function(data){
            if(data.nome == undefined){
                $("#cnpj").parent().addClass('has-error');
                $("#cnpj").val("");
                FLUIGC.toast({
                    message: 'CNPJ invalido',
                    type: 'danger'
                });
            }else {
                $("#cnpj").parent().removeClass('has-error');
                $('#razaoSocial').val(data.nome);
            }
        }
    });
});


function setSelectedZoomItem(selectedItem) {  
    const index = selectedItem.inputId.split('___')[1];
    const necessidade = FLUIGC.calendar(`#necessidade___${index}`);

    if(selectedItem.inputId == `produto___${index}`) {
        const medida = selectedItem.unMedida;
        const desc = selectedItem.descricao;
        const valor = selectedItem.valor;

        $(`#un___${index}`).val(medida);
        $(`#descricao___${index}`).val(desc);
        $(`#valor___${index}`).val(valor);
        $(`#total___${index}`).val(valor);
        $(`#quant___${index}`).val(1);
        $(`#quant___${index}`).on("change", function() {
            const totalAtualizado = calculoTotal(index);
            $(`#total___${index}`).val(totalAtualizado);
        });
    };
    
};

function removedZoomItem(removedItem) {
    const index = removedItem.inputId.split('___')[1];
    if(removedItem.inputId == `produto___${index}`) {
        $(`#un___${index}`).val("");
        $(`#descricao___${index}`).val("");
        $(`#valor___${index}`).val("");
        $(`#total___${index}`).val("");
        $(`#quant___${index}`).val("");
        $(`#necessidade___${index}`).val("");
    };
};

function calculoTotal(index) {
    const quant = $(`#quant___${index}`).val();
    const valor = $(`#valor___${index}`).val();
    const calc = Number(quant) * Number(valor);

    return calc;
}


//alterando visibilidade dos campos de aprovaçao
if($("#fase").val() == '8') {
    $("#gestor-container").show();
    $("#rh-container").hide();
}
if($("#fase").val() == '20') {
    $("#gestor-container").show();
    $("#rh-container").show();
}
if($("#fase").val() == '34' || $("#fase").val() == '36' ) {
    $("#gestor-container").show();
    $("#rh-container").show();
}

//Validação gestor
$("#aprovGestor").click(function () {
    aprovGestor("aprovado");
    FLUIGC.toast({
        message: 'Aprovado com sucesso',
        type: 'success'
    });
});

$("#reproveGestor").click(function () {
    aprovGestor("recusado");
    FLUIGC.toast({
        message: 'Solicitação recusada',
        type: 'danger'
    });
});

function aprovGestor(value) {
    $("#respostaGestor").val(value);
}

//Validação RH
var modalAprovRH; 
$("#aprovRH").click(function () {
    // aprovRH("aprovado");
    modalAprovRH = FLUIGC.modal({
        title: '',
        content: `
            <div class="col-md-12">
                <h1 class="text-center">Você tem certeza que deseja APROVAR essa compra?</h1>
            </div>
            <div class="col-md-12 d-flex justify-content-center" style="margin-top: 28px;">
                <div class="col-md-6">
                    <button 
                        type="button" 
                        id="btn-aprov-rh" 
                        name="btn-aprov-rh" 
                        style="width: 100%;" 
                        class="btn btn-success"
                        onclick="aprovRH('aprovado'), modalAprovRH.remove()"
                    >
                        SIM
                    </button>
                </div>
                <div class="col-md-6">
                    <button 
                        type="button" 
                        id="btn-reprov-rh" 
                        name="btn-reprov-rh" 
                        style="width: 100%;" 
                        class="btn btn-danger"
                        onclick="modalAprovRH.remove();"
                    >
                        NÃO
                    </button>
                </div>
            </div>
        `,
        id: 'fluig-modal',
        actions: [],
    });
 
    
});

$("#reproveRH").click(function () {
    aprovRH("recusado");
    
});

function aprovRH(value) {
    if(value === 'recusado') {
        $("#respostaRH").val(value);
            FLUIGC.toast({
                message: 'Solicitação recusada',
                type: 'danger'
            });
    } else {
        const calcToAprov = showNewDatasetFull();
        if(calcToAprov.error) {
            FLUIGC.toast({
                message: calcToAprov.msg,
                type: 'danger'
            });
            $("#respostaRH").val("recusado");
        } else {
            $("#respostaRH").val(value);
                FLUIGC.toast({
                    message: 'Aprovado com sucesso',
                    type: 'success'
                });
        }
    }
    
};


var beforeSendValidate = function(numState, nextState) { 
    const inputs = document.querySelectorAll('input');
    const table = document.querySelectorAll(".rows");
    var mensagem = '';
    const camposObr = [
        {
            campo: 'dataVencto',
            msg: 'Data de vencimento',
        },
        {
            campo: 'filial',
            msg: 'Filial',
        },
        {
            campo: 'emitente',
            msg: 'emitente',
        },
        {
            campo: 'centroDeCusto',
            msg: 'Centro de custo',
        },
        {
            campo: 'tipoPagamento',
            msg: 'Tipo de pagamento',
        },
        {
            campo: 'email',
            msg: 'Email',
        },
        {
            campo: 'telefone',
            msg: 'Telefone',
        },
        {
            campo: 'ramal',
            msg: 'Ramal',
        },
        {
            campo: 'cep',
            msg: 'Cep',
        },
        {
            campo: 'cnpj',
            msg: 'CNPJ',
        },
        {
            campo: 'banco',
            msg: 'Banco',
        },
        {
            campo: 'agencia',
            msg: 'Agência',
        },
        {
            campo: 'tipoConta',
            msg: 'Tipo de conta',
        },
        {
            campo: 'conta',
            msg: 'Conta',
        },
        {
            campo: 'informacoes',
            msg: 'Informações',
        },
        {
            campo: 'numNF',
            msg: 'Número da NF',
        },
        {
            campo: 'dataReferencia',
            msg: 'Data de referência',
        },
        {
            campo: 'valorTotalNF',
            msg: 'Valor total da NF',
        }
    ];

    if(numState == 0 || numState == 1) {
        for (var i = 0; i < camposObr.length; i++) {
            inputs.forEach(item => {
                if(item.name == camposObr[i].campo) {
                    if(item.value == null || item.value == undefined || item.value == "") {
                        mensagem = mensagem + camposObr[i].msg;
                        $(`#${item.name}`).parent().addClass('has-error');
                        $(`#${item.name}`).blur(() => {
                            $(`#${item.name}`).parent().removeClass('has-error');
                        });        
                    } 
                }
            });
        };

        prazoConclusaoGestor();
        if(table.length <= 1) {
            mensagem = "Nenhum item adicionado";
            FLUIGC.toast({
                message: 'Necessário adicionar algum item para compra',
                type: 'danger'
            });
        } else {
            console.log('estou aqui');
            for(var index = 1; index < table.length; index++) {
                if($(`#quant___${index}`).val() == undefined || $(`#quant___${index}`).val() == null || $(`#quant___${index}`).val() == '') {
                    $(`#quant___${index}`).parent().addClass('has-error');

                }
                if($(`#valor___${index}`).val() == undefined || $(`#valor___${index}`).val() == null || $(`#valor___${index}`).val() == '') {
                    $(`#valor___${index}`).parent().addClass('has-error');
                    
                }
                if($(`#necessidade___${index}`).val() == undefined || $(`#necessidade___${index}`).val() == null || $(`#necessidade___${index}`).val() == '') {
                    $(`#necessidade___${index}`).parent().addClass('has-error');
                    
                }
                if($(`#centroDeCustoItem___${index}`).val().length < 1 ) {
                    $(`#centroDeCustoItem___${index}`).parent().addClass('has-error');
                    
                }
                if($(`#produto___${index}`).val().length < 1 ) {
                    $(`#produto___${index}`).parent().addClass('has-error');
                    
                }

            }
        }


        
      
        if(mensagem != "") {
            throw "Necessário preencher os campos obrigatórios";
        };
    }

 
}

if(fase.value > 0) {
    const inputs = document.querySelectorAll("input");
    const selects = document.querySelectorAll("select");
    const textArea = document.querySelector("#informacoes");
    const btnsDefault = ["anexo", "add"];

    inputs.forEach(item => {
        if(item.type !== 'hidden') {
            item.setAttribute("readonly", true);
        }

        if(btnsDefault.includes(item.id)) {
            item.setAttribute('disabled', true);
        }
    });

    selects.forEach(item => {
        item.setAttribute('readonly', true);
    });

    textArea.setAttribute('readonly', true);

    
    if(fase.value > 8) {
        const bnts = document.querySelectorAll('button');
        const btnsGestor = ["aprovGestor", "reproveGestor"];
        const obsGestor = document.querySelector("#observacoesGestor");
        bnts.forEach(item => {
            if(btnsGestor.includes(item.id)){
                item.setAttribute('disabled', true);
            }
        });
        obsGestor.setAttribute('readonly', true);
    };

    if(fase.value > 20) {
        const bnts = document.querySelectorAll('button');
        const  btnsRH = ["aprovRH", "reproveRH"];
        const obsRH = document.querySelector("#observacoesRH");
        bnts.forEach(item => {
            if(btnsRH.includes(item.id)){
                item.setAttribute('disabled', true);
            }
        });
        obsRH.setAttribute('readonly', true);
    }

};

function showNewDatasetFull() {
    //Busca o dataset
    try {
        const dataset = DatasetFactory.getDataset("dsCentroDeCusto_pedro", null, null, null);
        const dsCentroCusto = dataset.values;
        const table = document.querySelectorAll(".rows");
        var error = false;
        var msgError = [];

        var totalPorCentroDeCusto = {
            informatica: 0,
            admnistrativo: 0,
            recursosHumanos: 0,
            comercial: 0,
            operacional: 0
        };

        table.forEach((item, i) => {
            
            if(i > 0) {
                const centroCusto = $(`#centroDeCustoItem___${i}`).val();
                const total = Number($(`#total___${i}`).val());
               
                
                if(centroCusto.length > 0) {
                    console.log(centroCusto);
                    
                    switch(centroCusto) {
                        case '1 - Informática':
                            console.log('no switch');
                            totalPorCentroDeCusto = {
                                ...totalPorCentroDeCusto, 
                                informatica: totalPorCentroDeCusto.informatica += total
                            }
                        break;
                        case '2 - Administrativo':
                            totalPorCentroDeCusto = {
                                ...totalPorCentroDeCusto, 
                                admnistrativo: totalPorCentroDeCusto.admnistrativo += total
                            }
                        break;
                        case '3 - Recursos humanos':
                            totalPorCentroDeCusto = {
                                ...totalPorCentroDeCusto, 
                                recursosHumanos: totalPorCentroDeCusto.recursosHumanos += total
                            }
                        break;
                        case '4 - Comercial':
                            totalPorCentroDeCusto = {
                                ...totalPorCentroDeCusto, 
                                comercial: totalPorCentroDeCusto.comercial += total
                            }
                        break;
                        case '5 - Operacional':
                            totalPorCentroDeCusto = {
                                ...totalPorCentroDeCusto, 
                                operacional: totalPorCentroDeCusto.operacional += total
                            }
                        break;
                    }
                }
            }
        });

        dsCentroCusto.forEach(item => {
            switch(item.centroCusto) {
                case '1 - Informática':
                    if(totalPorCentroDeCusto.informatica > Number(item.valorDisponivel)) {
                        error = true;
                        msgError.push(`R$ ${item.centroCusto} `);
                    }
                break;
                case '2 - Administrativo':
                    if(totalPorCentroDeCusto.admnistrativo > Number(item.valorDisponivel)) {
                        error = true;
                        msgError.push(`R$ ${item.centroCusto} `);
                    } 
                break;
                case '3 - Recursos humanos':
                    if(totalPorCentroDeCusto.recursosHumanos > Number(item.valorDisponivel)) {
                        error = true;
                        msgError.push(`R$ ${item.centroCusto} `);
                    } 
                break;
                case '4 - Comercial':
                    if(totalPorCentroDeCusto.comercial > Number(item.valorDisponivel)) {
                        error = true;
                        msgError.push(`R$ ${item.centroCusto} `);
                    }
                break;
                case '5 - Operacional':
                    if(totalPorCentroDeCusto.operacional > Number(item.valorDisponivel)) {
                        error = true;
                        msgError.push(`R$ ${item.centroCusto} `);
                    }
                break;
            }
        })
       
        return {
            error: error,
            msg: "Os valores disponiveis nos centros de custos: [ " + msgError + " ] são inferiores ao total das compras"
        };

    } catch(erro) {
        console.log(erro);
    }
}

function prazoConclusaoGestor(){
    const dataVct = $("#dataVencto").val();
    const dataFormatada = dataVct.split('/');

    const newDate = new Date(dataFormatada[2], dataFormatada[1], dataFormatada[0]);
    $("#tempoAprovAut").val(newDate.getTime());

}
 
