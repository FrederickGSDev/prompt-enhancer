// Función reutilizable para obtener el stream y actualizar el contenido de un elemento
async function getStream(prompt: string, element: HTMLElement, sendButton: HTMLButtonElement): Promise<void> {
  sendButton.disabled = true; // Desactivar el botón al iniciar
  sendButton.textContent = "Enhancing...";

  const response = await fetch('/api/standard-prompt-enhancer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: prompt })
  });

  if (!response.body) {
    console.error("Streaming not supported");
    sendButton.disabled = false; // Reactivar el botón en caso de error
    sendButton.textContent = "Enhance";
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let content = '';
  let isFirstChunk = true;

  reader.read().then(function processStream({ done, value }): Promise<void> | void {
    if (done) {
      // Si el último carácter es una comilla, eliminarla
      if (content.endsWith('"')) {
        content = content.slice(0, -1);
      }

      // Actualizar el elemento con el contenido final
      updateElementContent(element, content);
      console.log("Stream finished");

      // Reactivar el botón y restablecer su texto
      sendButton.disabled = false;
      sendButton.textContent = "Enhance";
      return;
    }

    // Decodificar el fragmento y procesarlo
    let chunk = decoder.decode(value);

    // Si es el primer fragmento, eliminar la comilla inicial
    if (isFirstChunk) {
      if (chunk.startsWith('"')) {
        chunk = chunk.slice(1); // Eliminar la comilla inicial
      }
      isFirstChunk = false;
    }

    // Añadir el fragmento procesado al contenido
    content += chunk;

    // Actualizar el contenido del elemento
    updateElementContent(element, content);

    // Leer el siguiente fragmento
    return reader.read().then(processStream);
  });
}

// Función para actualizar el contenido del elemento de forma segura
function updateElementContent(element: HTMLElement, content: string): void {
  if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
    element.value = content;
  } else {
    element.textContent = content;
  }
}

export default getStream;
