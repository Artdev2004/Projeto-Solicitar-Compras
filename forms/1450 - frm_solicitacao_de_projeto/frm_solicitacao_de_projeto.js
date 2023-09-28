//Global vars
const phase = $("#phase").val();
const formMode = $("#form_mode");

if(phase != "0" || phase != "1") {
  // Tempo para finalização da etapa;
  var chart = FLUIGC.chart('#tempo_final_chart', {
    id: 'tempo_final_graph',
    width: '400',
    height: '200'
  });
  // call the donut function
  var chartDonut = chart.donut({
        lines: 12,
        angle: 0.15,
        lineWidth: 0.44,
        pointer: {
            length: 0.9,
            strokeWidth: 0.035,
            color: '#000000'
        },
        limitMax: 'false',
        colorStart: '#C196EC',
        colorStop: '#C196EC',
        strokeColor: '#E0E0E0',
        generateGradient: true
  });
}

function renderChart(index) {
  const charts = [
    'txt_data_ref_levan', 
    'txt_data_ref_desenv', 
    'txt_data_ref_homol', 
    'txt_data_ref_trein', 
    'txt_data_ref_go_live'
  ];

  // chart
  const dataLimite = $(`#${charts[index]}`).val();
  const dataSolici = $("#txt_dados_dataSolic").val();
  const calc = calcChart(dataLimite, dataSolici);

  $("#data_limite_etapa").html(dataLimite);
  $("#dias_corridos_etapa").html(isNaN(calc.diasCorridos) ? 0 : calc.diasCorridos);
  $("#dias_restantes_etapa").html(calc.diasRestantes);

  chartDonut.lineWidth = 20;
  chartDonut.maxValue = 100;
  chartDonut.set(calc.porcentagem);

  
}

function renderProgressBar() {
  const bars = $(".etapa-bar");
  const txt = $(".etapa-txt");

  [...bars].forEach((bar, i) => {
    const { dataset, id } = bar;
    const index = i - 1;

    if(phase == "17") {
        $("#txt_etapaSolic_ini_bar").addClass("off-bar");
        $("#txt_etapaSolic_ini").addClass("off-bar");

        $("#txt_etapaSolic_final_bar").addClass("current-bar");
        $("#txt_etapaSolic_final_bar").removeClass("off-bar");
        $("#txt_etapaSolic_final").removeClass("off-bar")
        return;
    }

    if(dataset.etapa == phase) {
      $(`#${id}`).removeClass("off-bar");
      $(`#${id}`).addClass("active-bar");
      $(txt[index]).removeClass("off-bar");

      [...bars].forEach((barFk, j) => {
        const { dataset } = barFk;
        const indexFK = j - 1;
        if(dataset.etapa < Number(phase)) {
          $(barFk).removeClass("off-bar");
          $(txt[indexFK]).removeClass("off-bar");
        }
      });

      renderChart(index);
      return;
    }

    $(`#${id}`).removeClass("active-bar");
    $(`#${id}`).addClass("current-bar");
    return;

  });

  

}

function calcChart(dataLimite, dataSolici) {
  const dataAtual = new Date();
  let mes = Number(dataAtual.getMonth()) + 1;
  let dia = dataAtual.getDate();

  if (mes < 10) {
    mes = "0" + mes;
  }

  if (dia < 10) {
    dia = "0" + dia;
  }

  let dataLimiteToCalc = dataLimite.split("/");
  dataLimiteToCalc = `${dataLimiteToCalc[2]}-${dataLimiteToCalc[1]}-${dataLimiteToCalc[0]}`;

  let dataSolicToCalc = dataSolici.split("/");
  dataSolicToCalc = `${dataSolicToCalc[2]}-${dataSolicToCalc[1]}-${dataSolicToCalc[0]}`;

  const dataAtualToCalc = `${dataAtual.getFullYear()}-${mes}-${dia}`;
  
  const calcDiasRestantes = new Date(dataLimiteToCalc) - new Date(dataAtualToCalc);
  const diasRestantes = calcDiasRestantes / (1000 * 60 * 60 * 24);

  const calcDiasCorridos = new Date(dataAtualToCalc) - new Date(dataSolicToCalc);
  const diasCorridos = calcDiasCorridos / (1000 * 60 * 60 * 24);

  let total = new Date(dataLimiteToCalc) - new Date(dataSolicToCalc);
  total = total / (1000 * 60 * 60 * 24);

  const porcentagem = (diasCorridos / total) * 100;

  return {
    diasRestantes, 
    diasCorridos,
    porcentagem,
  }
}

//Dados do solicitante
if(phase == "0" || phase == "4"){
  const date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  $("#txt_dados_horaSolic").val(`${hour}:${minutes}`);
}

//Informações do cliente
function setSelectedZoomItem(selectedItem) {
  if(selectedItem.inputId == "ztxt_infos_cliente") {
    $("#txt_infos_cnpj").val(selectedItem.txt_cad_cnpj);
    $("#txt_infos_endereco").val(selectedItem.txt_cad_rua);
    $("#txt_ref_id_cliente").val(selectedItem.documentid); 
    $("#ztxt_infos_cliente").parent().removeClass('has-error');
  }

  if(selectedItem.inputId == "ztxt_infos_projeto") {
    $("#txt_infos_descricaoProj").val(selectedItem.text);
    $("#txt_ref_id_projeto").val(selectedItem.documentid);
    $("#txt_infos_descricaoProj").parent().removeClass('has-error');
    $("#ztxt_infos_projeto").parent().removeClass('has-error');
  }
  
}

