import clsx from "clsx"
import { useStepsForm } from "../store/stepsFormStore"
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react"

export default function ContinueButton() {
    const {step, setStep} = useStepsForm();

    const handleSetRole = ()=> {
        if(step === 1) {
            setStep(2);
        }
        if(step === 2) {
            setStep(1)
        }
    }

  return (
    <button 
        className={clsx('font-bold text-lg w-full rounded-lg flex items-center justify-center py-2 cursor-pointer',
            step === 1 && 'bg-indigo-500 hover:bg-indigo-400 text-white',
            step === 2 && 'bg-gray-300 hover:bg-gray-200'
        )}
        type="button"
        onClick={handleSetRole}
    >
        { step === 1 
            ? <><span>Continuar </span> <IconArrowNarrowRight /></>
            : <><IconArrowNarrowLeft /> Regresar</>

        }
    </button>
  )
}
