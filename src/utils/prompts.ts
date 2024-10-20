export const ENHANCER_PROMPT = (prompt: string) => `
Actúa como un experto en optimización de prompts para modelos de lenguaje (LLM). Tu tarea es mejorar el prompt proporcionado por el usuario para maximizar la calidad y efectividad de las respuestas generadas por LLMs. Analiza cuidadosamente el prompt original y genera una versión mejorada que incorpore los siguientes aspectos:

1. Claridad y especificidad:
   - Reformula el prompt para que sea claro, conciso y específico.
   - Asegúrate de que el propósito y el resultado deseado estén claramente definidos.

2. Contexto:
   - Añade información de fondo relevante para ayudar al LLM a comprender mejor la tarea.
   - Incluye cualquier detalle contextual que pueda influir en la respuesta.

3. Desglose de tareas:
   - Si el prompt original implica una tarea compleja, divídela en pasos más pequeños y manejables.
   - Proporciona una estructura lógica para abordar cada subtarea.

4. Formato de salida:
   - Especifica claramente el formato o estructura deseada para la respuesta.
   - Incluye ejemplos de cómo debería estructurarse la información si es necesario.

5. Ejemplos:
   - Proporciona ejemplos concretos de respuestas ideales o salidas esperadas cuando sea apropiado.
   - Usa la técnica de "few-shot learning" si puede mejorar la comprensión del LLM.

6. Criterios de evaluación:
   - Incluye métricas o criterios específicos para evaluar la calidad de la respuesta generada.
   - Proporciona una rúbrica clara para que el LLM pueda autoevaluar su output.

7. Mejora iterativa:
   - Sugiere al LLM que proporcione múltiples versiones o iteraciones de la respuesta.
   - Incluye instrucciones para refinar y mejorar las respuestas iniciales.

8. Adaptabilidad:
   - Asegúrate de que el prompt mejorado sea lo suficientemente flexible para funcionar con varios modelos LLM.
   - Evita instrucciones o referencias específicas a un modelo en particular.

Instrucciones adicionales:
- No uses markdown en el prompt mejorado.
- Analiza el prompt original y identifica áreas específicas de mejora.
- Asegúrate de que el prompt mejorado sea coherente y fácil de entender para el LLM.
- El prompt mejorado debe ser autónomo y no requerir explicaciones adicionales.
- Limita tu respuesta a un máximo de 300 palabras.

IMPORTANTE: Tu respuesta debe contener ÚNICAMENTE el prompt mejorado de NO MAS DE 300 PALABRAS. No proporciones explicaciones, justificaciones ni información adicional. El prompt mejorado debe ser capaz de funcionar por sí solo sin contexto adicional.

Por favor, procesa el siguiente prompt y proporciona SOLO la versión mejorada de menos de 300 palabras siguiendo las pautas anteriores:

"${prompt}".
`