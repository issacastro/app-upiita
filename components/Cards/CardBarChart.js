import React from "react";
import Chart from "chart.js";

export default function CardBarChart(props) {
  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: props.labels,
        datasets: [
          {
            label: "México",
            backgroundColor: "#00C853",
            borderColor: "#00C853",
            data: props.DataM,
            fill: false,
            barThickness: 10,
          },
          {
            label: "Colombia",
            fill: false,
            backgroundColor: "#FEF200",
            borderColor: "#FEF200",
            data: props.DataC,
            barThickness: 10,
          },
/*           {
            label: "Argentina",
            fill: false,
            backgroundColor: "#00A8F3",
            borderColor: "#00A8F3",
            data: [70, 60, 44, 74, 46],
            barThickness: 10,
          }, */
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: props.title,
        },
        tooltips: {
          mode: "index",
          intersect: true,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Tipo",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Accuary",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById(`bar-chart-${props.title}`).getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-gray-800 text-xl font-bold text-center">
                Redes Neuronales
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id={`bar-chart-${props.title}`}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
