"use client";

import { useEffect, useState } from "react";
import { Toast } from "primereact/toast";

// TypeScript interfaces removed for JavaScript compatibility

export function useRegister(showToast) {
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        mobile: "",
        otp: "",
        govId: null,

        street_address: "",
        province: "",
        city: "",
        barangay: "",
    });

    const [otpTimer, setOtpTimer] = useState(0);
    const [otpInterval, setOtpInterval] = useState(null);

    // Dummy location data (replace with API later)
    const provinces = [
        { code: "P1", name: "Province 1" },
        { code: "P2", name: "Province 2" },
    ];

    const cities =
        form.province === "P1"
            ? [
                { code: "C1", name: "City 1" },
                { code: "C2", name: "City 2" },
            ]
            : form.province === "P2"
                ? [{ code: "C3", name: "City 3" }]
                : [];

    const barangays =
        form.city === "C1"
            ? [
                { code: "B1", name: "Barangay 1" },
                { code: "B2", name: "Barangay 2" },
            ]
            : form.city === "C3"
                ? [{ code: "B3", name: "Barangay 3" }]
                : [];

    // OTP Timer
    const startOtpTimer = () => {
        setOtpTimer(300);
        const interval = window.setInterval(() => {
            setOtpTimer((prev) => prev - 1);
        }, 1000);

        setOtpInterval(interval);
    };

    useEffect(() => {
        if (otpTimer <= 0 && otpInterval !== null) {
            clearInterval(otpInterval);
            setOtpInterval(null);
        }
    }, [otpTimer, otpInterval]);

    // Handle input
    const handleChange = (
        e
    ) => {
        const { name, value, files } = e.target;

        if (name === "govId" && files) {
            const file = files[0];
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
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

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

    const verifyOTP = () => {
        showToast({
            severity: "success",
            summary: "OTP Verified",
            detail: "Your OTP is correct, proceed to next step",
        });
        setStep(2);
    };

    return {
        step,
        form,
        otpTimer,
        provinces,
        cities,
        barangays,
        handleChange,
        sendOTP,
        verifyOTP,
        setStep,
    };
}
