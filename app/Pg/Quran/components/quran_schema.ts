// use type any for ts-v5-bug

// chapter_details_type
export type chapter_details_type = {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
  surahNo: number;
}[];

// ayat_al_sajda_reference_type
export type ayat_al_sajda_reference_type = {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
  surahNo: number;
}[];

// source_type
export type source_type = {
  author: string;
  revelation_period: string;
  revelation_place: string[];
  style: string;
  method_of_revelation: string;
};

// details_type
export type details_type = {
  name: string;
  author: string;
  language: string;
  direction: string;
  source: string;
  comments: string;
  link: {
    original: string;
    latin: string;
    latin_diacritical: string;
  };
}[];

// metadata_type
export type metadata_type = {
  quran_name: string;
  language: string;
  total_verses: number;
  total_surahs: number;
  total_juz: number;
  total_hizb: number;
  total_rub_el_hizb: number;
  total_ayat_al_sajda: number;
  total_bismillah: number;
  total_pages: number;
  details: details_type;
  chapter_details: chapter_details_type;
  ayat_al_sajda_reference: ayat_al_sajda_reference_type;
  source: source_type;
}[];
