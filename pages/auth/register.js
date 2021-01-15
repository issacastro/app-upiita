import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'universal-cookie';

// layout for page

import Auth from "layouts/Auth.js";

export default function Register() {
  const cookies = new Cookies();
  const router = useRouter();
  const [message, setMessage] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  async function register(e){
    e.preventDefault();
    var form = new FormData();
    form.append("name", data.name);
    form.append("email", data.email);
    form.append("password", data.password);
/*     const res = await fetch("http://127.0.0.1:5000/register", {
      mode: "cors",
      method: "POST",
      body: form,
    }); */
 const res = await fetch("https://www.upiita.ml/register", {
      mode: "cors",
      method: "POST",
      body: form,
    }); 
    const register = await res.json();
    console.log(register);
    if (register.email == data.email) {
      let d = new Date();
      let minutes = 120
      d.setTime(d.getTime() + (minutes*60*1000));
      cookies.remove('mySession')
      cookies.set('mySession', register, { path: '/' , expires: d });
      document.getElementById("register").reset();
      router.push(`/profile`);
    }
    else {
      setMessage(true)
    }
  }
  return (
    <div>
      <div className="container mx-auto px-4 h-full py-10">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <Link href="/">
                    <img
                      alt="..."
                      className="mx-auto"
                      src={require("assets/img/upiita.png")}
                      width="110"
                      height="150"
                    />
                  </Link>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={register} id="register">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nombre
                    </label>
                    <input
                      name="name"
                      type="text"
                      onChange={handleChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Nombre de usuario"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Correo
                    </label>
                    <input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Correo"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contraseña
                    </label>
                    <input
                      name="password"
                      type="password"
                      onChange={handleChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Contraseña"
                      required
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Crear cuenta
                    </button>
                    {message ? (
                      <>
                        <small className="text-sm font-bold text-red  uppercase text-red-500 ">Usuario ya registrado</small>
                      </>
                    )
                      :
                      (
                        <>
                        </>)
                    }
                    <Link href="/auth/login">
                      <a className="block uppercase text-gray-700 text-xs font-bold mb-2 text-right">
                        <small>Iniciar sesion</small>
                      </a>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.layout = Auth;
