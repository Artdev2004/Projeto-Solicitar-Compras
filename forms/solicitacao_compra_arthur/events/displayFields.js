function displayFields(form,customHTML){ 
    log.info("iniciando display fields")
    log.info("usuario Atual ----- " + getValue("WKUser"));
    var nNumStateValue = getValue("WKNumState");

    var usuario = getValue("WKUser")
    form.setValue("etapa", nNumStateValue);

    form.setValue("usuarioAtual", usuario);
    
}