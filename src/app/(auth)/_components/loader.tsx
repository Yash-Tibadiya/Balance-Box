import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex min-h-[calc(100svh-11rem)] flex-col items-center justify-center p-6 md:p-10 dark:bg-black">
      <Image
        src="https://res.cloudinary.com/dwguas7rt/image/upload/v1765544789/loading_glkn85.gif"
        alt="loading"
        width={100}
        height={100}
        className="dark:invert"
        unoptimized
      />
    </div>
  );
};

export default Loader;
