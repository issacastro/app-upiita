import React from "react";
import PropTypes from "prop-types";

export default function CardStats(props) {
  var reg = props.data;
  var statArrow;
  var statPercentColor;
  var statIconColor;
  var statIconName= "fas fa-chart-pie"

  if(reg.SNR1>reg.SNR2){
    statPercentColor="text-red-500";
    statArrow="down";
  }else{
    statPercentColor="text-green-500";
    statArrow="up"
  }

  var labels = [];
  var predictions = []; //Con cancelacion de ruido
  var predictionsN = []; //Con Ruido
  var Country = "";
  var Porcent = 0;
  var analisis = reg.Data;

  analisis.forEach(result => {
    labels.push(result.ANN)
    predictions.push({"ANN":result.ANN,"Feature":result.Feature,"Country":result.countryN,"Porcent":result.N})
    predictionsN.push({"ANN":result.ANN,"Feature":result.Feature,"Country":result.countryWNR,"Porcent":result.WNR})
    
  });
  //Ordenamos los datos por tipo de red neuronal
  labels.sort((a,b)=> a.length-b.length)
  predictions.sort((a,b)=>a.ANN.length-b.ANN.length)
  predictionsN.sort((a,b)=>a.ANN.length-b.ANN.length)
  
// Generamos los vectores para presentar la informacion 
  var Vectors = DataSet(predictions);
  var DataM = Vectors[0]
  var DataC = Vectors[1]

  var Vectors = DataSet(predictionsN);
  var M = Math.max(...DataM);
  var C = Math.max(...DataC)

  if(M>C){
    Country = "México";
    Porcent = M;
  }else{
    Country = "Colombia";
    Porcent = C;
  }
if(Porcent>80){
  statIconColor="bg-green-500";
}else if(Porcent<80 && Porcent>70)
{
  statIconColor="bg-orange-500";
}else{
  statIconColor="bg-red-500";
}


  return (
    <div>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg px-4 py-4 mb-4">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-gray-500 uppercase font-bold text-xs">
                {reg.Test} 
              </h5>
              <span className="font-semibold text-xl text-gray-800">
                {Country} <small>{Porcent.toFixed(2)+"%"}</small>
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <span className={statPercentColor + " mr-2"}>
              <i
                className={
                  statArrow === "up"
                    ? "fas fa-arrow-up"
                    : statArrow === "down"
                    ? "fas fa-arrow-down"
                    : ""
                }
              ></i>{" "}
              {reg.SNR2.toFixed(4)} dB
            </span>
            <span className="whitespace-no-wrap">{"SNR"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function DataSet(predict) {
  const accuary = [0.75171,0.51773,0.51986,0.93971,0.93972]
  var DataM=[];
  var DataC=[];
  for (let index = 0; index < predict.length; index++) {

    if(predict[index].Country == "Mexico"){
      DataM.push(predict[index].Porcent*accuary[index])
      DataC.push(100-predict[index].Porcent*accuary[index])}

    if(predict[index].Country == "Colombia"){
      DataC.push(predict[index].Porcent*accuary[index])
      DataM.push(100-predict[index].Porcent*accuary[index])}
  }
return [DataM,DataC]
  
}