function removedZoomItem(removedItem) {
  if(removedItem.inputId == "ztxt_infos_cliente") {
    $("#txt_infos_cnpj").val("");
    $("#txt_infos_endereco").val("");
    $("#txt_ref_id_cliente").val("");
  }

  if(removedItem.inputId == "ztxt_infos_projeto") {
    $("#txt_infos_descricaoProj").val("");
    $("#txt_ref_id_projeto").val("");
  }
}

var dates = [
  {
    inputName: "tb_levan_dataLimite",
    inputRef: "",
  },
  {
    inputName: "tb_desenv_dataLimite",
    inputRef: "",
  },
  {
    inputName: "tb_hml_dataLimite",
    inputRef: "",
  },
  {
    inputName: "tb_treinamento_dataLimite",
    inputRef: "",
  },
  {
    inputName: "tb_goLive_dataLimite",
    inputRef: "",
  },
];

dates.forEach((item, i) => {
  dates[i].inputRef = FLUIGC.calendar(`#${item.inputName}`);  
});

let attachments = document.querySelectorAll(".anexo-item");

function updateAttachments() {
    let anexosRows = '';
    let anexoDesc = '';
    let btnInsert = '';
    let hidden = '';

    if(phase == "0" || phase == "4") {
      anexosRows = "anexo-item";
      anexoDesc = "tb_anexo_name";
      btnInsert = "btn_inserAnexo";
      hidden = "hidden_attach";
    };

    if(phase == "5") {
      anexosRows = "anexo-item-levan";
      anexoDesc = "tb_anexo_name_levan";
      btnInsert = "btn_levan_inserAnexo";
      hidden = "hidden_attach_levan";
    }

    if(phase == "7") {
      anexosRows = "anexo-item-desenv";
      anexoDesc = "tb_anexo_name_desenv";
      btnInsert = "btn_desenv_inserAnexo";
      hidden = "hidden_attach_desenv";
    }

    if(phase == "9") {
      anexosRows = "anexo-item-homol";
      anexoDesc = "tb_anexo_name_homol";
      btnInsert = "btn_homol_inserAnexo";
      hidden = "hidden_attach_homol";
    }

    if(phase == "11") {
      anexosRows = "anexo-item-trein";
      anexoDesc = "tb_anexo_name_trein";
      btnInsert = "btn_trein_inserAnexo";
      hidden = "hidden_attach_trein";
    }

    if(phase == "12") {
      anexosRows = "anexo-item-golive";
      anexoDesc = "tb_anexo_name_go_live";
      btnInsert = "btn_go_live_inserAnexo";
      hidden = "hidden_attach_go_live";
    }


    if(formMode[0].defaultValue != "VIEW") {
      attachments = document.querySelectorAll(`.${anexosRows}`);

      attachments.forEach((item, i) => {
        const index = item.children[0].id.split('___')[1];

        if(index > 0) {
            let description = '';
            $(`#${anexoDesc}___${index}`).change(() => {
                description = $(`#${anexoDesc}___${index}`).val();
                $(`#${anexoDesc}___${index}`).parent().removeClass('has-error');
            })
            $(`#${btnInsert}___${index}`).click(() => {
                if(description == "") {
                    $(`#${anexoDesc}___${index}`).parent().addClass('has-error');

                } else {
                    if ($(`#${hidden}___${index}`).val() == "") {

                        JSInterface.showCamera(description);
                        $(`#${hidden}___${index}`).val(description);
                      }
                }   
            });     
        }
    })
    }

    
};

function removeAttach(item){
    const index = item.id.split('___')[1];
    let desc = ''; 

    if(phase == "0" || phase == "4") {
      desc = "hidden_attach";
    };

    if(phase == "5") {
      desc = "hidden_attach_levan";
    };

    if(phase == "7") {
      desc = "hidden_attach_desenv";
    };

    if(phase == "9") {
      desc = "hidden_attach_homol";
    }

    if(phase == "11") {
      desc = "hidden_attach_trein";
    }

    if(phase == "12") {
      desc = "hidden_attach_go_live";
    }

    desc = $(`#${desc}___${index}`).val();

    let attachmentsFK = parent.ECM.attachmentTable.getData();
    attachmentsFK.forEach((attachment, index) =>{
        if(attachment.description == desc){
            parent.WKFViewAttachment.removeAttach([index]);
        }
    });

    fnWdkRemoveChild(item);
};

