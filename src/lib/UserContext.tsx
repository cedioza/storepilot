"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Role, User, users, getInventorySummary } from "@/lib/userData";

interface UserContextType {
  currentUser: User;
  selectedRole: Role;
  setSelectedRole: (role: Role) => void;
  inventorySummary: ReturnType<typeof getInventorySummary>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [selectedRole, setSelectedRole] = useState<Role>("PRO");

  const currentUser = users[selectedRole];
  const inventorySummary = getInventorySummary(selectedRole);

  return (
    <UserContext.Provider value={{ currentUser, selectedRole, setSelectedRole, inventorySummary }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
