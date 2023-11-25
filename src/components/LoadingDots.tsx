const LoadingDots = ({ color = "text-black" }: { color?: string }) => {
  return (
    <span className="inline-flex items-center">
      <span className={`w-5 h-5 rounded-full ${color} animate-blink`} />
      <span
        className={`w-5 h-5 rounded-full ${color} animate-blink animate-delay-200`}
      />
      <span
        className={`w-5 h-5 rounded-full ${color} animate-blink animate-delay-400`}
      />
    </span>
  );
};

export default LoadingDots;
