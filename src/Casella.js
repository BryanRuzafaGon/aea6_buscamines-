/**
 * Classe que representa una cel·la individual del tauler de Buscamines.
 */
export default class Casella {
    esMina;
    revelada;
    marcada;
    minesAlVoltant;
    /**
     * Inicialitza una nova casella.
     * @param esMina Indica si la casella conté una mina.
     */
    constructor(esMina) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
        this.minesAlVoltant = 0;
    }
}
