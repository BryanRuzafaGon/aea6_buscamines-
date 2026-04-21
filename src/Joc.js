import Tauler from './Tauler';
/**
 * Classe principal que gestiona la lògica del joc i la interacció amb l'usuari.
 */
export default class Joc {
    tauler;
    contenidorId;
    partidaFinalitzada = false;
    /**
     * Inicialitza el joc creant un nou tauler.
     * @param files Files del tauler.
     * @param columnes Columnes del tauler.
     * @param contenidorId ID de l'element HTML on es dibuixarà el joc.
     */
    constructor(files, columnes, contenidorId) {
        this.tauler = new Tauler(files, columnes);
        this.contenidorId = contenidorId;
        this.dibuixarTauler();
        // Console log per verificació de l'estudiant (fase 1)
        console.log("Tauler inicialitzat de forma aleatòria:");
        console.table(this.tauler.caselles.map(fila => fila.map(c => c.esMina ? 'X' : 'O')));
    }
    /**
     * Crea la representació HTML coherent amb l'estat del tauler.
     */
    dibuixarTauler() {
        const contenidor = document.getElementById(this.contenidorId);
        if (!contenidor)
            return;
        contenidor.innerHTML = '';
        // Establim la graella segons les columnes
        contenidor.style.display = 'grid';
        contenidor.style.gridTemplateColumns = `repeat(${this.tauler.columnes}, 40px)`;
        contenidor.style.gap = '4px';
        contenidor.style.justifyContent = 'center';
        const rutaImatges = '/imatges_buscaminas/img/';
        for (let f = 0; f < this.tauler.files; f++) {
            for (let c = 0; c < this.tauler.columnes; c++) {
                const casella = this.tauler.caselles[f][c];
                const element = document.createElement('div');
                element.classList.add('casella');
                let imatgeSrc = rutaImatges + 'notchecked.gif';
                if (casella.revelada) {
                    element.classList.add('revelada');
                    if (casella.esMina) {
                        imatgeSrc = rutaImatges + 'bombdeath.gif';
                    }
                    else {
                        imatgeSrc = `${rutaImatges}open${casella.minesAlVoltant}.gif`;
                    }
                }
                else if (casella.marcada) {
                    element.classList.add('marcada');
                    imatgeSrc = rutaImatges + 'bombflagged.gif';
                }
                element.style.backgroundImage = `url(${imatgeSrc})`;
                element.style.backgroundSize = 'cover';
                // Esdeveniment de clic esquerre (Revelar)
                element.addEventListener('click', () => {
                    if (!this.partidaFinalitzada) {
                        this.revelarCasella(f, c);
                    }
                });
                // Esdeveniment de clic dret (Marcar)
                element.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    if (!this.partidaFinalitzada) {
                        this.marcarCasella(f, c);
                    }
                });
                contenidor.appendChild(element);
            }
        }
    }
    /**
     * Gestiona l'acció de revelar una cel·la.
     * @param f Fila de la casella.
     * @param c Columna de l'operació.
     */
    revelarCasella(f, c) {
        const casella = this.tauler.caselles[f][c];
        if (casella.revelada || casella.marcada)
            return;
        casella.revelada = true;
        if (casella.esMina) {
            this.finalitzarJoc(false);
        }
        else {
            // Si no hi ha mines a prop, revelem les adjacents recursivament (millora d'experiència)
            if (casella.minesAlVoltant === 0) {
                this.revelarAdjacents(f, c);
            }
            this.comprovarVictoria();
        }
        this.dibuixarTauler();
    }
    /**
     * Permet marcar o desmarcar una cel·la com a sospitosa.
     */
    marcarCasella(f, c) {
        const casella = this.tauler.caselles[f][c];
        if (casella.revelada)
            return;
        casella.marcada = !casella.marcada;
        this.dibuixarTauler();
    }
    /**
     * Mètode recursiu per obrir caselles buides adjacents.
     */
    revelarAdjacents(f, c) {
        for (let df = -1; df <= 1; df++) {
            for (let dc = -1; dc <= 1; dc++) {
                const nf = f + df;
                const nc = c + dc;
                if (nf >= 0 && nf < this.tauler.files && nc >= 0 && nc < this.tauler.columnes) {
                    const veina = this.tauler.caselles[nf][nc];
                    if (!veina.revelada && !veina.esMina) {
                        this.revelarCasella(nf, nc);
                    }
                }
            }
        }
    }
    /**
     * Verifica si l'usuari ha guanyat la partida.
     */
    comprovarVictoria() {
        let totesRevelades = true;
        for (let f = 0; f < this.tauler.files; f++) {
            for (let c = 0; c < this.tauler.columnes; c++) {
                const casella = this.tauler.caselles[f][c];
                if (!casella.esMina && !casella.revelada) {
                    totesRevelades = false;
                    break;
                }
            }
        }
        if (totesRevelades) {
            this.finalitzarJoc(true);
        }
    }
    /**
     * Acaba la partida i mostra un missatge a l'usuari.
     */
    finalitzarJoc(guanyat) {
        this.partidaFinalitzada = true;
        // Revelem totes les mines al finalitzar
        for (let f = 0; f < this.tauler.files; f++) {
            for (let c = 0; c < this.tauler.columnes; c++) {
                if (this.tauler.caselles[f][c].esMina) {
                    this.tauler.caselles[f][c].revelada = true;
                }
            }
        }
        this.dibuixarTauler();
        setTimeout(() => {
            alert(guanyat ? "Enhorabona! Has guanyat la partida!" : "Boom! Has trobat una mina. Partida finalitzada.");
        }, 100);
    }
    /**
     * Retorna un color segons el nombre de mines adjacents per a la UI.
     */
    obtenirColorNumero(num) {
        const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d'];
        return colors[num - 1] || 'white';
    }
}
