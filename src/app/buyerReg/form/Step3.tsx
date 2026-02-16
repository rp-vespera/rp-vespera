import { Button } from "primereact/button";

interface Step2Props {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  loading: boolean;
}

export default function Step3({
  form,
  handleChange,
  nextStep,
  loading,
}: Step2Props) {
  return (
    <div className="step2-form space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        Additional Information
      </h2>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gender<span className="text-red-700">*</span>
        </label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="bg-white mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm py-1 px-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Birth Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Birth Date<span className="text-red-700">*</span>
        </label>
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          className="bg-white py-1 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
      </div>

      {/* Birth Place */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Birth Place<span className="text-red-700">*</span>
        </label>
        <input
          type="text"
          name="birthPlace"
          value={form.birthPlace}
          onChange={handleChange}
          className="bg-white py-1 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          placeholder="City, Province, Country"
        />
      </div>

      {/* Civil Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Civil Status<span className="text-red-700">*</span>
        </label>
        <select
          name="civilStatus"
          value={form.civilStatus}
          onChange={handleChange}
          className="bg-white py-1 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        >
          <option value="">Select Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Widowed">Widowed</option>
          <option value="Divorced">Divorced</option>
        </select>
      </div>

      {/* Nationality */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nationality<span className="text-red-700">*</span>
        </label>
        <input
          type="text"
          name="nationality"
          value={form.nationality}
          onChange={handleChange}
          className="bg-white py-1 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          placeholder="e.g., Filipino"
        />
      </div>

      {/* Type of Payor */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type of Payor<span className="text-red-700">*</span>
        </label>
        <select
          name="typeOfPayor"
          value={form.typeOfPayor}
          onChange={handleChange}
          className="bg-white py-1 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        >
          <option value="">Select Type</option>
          <option value="Company">Company</option>
          <option value="Individual">Individual</option>
        </select>
      </div>

      <Button
        className="w-1/2 text-white rounded-lg"
        icon="pi pi-check"
        loading={loading}
        onClick={nextStep}
      >
        Next
      </Button>
    </div>
  );
}
