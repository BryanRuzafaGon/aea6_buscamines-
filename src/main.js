import Joc from './Joc';
/**
 * Punt d'entrada de l'aplicació.
 * S'espera a que el DOM estigui carregat per inicialitzar el joc.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Creem una nova instància del Joc (tauler de 10x10)
    new Joc(10, 10, 'tauler-buscamines');
    // Configuració del botó de reiniciar
    const botoReiniciar = document.getElementById('boto-reiniciar');
    if (botoReiniciar) {
        botoReiniciar.addEventListener('click', () => {
            new Joc(10, 10, 'tauler-buscamines');
        });
    }
});
