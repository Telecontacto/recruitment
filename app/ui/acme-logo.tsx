import Image from 'next/image';

export default function AcmeLogo() {
  return (
       <Image
        src="/tc-mini-logo-white.png"
        width={500}
        height={760}
        alt="Telecontacto Logo"
      /> 
  );
}
