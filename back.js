const treinosPorDia = {
    segunda: [
        'Francês banco', 'Lateral polia', 'Posterior voador',
        'Rosca beresian', 'Tríceps em pé', 'Bíceps barra W polia'
    ],
    terca: ['HOJE TU DESCANSO'],
    quarta: [
        'Panturrilha sentado', 'Panturrilha em pé',
        'Mesa flexora', 'Cadeira flexora',
        'Leg press / Agachamento', 'Extensora', 'Abdutora'
    ],
    quinta: [
        'Supino reto halter', 'Supino inclinado máquina',
        'Cross polia alta', 'Puxada alta',
        'Pull around', 'Remada T'
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

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectDay(btn.dataset.dia, btn);
        });
    });

    document.querySelector('.end-btn').addEventListener('click', finalizarTreino);
});

function selectDay(day, button) {
    document.querySelectorAll('.day-btn')
        .forEach(b => b.classList.remove('active'));

    button.classList.add('active');

    const container = document.querySelector('.treinos');
    container.innerHTML = '';

    treinosPorDia[day].forEach(nome => {
        const item = document.createElement('div');
        item.className = 'treino';

        item.innerHTML = `
            <span>${nome} - 2 series válidas</span>
            <input type="checkbox" class="check-treino">
        `;

        item.querySelector('input').addEventListener('change', e => {
            item.classList.toggle('done', e.target.checked);
        });

        container.appendChild(item);
    });
}

function finalizarTreino() {
    const feitos = document.querySelectorAll('.check-treino:checked').length;

    if (feitos === 0) {
        alert('tu nem treino e quer terminar meu');
        return;
    }

    alert(`vamooo dale, é us guri!!! \nExercícios feitos: ${feitos}`);

    document.querySelectorAll('.check-treino').forEach(cb => {
        cb.checked = false;
        cb.closest('.treino').classList.remove('done');
    });
}
