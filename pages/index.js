import React from "react";
import Layout from "../layouts/layout";

export default function Index() {
  return (
    <Layout>
      <div className="container mx-auto px-3 py-3">
        <h1 className="text-5xl font-normal leading-norma text-gray-800">
          IPN - UPIITA
        </h1>
        <h3 className="text-4xl font-normal leading-normal mt-0 mb-2 text-gray-800">
          Sistema de identificación de variedad del lenguaje español
        </h3>
        <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
          En este proyecto se desarrollará un sistema que identifique
          automáticamente la variación fonética del lenguaje español,
          permitiendo deducir la nacionalidad de hablantes pertenecientes a
          México, Argentina y Colombia utilizando técnicas de procesamiento
          digital de señales, y redes neuronales como técnica de clasificación
          de las características de voz. Se usará un corpus construido con
          archivos de audio de países para entrenar al sistema. La técnica
          mayormente utilizada para identificar a un autor analiza directamente
          de un texto cómo se expresa dicho autor , esto implica que en algunas
          ocasiones se tenga que realizar una transcripción audio a texto. Lo
          que se busca en este proyecto es que mediante las características
          fonéticas de las señales de voz se logre esta identificación.
        </p>

        <div className="flex flex-wrap justify-center">
          <img
            src="/Sistema.png"
            alt="Sistema"
            width="855"
            height="262"
            className="max-w-full h-auto align-middle"
          />
        </div>
        <h5 className="text-2xl font-bold leading-normal mt-0 mb-2 text-gray-800">
          Palabras claves
        </h5>
        <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
          Reconocimiento de voz, procesamiento digital de señales, redes
          neuronales, variedad del lenguaje español, perfilado de usuario.
        </p>
        <h4 className="text-2xl font-bold leading-normal mt-0 mb-2 text-gray-800">
          Objetivo general{" "}
        </h4>
        <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
          Desarrollar un sistema de identificación de variedad del lenguaje
          español hablado en México, Argentina y Colombia mediante el
          procesamiento de voz y redes neuronales para estimar la nacionalidad
          del hablante.
        </p>
        <h5 className="text-2xl font-bold leading-normal mt-0 mb-2 text-gray-800">
          Objetivos específicos{" "}
        </h5>

        <ul className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
          <li>
            1.Construir la base de conocimiento de audios para los tres países:
            México, Argentina y Colombia
          </li>
          <li>
            2.Digitalizar y optimizar la señal de voz de entrada mediante
            técnicas de filtrado para poder lograr un mejor resultado en la
            extracción de características de la voz.
          </li>
          <li>
            3.Diseñar e implementar un sistema para la extracción de
            características de la voz mediante el procesamiento digital de
            señales para su clasificación.
          </li>
          <li>
            4.Diseñar e implementar un sistema de clasificación por
            características de la señal digital de voz basados en redes
            neuronales tipo LSTM.
          </li>
          <li>
            5.Diseñar e implementar un sistema de clasificación por
            características de la señal digital de voz basados en redes
            neuronales tipo LSTM y CNN.
          </li>
          <li>
            6.Diseñar e implementar un sistema de clasificación por
            características de la señal digital de voz basados en redes
            neuronales tipo BiLSTM.
          </li>
          <li>
            7.Diseñar e implementar un sistema de clasificación por
            características de la señal digital de voz basados en redes
            neuronales tipo BiLSTM y CNN.
          </li>
          <li>8.Evaluar el desempeño de cada configuración de red neuronal.</li>
        </ul>
      </div>
    </Layout>
  );
}
