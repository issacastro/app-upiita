import React from "react";
import Layout from "../../layouts/layout";
import CardBarChart from "components/Cards/CardBarChart";
import CardBarsSNR from "components/Cards/CardBarSNR";
import Cookies from 'universal-cookie';

export default function Resultado({ data,data2 }) {
  var labels = [];
  var predictions = []; //Con cancelacion de ruido
  var predictionsN = []; //Con Ruido
  var Country = "";
  var Porcent = 0;
  var analisis = data.Data;

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
  var DataMN = Vectors[0]
  var DataCN = Vectors[1]
  var M = Math.max(...DataM);
  var C = Math.max(...DataC)
  console.log(M);
  console.log(C);
  if(M>C){
    Country = "Mexico";
    Porcent = M;
  }else{
    Country = "Colombia";
    Porcent = C;
  }
  
  return (
    <Layout data={data2}>
      <div>
        <div className="w-full  flex-3 text-center">
          <div className="flex flex-wrap mb-5">
            <div className="w-full px-4 flex-1"></div>

            <div className="w-full px-4 flex-1">
              <h2 className="text-gray-800 text-xl font-bold">Resultados</h2>
              <img
                className="mx-auto"
                src={require(`assets/img/banderas/${Country}.svg`)}
                width="150"
                height="200"
              />
              <h2 className="text-red-800 text-xl font-bold">{Porcent.toFixed(4)} %</h2>
            </div>

            <div className="w-full px-4 flex-1"></div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full px-4 flex-1">
              <>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h1 className="text-gray-800 text-xl font-bold text-center">
                          Procesamiento de voz
                        </h1>
                        <div className="flex flex-wrap">
                          <div className="w-full px-4 flex-1">
                            <div>
                              <img
                                className="mx-auto"
                                src={data.Voice}
                                width="500"
                                height="600"
                              />
                              <div className="w-full px-3">
                                <audio
                                  className="mx-auto"
                                  src={data.Audio}
                                  controls
                                />
                              </div>
                            </div>
                          </div>
                          <div className="w-full px-4 flex-1">
                            <div>
                              <img
                                className="mx-auto"
                                src={data.VoiceProcessing}
                                width="500"
                                height="600"
                              />
                              <div className="w-full px-3">
                                <audio
                                  className="mx-auto"
                                  src={data.NoiseReduction}
                                  controls
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <CardBarsSNR
                          SNR1={data.SNR1}
                          SNR2={data.SNR2}
                          Test={data.Test}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
            <div className="w-full px-4 flex-1">
              <CardBarChart title="Sin reducción de ruido" labels = {labels} DataM = {DataM} DataC = {DataC} />
              <CardBarChart title="Con reducción de ruido" labels = {labels} DataM = {DataMN} DataC = {DataCN} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  /* const res = await fetch(`http://127.0.0.1:5000/analisis/${ctx.params.id}`); */
  const res = await fetch(`https://www.upiita.ml/analisis/${ctx.params.id}`);
  const data = await res.json();
  const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null)
  var data2 = await cookies.get("mySession")
  if(data2==null){
    data2 = new Object();
    data2.email="admin@upiita.com"
    data2.name="no-login"
  }
  // Pass data to the page via props
  return { props: { data,data2 } };
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

