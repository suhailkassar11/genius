"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("08cda179-5ad2-4f8f-8e7f-dc31241e4c90");
  }, []);

  return null;
};