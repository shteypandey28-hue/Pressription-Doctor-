import { useState, useEffect } from "react";
import { usePrescriptionStore } from "@/store/prescriptionStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { MEDICINES_MOCK } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

// Simple debounce hook
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export function MedicineSearch() {
    const { searchQuery, setSearchQuery, addMedicine } = usePrescriptionStore();
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedQuery = useDebounce(searchQuery, 300);

    // Search Effect
    useEffect(() => {
        const searchMedicines = async () => {
            if (!debouncedQuery) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            try {
                // Determine if we should use API or Mock (fallback)
                // In production, this would always be API.
                // For now, we try API, if it fails/returns empty and we are in dev, maybe fallback? 
                // No, let's stick to API if backend is running.

                // Assuming backend is proxy-ed or CORS enabled. 
                // Vite proxy usually needed or absolute URL. 
                // Let's assume localhost:3000 for now or relative if proxy set.
                // Assuming no proxy set yet, so using absolute for dev.
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                const res = await fetch(`${apiUrl}/medicines?q=${encodeURIComponent(debouncedQuery)}`);
                if (!res.ok) throw new Error("API Error");
                const data = await res.json();

                // transform data if needed to match keys
                const formatted = data.map((m: any) => ({
                    id: m.id,
                    name: m.name,
                    type: m.type,
                    defaultDosage: m.defaultDosage,
                    defaultFreq: m.defaultFreq || '1-0-1',
                }));

                // If API returns nothing, maybe fallback to MOCK for demo purposes if backend empty?
                // User asked to add dataset, so we expect backend to have data eventually.
                if (formatted.length === 0 && MEDICINES_MOCK.length > 0) {
                    // Fallback check: Filter mock data too
                    const mockResults = MEDICINES_MOCK.filter(m =>
                        m.name.toLowerCase().includes(debouncedQuery.toLowerCase())
                    );
                    setSearchResults(prev => [...formatted, ...mockResults]);
                    // Note: Mixing IDs might be weird, but okay for hybrid.
                } else {
                    setSearchResults(formatted);
                }

            } catch (error) {
                console.error("Search failed, falling back to mock", error);
                // Fallback to mock
                const results = MEDICINES_MOCK.filter(m =>
                    m.name.toLowerCase().includes(debouncedQuery.toLowerCase())
                );
                setSearchResults(results);
            } finally {
                setIsLoading(false);
            }
        };

        searchMedicines();
    }, [debouncedQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleAdd = (med: any) => {
        addMedicine({
            id: med.id.toString(), // Ensure string
            name: med.name,
            dosage: med.defaultDosage || '500mg', // Default if missing
            frequency: med.defaultFreq || '1-0-1',
            duration: '5 days',
            instruction: 'After Food'
        });
        setSearchQuery(''); // Clear search on add
        setSearchResults([]);
    };

    return (
        <div className="relative">
            <div className="relative">
                <Input
                    placeholder="Search medicine (e.g. Paracetamol)..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="text-lg py-6 pl-4"
                    autoFocus
                />
                {isLoading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                    </div>
                )}
            </div>

            {searchQuery && (
                <Card className="absolute w-full mt-2 z-10 shadow-xl max-h-60 overflow-y-auto">
                    <div className="p-2 space-y-1">
                        {searchResults.map((med, idx) => (
                            <div
                                key={med.id || idx}
                                className="flex items-center justify-between p-3 hover:bg-slate-100 rounded-md cursor-pointer transition-colors"
                                onClick={() => handleAdd(med)}
                            >
                                <div>
                                    <p className="font-medium text-slate-900">{med.name}</p>
                                    <p className="text-xs text-slate-500">{med.type} • {med.defaultDosage}</p>
                                </div>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        {!isLoading && searchResults.length === 0 && (
                            <div className="p-4 text-center text-slate-500">
                                No medicines found.
                            </div>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
}
