/**
 * Classe que representa una cel·la individual del tauler de Buscamines.
 */
export default class Casella {
    public esMina: boolean;
    public revelada: boolean;
    public marcada: boolean;
    public minesAlVoltant: number;

    /**
     * Inicialitza una nova casella.
     * @param esMina Indica si la casella conté una mina.
     */
    constructor(esMina: boolean) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
        this.minesAlVoltant = 0;
    }
}
