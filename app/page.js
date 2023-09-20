import Image from 'next/image';
import spaceBg from '@/app/_assets/_images/outer-space.svg';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-5">
      <section className="flex justify-between bg-skyBlue rounded-3xl p-14 shadow-sm">
        <div className="flex flex-col justify-between">
          <h1 className="text-6xl font-extrabold text-black">Space Showcase</h1>
          <p className="text-2xl font-medium text-black">
            A showcase of space exploration and tech.
          </p>
        </div>
        <Image src={spaceBg} alt="space" className="w-[500px] h-[460px]" />
      </section>
    </main>
  );
}
