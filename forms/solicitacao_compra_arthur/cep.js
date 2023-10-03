$(document).ready(() => {
    // debugger
    $("#cep").on("blur", function() {
        $.getJSON("https://viacep.com.br/ws/"+ $("#cep").val() +"/json/", function(dados){
            console.log(dados)
            $("#estado").val(dados.uf);
            $("#cidade").val(dados.localidade);
            $("#endereco").val(dados.logradouro);
           
        })
    })
})