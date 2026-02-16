interface Step5Props {
  form: any;
  backstep2: () => void;
  onSubmit: () => void;
}

export default function Step7({ form, backstep2, onSubmit }: Step5Props) {
  return (
    <div id="step5" className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        Review Details
      </h2>
      <p className="text-xs text-gray-500">
        Please review your information before saving.
      </p>

      <div className="bg-gray-50 border rounded-lg p-4 space-y-2 text-sm">
        {/* Full Name */}
        <div className="flex justify-between">
          <span className="text-gray-500">Full Name</span>
          <span className="font-medium text-gray-700">
            {`${form.firstName} ${form.middleName || ""} ${form.lastName}`}
          </span>
        </div>

        {/* Birth Date */}
        <div className="flex justify-between">
          <span className="text-gray-500">Birth Date</span>
          <span className="font-medium text-gray-700">{form.birthDate}</span>
        </div>

        {/* Birth Place */}
        <div className="flex justify-between">
          <span className="text-gray-500">Birth Place</span>
          <span className="font-medium text-gray-700">{form.birthPlace}</span>
        </div>

        {/* Gender */}
        <div className="flex justify-between">
          <span className="text-gray-500">Gender</span>
          <span className="font-medium text-gray-700">{form.gender}</span>
        </div>

        {/* Civil Status */}
        <div className="flex justify-between">
          <span className="text-gray-500">Civil Status</span>
          <span className="font-medium text-gray-700">{form.civilStatus}</span>
        </div>

        {/* Email */}
        <div className="flex justify-between">
          <span className="text-gray-500">Email</span>
          <span className="font-medium text-gray-700">{form.email}</span>
        </div>

        {/* Phone */}
        <div className="flex justify-between">
          <span className="text-gray-500">Phone</span>
          <span className="font-medium text-gray-700">{form.mobile}</span>
        </div>

        {/* Nationality */}
        <div className="flex justify-between">
          <span className="text-gray-500">Nationality</span>
          <span className="font-medium text-gray-700">{form.nationality}</span>
        </div>

        {/* Address */}
        <div className="flex justify-between">
          <span className="text-gray-500">Address</span>
          <span className="font-medium text-gray-700 text-right">
            {`${form.barangay_name}, ${form.city_name}, ${form.province_name}`}
          </span>
        </div>

        {/* ID Type */}
        <div className="flex justify-between">
          <span className="text-gray-500">ID Type Detected</span>
          <span className="font-medium text-gray-700">{form.typeOfPayor}</span>
        </div>

        {/* Valid ID */}
        <div className="flex justify-between">
          <span className="text-gray-500">Valid ID</span>
          <span className="font-medium text-gray-700">
            {form.valid_id ? "Yes" : "No"}
          </span>
        </div>

        {/* Preview Base64 image */}
        <div className="mt-2">
          {form.base64 ? (
            <img
              src={`data:image/jpeg;base64,${form.base64}`}
              alt="Uploaded Government ID"
              className="w-48 h-auto rounded-lg border border-gray-300"
            />
          ) : (
            <span className="text-gray-400">No ID uploaded yet</span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          type="button"
          onClick={backstep2}
          className="w-1/2 py-2 bg-gray-400 text-white rounded-lg"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="w-1/2 py-2 bg-green-600 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
