export const startStreaming = async (FPS: number) => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = async (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      await sendVideoChunk(event.data);
    }
  };

  // Send video stream at specified FPS
  mediaRecorder.start(1000 / FPS);
};

const sendVideoChunk = async (chunk: Blob) => {
  const formData = new FormData();
  formData.append("videoChunk", chunk);
  try {
    const response = await fetch("http://localhost/upload_test_chunk", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error sending video chunk:", error);
  }
};
