import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import foto1 from "@/assets/celular-750.jpg.asset.json";
import foto2 from "@/assets/mujer-notebook.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Mi Informe Veraz - PDF Personalizado" }] }),
  component: Index,
});

const NOMBRES = ["Antonio P.","María G.","Carlos S.","Laura M.","Roberto D.","Paula V.","Jorge L.","Florencia R.","Martín C.","Daniela S.","Lucas F.","Camila T.","Hernán B.","Sofía N.","Ezequiel M."] as const;
const TIEMPOS = ["hace 2 min","hace 5 min","hace 8 min","hace 12 min"] as const;
const COLORES = ["#0F2C59","#00A650","#E67E22","#8E44AD","#2E86C1"] as const;
const FAQS = [
  { pregunta: "¿Qué incluye el informe de $15.000?", respuesta: "PDF completo con Veraz, BCRA, score, detalle de entidades, fechas y análisis profesional interpretado." },
  { pregunta: "¿En cuánto tiempo llega?", respuesta: "Entrega en 24hs hábiles por mail, con revisión profesional, no automático." },
  { pregunta: "¿Es legal y seguro?", respuesta: "Sí, conforme a Ley 25.326. Pago seguro por Mercado Pago. No guardamos datos de tarjeta." },
  { pregunta: "¿Qué pasa si estoy en Veraz y mi deuda ya está paga?", respuesta: "Evaluamos tu caso para desafectación. Tenemos asesoramiento para salir de Veraz." },
  { pregunta: "¿El informe me garantiza un crédito?", respuesta: "No, es informativo y de interpretación personalizada. No asegura modificación automática de bases." },
];

function Index() {
  const [pagoIniciado, setPagoIniciado] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);
  const [notif, setNotif] = useState<{ nombre: string; tiempo: string; color: string; visible: boolean } | null>(null);
  const ultimoNombre = useRef<string>("");

  useEffect(() => {
    if (localStorage.getItem("veraz_intento_pago") === "si") setPagoIniciado(true);
  }, []);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    const mostrar = () => {
      let nombre = NOMBRES[Math.floor(Math.random() * NOMBRES.length)]!;
      while (nombre === ultimoNombre.current) nombre = NOMBRES[Math.floor(Math.random() * NOMBRES.length)]!;
      ultimoNombre.current = nombre;
      setNotif({ nombre, tiempo: TIEMPOS[Math.floor(Math.random() * TIEMPOS.length)]!, color: COLORES[Math.floor(Math.random() * COLORES.length)]!, visible: false });
      setTimeout(() => setNotif((n) => (n ? { ...n, visible: true } : n)), 80);
      hideTimer = setTimeout(() => setNotif((n) => (n ? { ...n, visible: false } : n)), 5000);
    };
    const t1 = setTimeout(mostrar, 3000);
    const t2 = setInterval(mostrar, 12000);
    return () => { clearTimeout(t1); clearInterval(t2); clearTimeout(hideTimer); };
  }, []);

  return (
    <div className="bg-white font-sans">
      <section className="max-w-[600px] mx-auto px-6 py-10 text-center">
        <h1 className="text-[32px] font-bold text-[#0F2C59]">Informe Veraz Personalizado</h1>
        <p className="text-[15px] text-gray-600 mt-4">Recibí tu informe completo en PDF con tu situación crediticia actual, tu score y análisis profesional.</p>
        <button onClick={() => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })} className="block w-full bg-[#00A650] text-white font-bold text-[18px] py-4 rounded-xl mt-6">Comprar mi informe $15.000</button>
        <div className="mt-8"><img src={foto1.url} alt="Reporte" className="w-full rounded-2xl" /></div>
      </section>

      <section id="formulario" className="max-w-[600px] mx-auto px-6 py-10">
        <form action="https://formsubmit.co/martin.perez8621@gmail.com" method="POST" className="space-y-4">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="PEDIDO INFORME VERAZ $15.000" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="https://mpago.li/1WmwxjQ" />
          <input type="text" name="nombre" placeholder="Nombre completo" className="w-full border p-3 rounded-xl" required />
          <input type="text" name="dni" placeholder="DNI" className="w-full border p-3 rounded-xl" required />
          <input type="text" name="cuil" placeholder="CUIL" className="w-full border p-3 rounded-xl" required />
          <input type="tel" name="whatsapp" placeholder="WhatsApp" className="w-full border p-3 rounded-xl" required />
          <input type="email" name="email" placeholder="Email donde recibirás el PDF" className="w-full border p-3 rounded-xl" required />
          <button onClick={() => localStorage.setItem("veraz_intento_pago", "si")} type="submit" className="w-full bg-[#00A650] text-white font-bold py-4 rounded-xl">Enviar datos y pagar $15.000</button>
        </form>

        <div className="mt-10 border border-[#0F2C59] rounded-2xl p-5 text-center">
          <p className="text-[15px] font-bold text-[#0F2C59]">¿Tu deuda ya está paga y seguís en Veraz?</p>
          <a href="https://veraz-libre-legal.lovable.app" className="block w-full mt-4 border border-[#0F2C59] text-[#0F2C59] font-bold py-3 rounded-xl">Ver asesoramiento para salir de Veraz</a>
        </div>

        <div className="mt-10">
          <h3 className="text-[20px] font-bold text-[#0F2C59] text-center">Preguntas Frecuentes</h3>
          <div className="mt-4 space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="border rounded-xl">
                <button type="button" onClick={() => setFaqAbierta(faqAbierta === i ? null : i)} className="w-full flex justify-between p-4 text-left"><span className="text-[14px] font-semibold">{f.pregunta}</span><span>▼</span></button>
                {faqAbierta === i && <p className="px-4 pb-4 text-[13px] text-gray-600">{f.respuesta}</p>}
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mt-6 text-center">Informe informativo, Ley 25.326. No garantiza créditos.</p>
      </section>

      {pagoIniciado && <a href="https://wa.me/5492643198725?text=Hola%20pague%20informe%20Veraz" className="fixed bottom-5 right-5 bg-[#25D366] text-white font-bold py-3 px-6 rounded-full shadow-xl z-50">Ya pagué, enviar comprobante</a>}

      {notif && (
        <div className={`fixed bottom-5 left-5 z-40 bg-white border rounded-xl shadow-lg p-3 flex gap-3 transition-all ${notif.visible ? "opacity-100" : "opacity-0"}`}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: notif.color }}>{notif.nombre[0]}</div>
          <p className="text-[12px]"><b>{notif.nombre}</b> compró el informe completo {notif.tiempo}</p>
        </div>
      )}
    </div>
  );
                }
