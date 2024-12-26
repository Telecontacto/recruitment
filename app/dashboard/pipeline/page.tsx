'use client';
import Form from "@/app/ui/pipeline/form";
import { montserrat } from '@/app/ui/fonts';


export default function Page() {
  return (
    <main>
      <h1 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
        Recruitment Pipeline
      </h1>
      <Form />
    </main>
  );
}