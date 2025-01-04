"use client";
import scss from "../page.module.scss";
import light from "../theme/light.module.scss";
import dark from "../theme/dark.module.scss";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { hadithSliceStateType } from "@/app/redux/reducers/CurrentHadithReducer";
import { fetch_Hadith_book_chapter } from "./FetchHadith";
import { hadith_Chapter_type } from "./hadith_schema";
import { useGContext } from "@/app/contextApi/contextApi";

export const Chapter_Hadiths = () => {
  const { theme } = useGContext();
  const themeScss = theme === "light" ? light : dark;

  const [loading, setLoading] = useState<boolean>(true);
  const [ChapterData, setChapterData] = useState([]);
  const [hadithBookName, setHadithBookName] = useState<string>("");

  const CurrentHadithSlice_state = useSelector(
    (state: { CurrentHadithSlice_key: hadithSliceStateType }) =>
      state.CurrentHadithSlice_key
  );

  useEffect(() => {
    if (CurrentHadithSlice_state)
      setHadithBookName(CurrentHadithSlice_state.book);

    const fetchAction = async () => {
      if (CurrentHadithSlice_state.book && CurrentHadithSlice_state.chapter) {
        setLoading(true);
        const arabicData: hadith_Chapter_type = await fetch_Hadith_book_chapter(
          CurrentHadithSlice_state.book as string,
          "arabic" as string,
          CurrentHadithSlice_state.chapter as number
        );
        const englishData: hadith_Chapter_type =
          await fetch_Hadith_book_chapter(
            CurrentHadithSlice_state.book as string,
            "english" as string,
            CurrentHadithSlice_state.chapter as number
          );

        if (arabicData && englishData) {
          setChapterData([
            { arabicData: arabicData, englishData: englishData },
          ]);
        }
        setLoading(false);
      }
    };
    fetchAction();
  }, [CurrentHadithSlice_state.book, CurrentHadithSlice_state.chapter]);

  const chapterHadithsRef = useRef<HTMLDivElement>(null);
  const {
    scroll_to_first_hadith,
    set_scroll_to_first_hadith,
    scroll_to_last_hadith,
    set_scroll_to_last_hadith,
  } = useGContext();

  //  Scroll To First-Hadith
  useEffect(() => {
    if (chapterHadithsRef.current && scroll_to_first_hadith)
      chapterHadithsRef.current.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    set_scroll_to_first_hadith(false);
  }, [scroll_to_first_hadith]);

  // Scroll To Last-Hadith
  useEffect(() => {
    if (chapterHadithsRef.current && scroll_to_last_hadith)
      chapterHadithsRef.current.scrollTo({
        behavior: "smooth",
        top: chapterHadithsRef.current.scrollHeight,
      });
    set_scroll_to_last_hadith(false);
  }, [scroll_to_last_hadith]);

  return (
    <>
      {loading ? (
        <p className={classNames(themeScss.loading, scss.loading, "syne")}>
          loading...
        </p>
      ) : (
        <>
          {(ChapterData as any).map((elem: any, index: number) => {
            return (
              <div
                className={classNames(
                  themeScss.currentChap_hadiths_container,
                  scss.currentChap_hadiths_container
                )}
                key={index}
                ref={chapterHadithsRef}
              >
                {elem.arabicData.hadith_list.map(
                  (arabicHadith: any, idx: number) => (
                    <div
                      className={classNames(
                        themeScss.hadith_box,
                        scss.hadith_box
                      )}
                      key={idx}
                    >
                      <div
                        className={classNames(
                          themeScss.refrence_nd_arabicHadith,
                          scss.refrence_nd_arabicHadith
                        )}
                      >
                        <p
                          className={classNames(
                            themeScss.referenceTag,
                            scss.referenceTag
                          )}
                        >
                          book reference:
                          <span>
                            {hadithBookName} ( {arabicHadith.hadithNum_inBook} )
                          </span>
                          <br />
                          chapter reference:
                          <span>
                            {elem.englishData.english_title} ({" "}
                            {arabicHadith.hadithNum_inChapter} )
                          </span>
                        </p>
                        <p
                          className={classNames(
                            themeScss.arabicText,
                            scss.arabicText
                          )}
                        >
                          {arabicHadith.arabic_text}
                        </p>
                      </div>

                      <div
                        className={classNames(
                          themeScss.englishText_nd_grade,
                          scss.englishText_nd_grade
                        )}
                      >
                        <h5>
                          narrator:{" "}
                          {elem.englishData.hadith_list[idx].narrator ||
                            "unknown"}
                        </h5>
                        <p className="syne">
                          {elem.englishData.hadith_list[idx].english_text}
                        </p>
                        <h6>
                          grade:{" "}
                          {elem.englishData.hadith_list[idx].grade || "none"}
                        </h6>
                      </div>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