$(window.top.document)
  .find("#processTabs, #attachmentsStatusTab")
  .click(function () {
  
    if (parent.ECM.attachmentTable.getData().length > 0) {
      let anexoDesc = '';
      let nomeArquivo = '';
      let btnInsert = '';
      let inputDesc = '';
      let hidden = '';
      let checkAnexo = '';


      if(phase == "0" || phase == "4") {
        anexoDesc = "txt_desc_anexo";
        nomeArquivo = "txt_nomeArquivo";
        btnInsert = "btn_inserAnexo";
        inputDesc = "tb_anexo_name";
        hidden = "hidden_attach";
        checkAnexo = "check_anexo";
      }

      if(phase == "5") {
        anexoDesc = "txt_levan_desc_anexo";
        nomeArquivo = "txt_levan_nomeArquivo";
        btnInsert = "btn_levan_inserAnexo";
        inputDesc = "tb_anexo_name_levan";
        hidden = "hidden_attach_levan";
        checkAnexo = "check_anexo_levan";
      }

      if(phase == "7") {
        anexoDesc = "txt_desenv_desc_anexo";
        nomeArquivo = "txt_desenv_nomeArquivo";
        btnInsert = "btn_desenv_inserAnexo";
        inputDesc = "tb_anexo_name_desenv";
        hidden = "hidden_attach_desenv";
        checkAnexo = "check_anexo_desenv";
      }

      if(phase == "9") {
        anexoDesc = "txt_homol_desc_anexo";
        nomeArquivo = "txt_homol_nomeArquivo";
        btnInsert = "btn_homol_inserAnexo";
        inputDesc = "tb_anexo_name_homol";
        hidden = "hidden_attach_homol";
        checkAnexo = "check_anexo_homol";
      }

      if(phase == "11") {
        anexoDesc = "txt_trein_desc_anexo";
        nomeArquivo = "txt_trein_nomeArquivo";
        btnInsert = "btn_trein_inserAnexo";
        inputDesc = "tb_anexo_name_trein";
        hidden = "hidden_attach_trein";
        checkAnexo = "check_anexo_trein";
      }

      if(phase == "12") {
        anexoDesc = "txt_go_live_desc_anexo";
        nomeArquivo = "txt_go_live_nomeArquivo";
        btnInsert = "btn_go_live_inserAnexo";
        inputDesc = "tb_anexo_name_go_live";
        hidden = "hidden_attach_go_live";
        checkAnexo = "check_anexo_go_live";
      }

        attachments.forEach((item, i) => {
            let index = item.children[0].id.split('___')[1];
            if(index == undefined) {
                index = 1;
            }

            let hiddenAttach = $(`#${hidden}___${index}`).val();

            $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {

                let descricao = attachment.description;
                let name = attachment.name;

                if (descricao == hiddenAttach) {
                    $(`#${btnInsert}___${index}`).attr("src", "./img/btn-subir-anexo.png");
                    $(`#${btnInsert}___${index}`).removeClass("fs-cursor-pointer");
                    $(`#${nomeArquivo}___${index}`).attr("type", "text");
                    $(`#${nomeArquivo}___${index}`).val(name);

                    $(`#${inputDesc}___${index}`).hide();
                    $(`#${anexoDesc}___${index}`).val(hiddenAttach);
                    $(`#${anexoDesc}___${index}`).show();
                    $(`#${checkAnexo}___${index}`).removeClass("check-anexo");

                }
            });

            let attachName = $(`#${nomeArquivo}___${index}`).val();

            if(hiddenAttach != "" && attachName == "") {
                $(`#${hidden}___${index}`).val("");
                FLUIGC.toast({
                    message: 'O arquivo enviado já existe, tente novamente com outro arquivo',
                    type: 'info',
                });
            }

        });

    }

   
  });


