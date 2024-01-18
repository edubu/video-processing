/*  */
import React, { useRef, useCallback, useEffect, useState } from "react";
import WebcamStream from "../components/WebcamStream";
import { startStreaming, generateStreamId } from "../lib/video";

const TestVideoScreen = () => {
  const [streamId, setStreamId] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [FPS, setFPS] = useState<number>(20);

  const handleStartStreaming = async () => {
    const streamId = generateStreamId(16);
    setStreamId(streamId);

    setIsStreaming(true);

    startStreaming(FPS, streamId);
  };

  return (
    <div>
      <h1>Test Video Screen</h1>
      {/* video feeds container */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row space-x-12">
          <div className="flex flex-col space-y-4">
            <h1>Video Feed</h1>
            <WebcamStream />
          </div>
          <div>
            <h1>Received Livestream</h1>
          </div>
        </div>
        <button></button>
      </div>
      <button
        className="bg-sky-500 text-white px-4 py-2 rounded-lg"
        onClick={() => handleStartStreaming()}
      >
        Start Livestream
      </button>
    </div>
  );
};

export default TestVideoScreen;
