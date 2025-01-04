// hooks/useIslamicDate.ts
"use client";

import { useState, useEffect } from "react";
import moment from "moment-hijri";

interface IslamicDate {
  islamicDayRoman: number;
  islamicMonthRoman: string;
  islamicYearRoman: number;
  islamicDayArabic: string;
  islamicMonthArabic: string;
  islamicYearArabic: string;
}

const hijriMonthNames: string[] = [
  "Muharram",
  "Safar",
  "Rabi’ al-awwal",
  "Rabi’ al-Thani",
  "Jumada al-awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha’ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi’dah",
  "Dhu al-Hijjah",
];

const useIslamicDate = (): IslamicDate => {
  const [islamicDate, setIslamicDate] = useState<IslamicDate | null>(null);

  useEffect(() => {
    const hijriDate = moment(); // Get current Hijri date
    const day = hijriDate.iDate();
    const monthIndex = hijriDate.iMonth();
    const year = hijriDate.iYear();

    // Populate the islamicDate object
    setIslamicDate({
      islamicDayRoman: day,
      islamicMonthRoman: hijriMonthNames[monthIndex],
      islamicYearRoman: year,
      islamicDayArabic: convertToArabicNumerals(day),
      islamicMonthArabic: convertToArabicMonth(monthIndex),
      islamicYearArabic: convertToArabicNumerals(year),
    });
  }, []);

  const convertToArabicNumerals = (number: number): string => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return globalThis
      .String(number)
      .split("")
      .map((digit) => arabicNumbers[globalThis.parseInt(digit, 10)])
      .join("");
  };

  const convertToArabicMonth = (index: number): string => {
    const arabicMonths: string[] = [
      "محرّم",
      "صفر",
      "ربيع الأوّل",
      "ربيع الآخر",
      "جمادى الأولى",
      "جمادى الآخرة",
      "رجب",
      "شعبان",
      "رمضان",
      "شوّال",
      "ذو القعدة",
      "ذو الحجة",
    ];
    return arabicMonths[index];
  };

  // Ensure to return a default value if islamicDate is null
  return (
    islamicDate || {
      islamicDayRoman: 0,
      islamicMonthRoman: "",
      islamicYearRoman: 0,
      islamicDayArabic: "",
      islamicMonthArabic: "",
      islamicYearArabic: "",
    }
  );
};

export default useIslamicDate;
