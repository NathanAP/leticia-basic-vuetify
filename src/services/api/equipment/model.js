export default class Equipment {
    constructor(object = {}) {
        this.id = object.idequipamento;
        this.name = object.nome;

        this.unitId = object.idunidade;
    }
}
