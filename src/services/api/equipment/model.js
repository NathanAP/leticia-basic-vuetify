export default class Equipment {
    constructor(object = {}) {
        this.id = object.idequipamento;
        this.name = object.nome_equipamento;
        this.clientName = object.nome_cliente;
        this.unitName = object.nome_unidade;
    }
}
