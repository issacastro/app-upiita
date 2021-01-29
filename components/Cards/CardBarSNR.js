import React from "react";
import Chart from "chart.js";

export default function CardBarChart(props) {
  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: ["Antes", "Después"],
        datasets: [
          {
            label: props.Test,
            backgroundColor: "#03DAC6",
            borderColor: "#03DAC6",
            data: [props.SNR1, props.SNR2],
            fill: false,
            barThickness: 80,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "SNRdB",
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
                labelString: "Señal",
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
                labelString: "dB",
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
    let ctx = document.getElementById("snr-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="rounded-t  px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="text-gray-800 text-xl font-semibold text-center">
              Relación señal a rudio
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full max-w-sm mx-auto ">
        {/* Chart */}
        <div className="relative h-350-px">
          <canvas id="snr-chart"></canvas>
        </div>
      </div>
    </>
  );
}
