interface Step2Props {
    formData: any
    updateFormData: (data: any) => void
    onNext: () => void
    onBack: () => void
}

export default function WizardStep2({ formData, updateFormData, onNext, onBack }: Step2Props) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateFormData({ [e.target.name]: e.target.value })
    }

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="short_bio" className="block text-sm font-medium leading-6 text-gray-900">
                    Short Bio (Max 200 chars)
                </label>
                <div className="mt-2">
                    <textarea
                        id="short_bio"
                        name="short_bio"
                        rows={3}
                        maxLength={200}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                        placeholder="Briefly describe your business..."
                        value={formData.short_bio || ''}
                        onChange={handleChange}
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about what you do.</p>
            </div>

            <div>
                <label htmlFor="sample_content" className="block text-sm font-medium leading-6 text-gray-900">
                    Sample Content (Optional)
                </label>
                <div className="mt-2">
                    <textarea
                        id="sample_content"
                        name="sample_content"
                        rows={5}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                        placeholder="Paste some existing content to help us understand your style..."
                        value={formData.sample_content || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
