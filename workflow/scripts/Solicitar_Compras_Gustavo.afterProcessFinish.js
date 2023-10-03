function afterProcessFinish(processId){
	var notificao = "";
	
	if(hAPI.getCardValue("valorAprovGestor") == "NAO" || hAPI.getCardValue("valorAprovRH") == "NAO")
		notificao = '<h1>Resposta da Solicitação</h1></br>' +'<h4>' + hAPI.getCardValue("obsGestor") + '</h4>';
	
	if(hAPI.getCardValue("valorAprovGestor") == "SIM" && hAPI.getCardValue("valorAprovRH") == "SIM")
		notificao = '<h1>Resposta da Solicitação</h1></br>' +'<h4>' + hAPI.getCardValue("obsRH") + '</h4>';
	
}