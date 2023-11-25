"use client";

import { useState, useCallback, useMemo, ChangeEvent } from "react";
import toast from "react-hot-toast";
import LoadingDots from "./LoadingDots";
import UploadIcon from "../../public/uploadIcon.svg";
import Image from "next/image";
import { vttToJson } from "../utils/fileProcessing";

const FILE_SIZE_LIMIT_MB = 10;

export default function Uploader() {
  const [data, setData] = useState<{
    transcript: string | null;
  }>({
    transcript: null,
  });
  const [file, setFile] = useState<File | null>(null);

  const [dragActive, setDragActive] = useState(false);

  const onChangeTranscript = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0];
      if (file) {
        if (file.size / 1024 / 1024 > FILE_SIZE_LIMIT_MB) {
          toast.error(`File size too big (max ${FILE_SIZE_LIMIT_MB}MB)`);
        } else {
          setFile(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setData({ transcript: e.target?.result as string });
          };
          reader.readAsText(file);
        }
      }
    },
    [setData]
  );

  const [saving, setSaving] = useState(false);

  const saveDisabled = useMemo(() => {
    return !data.transcript || saving;
  }, [data.transcript, saving]);

  return (
    <form
      className="grid gap-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        console.log("Saving...");
        console.log(data);
        const json = vttToJson(data.transcript as string);
        console.log(json);
        setSaving(false);
      }}
    >
      <div>
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold">Upload a file</h2>
          <p className="text-sm text-gray-500">Accepted formats: .vtt</p>
        </div>
        <label
          htmlFor="transcript-upload"
          className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
        >
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);

              const file = e.dataTransfer.files && e.dataTransfer.files[0];
              if (file) {
                if (file.size / 1024 / 1024 > FILE_SIZE_LIMIT_MB) {
                  toast.error(
                    `File size too big (max ${FILE_SIZE_LIMIT_MB}MB)`
                  );
                } else {
                  setFile(file);
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setData((prev) => ({
                      ...prev,
                      transcript: e.target?.result as string,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }
            }}
          />
          <div
            className={`${
              dragActive ? "border-2 border-black" : ""
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
              data.transcript
                ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
                : "bg-white opacity-100 hover:bg-gray-50"
            }`}
          >
            <Image src={UploadIcon} alt="fse" />
            <p className="mt-2 text-center text-sm text-gray-500">
              Drag and drop or click to upload.
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Max file size: ${FILE_SIZE_LIMIT_MB}MB
            </p>
            <span className="sr-only">Transcript upload</span>
          </div>
          {data.transcript && (
            // eslint-disable-next-line @next/next/no-img-element
            <p className="mt-2 text-center text-sm text-gray-500">
              {file?.name}
            </p>
          )}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="transcript-upload"
            name="transcript"
            type="file"
            accept=".vtt"
            className="sr-only"
            onChange={onChangeTranscript}
          />
        </div>
      </div>

      <button
        disabled={saveDisabled}
        className={`${
          saveDisabled
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {saving ? (
          <LoadingDots color="#808080" />
        ) : (
          <p className="text-sm">Confirm upload</p>
        )}
      </button>
    </form>
  );
}
