import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import Snowfall from '@/app/ui/snowflakes'

export default function LoginPage() {

  return (
    <main className="flex items-center justify-center md:h-screen">
      {/* <Snowfall /> */}
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="rounded-lg gunmetal p-3">
          <div className="text-white md:w-50">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}