//Disablefields / Eneable Fields
function handleFields() {
  if(Number(phase) > 0 || Number(phase) > 4) {

    //Cliente
    const informacoesCliente = document.querySelectorAll("#pn_infosCliente input");
    informacoesCliente.forEach((item) => {
      item.setAttribute("readonly", true);
      item.classList.add("input-bg");
    });
  
  
    // projeto
    const informacoesProjeto = document.querySelectorAll("#pn_infosProjeto input");
    informacoesProjeto.forEach((item) => {
      item.setAttribute("readonly", true);
      item.classList.add("input-bg");
    });
  
    dates.forEach((date) => {
      if(date.inputRef != "") {
        date.inputRef.disable();
        document.querySelector(`#${date.inputName}`).parentElement.classList.add("input-bg");
      } 
    });
  
    $("#tb_levan_dataLimite").val($("#txt_data_ref_levan").val());
    $("#tb_desenv_dataLimite").val($("#txt_data_ref_desenv").val());
    $("#tb_hml_dataLimite").val($("#txt_data_ref_homol").val());
    $("#tb_treinamento_dataLimite").val($("#txt_data_ref_trein").val());
    $("#tb_goLive_dataLimite").val($("#txt_data_ref_go_live").val());
  
    //Projetos etapas
    const etapaDivs = document.querySelectorAll(".etapa-div");
    const apontamentos = document.querySelectorAll(".apontamento-horas");
  
    etapaDivs.forEach(item => {
      item.classList.remove("col-md-4");
      item.classList.add("col-md-3");
    });
  
    apontamentos.forEach(item => {
      item.style.removeProperty('display');
    });
  
    apontamentoInput();
  
  
    //contatos
    var contatosClient = document.querySelectorAll(".contatos-items");
    contatosClient.forEach((item, i) => {
  
      let nome =  $(`#tb_contato_nome___${i}`);
      let cargo =  $(`#tb_contato_cargo___${i}`);
      let email =  $(`#tb_contato_email___${i}`);
      let numero =  $(`#tb_contato_numero___${i}`);
      let obs =  $(`#tb_contato_obs___${i}`);
  
      const inputs = [nome, cargo, email, numero, obs];
      inputs.forEach(input => {
    
        input.addClass("input-edit");
        input.parent().addClass("input-group");
        input.parent().css({
          "padding": "12px 16px",
        });
        input.parent().append(`
          <span class="input-group-addon icon-edit" id="btn_editar_contato___${i}">
            <img src="./img/edit-icon.png" />
          </span>
        `);
  
        if(input == email || input == numero || input == obs) {
          input.addClass("input-edit-sm");
        }
  
        input.attr({
          "readonly": "true"
        });
  
      });
  
    });
  
    const reunioes = document.querySelectorAll(".reuniao-items");
    reunioes.forEach((item, i) => {
      if(i > 0) {
        const newIndex = item.children[0].children[1].children[0].children[1].id.split('___')[1];
        item.children[0].children[3].children[0].id = `btn_ver_participates___${newIndex}`;
        item.children[0].children[2].id =`participantes_table___${newIndex}`;
        item.children[0].children[0].innerHTML = `Reunião N°${newIndex}`;
        item.children[0].children[2].children[0].id = `participantes_items___${newIndex}`;
  
        $(`#txt_link_gravacao___${newIndex}`).attr({"readonly": "true", "class": "form-control fs-no-spin input-bg"});
        $(`#txt_data_reuniao___${newIndex}`).attr({"readonly": "true", "class": "form-control fs-no-spin input-bg"});
        $(`#txt_hora_reuniao___${newIndex}`).attr({"readonly": "true", "class": "form-control fs-no-spin input-bg"});
        $(`#txt_ata_reuniao___${newIndex}`).attr({"readonly": "true", "class": "form-control fs-no-spin input-bg"});
        $(item.children[0].children[2].children[1].children[1]).hide();
  
        let participantes = document.querySelector('#txt_refs_parts').value;
  
        if(participantes != "" ) {
          participantes = JSON.parse(participantes);
  
          let participantesChildren = [];
          participantes.forEach((itemFK, i) => {
            if(itemFK.index == newIndex) {
              participantesChildren.push(itemFK);
            }
          });
  
          participantesChildren.forEach(input => {
            const divPart = $(`#participantes_items___${newIndex}`);
            const inputFK = $(`#${input.ref}`);
    
            if(inputFK.val() != '' && inputFK.val() != null && inputFK.val() != undefined) {
              if(input.off == false) {
                divPart.append(`
                <div class="col-md-4" id="partial___${newIndex}">
                  <div class="form-group part-item" >
                    <span>
                      <img src="./img/user-icon.png" />     
                    </span>
                    <input type="text" id="txt_participante___${newIndex}"
                          name="txt_participante___${newIndex}" 
                          value="${inputFK.val()}"
                          readonly
                          style="cursor: default !important;"
                        />
                  </div>
                </div>
              `);
            }
    
            } 
          });
        }
      }
    });
  
    //Geração de arquivos para download
    //Docs solicitação
    const docsSolicContainer = $("#docs_solic_container");
    const docsSolic = document.querySelectorAll(".anexo-item");
  
    if(docsSolic.length > 1) {
      docsSolic.forEach((item, i) => {
  
        if(i > 0) {
          let descArquivo = item.children[2].children[1].children[2];
          let nomeArquivo = item.children[2].children[1].children[3];

          descArquivo?.value == undefined ? descArquivo = descArquivo?.innerHTML : descArquivo = descArquivo?.value;
          
          const attachs = parent.ECM.attachmentTable.getData();
  
          if(attachs.length > 0) {
            attachs.forEach((att, i) => {
              if(att.description == descArquivo) {
                generateDownloadDesc({
                  container: docsSolicContainer, 
                  i: i,
                  descArquivo: descArquivo
                });
              }
            });
          }
  
         
        }
      });
    }
  
     //Docs Levantamento
     $("#txt_levan_questionario_link").val($("#txt_levan_questionario").val()); 
     $("#txt_href_questionario").prop({href: $("#txt_levan_questionario").val()}); 
  
     $("#txt_levan_doc_link").val($("#txt_levan_doc").val());
     $("#txt_href_doc").prop({href: $("#txt_levan_doc").val()});
  
     $("#txt_levan_prototipo_link").val($("#txt_levan_prototipo").val());
     $("#txt_href_prototipo").prop({href: $("#txt_levan_prototipo").val()});
  
     const docLevanContainer = $("#docs_levan_container");
     const docsLevan = document.querySelectorAll(".anexo-item-levan");
  
     if(docsLevan.length > 1) {
      docsLevan.forEach((item, i) => {
        if(i > 0) {
          let descArquivo = item.children[1].children[1].children[2];
          const nomeArquivo = item.children[1].children[1].children[3];

          descArquivo?.value == undefined ? descArquivo = descArquivo?.innerHTML : descArquivo = descArquivo?.value;
  
          const attachs = parent.ECM.attachmentTable.getData();
  
          if(attachs.length > 0) {
            attachs.forEach((att, i) => {
              if(att.description == descArquivo) {
                generateDownloadDesc({
                  container: docLevanContainer, 
                  i: i,
                  descArquivo: descArquivo
                });
              }
            });
          }
        }
      })
     }
  
     //Docs Desenvolvimento
     $("#txt_desenv_checklist_link").val($("#txt_desenv_questionario").val()); 
     $("#txt_checklist_href").prop({href: $("#txt_desenv_questionario").val()}); 
  
     $("#txt_desenv_estrutura_link").val($("#txt_desenv_doc").val());
     $("#txt_href_estrutura").prop({href: $("#txt_desenv_doc").val()});
  
     $("#txt_desenv_repositorio_link").val($("#txt_desenv_prototipo").val());
     $("#txt_href_repo").prop({href: $("#txt_desenv_prototipo").val()});
  
     const docsDesenvContainer = $("#docs_desenv_container");
     const docsDesenv = document.querySelectorAll(".anexo-item-desenv");
  
     if(docsDesenv.length > 1) {
      docsDesenv.forEach((item, i) => {
        if(i > 0) {
          let descArquivo = item.children[1].children[1].children[2];
          const nomeArquivo = item.children[1].children[1].children[3];

          descArquivo?.value == undefined ? descArquivo = descArquivo?.innerHTML : descArquivo = descArquivo?.value;
  
          const attachs = parent.ECM.attachmentTable.getData();
  
          if(attachs.length > 0) {
            attachs.forEach((att, i) => {
              if(att.description == descArquivo) {
                generateDownloadDesc({
                  container: docsDesenvContainer, 
                  i: i,
                  descArquivo: descArquivo
                });
              }
            });
          }
        }
      })
     }
  
  
     //Docs homolgação
     $("#txt_plano_de_teste_link").val($("#txt_plano_de_teste").val()); 
     $("#txt_href_plano_teste").prop({href: $("#txt_plano_de_teste").val()}); 
  
     const docsHomolContainer = $("#docs_homol_container");
     const docsHomol = document.querySelectorAll(".anexo-item-homol");
  
     if(docsHomol.length > 1) {
      docsHomol.forEach((item, i) => {
        if(i > 0) {
          let descArquivo = item.children[1].children[1].children[2];
          const nomeArquivo = item.children[1].children[1].children[3];

          descArquivo?.value == undefined ? descArquivo = descArquivo?.innerHTML : descArquivo = descArquivo?.value;
  
          const attachs = parent.ECM.attachmentTable.getData();
  
          if(attachs.length > 0) {
            attachs.forEach((att, i) => {
              if(att.description == descArquivo) {
                generateDownloadDesc({
                  container: docsHomolContainer, 
                  i: i,
                  descArquivo: descArquivo
                });
              }
            });
          }
        }
      })
     }
  
     //Docs treinamento
     $("#txt_roteiro_link").val($("#txt_roteiro").val()); 
     $("#txt_href_roteiro").prop({href: $("#txt_roteiro").val()}); 
  
     $("#txt_manual_em_video_link").val($("#txt_manual_em_video").val()); 
     $("#txt_href_manual").prop({href: $("#txt_manual_em_video").val()}); 
  
     const docsTreinContainer = $("#docs_trein_container");
     const docsTrein = document.querySelectorAll(".anexo-item-trein");
  
     if(docsTrein.length > 1) {
      docsTrein.forEach((item, i) => {
        if(i > 0) {
          let descArquivo = item.children[1].children[1].children[2];
          const nomeArquivo = item.children[1].children[1].children[3];

          descArquivo?.value == undefined ? descArquivo = descArquivo?.innerHTML : descArquivo = descArquivo?.value;
  
          const attachs = parent.ECM.attachmentTable.getData();
  
          if(attachs.length > 0) {
            attachs.forEach((att, i) => {
              if(att.description == descArquivo) {
                generateDownloadDesc({
                  container: docsTreinContainer, 
                  i: i,
                  descArquivo: descArquivo
                });
              }
            });
          }
        }
      })
     }
  
     //Docs go live
     $("#txt_migracao_link").val($("#txt_doc_migracao").val()); 
     $("#txt_href_migracao").prop({href: $("#txt_doc_migracao").val()}); 
  
     $("#txt_gravacao_link").val($("#txt_grav_go_live").val()); 
     $("#txt_href_gravacao").prop({href: $("#txt_grav_go_live").val()}); 
  
     const docsGoLiveContainer = $("#docs_golive_container");
     const docsGoLive= document.querySelectorAll(".anexo-item-golive");
  
     if(docsGoLive.length > 1) {
      docsGoLive.forEach((item, i) => {
        if(i > 0) {
          let descArquivo = item.children[1].children[1].children[2];
          const nomeArquivo = item.children[1].children[1].children[3];

          descArquivo?.value == undefined ? descArquivo = descArquivo?.innerHTML : descArquivo = descArquivo?.value;
  
          const attachs = parent.ECM.attachmentTable.getData();
  
          if(attachs.length > 0) {
            attachs.forEach((att, i) => {
              if(att.description == descArquivo) {
                generateDownloadDesc({
                  container: docsGoLiveContainer, 
                  i: i,
                  descArquivo: descArquivo
                });
              }
            });
          }
        }
      })
     }
  
  
    //Geração do histórico de observações
    const obsContainer = $("#obs_container");
    const obsItems = document.querySelectorAll(".obs-item");
    if(obsItems.length > 1) {
      obsItems.forEach((item, i) => {
        if(i > 0) {
          const avatar = item.children[0].children[0].defaultValue;
          const nome = item.children[1].children[0].defaultValue;
          const etapa = item.children[2].children[0].defaultValue;
          const data = item.children[3].children[0].defaultValue;
          const hora = item.children[4].children[0].defaultValue;
          const comentario = item.children[5].children[0].defaultValue;
          const status = item.children[6].children[0].defaultValue;
  
          
          obsContainer.append(`
              <div class="col-md-12" style="margin-bottom: 28px !important;">
                <div class="col-md-1 avatar">
                    <div class="avatar-img">
                          <img src="${avatar}" />
                    </div>
                    <div class="name-obs">
                      <p style="margin: 0 !important">${nome} </p>
                      <span>${etapa}</span>
                    </div>
                </div>
                <div class="col-md-11 msg">
                    <span class="hora-obs">${data} - ${hora} ${status ? " - " + status : " " + status} </span>
                    <input class="form-control input-bg" readonly  id="txt_obs_${item.children[0].children[0].id.split('___')[1]}"
                      name="txt_obs_${item.children[0].children[0].id.split('___')[1]}" value="${comentario}"/>
                </div>
            </div>
          `);
  
        }
      });
    }
  
  
    //clear obs
    $("#txta_obs_solic_status").val("");
  }
}

