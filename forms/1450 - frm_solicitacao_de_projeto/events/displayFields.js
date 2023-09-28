function displayFields(form,customHTML){
	const numUser = getValue("WKUser");
	form.setHidePrintLink(true);
    const phase = parseInt(getValue("WKNumState"));
    const form_mode = form.getFormMode();

    const filter = DatasetFactory.createConstraint("colleaguePK.colleagueId", numUser, numUser, ConstraintType.MUST);
    const colleagues = DatasetFactory.getDataset("colleague", null, new Array(filter), null);
    const colabNome = colleagues.getValue(0, "colleagueName");
    const colleagueMat = colleagues.getValue(0, "colleaguePK.colleagueId");

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

    const currentDate = day + "/" + month + "/" + year;

	form.setValue("txt_dados_solicitante", colabNome);
    form.setValue('txt_dados_dataSolic', currentDate);
    form.setValue('txt_matricula_user', colleagueMat);
    form.setValue('form_mode', form_mode);
    form.setValue('phase', phase);

    if(phase == 0 || phase == 4) {
        customHTML.append("<script>");
        customHTML.append("$('#pn_tempoFinal').hide();");
        customHTML.append("$('#pn_reunioes').hide();");
        customHTML.append("$('#pn_inserirAnexosTrein').hide();");
        customHTML.append("$('#pn_docsTrein').hide();");
        customHTML.append("$('#pn_inserirAnexosHomol').hide();");
        customHTML.append("$('#pn_docsHomol').hide();");
        customHTML.append("$('#pn_inserirAnexosDesenv').hide();");
        customHTML.append("$('#pn_inserirAnexosGoLive').hide();");
        customHTML.append("$('#pn_docsDesenv').hide();");
        customHTML.append("$('#pn_inserirAnexosLevan').hide();");
        customHTML.append("$('#pn_docsLevan').hide();");
        customHTML.append("$('#pn_docsSolic').hide();");
        customHTML.append("$('#pn_histObs').hide();");
        customHTML.append("$('#pn_obsStatus').hide();");
        customHTML.append("createMandatoryAttach();");
        customHTML.append("renderProgressBar();");
        customHTML.append("handleFields();");
        customHTML.append("</script>");
    }

    if(phase == 5) {
        customHTML.append("<script>");
        customHTML.append("$('#pn_tempoFinal').show();");
        customHTML.append("$('#pn_reunioes').show();");
        customHTML.append("$('#pn_inserirAnexosTrein').hide();");
        customHTML.append("$('#pn_docsTrein').hide();");
        customHTML.append("$('#pn_inserirAnexosHomol').hide();");
        customHTML.append("$('#pn_docsHomol').hide();");
        customHTML.append("$('#pn_inserirAnexosDesenv').hide();");
        customHTML.append("$('#pn_inserirAnexosGoLive').hide();");
        customHTML.append("$('#pn_docsDesenv').hide();");
        customHTML.append("$('#pn_inserirAnexosLevan').show();");
        customHTML.append("$('#pn_inserirAnexos').hide();");
        customHTML.append("$('#pn_docsLevan').hide();");
        customHTML.append("$('#pn_docsSolic').show();");
        customHTML.append("$('#pn_histObs').show();");
        customHTML.append("$('#pn_obsStatus').show();");
        customHTML.append("$('#pn_obsSolic').hide();");
        customHTML.append("createMandatoryAttach();");
        customHTML.append("renderProgressBar();");
        customHTML.append("handleFields();");
        customHTML.append("updateAttachments();");
        customHTML.append("ajustesModoView();");
        customHTML.append("</script>");
    }

    if(phase == 7) {
        customHTML.append("<script>");
        customHTML.append("$('#pn_tempoFinal').show();");
        customHTML.append("$('#pn_reunioes').show();");
        customHTML.append("$('#pn_inserirAnexosTrein').hide();");
        customHTML.append("$('#pn_docsTrein').hide();");
        customHTML.append("$('#pn_inserirAnexosHomol').hide();");
        customHTML.append("$('#pn_docsHomol').hide();");
        customHTML.append("$('#pn_inserirAnexosDesenv').show();");
        customHTML.append("$('#pn_inserirAnexosGoLive').hide();");
        customHTML.append("$('#pn_docsDesenv').hide();");
        customHTML.append("$('#pn_inserirAnexosLevan').hide();");
        customHTML.append("$('#pn_inserirAnexos').hide();");
        customHTML.append("$('#pn_docsLevan').show();");
        customHTML.append("$('#pn_docsSolic').show();");
        customHTML.append("$('#pn_histObs').show();");
        customHTML.append("$('#pn_obsStatus').show();");
        customHTML.append("$('#pn_obsSolic').hide();");
        customHTML.append("createMandatoryAttach();");
        customHTML.append("renderProgressBar();");
        customHTML.append("handleFields();");
        customHTML.append("ajustesModoView();");
        customHTML.append("</script>");
        return;
    }

    if(phase == 9) {
        customHTML.append("<script>");
        customHTML.append("$('#pn_tempoFinal').show();");
        customHTML.append("$('#pn_reunioes').show();");
        customHTML.append("$('#pn_inserirAnexosTrein').hide();");
        customHTML.append("$('#pn_docsTrein').hide();");
        customHTML.append("$('#pn_inserirAnexosHomol').show();");
        customHTML.append("$('#pn_docsHomol').hide();");
        customHTML.append("$('#pn_inserirAnexosDesenv').hide();");
        customHTML.append("$('#pn_inserirAnexosGoLive').hide();");
        customHTML.append("$('#pn_docsDesenv').show();");
        customHTML.append("$('#pn_inserirAnexosLevan').hide();");
        customHTML.append("$('#pn_inserirAnexos').hide();");
        customHTML.append("$('#pn_docsLevan').show();");
        customHTML.append("$('#pn_docsSolic').show();");
        customHTML.append("$('#pn_histObs').show();");
        customHTML.append("$('#pn_obsStatus').show();");
        customHTML.append("$('#pn_obsSolic').hide();");
        customHTML.append("createMandatoryAttach();");
        customHTML.append("renderProgressBar();");
        customHTML.append("handleFields();");
        customHTML.append("ajustesModoView();");
        customHTML.append("</script>");
        return;
    }

    if(phase == 11) {
        customHTML.append("<script>");
        customHTML.append("$('#pn_tempoFinal').show();");
        customHTML.append("$('#pn_reunioes').show();");
        customHTML.append("$('#pn_inserirAnexosTrein').show();");
        customHTML.append("$('#pn_docsTrein').hide();");
        customHTML.append("$('#pn_inserirAnexosHomol').hide();");
        customHTML.append("$('#pn_docsHomol').show();");
        customHTML.append("$('#pn_inserirAnexosDesenv').hide();");
        customHTML.append("$('#pn_inserirAnexosGoLive').hide();");
        customHTML.append("$('#pn_docsDesenv').show();");
        customHTML.append("$('#pn_inserirAnexosLevan').hide();");
        customHTML.append("$('#pn_inserirAnexos').hide();");
        customHTML.append("$('#pn_docsLevan').show();");
        customHTML.append("$('#pn_docsSolic').show();");
        customHTML.append("$('#pn_histObs').show();");
        customHTML.append("$('#pn_obsStatus').show();");
        customHTML.append("$('#pn_obsSolic').hide();");
        customHTML.append("createMandatoryAttach();");
        customHTML.append("renderProgressBar();");
        customHTML.append("handleFields();");
        customHTML.append("ajustesModoView();");
        customHTML.append("</script>");
        return;
    }

    if(phase == 12) {
        customHTML.append("<script>");
        customHTML.append("$('#pn_tempoFinal').show();");
        customHTML.append("$('#pn_reunioes').show();");
        customHTML.append("$('#pn_inserirAnexosTrein').hide();");
        customHTML.append("$('#pn_docsTrein').show();");
        customHTML.append("$('#pn_inserirAnexosHomol').hide();");
        customHTML.append("$('#pn_docsHomol').show();");
        customHTML.append("$('#pn_inserirAnexosDesenv').hide();");
        customHTML.append("$('#pn_inserirAnexosGoLive').show();");
        customHTML.append("$('#pn_docsDesenv').show();");
        customHTML.append("$('#pn_inserirAnexosLevan').hide();");
        customHTML.append("$('#pn_inserirAnexos').hide();");
        customHTML.append("$('#pn_docsLevan').show();");
        customHTML.append("$('#pn_docsSolic').show();");
        customHTML.append("$('#pn_histObs').show();");
        customHTML.append("$('#pn_obsStatus').show();");
        customHTML.append("$('#pn_obsSolic').hide();");
        customHTML.append("createMandatoryAttach();");
        customHTML.append("renderProgressBar();");
        customHTML.append("handleFields();");
        customHTML.append("ajustesModoView();");
        customHTML.append("</script>");
        return;
    }

    if(phase == 17) {
        customHTML.append("<script>");
        customHTML.append("$('#pn_tempoFinal').hide();");
        customHTML.append("$('#pn_reunioes').hide();");
        customHTML.append("$('#pn_inserirAnexosTrein').hide();");
        customHTML.append("$('#pn_inserirAnexosHomol').hide();");
        customHTML.append("$('#pn_inserirAnexosDesenv').hide();");
        customHTML.append("$('#pn_inserirAnexosGoLive').hide();");
        customHTML.append("$('#pn_inserirAnexosLevan').hide();");
        customHTML.append("$('#pn_inserirAnexos').hide();");
        customHTML.append("$('#pn_obsStatus').hide();");
        customHTML.append("$('#pn_obsSolic').hide();");
        customHTML.append("renderProgressBar();");
        customHTML.append("handleFields();");
        customHTML.append("ajustesModoView();");
        customHTML.append("</script>");
        return;
    }

}