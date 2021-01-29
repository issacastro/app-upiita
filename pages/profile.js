import React, { useState } from "react";
import Navbar from "components/Navbars/AuthNavbar";
import CardStats from "components/Cards/CardStats";
import Link from "next/link";
import Cookies from 'universal-cookie';
import { useRouter } from "next/router";
import useSound from "use-sound";



export default function Profile({ data, cook, audios }) {
  const cookies = new Cookies();
  const router = useRouter();
  //Funciones para efectos
  const soundUrlpop = "sounds/pop.mp3";
  const [play, { stop }] = useSound(soundUrlpop, { volume: 0.1 });
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={require("assets/img/user.jpg")}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <Link href="/analisis">
                      <button
                        className="bg-gray-800 active:bg-gray-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 hover:shadow-lg"
                        type="button"
                        onMouseEnter={() => {
                          setIsHovering(true);
                          play();
                        }}
                        onMouseLeave={() => {
                          setIsHovering(false);
                          stop();
                        }}
                      >
                        Analizar
                      </button>
                    </Link>
                    <Link href="/audios">
                      <button
                        className="bg-gray-800 active:bg-gray-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 hover:shadow-lg"
                        type="button"
                        onMouseEnter={() => {
                          setIsHovering(true);
                          play();
                        }}
                        onMouseLeave={() => {
                          setIsHovering(false);
                          stop();
                        }}
                      >
                        Audios
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        {data.length}
                      </span>
                      <span className="text-sm text-gray-500">Analisis</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        {audios.length}
                      </span>
                      <span className="text-sm text-gray-500">Audios</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center"
                      onClick={async () => {
                        await cookies.remove('mySession');
                        router.push("/")
                      }}
                    >
                      <small className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        <i className="fas fa-sign-out-alt"></i>
                      </small>
                      <span className="text-sm text-gray-500">Cerrar Sesión</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                  {cook.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold  mb-5">

                  "La Técnica al Servicio de la Patria"
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap">
            {data.map((element, index) =>
              <Link href={`/analisis/${element._id.$oid}`} key={`${element._id.$oid}1`}>
                <div key={element._id.$oid} className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-6 "
                  onMouseEnter={() => {
                    setIsHovering(true);
                    play();
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    stop();
                  }}
                >
                  <CardStats key={index} data={element} className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0" />
                </div>
              </Link>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null)
  var cook = await cookies.get("mySession")
  if (cook == null) {
    ctx.res.writeHead(302, { Location: '/auth/login' }).end()
  }
  // Fetch data from external API
  /*   const res = await fetch(`http://127.0.0.1:5000//history/${cook.email}`); */
  const res = await fetch(`https://www.upiita.ml//history/${cook.email}`);
  const data = await res.json();
  // Fetch data from external API
  /*   const res2 = await fetch(`http://127.0.0.1:5000//audios/${cook.email}`); */
  const res2 = await fetch(`https://www.upiita.ml//audios/${cook.email}`);
  const audios = await res2.json();
  return { props: { data, cook, audios } };

}

