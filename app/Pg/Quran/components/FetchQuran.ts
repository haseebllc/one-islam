// fetchQuran.ts
// import axios from "axios";
const baseUrl = "https://islamapi.vercel.app";

// fetchAction
const fetchUrl = async (url: string) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data) return data;
  } catch (err) {
    return console.log("err in fetch quran is :", err);
  }
};

// fetch Quran Metadata
export const GetQuranMetaData = async () => {
  const url = `${baseUrl}/api/quran`;
  const data = await fetchUrl(url);
  return await data;
};

// Get Quran All-Chapters in specific-language
export const GetQuran__AllChapters = async (
  language: string,
  version: string
) => {
  const url = `${baseUrl}/api/quran/${language}/${version}`;
  const data = await fetchUrl(url);
  return await data;
};

// Get Quran specific Chapters in specific-language
export const GetQuran__SoloChapter = async (
  language: string,
  version: string,
  chapter: string | number
) => {
  const url = `${baseUrl}/api/quran/${language}/${version}/${chapter}`;
  const data = await fetchUrl(url);
  return await data;
};
