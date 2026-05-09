"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Service } from "../generated/prisma/client";


type ServicesContextValue = {
  services: Service[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const ServicesContext = createContext<ServicesContextValue | undefined>(
  undefined
);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data: Service[] = await res.json();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServicesContext.Provider
      value={{ services, loading, error, refetch: fetchServices }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const ctx = useContext(ServicesContext);
  if (!ctx) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return ctx;
}
