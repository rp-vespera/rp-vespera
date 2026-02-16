import { Button } from "primereact/button";

interface Location {
  code: string;
  name: string;
}

interface Step4Props {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  provinces: Location[];
  cities: Location[];
  barangays: Location[];
  loadingProvinces: boolean;
  loadingCities: boolean;
  loadingBarangays: boolean;
  loading: boolean;
  backstep: () => void;
  nextStep3: () => void;
}

export default function Step4({
  form,
  handleChange,
  provinces,
  cities,
  barangays,
  loadingProvinces,
  loadingCities,
  loadingBarangays,
  loading,
  backstep,
  nextStep3,
}: Step4Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-700">
        Address Information
      </h3>

      {/* Province */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Province <span className="text-red-700">*</span>
        </label>
        <select
          name="province"
          value={form.province}
          onChange={handleChange}
          className="bg-white w-full rounded-lg px-3 py-2"
          disabled={loadingProvinces}
        >
          <option value="">
            {loadingProvinces
              ? "Loading provinces..."
              : "Select Province"}
          </option>
          {provinces.map((prov) => (
            <option key={prov.code} value={prov.code}>
              {prov.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          City <span className="text-red-700">*</span>
        </label>
        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          disabled={!form.province || loadingCities}
          className="bg-white w-full rounded-lg px-3 py-2"
        >
          <option value="">
            {loadingCities ? "Loading cities..." : "Select City"}
          </option>
          {cities.map((city) => (
            <option key={city.code} value={city.code}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Barangay */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Barangay <span className="text-red-700">*</span>
        </label>
        <select
          name="barangay"
          value={form.barangay}
          onChange={handleChange}
          disabled={!form.city || loadingBarangays}
          className="bg-white w-full rounded-lg px-3 py-2"
        >
          <option value="">
            {loadingBarangays
              ? "Loading barangays..."
              : "Select Barangay"}
          </option>
          {barangays.map((brgy) => (
            <option key={brgy.code} value={brgy.code}>
              {brgy.name}
            </option>
          ))}
        </select>
      </div>

      <div className="gap-2 flex">
        <Button
          className="w-1/2 bg-accent !border-none text-white rounded-lg"
          loading={loading}
          onClick={backstep}
        >
          Back
        </Button>

        <Button
          className="w-1/2 btn-primary text-white rounded-lg"
          loading={loading}
          onClick={nextStep3}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
