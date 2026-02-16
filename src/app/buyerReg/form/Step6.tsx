interface Step6Props {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep5: () => void;
  nextStep3: () => void; // back button
  loading?: boolean;
}

export default function Step6({
  form,
  handleChange,
  nextStep5,
  nextStep3,
  loading = false,
}: Step6Props) {
  return (
    <div id="step2" className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        Email & Password
      </h2>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          required
          placeholder="example@email.com"
          className="bg-white mt-1 w-full rounded-lg border-gray-300 px-3 py-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            required
            placeholder="Enter password"
            className="bg-white mt-1 w-full rounded-lg border-gray-300 px-3 py-2 focus:ring-green-500 focus:border-green-500"
          />
          <p className="text-xs text-gray-700 mt-1">
            At least 8 characters.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password_confirmation"
            onChange={handleChange}
            value={form.password_confirmation}
            required
            placeholder="Re-enter password"
            className="bg-white mt-1 w-full rounded-lg border-gray-300 px-3 py-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          className="bg-accent text-white w-1/2 py-2 rounded-lg"
          onClick={nextStep3}
          disabled={loading}
        >
          Back
        </button>

        <button
          className="btn-primary w-1/2 py-2 rounded-lg !bgAccent text-white"
          onClick={nextStep5}
          disabled={loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}
