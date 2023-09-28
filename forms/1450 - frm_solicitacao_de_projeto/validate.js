var mensagem = "";

var beforeSendValidate = function (numState, nextState) {
    var campos = [];
    mensagem = '';

    if (numState == 0 || numState == 4) {
      campos.push(
            {
              campo: "ztxt_infos_cliente",
              msg: "Cliente",
            },
            {
              campo: "txt_infos_erp",
              msg: "ERP utilizado",
            },
            {
              campo: "txt_infos_mercadoAtuacao",
              msg: "Mercado de atuação",
            },
            {
              campo: "txt_infos_descCliente",
              msg: "Descrição do cliente",
            },
            {
              campo: "txt_infos_proposta",
              msg: "N° da proposta",
            },
            {
              campo: "ztxt_infos_projeto",
              msg: "Projeto",
            },
            {
              campo: "txt_infos_descricaoProj",
              msg: "Descrição do projeto",
            },
            {
              campo: "tb_levan_horas",
              msg: "Estimativa de horas levantamento",
            },
            {
              campo: "tb_levan_dataLimite",
              msg: "Data limite levantamento",
            },
            {
              campo: "tb_desenv_horas",
              msg: "Estimativa de horas desenvolvimento",
            },
            {
              campo: "tb_desenv_dataLimite",
              msg: "Data limite desenvolvimento",
            },
            {
              campo: "tb_hml_horas",
              msg: "Estimativa de horas homologação",
            },
            {
              campo: "tb_hml_dataLimite",
              msg: "Data limite homologação",
            },
            {
              campo: "tb_treinamento_horas",
              msg: "Estimativa de horas treinamento",
            },
            {
              campo: "tb_treinamento_dataLimite",
              msg: "Data limite treinamento",
            },
            {
              campo: "tb_goLive_horas",
              msg: "Estimativa de horas Go-Live",
            },
            {
              campo: "tb_goLive_dataLimite",
              msg: "Data limite Go-Live",
            }
      );

      validateContato();
      validateAnexo({
        anexosRef: "anexo-item",
        hidden: 'hidden_attach',
        insert: 'btn_inserAnexo'
      });
      validateCampos(campos);
  
      if (mensagem != "") {
        throw "Necessário preencher os campos obrigatórios";
      }

      validateObs("txta_obs_solic");
    }
  
    if(numState == 5 ) {
    campos.push(
            {
              campo: "txt_levan_questionario",
              msg: "Questionário levantamento",
            },
            {
              campo: "txt_levan_doc",
              msg: "Documentação técnica",
            },
            {
              campo: "txt_levan_prototipo",
              msg: "Protótipo negável",
            },
    );

    validateContato();
    validateAnexo({
      anexosRef: "anexo-item-levan",
      hidden: 'hidden_attach_levan',
      insert: 'btn_levan_inserAnexo'
    });
  
    validateCampos(campos);
  
    validateReuniao();
    validateProgressBar("tb_levan_horas_apontamento");
  
    if (mensagem != "") {
      throw "Necessário preencher os campos obrigatórios";
    }
  
    validateObs("txta_obs_solic_status");
    }
  
    if(numState == 7 ) {
      campos.push(
        {
            campo: "txt_desenv_questionario",
            msg: "Checklist de ambiente",
        },
        {
            campo: "txt_desenv_doc",
            msg: "Estrutura do projeto",
        },
        {
            campo: "txt_desenv_prototipo",
            msg: "Repositório GIT"
        }
      );
      validateContato();
      validateAnexo({
        anexosRef: "anexo-item-desenv",
        hidden: 'hidden_attach_desenv',
        insert: 'btn_desenv_inserAnexo'
      });
  
     validateReuniao();
     validateCampos(campos);
     validateProgressBar("tb_desenv_horas_apontamento");
      
    if (mensagem != "") {
      throw "Necessário preencher os campos obrigatórios";
    }
    
    validateObs("txta_obs_solic_status");  
  }
  
    if(numState == 9 ) {
      campos.push(
        {
            campo: "txt_plano_de_teste",
            msg: "Plano de testes",
        }
      );
  
      validateContato();
      validateAnexo({
        anexosRef: "anexo-item-homol",
        hidden: 'hidden_attach_homol',
        insert: 'btn_homol_inserAnexo'
      });
  
     validateReuniao();
     validateCampos(campos);
     validateProgressBar("tb_hml_horas_apontamento");

    if (mensagem != "") {
      throw "Necessário preencher os campos obrigatórios";
    }
  
      validateObs("txta_obs_solic_status");
    }
  
    if(numState == 11 ) {
     campos.push(
        {
            campo: "txt_roteiro",
            msg: "Roteiro",
        },
        {
            campo: "txt_manual_em_video",
            msg: "Manual em video",
        }
     );
    validateContato();
    validateAnexo({
      anexosRef: "anexo-item-trein",
      hidden: 'hidden_attach_trein',
      insert: 'btn_homol_inserAnexo'
    });
     
    validateReuniao();
    validateCampos(campos);
    validateProgressBar("tb_trein_horas_apontamento");
 
    if (mensagem != "") {
        throw "Necessário preencher os campos obrigatórios";
    }
  
    validateObs("txta_obs_solic_status");
    }
  
    if(numState == 12 ) {
       campos.push(
        {
            campo: "txt_doc_migracao",
            msg: "Documento de migração",
        },
        {
            campo: "txt_grav_go_live",
            msg: "Gravação do Go-Live",
        }
       );
      validateContato();
      validateAnexo({
        anexosRef: "anexo-item-golive",
        hidden: 'hidden_attach_go_live',
        insert: 'btn_go_live_inserAnexo'
      });
     
      validateReuniao();
      validateCampos(campos);
      validateProgressBar("tb_golive_horas_apontamento");
      
      if (mensagem != "") {
        throw "Necessário preencher os campos obrigatórios";
      }
      validateObs("txta_obs_solic_status");
    }

    $("#txt_data_ref_levan").val($("#tb_levan_dataLimite").val());
    $("#txt_data_ref_desenv").val($("#tb_desenv_dataLimite").val());
    $("#txt_data_ref_homol").val($("#tb_hml_dataLimite").val());
    $("#txt_data_ref_trein").val($("#tb_treinamento_dataLimite").val());
    $("#txt_data_ref_go_live").val($("#tb_goLive_dataLimite").val());
  
  };


