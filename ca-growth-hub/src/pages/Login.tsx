import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { AlertCircle, Mail, Lock, LogIn } from "lucide-react";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

type LoginStep = "role" | "request" | "verify";

const Login = () => {
  const { requestOtp, verifyOtp, manualLogin } = useAuth();
  const [step, setStep] = useState<LoginStep>("role");
  const [selectedRole, setSelectedRole] = useState<string>("user");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authMethod, setAuthMethod] = useState<"otp" | "password">("otp");

  const canUseManualLogin =
    import.meta.env.DEV && import.meta.env.VITE_ENABLE_MANUAL_LOGIN === "true";

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setStep("request");
    setError(null);
    setDevOtp(null);
  };

  const handleRequest = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await requestOtp(identifier, selectedRole);
      if (result.token) {
        return;
      }

      setDevOtp(result.devOtp); // Show OTP if in dev mode
      setStep("verify");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError(null);
    setLoading(true);
    try {
      await verifyOtp(identifier, otp);
      // redirect handled by auth.verifyOtp
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await manualLogin(identifier, selectedRole);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Role selection step
  if (step === "role") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-600 rounded-full p-3">
                <LogIn className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Select Your Role</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Choose your account type to continue
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { value: "super_admin", label: "Super Admin", desc: "Full system access" },
                { value: "admin", label: "Admin", desc: "Team and account management" },
                { value: "user", label: "User", desc: "Standard access" },
              ].map((role) => (
                <button
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-indigo-600">
                        {role.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{role.desc}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-indigo-500"></div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Login step
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 rounded-full p-3">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <p className="text-xs text-muted-foreground mt-2">
            Signing in as <span className="font-semibold capitalize">{selectedRole}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Auth Method Tabs */}
            {step === "request" && (
              <div className="flex gap-2 border-b">
                <button
                  onClick={() => setAuthMethod("otp")}
                  className={`pb-2 px-2 text-sm font-medium transition-colors ${
                    authMethod === "otp"
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  OTP
                </button>
                {canUseManualLogin && (
                  <button
                    onClick={() => setAuthMethod("password")}
                    className={`pb-2 px-2 text-sm font-medium transition-colors ${
                      authMethod === "password"
                        ? "border-b-2 border-indigo-600 text-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Password
                  </button>
                )}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Phone
              </label>
              <Input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com or +1234567890"
                disabled={loading}
                className="w-full"
              />
            </div>

            {/* OTP Input */}
            {step === "verify" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  disabled={loading}
                  className="w-full"
                />
                
                {/* Dev Mode OTP Display */}
                {devOtp && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs font-semibold text-yellow-800 mb-1">
                      🔧 Development Mode
                    </p>
                    <p className="text-sm font-mono text-yellow-900">
                      OTP: <span className="text-base font-bold">{devOtp}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Password Input */}
            {step === "request" && authMethod === "password" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full"
                />
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            {step === "request" ? (
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={
                    authMethod === "password" ? handlePasswordLogin : handleRequest
                  }
                  disabled={loading || !identifier}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  {loading
                    ? authMethod === "password"
                      ? "Signing in..."
                      : "Sending…"
                    : authMethod === "password"
                      ? "Sign In"
                      : "Send OTP"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep("role")}
                  disabled={loading}
                >
                  Back
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleVerify}
                  disabled={loading || !otp}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  {loading ? "Verifying…" : "Verify OTP"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep("request");
                    setOtp("");
                    setDevOtp(null);
                  }}
                  disabled={loading}
                >
                  Back
                </Button>
              </div>
            )}

            {/* Social Login */}
            <div className="pt-4 border-t">
              <p className="text-center text-xs text-gray-500 mb-3">
                Or continue with
              </p>
              <div className="flex gap-3 justify-center">
                <button className="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-lg">🔵</span>
                </button>
                <button className="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-lg">f</span>
                </button>
                <button className="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-lg">🍎</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
