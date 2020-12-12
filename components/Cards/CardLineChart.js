import React from "react";
import Chart from "chart.js";

export default function CardLineChart(props) {
  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: props.x,
        datasets: [
          {

            borderColor: "#4c51bf",
            data: props.y,
            fill: false,
            label : "Voz",
          },
        ],

      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "blue",
        },
        legend: {
          labels: {
            fontColor: "blue",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "blue",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {

              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "blue",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },

    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
     
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-gray-800 mb-1 text-xs font-semibold">
                Señal procesada
              </h6>
              <h2 className="text-gray text-xl font-semibold">Señal de voz</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
    </>
  );
}
