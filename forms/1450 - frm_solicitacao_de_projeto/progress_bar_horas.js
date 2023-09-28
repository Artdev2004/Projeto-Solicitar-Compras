//Global vars
class ProgressHoras {
    estimativa = 0;
    utilizadas = 0;
    porcentagem = 0;
    utilizadaForm = '';
    inputProgress = '';
    inputPorcen = '';
    faseFK = '';

    constructor(estimativa, utilizadas, inputProgress, inputPorcen, fase) {
        this.estimativa = Number(estimativa);
        this.utilizadas = Number(utilizadas != '' ? utilizadas : 0);
        this.inputProgress = inputProgress;
        this.inputPorcen = inputPorcen;
        this.faseFK = fase;
    }

    calculo() {
        this.porcentagem = (Number(this.utilizadas) / Number(this.estimativa)) * 100;
        this.updateHtml();
    }

    updateHtml() {
        $(`#${this.inputProgress}`).attr({
            "aria-valuenow": `${this.porcentagem}`,
            "style": `width: ${this.porcentagem}%; background: ${this.faseFK == phase ? "#C196EC" : "#9F9F9F"};`,
        });

        if(this.utilizadas.toString().includes(".")) {
            this.utilizadaForm = `${this.utilizadas.toString().split(".")[0]}h${this.utilizadas.toString().split(".")[1]}0`;
        } else {
            this.utilizadaForm = `${this.utilizadas}h00`;
        }

        $(`#${this.inputPorcen}`).html(`${this.utilizadaForm} | ${isNaN(this.porcentagem) ? 0 : this.porcentagem.toFixed(0)}%`);
    }
}


function createProgressBar(totalHoras, totalUtilizada, inputProgress, inputPorcen, fase) {
    const total = $(`#${totalHoras}`).val();
    const utilizada = $(`#${totalUtilizada}`).val();

    const progress = new ProgressHoras(total, utilizada, inputProgress, inputPorcen, fase);
    progress.calculo();
}


if(Number(phase) >= 5) {
    createProgressBar(
        "tb_levan_horas", 
        "tb_levan_horas_apontamento", 
        "progress_horas_levan", 
        "txt_horas_porcen_levan", 
        "5"
    );
    
    createProgressBar(
        "tb_desenv_horas", 
        "tb_desenv_horas_apontamento", 
        "progress_horas_desenv", 
        "txt_horas_porcen_desenv",
        "7"
    );
    
    createProgressBar(
        "tb_hml_horas", 
        "tb_hml_horas_apontamento", 
        "progress_horas_homol", 
        "txt_horas_porcen_homol",
        "9"
    );
    
    createProgressBar(
        "tb_treinamento_horas", 
        "tb_trein_horas_apontamento", 
        "progress_horas_trein", 
        "txt_horas_porcen_trein", 
        "11"
    );
    
    createProgressBar(
        "tb_goLive_horas", 
        "tb_golive_horas_apontamento", 
        "progress_horas_golive", 
        "txt_horas_porcen_golive",
        "12"
    );
    
}

