const runner1 = document.getElementById("runner1");
const runner2 = document.getElementById("runner2");
const filled = document.getElementById("filled");

let position1 = 0;
let position2 = 100;
updateRunnerPosition(runner1, position1);
updateRunnerPosition(runner2, position2);
updateFilled();

runner1.addEventListener("mousedown", (e) => {
    dragRunner(e, runner1, (newPosition) => {
        position1 = newPosition;
        position1 = Math.min(position1, position2);
        updateRunnerPosition(runner1, position1);
        updateFilled();
        updateLabels();
    });
});

runner2.addEventListener("mousedown", (e) => {
    dragRunner(e, runner2, (newPosition) => {
        position2 = newPosition;
        position2 = Math.max(position2, position1);
        updateRunnerPosition(runner2, position2);
        updateFilled();
        updateLabels();
    });
});

runner1.addEventListener("mousemove", (e) => {
    showTooltip(e, runner1, position1);
});

runner2.addEventListener("mousemove", (e) => {
    showTooltip(e, runner2, position2);
});

runner1.addEventListener("mouseout", () => {
    hideTooltip(runner1);
});

runner2.addEventListener("mouseout", () => {
    hideTooltip(runner2);
});

function updateRunnerPosition(runner, position) {
    runner.style.left = position + "%";
}

function updateFilled() {
    filled.style.left = position1 + "%";
    filled.style.width = position2 - position1 + "%";
}

function showTooltip(event, runner, position) {
    const tooltip =
        runner === runner1
            ? document.getElementById("tooltip1")
            : document.getElementById("tooltip2");
    const minYear = 2015;
    const maxYear = 2017;
    const range = maxYear - minYear;
    const year = Math.floor(minYear + position / (100 / range));
    const month = Math.floor(
        (position % (100 / range)) / ((100 / range) / 12)
    );

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

    const monthName = monthNames[month];
    tooltip.textContent = `${monthName} ${year}`;
    updateTooltipPosition(runner, position);
    tooltip.style.display = "block";
}

function hideTooltip(runner) {
    const tooltip =
        runner === runner1
            ? document.getElementById("tooltip1")
            : document.getElementById("tooltip2");
    tooltip.style.display = "none";
}

function dragRunner(event, runner, onDrag) {
    event.preventDefault();

    const sliderWidth = runner.parentElement.offsetWidth;
    const minPosition = 0;
    let maxPosition;
    if (runner === runner1) {
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
        newPosition = Math.min(
            Math.max(newPosition, minPosition),
            maxPosition
        );
        runner.style.left = newPosition + "%";
        onDrag(newPosition);
    };

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
    };
}

function updateTooltipPosition(runner, position) {
    const tooltip =
        runner === runner1
            ? document.getElementById("tooltip1")
            : document.getElementById("tooltip2");
    const runnerWidth = runner.offsetWidth;
    const sliderWidth = runner.parentElement.offsetWidth;
    const tooltipWidth = tooltip.offsetWidth;
    const newPosition =
        (position / 100) * (sliderWidth - runnerWidth) +
        runnerWidth / 2 -
        tooltipWidth / 2;
    tooltip.style.left = newPosition + "px";
}