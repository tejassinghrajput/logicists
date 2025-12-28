import { useEffect, useState } from "react";

export interface Country {
  label: string;
  name: string;
  iso2: string;
  ccnn: string | null;
}

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,ccn3",
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch countries");

        const data = await res.json();

        const formatted = data
          .filter((c: any) => c.cca2 && c.name?.common)
          .map((c: any) => ({
            label: `${c.name.common.toUpperCase()} (${c.cca2})`,
            name: c.name.common,
            iso2: c.cca2,
            ccnn: c.ccn3 || null
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name));

        setCountries(formatted);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
    return () => controller.abort();
  }, []);

  return { countries, loading, error };
}