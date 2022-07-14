import { priorityKeys } from "./helper";

export default class Event {
    constructor(object = {}) {
        this.id = object.id_ocorrencia;
        this.date = object.dt_ocorrencia;
        this.text = object.txt_ocorrencia;
        this.action = object.txt_acao;
        this.conclusion = object.txt_conclusao;
        this.notify = object.notificar;
        this.responsable = object.responsavel;
        this.priority = object.id_prioridade
            ? priorityKeys[object.id_prioridade + 1]
            : "NORMAL";

        this.equipmentId = object.id_equipamento;
        this.statusId = object.id_status;
        this.typeId = object.idtipo;
    }
}
