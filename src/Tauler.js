import Casella from './Casella';
/**
 * Classe que gestiona l'estructura i l'estat del conjunt de caselles del joc.
 */
export default class Tauler {
    caselles;
    files;
    columnes;
    /**
     * Crea el tauler i l'inicialitza.
     * @param files Nombre de files.
     * @param columnes Nombre de columnes.
     */
    constructor(files, columnes) {
        this.files = files;
        this.columnes = columnes;
        this.caselles = [];
        this.inicialitzarCaselles();
        this.calcularMinesVeïnes();
    }
    /**
     * Inicialitza la matriu de caselles i distribueix les mines aleatòriament.
     */
    inicialitzarCaselles() {
        for (let f = 0; f < this.files; f++) {
            this.caselles[f] = [];
            for (let c = 0; c < this.columnes; c++) {
                // Generem un número de 1 a 10. Si és < 3, hi ha mina (probabilitat 20-30%).
                const aleatori = Math.floor(Math.random() * 10) + 1;
                const esMina = aleatori < 3;
                this.caselles[f][c] = new Casella(esMina);
            }
        }
    }
    /**
     * Calcula per a cada casella quantes mines té al seu voltant.
     */
    calcularMinesVeïnes() {
        for (let f = 0; f < this.files; f++) {
            for (let c = 0; c < this.columnes; c++) {
                if (!this.caselles[f][c].esMina) {
                    let totalMines = 0;
                    // Comprovem les 8 caselles adjacents
                    for (let df = -1; df <= 1; df++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            const nf = f + df;
                            const nc = c + dc;
                            // Validem que la coordenada estigui dins del tauler
                            if (nf >= 0 && nf < this.files && nc >= 0 && nc < this.columnes) {
                                if (this.caselles[nf][nc].esMina) {
                                    totalMines++;
                                }
                            }
                        }
                    }
                    this.caselles[f][c].minesAlVoltant = totalMines;
                }
            }
        }
    }
}
