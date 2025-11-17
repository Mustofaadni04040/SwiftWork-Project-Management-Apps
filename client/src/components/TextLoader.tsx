const TextLoader = ({ text }) => {
  return (
    <div className="flex h-screen w-full justify-center items-center bg-white dark:bg-zinc-950">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block text-xl font-bold text-[#0b996f] animate-bounce transition-colors duration-300"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default TextLoader;
