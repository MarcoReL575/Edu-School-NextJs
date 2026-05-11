import SignInForm from '@/src/features/auth/components/SignInForm'
import Heading from '@/src/shared/components/typography/Heading'

export default function SignIn() {
  return (
    <section className='w-full h-full flex flex-col items-center justify-center'>
      <div className="w-full">
        <Heading level={2} className='font-bold'>¡Bienvenido!</Heading>
        <Heading level={4} className="text-gray-500">Inicia sesión para poder administrar tu cuenta</Heading>
      </div>
      <SignInForm />
    </section>
  )
}
