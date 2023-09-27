$(function(){
    var dtEmissao = FLUIGC.calendar('#dtEmissao');
    var dtVencimento = FLUIGC.calendar('#dtVencimento');
    var dtVencimento = FLUIGC.calendar('#dtVencimento');
    var dtReferencia = FLUIGC.calendar('#dtReferencia');

    var etapa = $("#etapa").val();

    if (etapa == "5" || etapa == 5){
        $("#gestor").show();
    }   
})
$("#aprovarGestorSim").on("click", function () {  
    let content = ` 
    <div style="text-align: center;">
        <img src="icons/warning.png" alt="" style="width: 100px;">
        <h3>Tem certeza que deseja aprovar?</h3>
        <div>
            <input type="button" id="sim" name="sim" value="sim" onclick="aprovarGestor(this)">
            <input type="button" id="nao" name="nao" value="não" onclick="aprovarGestor(this)">
        </div>
    </div>
`
    let myModal = FLUIGC.modal({
        title: 'Confirmar',
        content: content,
        id: 'confirmar-modal'
    },
        function (err, data) {
            if (err) {
               
            } else {
                // fazer algo com os dados(data)
            }
        }
    )
})
$(function aprovarGestor(botao){
    var resposta = $(botao).val(); 

    console.log(resposta)
    if(resposta == "sim"){
        $("#aprovaGestor").val("sim");
    }else if(resposta == "não"){
        $("#aprovaGestor").val("não");
    }
})


