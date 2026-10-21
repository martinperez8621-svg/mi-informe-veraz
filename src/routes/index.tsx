import { useEffect, useRef, useState } from "react";
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

const NOMBRES = [
  "Antonio P.",
  "María G.",
  "Carlos S.",
  "Laura M.",
  "Roberto D.",
  "Paula V.",
  "Jorge L.",
  "Florencia R.",
  "Martín C.",
  "Daniela S.",
  "Lucas F.",
  "Camila T.",
  "Hernán B.",
  "Sofía N.",
  "Ezequiel M.",
];

const TIEMPOS = ["hace 2 min", "hace 5 min", "hace 8 min", "hace 12 min"];

const COLORES = ["#0F2C59", "#00A650", "#E67E22", "#8E44AD", "#2E86C1"];

const FAQS = [
  {
    pregunta: "¿Qué incluye el informe de $15.000?",
    respuesta: "PDF completo con Veraz, BCRA, score, detalle de entidades, fechas y análisis profesional interpretado.",
  },
  {
    pregunta: "¿En cuánto tiempo llega?",
    respuesta: "Entrega en 24hs hábiles por mail, con revisión profesional, no automático.",
  },
  {
    pregunta: "¿Es legal y seguro?",
    respuesta: "Sí, conforme a Ley 25.326. Pago seguro por Mercado Pago. No guardamos datos de tarjeta.",
  },
  {
    pregunta: "¿Qué pasa si estoy en Veraz y mi deuda ya está paga?",
    respuesta: "Evaluamos tu caso para desafectación. Tenemos asesoramiento para salir de Veraz.",
  },
  {
    pregunta: "¿El informe me garantiza un crédito?",
    respuesta: "No, es informativo y de interpretación personalizada. No asegura modificación automática de bases.",
  },
];

function Index() {
  const [pagoIniciado, setPagoIniciado] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);
  const [notif, setNotif] = useState<{ nombre: string; tiempo: string; color: string; visible: boolean } | null>(null);
  const ultimoNombre = useRef<string>("");

  useEffect(() => {
    if (localStorage.getItem("veraz_intento_pago") === "si" || new URLSearchParams(window.location.search).get("pago") === "exitoso") {
      setPagoIniciado(true);
    }
  }, []);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    const mostrarNotif = () => {
      let nombre = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
      while (nombre === ultimoNombre.current) {
        nombre = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
      }
      ultimoNombre.current = nombre;
      setNotif({
        nombre,
        tiempo: TIEMPOS[Math.floor(Math.random() * TIEMPOS.length)],
        color: COLORES[Math.floor(Math.random() * COLORES.length)],
        visible: false,
      });
      setTimeout(() => setNotif((n) => (n ? { ...n, visible: true } : n)), 80);
      hideTimer = setTimeout(() => setNotif((n) => (n ? { ...n, visible: false } : n)), 5000);
    };
    const primerTimer = setTimeout(mostrarNotif, 3000);
    const intervalo = setInterval(mostrarNotif, 12000);
    return () => {
      clearTimeout(primerTimer);
      clearInterval(intervalo);
      clearTimeout(hideTimer);
    };
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

        {/* FAQ */}
        <div className="mt-10">
          <h3 className="text-[20px] font-bold text-[#0F2C59] text-center">Preguntas Frecuentes</h3>
          <div className="mt-4 space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFaqAbierta(faqAbierta === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 text-left p-4"
                >
                  <span className="text-[14px] font-semibold text-[#0F2C59]">{f.pregunta}</span>
                  <span className={`text-[#00A650] text-[12px] shrink-0 transition-transform duration-200 ${faqAbierta === i ? "rotate-180" : ""}`}>▼</span>
                </button>
                {faqAbierta === i && (
                  <p className="px-4 pb-4 text-[13px] text-gray-600 leading-snug">{f.respuesta}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-gray-500 mt-6 text-center">
          Informe de carácter informativo y de interpretación personalizada. No constituye garantía de otorgamiento de créditos ni asegura la modificación automática de bases de datos. Asesoramiento conforme a la Ley 25.326 de Protección de Datos Personales.
        </p>
        <p className="text-[13px] text-center mt-6">¿Dudas? WhatsApp: 2643198725</p>
      </section>

      {pagoIniciado && (
        <>
          <div className="max-w-[600px] mx-auto mt-4 bg-green-100 border border-green-600 text-green-800 text-center p-4 rounded-xl mx-6 font-bold">
            ¡Pago iniciado! Si ya pagaste, tocá el botón de WhatsApp para enviarnos el comprobante.
          </div>
          <a
            href="https://wa.me/5492643198725?text=Hola%20acabo%20de%20pagar%20mi%20informe%20Veraz%20de%20$15.000%20-%20Mi%20nombre%20es%3A%20"
            target="_blank"
            className="fixed bottom-5 right-5 bg-[#25D366] text-white font-bold py-3 px-6 rounded-full shadow-xl z-50"
          >
            Ya pagué, enviar comprobante por WhatsApp
          </a>
        </>
      )}

      {notif && (
        <div
          className={`fixed bottom-5 left-5 z-40 max-w-[270px] bg-white border border-gray-200 rounded-xl shadow-lg p-3 flex items-center gap-3 transition-all duration-300 ${
            notif.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
            style={{ backgroundColor: notif.color }}
          >
            {notif.nombre.split(" ").map((p) => p[0]).join("")}
          </div>
          <p className="text-[12px] text-gray-700 leading-snug">
            <b className="text-gray-900">{notif.nombre}</b> compró el informe completo {notif.tiempo}
          </p>
        </div>
      )}
    </div>
  );
}
