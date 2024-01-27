"use client";
import Uploader from "@/components/Uploader";
import { useState, useEffect } from "react";

export type ApiState = {
  api_key: string;
  api_url: string;
  deployment_name: string;
  api_version: string;
};

export default function Home() {
  const [value, setValue] = useState<ApiState>({
    api_key: "",
    api_url: "",
    deployment_name: "",
    api_version: "",
  });
  const [data, setData] = useState(false);

  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    const storedValue = localStorage.getItem("apiState");
    if (storedValue && !data) {
      let data = JSON.parse(storedValue);
      if (data.api_key && data.api_url) {
        setValue(data);
        setData(true);
      }
    }
  }, []);

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevState) => ({
      ...prevState,
      api_url: e.target.value,
    }));
  };

  const handleDeploymentNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue((prevState) => ({
      ...prevState,
      deployment_name: e.target.value,
    }));
  };

  const handleApiVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevState) => ({
      ...prevState,
      api_version: e.target.value,
    }));
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevState) => ({
      ...prevState,
      api_key: e.target.value,
    }));
  };

  const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setData(true);
    // Save the value to local storage whenever it changes
    localStorage.setItem("apiState", JSON.stringify(value));
  };

  const handleResetLocalStorage = () => {
    // Reset local storage
    localStorage.removeItem("apiState");
    setData(false);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-black mb-10">
        Meeting minutes generator
      </h1>
      {data && (
        <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full m-10">
          <button
            onClick={handleResetLocalStorage}
            className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white p-1 rounded-md text-xs hover:bg-red-600"
          >
            Reset API settings
          </button>
          <Uploader
            api_key={value.api_key}
            api_url={value.api_url}
            api_version={value.api_version}
            deployment_name={value.deployment_name}
          />
        </div>
      )}
      {!data && (
        <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full m-10">
          <label className="block mb-4">
            <span className="text-gray-700">API URL:</span>
            <input
              type="text"
              placeholder="Enter API URL"
              onChange={handleApiUrlChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">API KEY:</span>
            <input
              type="text"
              placeholder="Enter API KEY"
              onChange={handleApiKeyChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Deployment Name:</span>
            <input
              type="text"
              placeholder="Enter Deployment Name"
              onChange={handleDeploymentNameChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">API Version:</span>
            <input
              type="text"
              placeholder="Enter API Version"
              onChange={handleApiVersionChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={handleChange}
          >
            Save to Local Storage
          </button>
        </div>
      )}
      <footer className="absolute bottom-5 left-5 right-5 text-gray-500 text-xs flex justify-between">
        <p>Made by Gustav Hartz</p>
        <a
          href="https://github.com/gustavhartz/meeting-minutes-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Source code 🚀
        </a>
      </footer>
    </main>
  );
}