const btnsEditar = document.querySelectorAll(".icon-edit");
  btnsEditar.forEach((item, i) => {
    $(item).click(() => {
      const id = $(item).siblings()[0].id;
      const input = document.querySelector(`#${id}`);

      input.removeAttribute("readonly");   
    })  
});
  

function createReuniao(){
  const reunioes = document.querySelectorAll(".reuniao-items");
  const index = reunioes[reunioes.length - 1].children[0].children[2].id.split('___')[1]
  document.querySelector(`#txt_reuniao_number___${index}`).innerHTML = `N°${index}`;
  FLUIGC.calendar(`#txt_data_reuniao___${index}`);
}

function verParticipantes(item){
  const index = item.id.split('___')[1];
  const divParticipantes = document.querySelector(`#participantes_table___${index}`);
  const btnText = document.querySelector(`#btn_ver_participates___${index}`);

  divParticipantes.classList.toggle('open-participantes');

  if(btnText.innerHTML.trim() == "Ver Participantes") {
    btnText.innerHTML = "Ocultar Participantes";
  } else {
    btnText.innerHTML = "Ver Participantes";
  }

}

let currentRefs = [];
if(Number(phase) > 0 || Number(phase) > 4) {
 if(document.querySelector("#txt_refs_parts").value != "") {
  const refsStrin = JSON.stringify(document.querySelector("#txt_refs_parts").value);
    const ajusteRef = JSON.parse(refsStrin).replace("[", '').replace("]", '').split('},');
    ajusteRef.forEach(item => {
      let stringItem = '';
      if(item.slice(-1) != '}') {
        stringItem = item.toString().concat('}');
      } else {
        stringItem = item.toString();
      }
  
      const itemObj = JSON.parse(stringItem);
      currentRefs.push(itemObj);
    });
 }
    
  
}

