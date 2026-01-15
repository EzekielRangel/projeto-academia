const treinosPorDia = {
    segunda: [
        'Francês banco', 'Lateral polia', 'Posterior voador',
        'Rosca beresian', 'Tríceps em pé', 'Bíceps barra W polia'
    ],
    terca: ['HOJE TU DESCANSA'],
    quarta: [
        'Supino reto halter', 'Supino inclinado máquina',
        'Cross polia alta', 'Puxada alta',
        'Pull around', 'Remada T'
    ],
    quinta: [
        'Panturrilha sentado', 'Panturrilha em pé',
        'Mesa flexora', 'Cadeira flexora',
        'Leg press / Agachamento', 'Extensora', 'Abdutora'
    ],
    sexta: [
        'Francês banco', 'Bíceps barra W polia',
        'Pull around', 'Remada T',
        'Supino reto halter', 'Crossover polia alta',
        'Lateral polia', 'Posterior voador'
    ],
    sabado: [
        'Panturrilha sentado', 'Panturrilha em pé',
        'Mesa flexora', 'Cadeira flexora',
        'Leg press / Agachamento', 'Extensora', 'Abdutora'
    ]
};

function getStorage() {
    return JSON.parse(localStorage.getItem('treinosSalvos')) || {};
}

function setStorage(data) {
    localStorage.setItem('treinosSalvos', JSON.stringify(data));
}

let diaAtual = null;

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectDay(btn.dataset.dia, btn);
        });
    });

    const endBtn = document.querySelector('.end-btn');
    if (endBtn) {
        endBtn.addEventListener('click', finalizarTreino);
    }
});


function selectDay(day, button) {

    diaAtual = day;

    document.querySelectorAll('.day-btn')
        .forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    const container = document.querySelector('.treinos');
    container.innerHTML = '';

    treinosPorDia[diaAtual].forEach(nome => {

        const item = document.createElement('div');
        item.className = 'treino';

        const storage = getStorage();
        const dadosTreino = storage[diaAtual]?.[nome] || {};

        item.innerHTML = `
            <div class="treino-header">
                <span class="nome-treino">${nome}</span>
                <input type="checkbox" class="check-treino">
            </div>

            <div class="treino-body">
                <div class="field">
                    <label>Séries</label>
                    <input type="number" class="series" value="${dadosTreino.series || ''}">
                </div>

                <div class="field">
                    <label>Repetições</label>
                    <input type="number" class="reps" value="${dadosTreino.reps || ''}">
                </div>

                <div class="field">
                    <label>Carga (kg)</label>
                    <input type="number" class="carga" value="${dadosTreino.carga || ''}">
                </div>

                <div class="field">
                    <label>Observações</label>
                    <input type="text" class="obs" value="${dadosTreino.obs || ''}">
                </div>
            </div>
        `;

        const checkbox = item.querySelector('.check-treino');
        const header = item.querySelector('.treino-header');

        if (dadosTreino.done) {
            checkbox.checked = true;
            item.classList.add('done');
        }

        header.addEventListener('click', (e) => {
            if (e.target.classList.contains('check-treino')) return;
            item.classList.toggle('open');
        });

        item.querySelectorAll('.series, .reps, .carga, .obs').forEach(input => {
            input.addEventListener('input', () => salvarTreino(item, nome, checkbox));
        });

        checkbox.addEventListener('change', () => {
            item.classList.toggle('done', checkbox.checked);
            salvarTreino(item, nome, checkbox);
        });

        container.appendChild(item);
    });
}

function salvarTreino(item, nome, checkbox) {

    if (!diaAtual) return;

    const storage = getStorage();
    if (!storage[diaAtual]) storage[diaAtual] = {};

    storage[diaAtual][nome] = {
        series: item.querySelector('.series').value,
        reps: item.querySelector('.reps').value,
        carga: item.querySelector('.carga').value,
        obs: item.querySelector('.obs').value,
        done: checkbox.checked
    };

    setStorage(storage);
}

function finalizarTreino() {

    if (!diaAtual) {
        alert('seleciona um dia primeiro');
        return;
    }

    const container = document.querySelector('.treinos');
    const checks = container.querySelectorAll('.check-treino');

    const allMarked = checks.length > 0 && Array.from(checks).every(cb => cb.checked);

    if (checks.length === 0 || !allMarked ) {
        alert('Ou treina tudo, ou nem treina né o merda');
        return;
    }

    alert(`vamooo dale`);

    container.querySelectorAll('.check-treino').forEach(cb => {
        cb.checked = false;
        cb.closest('.treino').classList.remove('done');
    });

    const storage = getStorage();
    delete storage[diaAtual];
    setStorage(storage);
}
