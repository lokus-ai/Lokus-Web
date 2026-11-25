import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/hero";
import { Window } from "@/components/home/window";
import { Steps } from "@/components/home/steps";
import { Shapes } from "@/components/home/shapes";
import { Connections } from "@/components/home/connections";
import { Files } from "@/components/home/files";
import { Download } from "@/components/home/download";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0f1011] text-[#f4f4f2]">
      <Navbar />
      <Hero />
      <Window />
      <Steps />
      <Shapes />
      <Connections />
      <Files />
      <Download />
      <Footer />
    </main>
  );
}
