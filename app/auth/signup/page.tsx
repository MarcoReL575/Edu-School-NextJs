'use client'

import { MailCheckIcon, PartyPopperIcon } from 'lucide-react'
import RolStep from '@/src/features/auth/components/RolStep'
import SignUpForm from '@/src/features/auth/components/SignUpForm'
import StepsCreateAccount from '@/src/features/auth/components/StepsCreateAccount'
import WallpaperSignUp from '@/src/features/auth/components/WallpaperSignUp'
import { useStepsForm } from '@/src/features/auth/store/stepsFormStore'
import Heading from '@/src/shared/components/typography/Heading'

export default function SignUp() {

  const { step, setStep } = useStepsForm()

  return (
    <>
      <StepsCreateAccount />
      {step === 1 && <RolStep />}
      {step === 2 && <SignUpForm />}
      {step === 3 &&
        <section className=' mx-auto space-y-4 text-center flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center justify-center'>
            <PartyPopperIcon size={100} />
            <Heading level={2} className='font-bold mt-8 '>¡Cuenta creada!</Heading>
            <p className='text-gray-500'>Revisa tu correo electrónico para verificar tu cuenta </p>
            <span className='text-gray-500 text-center'>y comenzaar a usar EduSchool</span>
          </div>

          <div className='bg-blue-100 px-4 rounded-lg text-blue-600 flex flex-col items-center py-6 space-y-2'>
            <MailCheckIcon size={35} />
            <p>Te enviamos un enlace de verificación al correo:</p>
            <span>correo@correo.com</span>
          </div>
          <button
            className='py-2 w-full font-semibold bg-blue-500 capitalize text-white rounded-lg hover:bg-blue-400 cursor-pointer'
            onClick={() => setStep(1)}
          >
            Ir al inicio de sesión
          </button>
        </section>
      }
    </>
  )
}
