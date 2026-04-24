import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    pin?: string;
}

interface AuthState {
    user: User | null;
    savedUser: User | null; // For "Locked" state
    isAuthenticated: boolean;
    isLocked: boolean;
    login: (email: string, password: string) => Promise<void>;
    googleLogin: () => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    setPin: (pin: string) => void;
    verifyPin: (pin: string) => boolean;
    lockApp: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            savedUser: null,
            isAuthenticated: false,
            isLocked: false,

            login: async (email, password) => {
                // Mock API Call
                await new Promise(resolve => setTimeout(resolve, 800));
                if (email === "demo@error.com") throw new Error("Invalid credentials");

                const user = {
                    id: '1',
                    name: 'Dr. Stephen Strange',
                    email: email,
                    avatar: 'https://github.com/shadcn.png'
                };

                // Keep existing PIN if email matches
                const { savedUser } = get();
                if (savedUser && savedUser.email === email && savedUser.pin) {
                    user['pin'] = savedUser.pin;
                }

                set({ isAuthenticated: true, user, savedUser: user, isLocked: false });
            },

            googleLogin: async () => {
                // Mock Google Auth
                await new Promise(resolve => setTimeout(resolve, 1000));
                const user = {
                    id: 'google-123',
                    name: 'Stephen Strange (Google)',
                    email: 'strange@gmail.com',
                    avatar: 'https://github.com/shadcn.png'
                };
                set({ isAuthenticated: true, user, savedUser: user, isLocked: false });
            },

            signup: async (name, email, password) => {
                // Mock Signup
                await new Promise(resolve => setTimeout(resolve, 1000));
                const user = {
                    id: 'new-user-1',
                    name: name,
                    email: email,
                    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
                };
                set({ isAuthenticated: true, user, savedUser: user, isLocked: false });
            },

            logout: () => set({ user: null, isAuthenticated: false }),

            registerPasskey: async () => {
                if (!window.PublicKeyCredential) {
                    throw new Error("WebAuthn not supported");
                }

                // Demo Challenge (In real app, fetch from server)
                const challenge = new Uint8Array(32);
                window.crypto.getRandomValues(challenge);

                const publicKey: PublicKeyCredentialCreationOptions = {
                    challenge,
                    rp: { name: "Prescripto", id: window.location.hostname },
                    user: {
                        id: Uint8Array.from("demo-user-id", c => c.charCodeAt(0)),
                        name: "Dr. Strange",
                        displayName: "Dr. Stephen Strange",
                    },
                    pubKeyCredParams: [{ alg: -7, type: "public-key" }],
                    authenticatorSelection: { authenticatorAttachment: "platform" },
                    timeout: 60000,
                    attestation: "direct"
                };

                await navigator.credentials.create({ publicKey });
                // In real app, send credential to server for verification
            },

            loginPasskey: async () => {
                const challenge = new Uint8Array(32);
                window.crypto.getRandomValues(challenge);

                const publicKey: PublicKeyCredentialRequestOptions = {
                    challenge,
                    rpId: window.location.hostname,
                    userVerification: "required",
                    timeout: 60000,
                };

                await navigator.credentials.get({ publicKey });

                // Simulating successful login after biometric check
                set({
                    isAuthenticated: true,
                    user: {
                        id: 'biometric-user',
                        name: 'Dr. Strange (Biometric)',
                        email: 'biometric@clinic.com',
                        avatar: 'https://github.com/shadcn.png'
                    }
                });
            }
        }),
        {
            name: 'auth-storage',
        }
    )
);
