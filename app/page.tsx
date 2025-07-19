import Link from "next/link";
import { Hero } from "./components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Hero />
      <div className="flex gap-6 justify-center mb-12 flex-wrap"></div>
    </div>
  );
}
