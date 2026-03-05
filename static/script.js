let chart;

async function uploadFile() {
    const fileInput = document.getElementById("fileUpload");
    const formData = new FormData();

    formData.append("file", fileInput.files[0]);

    const response = await fetch("/upload", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    const columnSelect = document.getElementById("columnSelect");
    columnSelect.innerHTML = "";

    data.columns.forEach(col => {
        const option = document.createElement("option");
        option.value = col;
        option.text = col;
        columnSelect.appendChild(option);
    });
}

async function generateChart() {
    const column = document.getElementById("columnSelect").value;
    const chartType = document.getElementById("chartType").value;

    const response = await fetch(`/chart?column=${column}`);
    const data = await response.json();

    const ctx = document.getElementById("chartCanvas");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: data.labels,
            datasets: [{
                label: column,
                data: data.values
            }]
        }
    });
}
