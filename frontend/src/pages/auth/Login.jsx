import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { login } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";
import { Spinner } from "../../components/ui/Spinner";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");

    try {
      const res = await login(data);

      setAuth({
        user: res.data.user,
        access: res.data.access,
        role: res.data.role,
      });

      if (res.data.user.must_change_password) {
        navigate("/change-password", { replace: true });
      } else {
        navigate(
          res.data.role === "admin"
            ? "/admin/dashboard"
            : "/dashboard",
          { replace: true }
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.non_field_errors?.[0] ||
          err.response?.data?.detail ||
          "Login failed. Please try again."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-linear-to-br from-brand-50 to-indigo-100 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* <motion.div
            initial={{ scale: 0.7, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 220,
            }}
            className="inline-flex h-20 w-20 items-center justify-center mb-4"
          > */}
           <img
              src="/logo.png"
              alt="Logo"
              className="inline-flex h-24 w-24 items-center justify-center mb-2 object-contain"
            />
          {/* </motion.div> */}

          <h1 className="text-2xl font-bold text-gray-900">
            Royal Designs
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Sign in to your workspace
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="card p-8 shadow-xl"
        >
          <motion.form
            variants={container}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {error && (
              <motion.div
                variants={item}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={item} className="mb-4">
              <label htmlFor="email" className="label">
                Email address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`input ${
                  errors.email ? "border-red-400" : ""
                }`}
                placeholder="you@company.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={item} className="mb-6">
              <label htmlFor="password" className="label">
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  className={`input pr-10 ${
                    errors.password ? "border-red-400" : ""
                  }`}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? (
                    <EyeSlashIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            <motion.button
              variants={item}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-2.5"
            >
              {isSubmitting ? (
                <Spinner size="sm" />
              ) : (
                "Sign in"
              )}
            </motion.button>
          </motion.form>

          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="mt-4 text-center"
          >
            <Link
              to="/forgot-password"
              className="text-sm text-brand-600 hover:text-brand-800"
            >
              Forgot your password?
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}