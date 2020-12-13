import React, { useState, useRef } from "react";
import recordAudio from "../../utilities/Recorder";
import useSound from "use-sound";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import { useStopwatch } from "react-timer-hook";

var blobs;
var blobs_noise;
const number = Math.floor(Math.random() * (10 - 1)) + 1;
export default function Form() {
  const router = useRouter();
  const audios = 2;
  const inputFile = useRef(null);
  var prhases = [
    "Graba tu ruido de fondo",
    "¿Cuál es la diferencia de este gobierno?",
    "Avancemos con el resto de las opciones.",
    "Todo sobre la guerra contra el terrorismo.",
    "Realización de programas de radio y televisión.",
    "Los principales vestigios arqueológicos que se localizan en el estado de Campeche son",
    "Gracias a todos los que nos apoyan asistiendo a los conciertos.",
    "Los aumentos en el costo de la energía afectarán a tu bolsillo.",
    "¿Por qué no se puede realizar el aborto?",
    "Introduzca su nombre de usuario y contraseña, y pulse el botón",
    "Recopilación de firmas en contra de la extrema derecha de Austria.",
    "Ahora di lo que tu quieras (en serio jaja) 🔥",
  ];
  const element = (
    <div>
      <span className="text-xs font-bold inline-block py-1 px-2  rounded-full text-green-600 bg-green-200  last:mr-0 mr-1">
        ¡ Hemos terminado de guardar tus audios !
      </span>
      <br />
      😎
    </div>
  );
  const [wav, setWav] = useState();
  const [flag, setFlag] = useState(false);
  const [final, setFinal] = useState(false);
  const [count, setCount] = useState(0);
  const [enviar, setEnviar] = useState(0);
  const { seconds, start, pause, reset } = useStopwatch({ autoStart: false });

  //Funcion para Grabar Audios
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  async function Procesar() {
    setFlag(false);
    const recorder = await recordAudio();
    recorder.start();
    await sleep(6000);
    const audio = await recorder.stop();
    //audio.play();
    audio.stream.getTracks().forEach((track) => track.stop());
    setWav(audio.audioUrl);
    setFlag(true);
    if (count == 0) blobs_noise = blobToFile(audio.audioBlob);
    blobs = blobToFile(audio.audioBlob);
  }

  //Mandar audios

  async function sendAudios() {
    setEnviar(1);
    const enviando = (
      <div>
        <span className="text-xs font-semibold inline-block  uppercase  last:mr-1 mr-2 mb-2">
          <ReactLoading
            type={"bubbles"}
            color={"#1A202C"}
            height={"100%"}
            width={"100%"}
          />
          <p>Analizando</p>
        </span>
      </div>
    );
    ReactDOM.render(enviando, document.getElementById("enviar"));
    var form = new FormData();
    form.append("name", data.name);
    form.append("gender", data.gender);
    form.append("type", data.type);
    form.append("file", blobs, `${data.name + "file".toString()}.wav`);
    if (data.type == "Grabar")
      form.append("file", blobs_noise, `${data.name + "noise".toString()}.wav`);

/*     const res = await fetch("http://127.0.0.1:5000/analisis", {
      mode: "cors",
      method: "POST",
      body: form,
    }); */
    const res = await fetch("https://www.upiita.ml/analisis", {
      mode: "cors",
      method: "POST",
      body: form,
    });
    const register = await res.json();
    blobs = [];
    document.getElementById("Audios").reset();
    setEnviar(0);
    router.push(`/analisis/${register._id.$oid}`);
  }

  // DATOS DEL FORMULARIO
  const [data, setData] = useState({
    name: "",
    gender: "",
    type: "voz",
  });
  //FUNCION PARA CONVERTIR BLOB A FILE
  function blobToFile(theBlob) {
    theBlob.lastModifiedDate = new Date();
    return theBlob;
  }
  //FUNCION PARA GUARDAR DATOS
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  //Funciones para efectos
  const soundUrlkey = "sounds/key.mp3";
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const [play1] = useSound(soundUrlkey, {
    playbackRate,
    volume: 0.1,
  });

  const handleClick = () => {
    setPlaybackRate(playbackRate + 0.1);
    play1();
  };

  const soundUrlpop = "sounds/pop.mp3";
  const [play, { stop }] = useSound(soundUrlpop, { volume: 0.1 });
  const [isHovering, setIsHovering] = useState(false);

  const soundUrlrecord1 = "sounds/record1.mp3";
  const [playbackRate1, setPlaybackRate1] = useState(0.75);
  const [play2] = useSound(soundUrlrecord1, {
    playbackRate1,
    volume: 0.1,
  });

  const handleClickRecord1 = () => {
    setPlaybackRate1(playbackRate1 + 0.1);
    play2();
  };

  const soundUrlrecord2 = "sounds/record2.mp3";
  const [playbackRate2, setPlaybackRate2] = useState(0.75);
  const [play3] = useSound(soundUrlrecord2, {
    playbackRate2,
    volume: 0.1,
  });

  const handleClickRecord2 = () => {
    setPlaybackRate2(playbackRate2 + 0.1);
    play3();
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <form
        id="Audios"
        className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        onSubmit={async (e) => {
          e.preventDefault();
          if (count == audios || (count==1 && data.type=="Adjuntar")) {
            if (enviar == 0) await sendAudios();
            setFinal(true);
          } else {
            setFinal(true);
          }
        }}
      >
        <div className="sm:flex sm:items-center px-6 py-4">
          <p className="text-xl leading-tight  text-center ">
            Speech Accent Recognition
          </p>
          <img
            className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24 "
            src={require(`assets/img/icons/${data.type}.svg`)}
            alt="Banderas"
          />
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  htmlFor="grid-password"
                >
                  Test
                </label>
                <input
                  name="name"
                  onClick={handleClick}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow-outline "
                  id="grid-password"
                  type="text"
                  placeholder="Nombre del test"
                  required
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                htmlFor="grid-state"
              >
                Genero
              </label>
              <div className="relative">
                <select
                  name="gender"
                  onClick={handleClick}
                  onChange={handleChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:outline-none focus:shadow-outline "
                  required
                >
                  <option disabled selected>
                    Selecciona genero
                  </option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                </select>
              </div>
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                htmlFor="grid-state"
              >
                Entrada
              </label>
              <div className="relative">
                <select
                  name="type"
                  onClick={handleClick}
                  onChange={handleChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-100 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:outline-none focus:shadow-outline "
                  required
                >
                  <option disabled selected>
                    Grabacion / Archivo
                  </option>
                  <option value="Grabar">Grabacion</option>
                  <option value="Adjuntar">Archivo</option>
                </select>
              </div>
            </div>
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              accept="audio/wav"
              onInput={async () => {
                setFlag(false);
                start();
                var sound = URL.createObjectURL(
                  document.getElementById("file").files[0]
                );
                setWav(sound);
                var blob = await fetch(sound).then((r) => r.blob());
                blobs = blobToFile(blob);
                await sleep(6000);
                setCount(count + 1);
                pause();
                reset();
                if (count == audios - 1)
                  ReactDOM.render(element, document.getElementById("enviar"));
                setFlag(true);
              }}
            />

            {data.type == "Grabar" ? (
              <div id="enviar">
                <div className="rounded-full h-16 w-16 flex mx-auto sm:mx-0 sm:flex-shrink-0  sm:h-24">
                  <button
                    onClick={async () => {
                      setFinal(false);
                      start();
                      handleClickRecord1();
                      await Procesar();
                      handleClickRecord2();
                      setCount(count + 1);
                      pause();
                      reset();
                      if (count == audios - 1)
                        ReactDOM.render(
                          element,
                          document.getElementById("enviar")
                        );
                    }}
                    className="bg-red-600 text-white active:bg-gray-100 active:text-gray font-bold uppercase  rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-3 mb-3 w-full ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i className="fas fa-microphone-alt"></i>
                  </button>
                </div>

                {seconds == 0 ? (
                  <div></div>
                ) : (
                  <div>
                    <span className="text-xs font-semibold inline-block  uppercase  last:mr-1 mr-2 mb-2">
                      <ReactLoading
                        type={"bars"}
                        color={"#E53E3E"}
                        height={"100%"}
                        width={"100%"}
                      />
                      <p className=" py-1 px-2 rounded text-red-600 bg-red-200">
                        00:0{seconds}
                      </p>
                    </span>
                  </div>
                )}

                {seconds == 0 && count != 0 ? (
                  <small className="inline-block text-xs text-muted justify-center text-gray-500 mb-3">
                    Cuando des click en el boton se empezara a grabar el audio,
                    porfavor di la frase en color rojo, no importa si no
                    alcanzas a decir la completa, lo importante es tener tu
                    acento
                  </small>
                ) : (
                  <div></div>
                )}
                {count == 0 ? (
                  <div>
                    <small className="inline-block text-xs text-muted justify-center text-gray-500 mb-3">
                      Primero grabaremos el ruido de fondo, guarda silencio y
                      toca el boton cuando estes listo para empezar
                    </small>
                    <span className="text-sm font-semibold inline-block py-1 px-2  rounded text-red  uppercase last:mr-0  mb-3 text-green-500 mr-2">
                      {prhases[0]}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-sm font-semibold inline-block py-1 px-2  rounded text-red  uppercase last:mr-0  mb-3 text-red-500 mr-2">
                      {prhases[number]}
                    </span>
                  </div>
                )}
                {flag ? (
                  <div className="flex flex-wrap mx-3 mb-3">
                    <div className="w-full px-3">
                      <audio src={wav} controls></audio>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

                {final ? (
                  <div>
                    <span className="text-xs font-bold inline-block py-1 px-2  rounded-full text-red-600 bg-red-200  last:mr-0 mr-1">
                      ¡ Aun faltan datos !
                    </span>
                    <br />
                    😝
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}

            {data.type == "Adjuntar" ? (
              <div id="enviar">
                <div className="rounded-full h-16 w-16 flex mx-auto sm:mx-0 sm:flex-shrink-0  sm:h-24">
                  <button
                    onClick={async () => {
                      setFinal(false);
                      handleClick();
                      inputFile.current.click();
                    }}
                    className="bg-blue-600 text-white active:bg-gray-100 active:text-gray font-bold uppercase  rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-3 mb-3 w-full ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i className="fas fa-paperclip"></i>
                  </button>
                </div>

                {seconds == 0 ? (
                  <div></div>
                ) : (
                  <div>
                    <span className="text-xs font-semibold inline-block  uppercase  last:mr-1 mr-2 mb-2">
                      <ReactLoading
                        type={"cylon"}
                        color={"#3182CE"}
                        height={"100%"}
                        width={"100%"}
                      />
                      <p className=" py-1 px-2 rounded text-blue-600 bg-blue-200">
                        Subiendo
                      </p>
                    </span>
                  </div>
                )}

                {seconds == 0 ? (
                  <small className="inline-block text-xs text-muted justify-center text-gray-500 mb-3">
                    Puedes subir un archivo wav que solo contenga una señal de
                    voz con una frecuencia de muestreo de al menos 8 KHz.
                  </small>
                ) : (
                  <div></div>
                )}
                {flag ? (
                  <div className="flex flex-wrap mx-3 mb-3">
                    <div className="w-full px-3">
                      <audio src={wav} controls></audio>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

                {final ? (
                  <div>
                    <span className="text-xs font-bold inline-block py-1 px-2  rounded-full text-red-600 bg-red-200  last:mr-0 mr-1">
                      ¡ Aun faltan {audios - count} audios !
                    </span>
                    <br />
                    😝
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}

            {enviar == 0 ? (
              <div className="text-center mt-2 mb-3">
                <button
                  onMouseEnter={() => {
                    setIsHovering(true);
                    play();
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    stop();
                  }}
                  className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Analizar
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};


