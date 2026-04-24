import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Fingerprint, Loader2, Check } from "lucide-react";
import { useState } from "react";

export function RegisterPasskeyButton() {
    const { registerPasskey } = useAuthStore();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleRegister = async () => {
        setStatus('loading');
        try {
            await registerPasskey();
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (e) {
            console.error(e);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    if (status === 'success') {
        return <Button className="bg-green-600 hover:bg-green-700 gap-2"><Check className="w-4 h-4" /> Registered</Button>
    }

    if (status === 'error') {
        return <Button variant="destructive">Failed</Button>
    }

    return (
        <Button onClick={handleRegister} disabled={status === 'loading'} className="gap-2">
            {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Fingerprint className="w-4 h-4" />}
            Register Passkey
        </Button>
    );
}
