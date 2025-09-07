import { resumes } from "~/constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { useEffect, type ReactNode } from "react";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

  function callbackfn(value: Resume, index: number, array: Resume[]): ReactNode {
    throw new Error("Function not implemented.");
  }

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col items-center w-full min-h-screen">
    <Navbar />
    <section className="main-section py-16">
      <div className="page-heading">
        <h1>Track Your Applications and Resume Ratings</h1>
        <h2>Review your submissions and Check AI-Powered feedback.</h2>
      </div>
      {resumes.length > 0 && (
  <div className="resumes-section flex flex-wrap gap-6 items-start justify-center w-full max-w-4xl px-2 md:px-8 mx-auto">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>
  </main>
}
