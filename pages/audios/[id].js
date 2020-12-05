import React, { useState } from "react";
import recordAudio from "../../utilities/Recorder";

export default function RecordVideo() {
  const [wav, setWav] = useState();
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  async function Procesar(){
    const recorder = await recordAudio();
    recorder.start();
    await sleep(3000);
    const audio = await recorder.stop();
    audio.play();
    audio.stream.getTracks().forEach((track) => track.stop());
    setWav(audio.audioUrl)
  };

  return (
    <div>
      <h1>Hola</h1>
      <button onClick={()=>Procesar()}>GRABAR</button>
      <audio src={wav} controls></audio>
    </div>
  );
}
