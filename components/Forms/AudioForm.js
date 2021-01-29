import React, { useState } from "react";
import recordAudio from "../../utilities/Recorder";
import useSound from "use-sound";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";
import { useRouter } from 'next/router'
import { useStopwatch } from "react-timer-hook";

var blobs = [];
export default function Form() {
  const router = useRouter();
  const audios = 11;
  var prhases = [
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
        ¡ Hemos terminado !
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
    blobs.push(blobToFile(audio.audioBlob));
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
          <p>Enviando</p>
        </span>
      </div>
    );
    ReactDOM.render(enviando, document.getElementById("enviar"));
    var form = new FormData();
    form.append("name", data.name);
    form.append("gender", data.gender);
    form.append("country", data.country);
    form.append("old", data.old);
    form.append("user", props.data.email);
    blobs.forEach((blob, i) => {
      form.append("file", blob, `${data.name + (i + 1).toString()}.wav`);
    });
/*     const res = await fetch("http://127.0.0.1:5000/upload", {
      mode: "cors",
      method: "POST",
      body: form,
    }); */
const res = await fetch("https://www.upiita.ml/upload", {
      mode: "cors",
      method: "POST",
      body: form,
    });
    const register = await res.json();
    console.log(register._id.$oid);
    blobs = [];
    document.getElementById("Audios").reset()
    setEnviar(0);
    router.push("/")
  }

  // DATOS DEL FORMULARIO
  const [data, setData] = useState({
    name: "",
    gender: "",
    country: "Pais",
    old: "",
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
          if (count == audios) {
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
            src={require(`assets/img/banderas/${data.country}.svg`)}
            alt="Banderas"
          />
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  htmlFor="grid-password"
                >
                  Nombre
                </label>
                <input
                  name="name"
                  onClick={handleClick}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow-outline "
                  id="grid-password"
                  type="text"
                  placeholder="¿ Cómo te llamas ?"
                  required
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                htmlFor="grid-state"
              >
                Género
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
                    Selecciona género
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
                País
              </label>
              <div className="relative">
                <select
                  name="country"
                  onClick={handleClick}
                  onChange={handleChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-100 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:outline-none focus:shadow-outline "
                  required
                >
                  <option disabled selected>
                    Selecciona país
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  htmlFor="grid-password"
                >
                  Edad
                </label>
                <input
                  name="old"
                  onClick={handleClick}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow-outline "
                  id="grid-password"
                  type="number"
                  placeholder="¿ Cuántos años tienes ?"
                  required
                />
              </div>
            </div>

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

              {seconds == 0 ? (
                <small className="inline-block text-xs text-muted justify-center text-gray-500 mb-3">
                  Cuando des clic en el microfono se empezará a grabar el
                  audio, por favor di la frase en color rojo, no importa si no
                  alcanzas a decir la completa, lo importante es tener tu acento.
                </small>
              ) : (
                <div></div>
              )}
              <span className="text-sm font-semibold inline-block py-1 px-2  rounded text-red  uppercase last:mr-0  mb-3 text-red-500 mr-2">
                {prhases[count]}
              </span>

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
                  Enviar
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
