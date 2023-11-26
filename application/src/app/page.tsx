import Uploader from "@/components/Uploader";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full m-10">
        <Uploader />
      </div>
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
