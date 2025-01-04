// fetchHadith.ts
const baseUrl = "https://islamapi.vercel.app";

// fetchAction
const fetchUrl = async (url: string) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    return console.log("err in fetch hadith is :", err);
  }
};

// fetch all-book metadata
export const fetch_hadith_allBook_metadata = async () => {
  const url = `${baseUrl}/api/hadith`;
  const data = await fetchUrl(url);
  return await data;
};

// fetch specific book metadata
export const fetch_hadith_book_metadata = async (book: string) => {
  const url = `${baseUrl}/api/hadith/${book}`;
  const data = await fetchUrl(url);
  return await data;
};

// fetch full-book
export const fetch_Hadith_full_book = async (
  book: string,
  language: string
) => {
  const url = `${baseUrl}/api/hadith/${book}/${language}`;
  const data = await fetchUrl(url);
  return await data;
};

// fetch book single-chapter
export const fetch_Hadith_book_chapter = async (
  book: string,
  language: string,
  chapter: string | number
) => {
  const url = `${baseUrl}/api/hadith/${book}/${language}/chapter/${chapter}`;
  const data = await fetchUrl(url);
  return await data;
};

// fetch book specific verse
export const fetch_Hadith_book_verse = async (
  book: string,
  language: string,
  verse: string | number
) => {
  const url = `${baseUrl}/api/hadith/${book}/${language}/verse/${verse}`;
  const data = await fetchUrl(url);
  return await data;
};
