import React from "react";

export default function Auth({ children }) {
  return (
    <>
      <main>
        <section className="w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png") + ")",
            }}
          ></div>
          {children}
        </section>
      </main>
    </>
  );
}