function adicionarParticipantes(item) {
  const index = item.id.split('___')[1];
  let idFk = '';
  wdkAddChild('table_participantes');

  const itemFK = document.querySelectorAll(`.part-item-hidden`);
  idFk = itemFK[itemFK.length - 1].id;

  const divPart = $(`#participantes_items___${index}`);
  divPart.append(`
    <div class="col-md-4" id="partial___${idFk}">
        <div class="form-group part-item" >
        <span>
          <img src="./img/user-icon.png" />     
        </span>
        <input type="text" id="txt_participante___${index}"
              name="txt_participante___${index}" 
              data-id="${idFk}" 
              data-parent="participantes_items___${index}"  
              onchange="changeInputPart(this);"
              autocomplete="off"
            />
        <span>
            <img 
              src="./img/btn_remover_item.png" 
              width="22px" heith="22px" 
              style="cursor: pointer !important;" 
              onclick="deleteInputPart(this);"
              data-id="${idFk}" 
              data-parent="participantes_items___${index}" 
              data-remove="partial___${idFk}"
            />     
        </span>
      </div>
    </div>
  `);

  currentRefs.push({index: `${index}`, ref: `${idFk}`, off: false});
  document.querySelector("#txt_refs_parts").value = JSON.stringify(currentRefs);
}

function changeInputPart(item) {
  const {dataset, value} = item;
  $(`#${dataset.id}`).val(value);
}

function deleteInputPart(item) {
  const {dataset, value} = item;
  $(`#${dataset.remove}`).remove();

  let updateRefs = [];
  currentRefs.forEach(item => {
    if(item.ref == dataset.id) {
      const newItem = {
        index: item.index,
        ref: item.ref,
        off: true
      }
      updateRefs.push(newItem);
    }else {
      updateRefs.push(item);
    }
  });

  currentRefs = updateRefs;
  document.querySelector("#txt_refs_parts").value = JSON.stringify(currentRefs);
  
}

function downloadAttach(index){
  parent.WKFViewAttachment.downloadAttach([index])
}


$("#btn_salvar_obs").click(() => {
  const comentario = document.querySelector("#txta_obs_solic_status");

  if(comentario.value != "" && comentario.value != null && comentario.value != undefined) {
    saveObs(true);
    window.parent.$('a[data-save]').first().click();
    $("#txta_obs_solic_status").val("");
  } else {
      $("#txta_obs_solic_status").addClass("has-error error");
        $("#txta_obs_solic_status").blur(() => {
        $("#txta_obs_solic_status").removeClass("has-error error");
        });
  }

 
});


function saveObs(comStatus) {
  let idFk = '';
  wdkAddChild('table_histobs');

  const itemFK = document.querySelectorAll(`.obs-item`);
  idFk = itemFK[itemFK.length - 1];
  const index = idFk.children[0].children[0].id.split('___')[1];

  let comentario = '';
  if(phase == "0" || phase == "4"){
    comentario = $("#txta_obs_solic").val();
  } else {
    comentario = $("#txta_obs_solic_status").val();
  }

    const avatar = $(`#txt_avatar_obs___${index}`);
    const nome = $(`#txt_nome_obs___${index}`);
    const etapa = $(`#txt_etapa_obs___${index}`);
    const data = $(`#txt_data_obs___${index}`);
    const hora = $(`#txt_hora_obs___${index}`);
    const comentarioFK = $(`#txt_comentario_obs___${index}`);
    const statusObs = $(`#txt_comentario_status___${index}`);

    nome.val($("#txt_dados_solicitante").val());
    let comStatusFK = comStatus == true ? true : false;

    switch(phase) {
      case "4":
        etapa.val("Solicitante");
        if(comStatusFK) {
          statusObs.val("#txt_status_levan");
        }
        break;
      case "5":
        etapa.val("Levantamento");
        if(comStatusFK) {
          statusObs.val($("#txt_status_levan").val());
        }
        break;
      case "7":
        etapa.val("Desenvolvimento");
        if(comStatusFK) {
          statusObs.val($("#txt_status_levan").val());
        }
        break;
      case "9":
        etapa.val("Homologação");
        if(comStatusFK) {
          statusObs.val($("#txt_status_levan").val());
        }
        break;
      case "11":
        etapa.val("Treinamento");
        if(comStatusFK) {
          statusObs.val($("#txt_status_levan").val());
        }
        break;
      case "12":
        etapa.val("Go-Live");
        if(comStatusFK) {
          statusObs.val($("#txt_status_levan").val());
        }
        break;
      default:
        etapa.val("Solicitante");
        break;
    }

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(day < 10) {
        day = "0" + day
    }

    if(month < 10) {
        month = "0" + month
    }

    const newDate = day + "/" + month + "/" + year;
    data.val(newDate);

    let hour = date.getHours();
    let minutes = date.getMinutes();
  
    if (hour < 10) {
      hour = "0" + hour;
    }
  
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    hora.val(`${hour}:${minutes}`);

    comentarioFK.val(comentario);

    let matricula = document.querySelector("#txt_matricula_user").value;
    let src = `/social/api/rest/social/image/profile/${matricula}/X_SMALL_PICTURE`;
    avatar.val(src);

}


