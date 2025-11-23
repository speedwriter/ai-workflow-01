import { useFormStatus } from 'react-dom'

interface Step3Props {
    formData: any
    onBack: () => void
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
        >
            {pending ? 'Creating Profile...' : 'Create Profile'}
        </button>
    )
}

export default function WizardStep3({ formData, onBack }: Step3Props) {
    return (
        <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Review your details</h3>
                <dl className="divide-y divide-gray-200">
                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Industry</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{formData.industry}</dd>
                    </div>
                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Target Audience</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{formData.target_audience}</dd>
                    </div>
                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Tone</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{formData.tone}</dd>
                    </div>
                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Short Bio</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{formData.short_bio || 'N/A'}</dd>
                    </div>
                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Sample Content</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 truncate">{formData.sample_content || 'N/A'}</dd>
                    </div>
                </dl>
            </div>

            {/* Hidden inputs to submit data via Server Action */}
            <input type="hidden" name="industry" value={formData.industry} />
            <input type="hidden" name="target_audience" value={formData.target_audience} />
            <input type="hidden" name="tone" value={formData.tone} />
            <input type="hidden" name="short_bio" value={formData.short_bio || ''} />
            <input type="hidden" name="sample_content" value={formData.sample_content || ''} />

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Back
                </button>
                <SubmitButton />
            </div>
        </div>
    )
}
