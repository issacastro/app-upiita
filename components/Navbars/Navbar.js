import React from "react";
import Link from "next/link";
export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState();
  var log;
  if(props.login.name!=="no-login")  {
  log = true; }
  else{
  log=false}
  
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-900 mb-3">
        <div className="mx-auto w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link href="/">
            <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
              PROYECTO TERMINAL
            </a>
          </Link>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <Link href="/audios">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="fas fa-microphone text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Audios</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/analisis">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="fas fa-brain text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Analisis</span>
                </a>
              </Link>
            </li>
            {log ? (
              <div>
                <li className="nav-item">
                  <Link href="/profile">
                    <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                      <i className="fas fa-id-badge text-lg leading-lg text-white opacity-75"></i>
                      <span className="ml-2">Perfil</span>
                    </a>
                  </Link>
                </li>
              </div>

            ) : (
                <div>
                  <li className="nav-item">
                    <Link href="/auth/login">
                      <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                        <i className="fas fa-sign-in-alt text-lg leading-lg text-white opacity-75"></i>
                        <span className="ml-2">Login</span>
                      </a>
                    </Link>
                  </li>
                </div>

              )}
          </ul>
        </div>
      </nav>
    </>
  );
}
