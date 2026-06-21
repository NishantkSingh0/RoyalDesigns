import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { requestPasswordReset, confirmPasswordReset } from "../../api/auth";
import { Spinner } from "../../components/ui/Spinner";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=email, 2=otp+new pw
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const onEmailSubmit = async (data) => {
    setError("");
    try {
      await requestPasswordReset(data.email);
      setEmail(data.email);
      setStep(2);
      setMessage("OTP sent to your email. Check your inbox.");
    } catch (err) {
      setError(err.response?.data?.email?.[0] || "Failed to send OTP.");
    }
  };

  const onResetSubmit = async (data) => {
    setError("");
    try {
      await confirmPasswordReset({ email, otp: data.otp, new_password: data.new_password });
      navigate("/login", { state: { message: "Password reset successful. Please log in." } });
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || "Invalid OTP or request failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Reset Password</h2>
          <p className="text-sm text-gray-500 mb-6">
            {step === 1 ? "Enter your email to receive a one-time passcode." : `Enter the OTP sent to ${email}.`}
          </p>

          {message && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">{message}</div>}
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

          {step === 1 ? (
            <form onSubmit={handleSubmit(onEmailSubmit)} noValidate>
              <div className="mb-4">
                <label className="label">Email address</label>
                <input type="email" className="input" {...register("email", { required: "Required" })} />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-2.5">
                {isSubmitting ? <Spinner size="sm" /> : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onResetSubmit)} noValidate>
              <div className="mb-4">
                <label className="label">OTP Code</label>
                <input type="text" maxLength={6} className="input tracking-widest text-center text-lg" placeholder="000000" {...register("otp", { required: "Required", minLength: 6 })} />
              </div>
              <div className="mb-4">
                <label className="label">New Password</label>
                <input type="password" className="input" {...register("new_password", { required: "Required", minLength: { value: 8, message: "Min 8 chars" } })} />
              </div>
              <div className="mb-6">
                <label className="label">Confirm New Password</label>
                <input type="password" className="input" {...register("confirm", { required: "Required", validate: v => v === watch("new_password") || "Passwords don't match" })} />
                {errors.confirm && <p className="mt-1 text-xs text-red-600">{errors.confirm.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-2.5">
                {isSubmitting ? <Spinner size="sm" /> : "Reset Password"}
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-brand-600 hover:text-brand-800">Back to Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
