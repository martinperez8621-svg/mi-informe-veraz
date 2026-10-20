import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import foto1 from "@/assets/celular-750.jpg.asset.json";
import foto2 from "@/assets/mujer-notebook.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mi Informe Veraz - PDF Personalizado" },
      { name: "description", content: "Informe Veraz personalizado en PDF con puntaje crediticio y análisis profesional. Entrega en 24hs." },
      { property: "og:title", content: "Mi Informe Veraz - PDF Personalizado" },
      { property: "og:description", content: "Informe Veraz con score y análisis profesional. Entrega en 24hs por mail." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [pagoIniciado, setPagoIniciado] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("veraz_intento_pago") === "si" || new URLSearchParams(window.location.search).get("pago") === "exitoso") {
      setPagoIniciado(true);
    }
  }, []);

  return (
    <div className="bg-white font-sans">
      {/* HERO */}
      <section className="max-w-[600px] mx-auto px-6 py-10 text-center">
        <h1 className="text-[32px] font-bold text-[#0F2C59] leading-tight">Informe Veraz Personalizado</h1>
        <h2 className="text-[18px] font-semibold text-[#0F2C59] mt-2">Con Puntaje Crediticio y Análisis Profesional</h2>
        <p className="text-[15px] text-gray-600 mt-4">
          Recibí tu informe completo en formato PDF con tu situación crediticia actual, tu score y antecedentes en centrales de riesgo, con interpretación profesional incluida.
        </p>
        <button
          onClick={() => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })}
          className="block w-full bg-[#00A650] text-white font-bold text-[18px] py-4 rounded-xl mt-6"
        >
          Comprar mi informe $15.000
        </button>
        <div className="flex justify-center gap-4 mt-3 text-[12px] text-gray-400">
          <span>🔒 Pago Seguro</span>
          <span>📧 Entrega 24hs</span>
          <span>🇦🇷 Ley 25.326</span>
        </div>
        <p className="text-[12px] text-gray-500 mt-2">Pago seguro por Mercado Pago - Entrega en 24hs por mail</p>
        <div className="mt-8">
          <img src={foto1.url} alt="Reporte Veraz Informe Crediticio 750" className="w-full rounded-2xl shadow-sm" />
        </div>
      </section>

      {/* QUE INCLUYE */}
      <section className="max-w-[600px] mx-auto px-6 py-8 bg-[#F5F7FA] rounded-2xl">
        <h3 className="text-[20px] font-bold text-[#0F2C59]">¿Qué incluye tu informe?</h3>
        <ul className="text-left mt-4 space-y-3 text-[15px] text-gray-700">
          <li><span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#00A650] text-white text-[12px] mr-2 align-middle">✓</span>PDF completo con situación en Veraz y centrales de riesgo</li>
          <li><span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#00A650] text-white text-[12px] mr-2 align-middle">✓</span>Puntaje crediticio (Score) actualizado</li>
          <li><span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#00A650] text-white text-[12px] mr-2 align-middle">✓</span>Detalle de entidades informantes, situación y fechas</li>
          <li><span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#00A650] text-white text-[12px] mr-2 align-middle">✓</span>Análisis profesional de tu caso</li>
          <li><span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#00A650] text-white text-[12px] mr-2 align-middle">✓</span>Asesoramiento para evaluar tu situación y alternativas para mejorar tu perfil</li>
        </ul>
      </section>

      {/* ASESORAMIENTO */}
      <section className="max-w-[600px] mx-auto px-6 py-10">
        <div>
          <img src={foto2.url} alt="Asesoramiento profesional" className="w-full rounded-2xl" />
        </div>
        <h3 className="text-[20px] font-bold text-[#0F2C59] mt-6">Incluye asesoramiento profesional</h3>
        <p className="text-[15px] text-gray-600 mt-2 text-left">
          No es el informe automático. Te entregamos el PDF interpretado y te asesoramos para evaluar tu situación y ver si podés mejorarla.
        </p>
      </section>

      {/* COMO FUNCIONA */}
      <section className="max-w-[600px] mx-auto px-6 py-8">
        <h3 className="text-[20px] font-bold text-[#0F2C59] text-center">¿Cómo lo obtengo?</h3>
        <div className="mt-6 space-y-4 text-left">
          <p><b className="text-[#0F2C59]">1.</b> Completás el formulario con tus datos</p>
          <p><b className="text-[#0F2C59]">2.</b> Realizás el pago seguro por Mercado Pago</p>
          <p><b className="text-[#0F2C59]">3.</b> Recibís tu informe en PDF en 24hs hábiles</p>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="formulario" className="max-w-[600px] mx-auto px-6 py-10">
        <form action="https://mpago.li/1WmwxjQ" className="space-y-4">
          <input type="text" placeholder="Nombre completo" className="w-full border p-3 rounded-xl" required />
          <input type="text" placeholder="DNI" className="w-full border p-3 rounded-xl" required />
          <input type="text" placeholder="CUIL" className="w-full border p-3 rounded-xl" required />
          <input type="tel" placeholder="WhatsApp" className="w-full border p-3 rounded-xl" required />
          <input type="email" placeholder="Email donde recibirás el PDF" className="w-full border p-3 rounded-xl" required />
          <button
            onClick={() => localStorage.setItem("veraz_intento_pago", "si")}
            className="w-full bg-[#00A650] text-white font-bold py-4 rounded-xl"
          >
            Enviar datos y pagar $15.000
          </button>
        </form>
        <div className="mt-10 border border-[#0F2C59] rounded-2xl p-5 text-center bg-white">
          <p className="text-[15px] font-bold text-[#0F2C59]">¿Tu deuda ya está paga y seguís en Veraz?</p>
          <p className="text-[13px] text-gray-500 mt-1">Si tu caso es para desafectación, podemos evaluarlo de forma profesional.</p>
          <a href="https://veraz-libre-legal.lovable.app" className="block w-full mt-4 border border-[#0F2C59] text-[#0F2C59] font-bold py-3 rounded-xl text-center">
            Ver asesoramiento para salir de Veraz
          </a>
        </div>
        <p className="text-[11px] text-gray-500 mt-6 text-center">
          Informe de carácter informativo y de interpretación personalizada. No constituye garantía de otorgamiento de créditos ni asegura la modificación automática de bases de datos. Asesoramiento conforme a la Ley 25.326 de Protección de Datos Personales.
        </p>
        <p className="text-[13px] text-center mt-6">¿Dudas? WhatsApp: 2643198725</p>
      </section>
    </div>
  );
}
