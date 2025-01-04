// use type any for ts-v5-bug

/*
 ------------- hadith metadata ---------------------------------------
*/

// hadith_metadata_type
export type hadith_metadata_type = {
  book_name_english: string;
  book_name_arabic: string;
  book_short_desc: string;
  total_hadiths_inBook: number;
  total_chapters_inBook: number;
  all_chapters_detail: all_chapters_detail__hadith_metadata_type;
}[];
// hadith_metadata__all_chapters_detail_type
export type all_chapters_detail__hadith_metadata_type = {
  chapter_title_english: string;
  chapter_title_arabic: string;
  total_hadiths_inChapter: number;
  chapter_first_hadith: number;
  chapter_last_hadith: number;
}[];

/*
 ------------- hadith fullBook ---------------------------------------
*/

// hadith_fullBook_type
export type hadith_fullBook_type = {
  name: string;
  short_desc: string;
  total_chapters: number;
  total_hadiths: number;
  all_books: all_books__hadith_fullBook_type;
}[];
// all_books__hadith_fullBook_type
export type all_books__hadith_fullBook_type = {
  chapterNum: number;
  english_title?: string;
  arabic_title?: string;
  totalHadiths_inChapter: number;
  hadith_list: hadth_list__hadith_fullBook_type;
}[];
// hadth_list__hadith_fullBook_type
export type hadth_list__hadith_fullBook_type = {
  hadithNum_inChapter: number;
  hadithNum_inBook: number;
  title: string;
  narrator?: string;
  english_text?: string;
  arabic_text?: string;
  grade: string;
}[];

/*
 ------------- hadith chapter ---------------------------------------
*/

// fetch_hadith_book_metadata_type
export type hadith_Chapter_type = {
  chapterNum: number;
  english_title?: string;
  arabic_title?: string;
  totalHadiths_inChapter: number;
  hadith_list: hadith_list__hadith_Chapter_type;
}[];
// hadith_list__hadith_Chapter_type
export type hadith_list__hadith_Chapter_type = {
  hadithNum_inChapter: number;
  hadithNum_inBook: number;
  title: string;
  narrator?: string;
  english_text?: string;
  arabic_text?: string;
  grade: string;
}[];

/*
 ------------- hadith verse ---------------------------------------
*/

// hadith_verse_type
export type hadith_verse_type = {
  hadithNum_inChapter: number;
  hadithNum_inBook: number;
  title: string;
  narrator?: string;
  english_text?: string;
  arabic_text?: string;
  grade: string;
}[];
