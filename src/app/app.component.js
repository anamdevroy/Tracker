
const form = document.getElementById('health-tracker-form');
const workoutLogBody = document.getElementById('workout-log-body');
const histogram = document.getElementById('histogram');
const ctx = histogram.getContext('2d');
const workoutTypeSelect = document.getElementById('workout-type-select');

let workoutData = {};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const workoutType = document.getElementById('workout-type').value;
    const workoutMinutes = document.getElementById('workout-minutes').value;

    if (!workoutData[workoutType]) {
        workoutData[workoutType] = [];
    }

    workoutData[workoutType].push(workoutMinutes);

    const tableRow = `
        <tr>
            <td>${username}</td>
            <td>${workoutType}</td>
            <td>${workoutMinutes}</td>
        </tr>
    `;

    workoutLogBody.innerHTML += tableRow;

    drawHistogram(workoutType);
});

function drawHistogram(workoutType) {
    ctx.clearRect(0, 0, histogram.width, histogram.height);

    if (!workoutData[workoutType]) {
        return;
    }

    const maxMinutes = Math.max(...workoutData[workoutType]);
    const graphWidth = histogram.width - 20;
    const graphHeight = histogram.height - 20;
    const barWidth = graphWidth / workoutData[workoutType].length;

    ctx.beginPath();
    ctx.moveTo(10, graphHeight - 10);

    workoutData[workoutType].forEach((minutes, index) => {
        const x = (index / (workoutData[workoutType].length - 1)) * graphWidth + 10;
        const y = graphHeight - (minutes / maxMinutes) * graphHeight + 10;

        ctx.rect(x, y, barWidth, graphHeight - y);
    });

    ctx.stroke();
}

workoutTypeSelect.addEventListener('change', () => {
    const workoutType = workoutTypeSelect.value;
    drawHistogram(workoutType);
});