function apontamentoInput(){
  let inputHoras = '';
  let btnAddHoras  = '';
  switch (phase) {
    case "5":
      inputHoras = document.querySelector("#tb_levan_horas_apontamento");
      btnAddHoras = document.querySelector("#btn_add_horas_levan");
      ajusteInputAddHoras(inputHoras, btnAddHoras, "tb_levan_horas_apontamento");
      break;

    case "7":
      inputHoras = document.querySelector("#tb_desenv_horas_apontamento");
      btnAddHoras = document.querySelector("#btn_add_horas_desenv");
      ajusteInputAddHoras(inputHoras, btnAddHoras, "tb_desenv_horas_apontamento");
      break;
  
    case "9":
      inputHoras = document.querySelector("#tb_hml_horas_apontamento");
      btnAddHoras = document.querySelector("#btn_add_horas_homol");
      ajusteInputAddHoras(inputHoras, btnAddHoras, "tb_hml_horas_apontamento");
      break;

    case "11":
      inputHoras = document.querySelector("#tb_trein_horas_apontamento");
      btnAddHoras = document.querySelector("#btn_add_horas_trein");

      ajusteInputAddHoras(inputHoras, btnAddHoras, "tb_trein_horas_apontamento");
      break;

    case "12":
      inputHoras = document.querySelector("#tb_golive_horas_apontamento");
      btnAddHoras = document.querySelector("#btn_add_horas_golive");
      ajusteInputAddHoras(inputHoras, btnAddHoras, "tb_golive_horas_apontamento");
      break;
  
    default: ''
      break;
  }
}

function ajusteInputAddHoras(inputHoras, btnAddHoras, inputRef){
  inputHoras.readOnly = true;
  inputHoras.classList.add("open-add-horas");
  inputHoras.classList.remove('input-bg'); 
  btnAddHoras.classList.remove("close-add-horas");
  $(btnAddHoras).click(() => modalHoras(inputRef));
}

var modalHorasModal;
function calcularHoras(horasRegistradas, input) {
  const horasAdicionadas = $("#horas_adicionadas").val();

  const somenteHorasRegistradas = horasRegistradas.toString().split(".")[0];
  const somenteHorasAdicionadas = horasAdicionadas.toString().split(".")[0];

  let somenteMinRegistrados = horasRegistradas.toString().split(".")[1];
  let somenteMinAdicionadas = horasAdicionadas.toString().split(".")[1];

  let totalHoras = Number(somenteHorasRegistradas) + Number(somenteHorasAdicionadas);
  let totalMinutos = 0;

  if(somenteMinAdicionadas != null && somenteMinRegistrados != null) {
    if(somenteMinRegistrados < 10) somenteMinRegistrados *= 10;
    if(somenteMinAdicionadas < 10) somenteMinAdicionadas *= 10;

    totalMinutos = (Number(somenteMinRegistrados) + Number(somenteMinAdicionadas));

  } else if(somenteMinRegistrados != null) {
    if(somenteMinRegistrados < 10)  somenteMinRegistrados *= 10;
    totalMinutos = Number(somenteMinRegistrados);

  } else if(somenteMinAdicionadas != null) {
    if(somenteMinAdicionadas < 10)  somenteMinAdicionadas *= 10;
    totalMinutos = Number(somenteMinAdicionadas);
  }

  if(totalMinutos > 0) {
    totalMinutos = converterMinToHours(totalMinutos);

    const novasHoras = totalMinutos.toString().split(".")[0];
    const novosMinutos = totalMinutos.toString().split(".")[1];

    totalHoras += Number(novasHoras);
    totalMinutos = Number(novosMinutos);

    totalHoras = Number(`${totalHoras}.${totalMinutos}`);
  }

  input.value = Number(totalHoras);
  input.parentElement.classList.remove("has-error");
  return;
}

const converterMinToHours = (minutos) => {
  const horas = Math.floor(minutos/ 60);          
  const min = minutos % 60;
  const textoHoras = (`00${horas}`).slice(-2);
  const textoMinutos = (`00${min}`).slice(-2);
  
  return `${textoHoras }.${textoMinutos}`;
};

