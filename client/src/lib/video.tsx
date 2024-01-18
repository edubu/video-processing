export const startStreaming = async (FPS: number, streamId: string) => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = async (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      await sendVideoChunk(event.data, FPS, streamId);
    }
  };

  // Send video stream at specified FPS
  console.log("Starting video stream...");
  mediaRecorder.start(1000 / FPS);
};

const sendVideoChunk = async (chunk: Blob, fps: number, streamId: string) => {
  const formData = new FormData();
  formData.append("videoChunk", chunk);
  formData.append("FPS", fps.toString());
  formData.append("streamId", streamId);
  try {
    const response = await fetch("http://localhost:8000/upload_chunk", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error sending video chunk:", error);
  }
};

export function generateStreamId(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);

  for (let i = 0; i < length; i++) {
    const randomIndex = bytes[i] % characters.length;
    result += characters[randomIndex];
  }

  return result;
}
