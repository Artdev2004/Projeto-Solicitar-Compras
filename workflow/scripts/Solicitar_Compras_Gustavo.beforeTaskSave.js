function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	//acessar hAPI, lista de anexos
	//hAPI - manipular objeto de processo
	var anexos = hAPI.listAttachments();
	
	if(anexos.size() <= 0){
		throw ("Nota Fiscal não foi anexada");
	}
	if(anexos.size() > 1){
		throw ("Por favor, insira apenas um anexo");
	}
	// //.size() -> qunatidade de anexos no processo
	// for(var i = 0; i < anexos.size(); i++){
	// 	//atribuindo o arquivo atual à variável
	// 	var anexoAtual = anexos.get(i);
		
	// 	//.getDocumentDescription() -> pega o nome do arquivo atual
	// 	//if(anexoAtual.getDocumentDescription() == "Proposta Comercial.pdf"){}
	// 	temAnexos = true;
	// }
	
	// if(!temAnexos){
	// 	throw ("Nota Fiscal não foi anexada");
	// }
	
}