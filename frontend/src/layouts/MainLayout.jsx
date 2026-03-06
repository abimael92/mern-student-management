/**
 * Main layout: original design shell (Header + Footer + Container).
 * No sidebar; navigation is in the role-aware Header.
 */
import React from 'react';
import AppLayoutShell from './AppLayoutShell';

const MainLayout = ({ children }) => {
  return <AppLayoutShell>{children}</AppLayoutShell>;
};

export default MainLayout;

