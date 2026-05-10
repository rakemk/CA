import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

const Login = () => {
  const { requestOtp, verifyOtp, manualLogin } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canUseManualLogin = import.meta.env.DEV && import.meta.env.VITE_ENABLE_MANUAL_LOGIN === "true";

  const handleRequest = async () => {
    setError(null);
    setLoading(true);
    try {
      await requestOtp(identifier);
      setStep("verify");
    } catch (error) {
      setError(getErrorMessage(error));
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
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleManualLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await manualLogin(identifier);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-muted-foreground">Email or phone</label>
            <Input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="you@example.com or +123456789" />

            {step === "verify" && (
              <>
                <label className="block text-sm font-medium text-muted-foreground">OTP</label>
                <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" />
              </>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}

            {step === "request" ? (
              <div className="flex items-center gap-2">
                <Button onClick={handleRequest} disabled={loading || !identifier}>
                  {loading ? "Sending…" : "Send OTP"}
                </Button>
                {canUseManualLogin && (
                  <Button variant="outline" onClick={handleManualLogin} disabled={loading || !identifier}>
                    {loading ? "Signing in..." : "Manual Login"}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button onClick={handleVerify} disabled={loading || !otp}>
                  {loading ? "Verifying…" : "Verify OTP"}
                </Button>
                <Button variant="ghost" onClick={() => setStep("request")}>Back</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
