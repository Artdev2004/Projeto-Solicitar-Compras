function createMandatoryAttach(){
    // Include anexo obrigatorio
    let tables;

    if(phase == "0" || phase == "4") {
      const params = {
          tableName: 'table_anexos',
          anexoName: 'tb_anexo_name___1',
          descAnexo: 'txt_desc_anexo___1',
          removeAnexo: 'btn_removeAnexo___1',
          insertAnexo: 'btn_inserAnexo___1',
          hiddenAttach: 'hidden_attach___1',
          descText: 'Estimativa de horas',
          activeUpButton: true
      };

      addAnexo(params);
    }
  
    if(phase == "5") {
      tables = document.querySelectorAll(".anexo-item-levan");

      function renderAnexoDefault() {
        for(let i = 1; i < 3; i++) {
          let desc = i == 1 ? "Apresentação de kick-off" : "Comprovante de validação";
          const params = {
            tableName: 'table_anexos_levan',
            anexoName: `tb_anexo_name_levan___${i}`,
            descAnexo: `txt_levan_desc_anexo___${i}`,
            removeAnexo: `btn_levan_removeAnexo___${i}`,
            insertAnexo: `btn_levan_inserAnexo___${i}`,
            hiddenAttach: `hidden_attach_levan___${i}`,
            descText: desc
          };

          addAnexo(params);
        }
      }
  
      if(tables.length == 1) {
        renderAnexoDefault();
        
      } else {     
        renderAnexoDefault();

        tables = document.querySelectorAll(".anexo-item-levan");   
        addAnexoSave({
          tables: tables,
          btnInsertAnexo: 'btn_levan_inserAnexo',
          btnRemoveAnexo: 'btn_levan_removeAnexo',
          etapa: 5
        });  
      }
    }
  
    if(phase == "7") {
      tables = document.querySelectorAll(".anexo-item-desenv");
      const params = {
        tableName: 'table_anexos_desenv',
        anexoName: 'tb_anexo_name_desenv___1',
        descAnexo: 'txt_desenv_desc_anexo___1',
        removeAnexo: 'btn_desenv_removeAnexo___1',
        insertAnexo: 'btn_desenv_inserAnexo___1',
        hiddenAttach: 'hidden_attach_desenv___1',
        descText: 'Cronograma de desenvolvim...'
      };
  
      if(tables.length == 1) {
        addAnexo(params);
      } else {      
        addAnexo(params);
        tables = document.querySelectorAll(".anexo-item-desenv");

        addAnexoSave({
          tables: tables,
          btnInsertAnexo: 'btn_desenv_inserAnexo',
          btnRemoveAnexo: 'btn_desenv_removeAnexo',
          etapa: 7
        }); 
      }
    }
  
    if(phase == "9") {
      tables = document.querySelectorAll(".anexo-item-homol");

      const params = {
        tableName: 'table_anexos_homol',
        anexoName: 'tb_anexo_name_homol___1',
        descAnexo: 'txt_homol_desc_anexo___1',
        removeAnexo: 'btn_homol_removeAnexo___1',
        insertAnexo: 'btn_homol_inserAnexo___1',
        hiddenAttach: 'hidden_attach_homol___1',
        descText: 'Plano de Testes'
      };
  
      if(tables.length == 1) {
        addAnexo(params);
      } else {      
        addAnexo(params);
        tables = document.querySelectorAll(".anexo-item-homol");

        addAnexoSave({
          tables: tables,
          btnInsertAnexo: 'btn_homol_inserAnexo',
          btnRemoveAnexo: 'btn_homol_removeAnexo',
          etapa: 9
        }); 
      }
    }
  
    if(phase == "11") {
      tables = document.querySelectorAll(".anexo-item-trein");

      const params = {
        tableName: 'table_anexos_trein',
        anexoName: 'tb_anexo_name_trein___1',
        descAnexo: 'txt_trein_desc_anexo___1',
        removeAnexo: 'btn_trein_removeAnexo___1',
        insertAnexo: 'btn_trein_inserAnexo___1',
        hiddenAttach: 'hidden_attach_trein___1',
        descText: 'Validação do roteiro'
      };

      if(tables.length == 1) {
        addAnexo(params);
      } else {      
        addAnexo(params);
        tables = document.querySelectorAll(".anexo-item-trein");

        addAnexoSave({
          tables: tables,
          btnInsertAnexo: 'btn_trein_inserAnexo',
          btnRemoveAnexo: 'btn_trein_removeAnexo',
          etapa: 9
        }); 
      }
    } 
  
    if(phase == "12") {
        updateAttachments();
        tables = document.querySelectorAll(".anexo-item-golive");

        addAnexoSave({
          tables: tables,
          btnInsertAnexo: 'btn_go_live_inserAnexo',
          btnRemoveAnexo: 'btn_go_live_removeAnexo',
          etapa: 12
        }); 
    }
}

