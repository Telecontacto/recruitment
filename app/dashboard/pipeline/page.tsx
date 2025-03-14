
import Form from "@/app/ui/pipeline/form";
import { montserrat } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Session from '@/app/api/user-data/session-data';

export const metadata: Metadata = {
  title: 'Pipeline',
};

export default async function Page() {
  const session = await Session();
  return (
    <main>
      <h1 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
        Recruitment Pipeline
      </h1>
      <Form session={session} />
    </main>
  );
}