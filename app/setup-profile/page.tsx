'use client'

import { useState, useActionState } from 'react'
import { useUser } from '@/hooks/use-user'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Steps from '@/components/ui/steps'
import WizardStep1 from './wizard-step-1'
import WizardStep2 from './wizard-step-2'
import WizardStep3 from './wizard-step-3'
import { createProfile } from '@/app/actions/profile'
// import { useFormState } from 'react-dom'

const steps = [
    { id: '01', name: 'Business Context', status: 'current' },
    { id: '02', name: 'Content Style', status: 'upcoming' },
    { id: '03', name: 'Review', status: 'upcoming' },
] as const

export default function SetupProfilePage() {
    const { user, loading } = useUser()
    const router = useRouter()
    const supabase = createClient()
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        industry: '',
        target_audience: '',
        tone: '',
        short_bio: '',
        sample_content: '',
    })

    // Server Action State
    const [state, formAction] = useActionState(createProfile, null)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    const updateFormData = (data: any) => {
        setFormData((prev) => ({ ...prev, ...data }))
    }

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0))
    }

    const getStepStatus = (index: number): 'complete' | 'current' | 'upcoming' => {
        if (index < currentStep) return 'complete'
        if (index === currentStep) return 'current'
        return 'upcoming'
    }

    const currentSteps = steps.map((step, index) => ({
        ...step,
        status: getStepStatus(index),
    }))

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Setup Business Profile</h1>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-semibold text-gray-900 hover:text-gray-600"
                    >
                        Sign out
                    </button>
                </div>

                <div className="mb-8">
                    <Steps steps={currentSteps} />
                </div>

                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        {state?.message && (
                            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-md">
                                {state.message}
                            </div>
                        )}

                        <form action={formAction}>
                            {currentStep === 0 && (
                                <WizardStep1
                                    formData={formData}
                                    updateFormData={updateFormData}
                                    onNext={nextStep}
                                />
                            )}
                            {currentStep === 1 && (
                                <WizardStep2
                                    formData={formData}
                                    updateFormData={updateFormData}
                                    onNext={nextStep}
                                    onBack={prevStep}
                                />
                            )}
                            {currentStep === 2 && (
                                <WizardStep3
                                    formData={formData}
                                    onBack={prevStep}
                                />
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