function validateContato() {
    const contatos = document.querySelectorAll(".contatos-items");
    contatos.forEach((item, i) => {
        if(i > 0) {
          let nome =  $(`#tb_contato_nome___${i}`);
          let cargo =  $(`#tb_contato_cargo___${i}`);
          let email =  $(`#tb_contato_email___${i}`);
          let numero =  $(`#tb_contato_numero___${i}`);
          let obs =  $(`#tb_contato_obs___${i}`);

          const inputs = [nome, cargo, email, numero, obs];

          inputs.forEach((input, i) => {
            if(input.val() == "" || input.val() == undefined || input.val() == null) {
                mensagem = mensagem + input[0].name;
                $(`#${input[0].id}`).parent().addClass("has-error");
                 $(`#${input[0].id}`).blur(() => {
                 $(`#${input[0].id}`).parent().removeClass("has-error");
                });
              } 
          });
        }
      });
}

function validateAnexo({anexosRef, hidden, insert}) {
    const anexos = document.querySelectorAll(`.${anexosRef}`);
    anexos.forEach((item, i) => {
        if(i > 0) {
          const anexo = $(`#${hidden}___${i}`).val();
  
          if(!anexo) {
            $(`#${insert}___${i}`).attr("src", "./img/anexo-error.png");
            mensagem = "Necessário preencher os campos obrigatórios"; 
          }
        }
      });
}

function validateCampos(campos) {
    campos.forEach((item, i) => {
        var campo = document.querySelector(`#${item.campo}`).value;
  
        if (
          campo == null ||
          campo == undefined ||
          campo == ""
        ) {
          
          mensagem = mensagem + item.msg + "| ";
  
          $(`#${item.campo}`).parent().addClass("has-error error");
          $(`#${item.campo}`).blur(() => {
            $(`#${item.campo}`).parent().removeClass("has-error error");
          });
        }
      });
}

function validateObs(obsRef) {
    const obs = document.querySelector(`#${obsRef}`).value;
    if(obs != "" && obs != null && obs != undefined) {
      saveObs();
    }
} 

function validateReuniao(){
    const reunioes = document.querySelectorAll(".reuniao-items");
    reunioes.forEach((item, i) => {
        if(i > 0) {
          const principal = item.children[0].children[1].children;
          const participantes = item.children[0].children[2].children[0].children;
  
          [...principal].forEach((itemFK, j) => {
            const itemArray = [...itemFK.children];
            const campo = document.querySelector(`#${itemArray[1].id}`);
  
            if (
              campo.value == null ||
              campo.value == undefined ||
              campo.value == ""
            ) {
              
              mensagem = mensagem + "Error";
      
              $(campo).parent().addClass("has-error error");
              $(campo).blur(() => {
                $(campo).parent().removeClass("has-error error");
              });
          }});

          if([...participantes].length == 0) {
            const reuniaoNum = item.children[0].children[0].children[0].children[0].innerText;
            errorReuniao(reuniaoNum);
            mensagem = mensagem + "Error";
          } else {
            [...participantes].forEach(part => {
              const inputPart = part.children[0].children[1];
              if(inputPart.value == "" || inputPart.value == null || inputPart.value == undefined) {
                mensagem = mensagem + "Error";
                $(inputPart).parent().attr({
                  "style": "border-bottom: 1px solid red !important;"
                });
                $(inputPart).blur(() => {
                  $(inputPart).parent().removeAttr("style");
                });
              }
            })
          }
        }
      });
}

function validateProgressBar(apontamentoRef){
    const apontamento = $(`#${apontamentoRef}`);
      if(apontamento.val() == "" || apontamento.val() == null || apontamento.val() == undefined) {
        mensagem = mensagem + "Error";
  
        $(apontamento).parent().addClass("has-error error");
        $(apontamento).blur(() => {
          $(apontamento).parent().removeClass("has-error error");
        });
      }
}

function errorReuniao(id) {
  FLUIGC.toast({
    message: `A Reunião ${id} não possui participantes!`,
    type: 'info',
  });
}
