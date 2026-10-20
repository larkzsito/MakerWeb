/**
 * Servicio modular de base de datos / recepción de solicitudes.
 *
 * Cualquier persona que descargue este proyecto puede conectar fácilmente
 * su propia base de datos o backend aquí:
 *  - Supabase
 *  - Firebase / Firestore
 *  - REST API / Express / NestJS / FastAPI
 *  - Webhooks (Make, n8n, Zapier)
 *  - Email API (Resend, SendGrid, EmailJS)
 */

export interface SolicitudContacto {
  nombre: string;
  empresa: string;
  correo: string;
  tipo: string;
  detalles: string;
  fecha: string;
}

export async function guardarSolicitud(solicitud: SolicitudContacto): Promise<{ success: boolean; message?: string }> {
  try {
    // Si se define una URL de backend en las variables de entorno, se envía automáticamente
    const endpoint = import.meta.env.VITE_DATABASE_API_URL;

    if (endpoint) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(solicitud),
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.statusText}`);
      }

      return { success: true };
    }

    // Comportamiento por defecto: Registro en consola (sin dependencias externas obligatorias)
    console.info(
      "📌 Solicitud recibida localmente (conecta tu base de datos o API en 'src/services/database.ts'):",
      solicitud
    );

    return { success: true };
  } catch (error) {
    console.error("Error al guardar la solicitud:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
