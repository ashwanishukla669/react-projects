"use client";

import { useRef, useState } from "react";

export default function ScreenRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const [videoUrl, setVideoUrl] = useState("");
  const [recording, setRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, {
          type: "video/webm",
        });

        const url = URL.createObjectURL(blob);

        setVideoUrl(url);
        chunks.current = [];

        // Stop screen sharing
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white">
          <h1 className="text-3xl font-bold">
            🎥 Screen Recorder
          </h1>

          <p className="mt-2 text-indigo-100">
            Record your screen directly from your browser.
          </p>
        </div>

        <div className="p-8">

          {/* Status */}
          <div className="mb-6 flex items-center gap-3">

            <span
              className={`h-3 w-3 rounded-full ${
                recording ? "bg-red-500 animate-pulse" : "bg-green-500"
              }`}
            />

            <span className="font-medium text-gray-700">
              {recording ? "Recording..." : "Ready to Record"}
            </span>

          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            {!recording ? (
              <button
                onClick={startRecording}
                className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold shadow hover:bg-indigo-700 transition"
              >
                ▶ Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="rounded-xl bg-red-600 px-6 py-3 text-white font-semibold shadow hover:bg-red-700 transition"
              >
                ■ Stop Recording
              </button>
            )}

          </div>

          {/* Preview */}
          {videoUrl && (
            <div className="mt-10">

              <h2 className="mb-4 text-xl font-semibold">
                Recording Preview
              </h2>

              <video
                src={videoUrl}
                controls
                className="w-full rounded-2xl border shadow-lg"
              />

              <div className="mt-6 flex gap-4">

                <a
                  href={videoUrl}
                  download="recording.webm"
                  className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition"
                >
                  ⬇ Download
                </a>

                <button
                  onClick={() => setVideoUrl("")}
                  className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-100 transition"
                >
                  Clear
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}