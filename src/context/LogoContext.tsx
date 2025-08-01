// Minimal stub to prevent import errors
import React from 'react';

export const LogoProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const useLogo = () => ({ logo: null, setLogo: () => {} });
