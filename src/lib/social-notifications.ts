export const NOTIFICATION_INTERVAL = 12000;
export const NOTIFICATION_DURATION = 5000;
export const NOMBRES = ["Antonio P.", "María G.", "Carlos S.", "Laura M.", "Roberto D.", "Paula V.", "Jorge L.", "Florencia R.", "Martín C.", "Daniela S.", "Lucas F.", "Camila T.", "Hernán B.", "Sofía N.", "Ezequiel M."] as const;
const TIEMPOS = ["hace 2 min", "hace 5 min", "hace 8 min", "hace 12 min"] as const;
const COLORES = ["bg-social-navy", "bg-social-green", "bg-social-orange", "bg-social-purple", "bg-social-blue"] as const;

export function nextNotification(previous: string, random = Math.random) {
  const candidates = NOMBRES.filter((name) => name !== previous);
  const nombre = candidates[Math.floor(random() * candidates.length)] ?? NOMBRES[0];
  return {
    nombre,
    tiempo: TIEMPOS[Math.floor(random() * TIEMPOS.length)] ?? TIEMPOS[0],
    color: COLORES[Math.floor(random() * COLORES.length)] ?? COLORES[0],
    visible: true,
  };
}