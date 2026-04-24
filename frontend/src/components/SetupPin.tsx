import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { Lock, Check, KeyRound } from "lucide-react";
import { useState } from "react";

export function SetupPin() {
    const { user, setPin } = useAuthStore();
    const [pin, setPinValue] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        if (pin.length === 4) {
            setPin(pin);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                <Input
                    type="password"
                    maxLength={4}
                    placeholder="Set 4-digit PIN"
                    className="w-32 tracking-[0.5em] text-center font-bold"
                    value={pin}
                    onChange={(e) => setPinValue(e.target.value.replace(/\D/g, ''))}
                />
            </div>
            <Button onClick={handleSave} disabled={pin.length !== 4} className={isSaved ? "bg-green-600" : ""}>
                {isSaved ? <Check className="w-4 h-4 mr-2" /> : <KeyRound className="w-4 h-4 mr-2" />}
                {isSaved ? "Saved" : "Set PIN"}
            </Button>
        </div>
    );
}
