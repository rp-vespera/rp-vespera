import { useEffect, useState } from "react";
import { LocationService } from "@/Domain/PA/Services/BuyerRegService";
import { LocationModel } from "@/Domain/PA/Model/BuyerRegModel";

export function useRegister(showToast: (options: any) => void) {
  const [step, setStep] = useState<number>(1);

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    otp: "",
    govId: null as File | null,
    province: "",
    city: "",
    barangay: "",
    gender: "",
    birthDate: "",
    birthPlace: "",
    civilStatus: "",
    nationality: "",
    typeOfPayor: "",
    email: "",
    password: "",
  });

  const [otpTimer, setOtpTimer] = useState(0);
  const [otpInterval, setOtpInterval] = useState<number | null>(null);

  const [provinces, setProvinces] = useState<LocationModel[]>([]);
  const [cities, setCities] = useState<LocationModel[]>([]);
  const [barangays, setBarangays] = useState<LocationModel[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingBarangays, setLoadingBarangays] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const verifyID = () => {
    if (!form.govId) {
      alert("Please upload your government ID.");
      return;
    }
    console.log("Verifying ID:", form.govId);
    setStep(3); // move to next step
  };
  // -------------------------------
  // OTP Timer
  // -------------------------------
  const startOtpTimer = () => {
    setOtpTimer(300);
    const interval = window.setInterval(
      () => setOtpTimer((prev) => prev - 1),
      1000,
    );
    setOtpInterval(interval);
  };

  useEffect(() => {
    if (otpTimer <= 0 && otpInterval !== null) {
      clearInterval(otpInterval);
      setOtpInterval(null);
    }
  }, [otpTimer, otpInterval]);

  // -------------------------------
  // Handle Input
  // -------------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    if (
      target instanceof HTMLInputElement &&
      target.files &&
      name === "govId"
    ) {
      const file = target.files[0];
      const allowed = ["image/jpeg", "image/png"];
      if (!allowed.includes(file.type)) {
        showToast({
          severity: "error",
          summary: "Invalid File",
          detail: "Only JPG/PNG allowed",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast({
          severity: "error",
          summary: "File Too Large",
          detail: "Max 5MB allowed",
        });
        return;
      }
      setForm((prev) => ({ ...prev, govId: file }));

      // set preview
      if (file.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }

      return;
    }

    // Normal input/select changes
    setForm((prev) => {
      if (name === "province")
        return { ...prev, province: value, city: "", barangay: "" };
      if (name === "city") return { ...prev, city: value, barangay: "" };
      return { ...prev, [name]: value };
    });
  };

  // -------------------------------
  // Send OTP
  // -------------------------------
  const sendOTP = () => {
    if (!form.mobile || !form.firstName || !form.lastName) {
      showToast({
        severity: "error",
        summary: "Missing Fields",
        detail: "Please fill required fields",
      });
      return;
    }
    startOtpTimer();
    showToast({
      severity: "success",
      summary: "OTP Sent",
      detail: "OTP has been sent to your mobile number",
    });
    setStep(1.1);
  };

  const verifyOTP = async () => {
     if (!form.otp) {
      showToast({
        severity: "error",
        summary: "Missing Fields",
        detail: "Please fill required fields",
      });
      return;
    }
    showToast({
      severity: "success",
      summary: "OTP Verified",
      detail: "Your OTP is correct, proceed to next step",
    });
    setStep(2);
  };
  const verifyCard = async () => {
    showToast({
      severity: "success",
      summary: "OTP Verified",
      detail: "Your OTP is correct, proceed to next step",
    });
    setStep(4);
  };
  const nextStep = () => {
    showToast({
      severity: "success",
      summary: "Next Page",
      detail: "Proceeding to next step",
    });
    setStep(2.1);
  };
  const nextStep3 = () => {
    showToast({
      severity: "success",
      summary: "Next Page",
      detail: "Proceeding to next step",
    });
    setStep(3);
  };
  const nextStep5 = () => {
    showToast({
      severity: "success",
      summary: "Next Page",
      detail: "Proceeding to next step",
    });
    setStep(5);
  };
  const backstep2 = () => {
    showToast({
      severity: "success",
      summary: "Previous Page",
      detail: "Returning to previous step",
    });
    setStep(2.1);
  };
  const backstep = () => {
    showToast({
      severity: "success",
      summary: "Previous Page",
      detail: "Returning to previous step",
    });
    setStep(2);
  };

  // -------------------------------
  // Load Locations
  // -------------------------------
  useEffect(() => {
    const loadProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const data = await LocationService.getProvinces();
        setProvinces(data);
      } catch (err) {
        console.error(err);
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Failed to load provinces",
        });
      } finally {
        setLoadingProvinces(false);
      }
    };
    loadProvinces();
  }, []);

  useEffect(() => {
    if (!form.province) {
      setCities([]);
      setBarangays([]);
      return;
    }

    const loadCities = async () => {
      setLoadingCities(true);
      try {
        const data = await LocationService.getCities(form.province);
        setCities(data);
        setBarangays([]);
      } catch (err) {
        console.error(err);
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Failed to load cities",
        });
      } finally {
        setLoadingCities(false);
      }
    };
    loadCities();
  }, [form.province]);

  useEffect(() => {
    if (!form.city) {
      setBarangays([]);
      return;
    }

    const loadBarangays = async () => {
      setLoadingBarangays(true);
      try {
        const data = await LocationService.getBarangays(form.city);
        setBarangays(data);
      } catch (err) {
        console.error(err);
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Failed to load barangays",
        });
      } finally {
        setLoadingBarangays(false);
      }
    };
    loadBarangays();
  }, [form.city]);

  useEffect(() => {
    const savedForm = sessionStorage.getItem("buyerRegForm");
    const savedStep = sessionStorage.getItem("buyerRegStep");

    if (savedForm) {
      setForm((prev) => ({
        ...prev,
        ...JSON.parse(savedForm),
        govId: null, // File objects cannot be restored
      }));
    }

    if (savedStep) {
      setStep(Number(savedStep));
    }
  }, []);
  useEffect(() => {
    const { govId, ...safeForm } = form; // remove File object
    sessionStorage.setItem("buyerRegForm", JSON.stringify(safeForm));
  }, [form]);
  useEffect(() => {
    sessionStorage.setItem("buyerRegStep", String(step));
  }, [step]);
  return {
    step,
    form,
    otpTimer,
    provinces,
    cities,
    barangays,
    loadingProvinces,
    loadingCities,
    loadingBarangays,
    handleChange,
    sendOTP,
    verifyOTP,
    setStep,
    nextStep,
    nextStep3,
    backstep2,
    backstep,
    verifyID,
    setPreview,
    preview,
    verifyCard,
    nextStep5,
  };
}
