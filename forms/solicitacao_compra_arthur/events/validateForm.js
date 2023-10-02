function validateForm(form){
    const campos = [

        "nome",
        "email",
        "telefone",
        "rg",
        "nascimento",
        "tipoPonto", 
        "cep",
        "logradouro",
        "numero",
        "bairro",
        "cidade",
        "estado",
        "valor"        
    ]
    
    var mensagem = "";
    
    
    for(var i = 0; i < campos.length; i++){
        if(Form.getValue(campos[i]) == ""){
            if(i > 0 ){
                mensagem += ", "
            }   
            mensagem += campos[i];
            
        }
        
    }
    throw mensagem;
    
    
}