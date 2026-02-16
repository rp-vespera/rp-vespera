interface Step5Props {
  form: any;
  preview: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backstep2: () => void;
  verifyCard: () => void;
}

export default function Step5({
  form,
  preview,
  handleChange,
  backstep2,
  verifyCard,
}: Step5Props) {
  return (
    <div id="step3" className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        Upload Government ID
      </h2>

      <p className="text-xs text-gray-500 mb-2">
        Upload any valid government ID (front only is enough to start).
      </p>

      <div>
        {/* ID Upload */}
        <label className="block text-sm font-medium text-gray-700">
          ID Upload <span className="text-red-500">*</span>
        </label>

        <input
          type="file"
          id="govId"
          name="govId"
          accept="image/jpeg,image/png"
          onChange={handleChange}
          className="bg-white mt-1 w-full rounded-lg border-gray-300 px-3 py-2"
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="ID Preview"
            className="w-full h-40 object-cover rounded-lg border mt-2"
          />
        )}

        {/* File name if no preview */}
        {form.govId && !preview && (
          <p className="mt-2">{form.govId.name}</p>
        )}

        {/* Instructions */}
        <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg space-y-1 mt-2">
          <p>✔ Accepted file types: JPG, PNG</p>
          <p>✔ Max file size: 5MB</p>
          <p>✔ Ensure the image is clear and readable</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            type="button"
            onClick={backstep2}
            className="w-1/2 py-2 bg-accent text-white rounded-lg"
          >
            Back
          </button>

          <button
            type="button"
            onClick={verifyCard}
            className="w-1/2 py-2 bg-green-600 text-white rounded-lg"
            disabled={!form.govId}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