function modalHoras(input) {
  let value = $(`#${input}`).val();
  value = value == '' ? 0 : value;

  modalHorasModal = FLUIGC.modal({
    title: '',
    content: `
        <div class="col-md-12">

         <div class="col-md-5">
         <label for="horas_anteriores">Horas Registradas</label>
          <input 
            type="number" 
            id="horas_anteriores" 
            name="horas_anteriores"
            class="form-control fs-no-spin" 
            readonly
            value="${value}"
          />
         </div>

        <div class="col-md-2">
          
        </div>

         <div class="col-md-5">
         <label for="horas_adicionadas">Adicionar horas</label>
          <input 
            type="number" 
            id="horas_adicionadas" 
            name="horas_adicionadas"
            class="form-control fs-no-spin" 
          />
        </div>


        </div>
        <div class="col-md-12 d-flex justify-content-center" style="margin-top: 28px;">
            <div class="col-md-5">
                <button 
                    type="button" 
                    id="btn-aprov-rh" 
                    name="btn-aprov-rh" 
                    style="width: 100%;" 
                    class="btn btn-success"
                    onclick="calcularHoras(${value}, ${input}); modalHorasModal.remove();"
                >
                    Salvar
                </button>
            </div>

            <div class="col-md-2">
            
            </div>
            
            <div class="col-md-5">
                <button 
                    type="button" 
                    id="btn-reprov-rh" 
                    name="btn-reprov-rh" 
                    style="width: 100%;" 
                    class="btn btn-danger"
                    onclick="modalHorasModal.remove();"
                >
                    Fechar
                </button>
            </div>
        </div>
    `,
    id: 'fluig-modal',
    actions: [],
  }); 
}


function generateDownloadDesc({container, i, descArquivo}){
  container.append(`
  <div class="col-md-4">
     <div class="doc-downalod col-md-4 fs-cursor-pointer" onClick="downloadAttach(${i})" style="margin-top: 16px !important; width: 100% !important;">
        <p>
          <img src="./img/doc.png" />
          ${descArquivo}
        </p>
        <img src="./img/btn-download.png" />
      </div>
  </div>
`);
}



//Ajustes modo view
function ajustesModoView() {
  const modo = $("#form_mode").val();
  
  if(modo == "VIEW") {
    const campos = [];

    //Dados do solicitante
    campos.push("txt_dados_solicitante", "txt_dados_dataSolic", "txt_dados_horaSolic");

    //Informações do cliente
    campos.push("ztxt_infos_cliente", "txt_infos_cnpj", "txt_infos_endereco", "txt_infos_erp", "txt_infos_mercadoAtuacao", "txt_infos_descCliente", "txt_infos_partCliente");

    //Informações do projeto 
    campos.push(
      "txt_infos_proposta", 
      "ztxt_infos_projeto", 
      "txt_infos_descricaoProj",
      "txt_levan_horas",
      "txt_desenv_horas",
      "txt_hml_horas",
      "txt_treinamento_horas",
      "txt_goLive_horas",
      "tb_levan_horas",
      "tb_desenv_horas",
      "tb_hml_horas",
      "tb_treinamento_horas",
      "tb_goLive_horas",
      "tb_levan_horas_apontamento",
      "tb_desenv_horas_apontamento",
      "tb_hml_horas_apontamento",
      "tb_trein_horas_apontamento",
      "tb_golive_horas_apontamento", 
      "tb_levan_dataLimite",
      "tb_desenv_dataLimite",
      "tb_hml_dataLimite",
      "tb_treinamento_dataLimite",
      "tb_goLive_dataLimite"
    );

    //Documentos de levantamento e arquitetura
    campos.push(
      "txt_levan_questionario",
      "txt_levan_doc",
      "txt_levan_prototipo"
    );

    campos.push(
      "txt_levan_questionario_link",
      "txt_levan_doc_link",
      "txt_levan_prototipo_link",
      "txt_desenv_questionario",
      "txt_desenv_doc",
      "txt_desenv_prototipo",
      "txt_desenv_checklist_link",
      "txt_desenv_estrutura_link",
      "txt_desenv_repositorio_link",
      "txt_plano_de_teste_link",
      "txt_roteiro",
      "txt_manual_em_video",
      "txt_roteiro_link",
      "txt_manual_em_video_link",
      "txt_doc_migracao",
      "txt_grav_go_live",
      "txt_plano_de_teste"
    );

    //Ajustes reuniões
    const reunioes = $(".reuniao-items");
    [...reunioes].forEach((reuniao, i) => {
      if(i > 0) {
        const link = reuniao.children[0].children[1].children[0].children[1].id;
        const data = reuniao.children[0].children[1].children[1].children[1].id;
        const hora = reuniao.children[0].children[1].children[2].children[1].id;
        const ata = reuniao.children[0].children[1].children[3].children[1].id;

        campos.push(link, data, hora, ata);
      }
    });

    campos.forEach(input => {
      const inputRef = $(`#${input}`)[0];
      const className = inputRef.classList;
      const id = input;
      const value = inputRef.innerHTML == "&nbsp;" ? "" : inputRef.innerHTML;

      const inputElement = document.createElement('input');
      inputElement.id = id;
      inputElement.name = id;
      className.forEach(item => {
        inputElement.classList.add(`${item}`);
      });
      inputElement.defaultValue = value;
      inputElement.setAttribute("readOnly", true);

      inputRef.replaceWith(inputElement);

    });

    const buttons = [
      "add_reuniao", 
      "add", 
      "btn_salvar_obs",
    ];
    buttons.forEach(item => {
      $(`#${item}`).attr("disabled", true);
    });

    //disabila inserção de anexos
    const anexos = ["table_anexos_levan", "table_anexos_desenv", "table_anexos_homol", "table_anexos_trein", "table_anexos_go_live"];
    anexos.forEach(anexo => {
      $(`#${anexo}`).parent().hide();
    });

    $("#tb_levan_dataLimite").val($("#txt_data_ref_levan").val());
    $("#tb_desenv_dataLimite").val($("#txt_data_ref_desenv").val());
    $("#tb_hml_dataLimite").val($("#txt_data_ref_homol").val());
    $("#tb_treinamento_dataLimite").val($("#txt_data_ref_trein").val());
    $("#tb_goLive_dataLimite").val($("#txt_data_ref_go_live").val());
  }
}
