import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { changePassword } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";
import { Spinner } from "../../components/ui/Spinner";

export default function ForceChangePassword() {
  const navigate = useNavigate();
  const { role, updateUser } = useAuthStore();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      await changePassword({
        old_password: data.old_password,
        new_password: data.new_password,
      });
      updateUser({ must_change_password: false });
      navigate(role === "admin" ? "/admin/dashboard" : "/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.old_password ||
          err.response?.data?.detail ||
          "Failed to change password."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Change Your Password</h2>
            <p className="text-sm text-gray-500 mt-1">
              You must set a new password before continuing.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label className="label">Current Password</label>
              <input
                type="password"
                className="input"
                {...register("old_password", { required: "Required" })}
              />
            </div>
            <div className="mb-4">
              <label className="label">New Password</label>
              <input
                type="password"
                className="input"
                placeholder="Min 8 chars, 1 uppercase, 1 digit"
                {...register("new_password", {
                  required: "Required",
                  minLength: { value: 8, message: "Min 8 characters" },
                  validate: {
                    hasUpper: (v) =>
                      /[A-Z]/.test(v) || "Must contain 1 uppercase letter",
                    hasDigit: (v) =>
                      /[0-9]/.test(v) || "Must contain 1 digit",
                  },
                })}
              />
              {errors.new_password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.new_password.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="label">Confirm New Password</label>
              <input
                type="password"
                className="input"
                {...register("confirm_password", {
                  required: "Required",
                  validate: (v) =>
                    v === watch("new_password") || "Passwords do not match",
                })}
              />
              {errors.confirm_password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-2.5"
            >
              {isSubmitting ? <Spinner size="sm" /> : "Set New Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