function addAnexo({tableName, anexoName, descAnexo, removeAnexo, insertAnexo, hiddenAttach, descText, activeUpButton = false}) {
    wdkAddChild(tableName);

    $(`#${anexoName}`).hide();
    $(`#${descAnexo}`).show();
    $(`#${descAnexo}`).val(descText);
    $(`#${removeAnexo}`).hide();
 
    $(`#${insertAnexo}`).click(() => {
      if ($(`#${hiddenAttach}`).val() == "") {
        JSInterface.showCamera(descText);
        $(`#${hiddenAttach}`).val(descText);

        if(activeUpButton) {
          $("#btn_update_attach___1").removeAttr("style");
        }
      }
    });

    updateAttachments();
};

function addAnexoSave({tables, btnInsertAnexo, btnRemoveAnexo, etapa }) {
  const checkEtapas = [5, 7, 11];

  if(tables.length > 1) {
    tables.forEach((item, i) => {
      if(i > 0) {
        const desc = item.children[1].children[1].children[2].defaultValue;

        if(desc != "") {
          item.children[0].style.display = "none";

          const items = item.children[1].children[1];
          const btnInser = item.children[1].children[0];
          const hidden = items.children[1].defaultValue;
          const anexoName = items.children[0];
          const desc = items.children[2];
          const nomeArquivo = items.children[3];
          const check = item.children[2];
          const remove = item.children[0];

          const indexId = anexoName.id.split("___")[1];
          btnInser.id = `${btnInsertAnexo}___${indexId}`;
          remove.id = `${btnRemoveAnexo}___${indexId}`;
        

          const attachsFK = parent.ECM.attachmentTable.getData();
            attachsFK.forEach((attachment, index) =>{
              
              if(attachment.description == hidden || attachment.description == desc.defaultValue)  {
                btnInser.src = "./img/btn-subir-anexo.png";
                btnInser.classList.remove("fs-cursor-pointer");
                anexoName.style.display = "none";
                nomeArquivo.type = "text";  
                nomeArquivo.setAttribute("readonly", true);
                check.classList.add("open");   
                desc.style.display = "block";
                nomeArquivo.value = attachment.physicalFileName;
                
                
                if(desc.defaultValue == "") {
                  desc.value = hidden;
                }

                if(desc.defaultValue != "") {
                  items.children[1].value = desc.defaultValue;
                }
              } ;                          
            });

        } else {
          fnWdkRemoveChild(item);
        }
        
        if(checkEtapas.includes(etapa)) {
          if(i == 1 || i == 2) {
            const items = item.children[1].children[1];
            if(items.children[1].value == "") {
              $(item.children[1].children[0]).click(() => {
                JSInterface.showCamera(desc);
                //atribuindo a desc para o hidden
                items.children[1].value = desc;
              })
            }
          }
        }
      }
    });

  updateAttachments();
  }
}

function updateAttch(item) {
  const desc = $("#hidden_attach___1").val();

  let attachs = parent.ECM.attachmentTable.getData();
    attachs.forEach((attachment, index) =>{
        if(attachment.description == desc){
            parent.WKFViewAttachment.removeAttach([index]);
            JSInterface.showCamera(desc);
        }
    });
}
