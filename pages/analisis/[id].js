import React from "react";
import Layout from "../../layouts/layout";
import CardBarChart from "components/Cards/CardBarChart";
import CardBarsSNR from "components/Cards/CardBarSNR";

export default function Resultado({ data }) {
  const analisis = data.Data;
  analisis.forEach((element) => {
    console.log(element.countryN);
  });
  return (
    <Layout>
      <div className="mx-auto px-3">
        <div className="w-full px-4 flex-3 text-center">
          <div className="flex flex-wrap mb-5">
            <div className="w-full px-4 flex-1"></div>

            <div className="w-full px-4 flex-1">
              <h2 className="text-gray-800 text-xl font-bold">Resultados</h2>
              <img
                className=" mx-auto sm:mx-0 sm:flex-shrink-0 h-20 sm:h-24 "
                src={require(`assets/img/banderas/Mexico.svg`)}
                alt="Banderas"
              />
              <h2 className="text-red-800 text-xl font-bold">88%</h2>
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
                              <audio
                                className="mx-auto"
                                src={data.Audio}
                                controls
                              ></audio>
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
                              <audio
                                className="mx-auto"
                                src={data.NoiseReduction}
                                controls
                              ></audio>
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
              <CardBarChart />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  // Fetch data from external API
 /*  const res = await fetch(`http://127.0.0.1:5000/analisis/${params.id}`); */
  const res = await fetch(`http://35.239.225.221:5000/analisis/${params.id}`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
