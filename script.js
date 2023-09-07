const customRunner1 = document.getElementById("custom-runner1");
const customRunner2 = document.getElementById("custom-runner2");
const customFilled = document.getElementById("custom-filled");

let position1 = 0;
let position2 = 100;
updateRunnerPosition(customRunner1, position1);
updateRunnerPosition(customRunner2, position2);
updateFilled();

customRunner1.addEventListener("mousedown", (e) => {
    dragRunner(e, customRunner1, (newPosition) => {
        position1 = newPosition;
        position1 = Math.min(position1, position2);
        updateRunnerPosition(customRunner1, position1);
        updateFilled();
        updateLabels();
    });
});

customRunner2.addEventListener("mousedown", (e) => {
    dragRunner(e, customRunner2, (newPosition) => {
        position2 = newPosition;
        position2 = Math.max(position2, position1);
        updateRunnerPosition(customRunner2, position2);
        updateFilled();
        updateLabels();
    });
});

customRunner1.addEventListener("mousemove", (e) => {
    showTooltip(e, customRunner1, position1);
});

customRunner2.addEventListener("mousemove", (e) => {
    showTooltip(e, customRunner2, position2);
});

customRunner1.addEventListener("mouseout", () => {
    hideTooltip(customRunner1);
});

customRunner2.addEventListener("mouseout", () => {
    hideTooltip(customRunner2);
});

function updateRunnerPosition(runner, position) {
    runner.style.left = position + "%";
}

function updateFilled() {
    customFilled.style.left = position1 + "%";
    customFilled.style.width = position2 - position1 + "%";
}

function updateLabels() {
    // const minYear = 2014;
    // const maxYear = 2021;
    // const range = maxYear - minYear;
    // const year1 = Math.round((position1 / 100) * range) + minYear;
    // const year2 = Math.round((position2 / 100) * range) + minYear;
    // labels[0].textContent = year1;
    // labels[labels.length - 1].textContent = year2;
}

function showTooltip(event, runner, position) {
    const tooltip =
        runner === customRunner1
            ? document.getElementById("custom-tooltip1")
            : document.getElementById("custom-tooltip2");
    const sliderRect = runner.parentElement.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
    const minYear = 2014;
    const maxYear = 2021;
    const range = maxYear - minYear;
    const year = Math.floor(minYear + position / (100 / range));
    const month = Math.floor((position % (100 / range)) / ((100 / range) / 12)) + 1;

    const monthNames = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];

    const monthName = monthNames[month - 1];
    tooltip.textContent = `${year} ${monthName}`;

    const tooltipX = position * (sliderWidth / 100);
    tooltip.style.left = `${sliderRect.left + tooltipX}px`;
    tooltip.style.top = `${sliderRect.top - 30}px`;
    tooltip.style.display = "block";
}

function hideTooltip(runner) {
    const tooltip =
        runner === customRunner1
            ? document.getElementById("custom-tooltip1")
            : document.getElementById("custom-tooltip2");
    tooltip.style.display = "none";
}

function dragRunner(event, runner, onDrag) {
    event.preventDefault();

    const sliderWidth = runner.parentElement.offsetWidth;
    const minPosition = 0;
    let maxPosition;
    if (runner === customRunner1) {
        maxPosition = position2 - runner.offsetWidth;
    } else {
        maxPosition = sliderWidth - runner.offsetWidth;
    }

    const startX = event.clientX - runner.getBoundingClientRect().left;

    document.onmousemove = (e) => {
        let newPosition =
            ((e.clientX -
                    startX -
                    runner.parentElement.getBoundingClientRect().left) /
                sliderWidth) *
            100;
        newPosition = Math.min(Math.max(newPosition, minPosition), maxPosition);
        runner.style.left = newPosition + "%";
        onDrag(newPosition);
    };

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
    };
}

document.addEventListener("DOMContentLoaded", function () {
    var allYearsBlock = document.querySelector('.all-years-block');
    var allMonthsBlock = document.querySelector('.all-months-block');

    allYearsBlock.style.display = 'block';
    allMonthsBlock.style.display = 'none';

    function showYears() {
        allYearsBlock.style.display = 'block';
        allMonthsBlock.style.display = 'none';
    }

    function showMonths() {
        allYearsBlock.style.display = 'none';
        allMonthsBlock.style.display = 'block';
    }

    document.querySelector('.all-years-block-btn button').addEventListener('click', showYears);
    document.querySelector('.all-months-block-btn button').addEventListener('click', showMonths);
});