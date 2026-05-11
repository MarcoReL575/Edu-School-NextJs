import { IconCheck } from "@tabler/icons-react";
import { useStepsForm } from "../store/stepsFormStore";
import Heading from "@/src/shared/components/typography/Heading";

export default function StepsCreateAccount() {

    const steps = ["Tu rol", "Tus datos", "Listo"];
    const { step } = useStepsForm();

    return (
        <section className="w-full">
            <div className="">
                <Heading level={2} className='font-bold'>Crear cuenta</Heading>
                <Heading level={4} className="text-gray-500">Completa tu registro en 2 pasos</Heading>
            </div>

            <div className="flex items-center mt-4 gap-4 justify-between">
                {steps.map((label, i) => {
                    const current = i + 1;
                    return (
                        <div key={label} className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm
                                ${step >= current ? "bg-green-500" : "bg-gray-300"}`}
                            >
                                {step > current ? "✓" : current}
                            </div>
                            <span className="text-sm">{label}</span>
                            {i < steps.length - 1 && (
                                <div className={`w-20 sm:w-30 xl:w-40 h-1 bg-gray-200 rounded-2xl" ${step > current ? "bg-green-500" : "bg-gray-300"}`} />
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
