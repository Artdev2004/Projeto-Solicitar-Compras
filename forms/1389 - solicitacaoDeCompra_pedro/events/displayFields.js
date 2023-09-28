function displayFields(form,customHTML){
	const numUser = getValue("WKUser");
	const fase = parseInt(getValue("WKNumState"));
	form.setHidePrintLink(true);

    const filtro = DatasetFactory.createConstraint("colleaguePK.colleagueId", numUser, numUser, ConstraintType.MUST);
    const colleagues = DatasetFactory.getDataset("colleague", null, new Array(filtro), null);
    const colabNome = colleagues.getValue(0, "colleagueName");

    const data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();

    if(dia < 10) {
        dia = "0" + dia
    }

    if(mes < 10) {
        mes = "0" + mes
    }

    const dataFormatada = dia + "/" + mes + "/" + ano;
    
	form.setValue("solicitante", colabNome);
    form.setValue('dataEmissao', dataFormatada);
    form.setValue("fase", fase);
    
    
    
    customHTML.append('<script>var fase = fase; module.exports = </script>');
   
}