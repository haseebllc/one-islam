"use client";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { fetch_hadith_book_metadata } from "./FetchHadith";
import { useSelector } from "react-redux";
import { hadithSliceStateType } from "@/app/redux/reducers/CurrentHadithReducer";
import { useGContext } from "@/app/contextApi/contextApi";
import { hadith_metadata_type } from "./hadith_schema";
// scss
import scss from "../page.module.scss";
import light from "../theme/light.module.scss";
import dark from "../theme/dark.module.scss";

export const Current_Book_Details = () => {
  const { theme } = useGContext();
  const themeScss = theme === "light" ? light : dark;

  const [loading, setLoading] = useState<boolean>(false);
  const [currentBookMetadata, setCurrentBookMetadata] =
    useState<hadith_metadata_type>([]);
  const [currentChapter, setCurrentChapter] = useState<number>();
  const currentChapterIndex = currentChapter - 1;
  const CurrentHadithSlice_state = useSelector(
    (state: { CurrentHadithSlice_key: hadithSliceStateType }) =>
      state.CurrentHadithSlice_key
  );
  useEffect(() => {
    if (CurrentHadithSlice_state)
      setCurrentChapter(CurrentHadithSlice_state.chapter);
  }, []);

  useEffect(() => {
    if (CurrentHadithSlice_state.book && CurrentHadithSlice_state.chapter) {
      const fetchAction = async () => {
        setLoading(true);
        const data = await fetch_hadith_book_metadata(
          CurrentHadithSlice_state.book as string
        );
        if (data) setCurrentBookMetadata([data] as hadith_metadata_type);
        setLoading(false);
      };
      fetchAction();
    }
  }, [CurrentHadithSlice_state.book, CurrentHadithSlice_state.chapter]);

  return (
    <>
      {loading ? (
        <p className={classNames(themeScss.loading, scss.loading, "syne")}>
          loading...
        </p>
      ) : (
        <>
          {(currentBookMetadata as any).map((elem: any, index: number) => {
            return (
              <div
                className={classNames(
                  themeScss.currentBook_detailsMd,
                  scss.currentBook_detailsMd
                )}
                key={index}
              >
                <div
                  className={classNames(
                    themeScss.bookDetailBox,
                    scss.bookDetailBox
                  )}
                >
                  <h4>book</h4>
                  <p>
                    Book name:<span>{elem.book_name_arabic}</span>
                  </p>
                  <p>
                    translation:<span>{elem.book_name_english}</span>
                  </p>
                  <p>
                    total hadiths:<span>{elem.total_hadiths_inBook}</span>
                  </p>
                  <p>
                    total chapters:<span>{elem.total_chapters_inBook}</span>
                  </p>
                </div>

                <div
                  className={classNames(
                    themeScss.chapterDetailBox,
                    scss.chapterDetailBox
                  )}
                >
                  <h4>chapter</h4>
                  <p>
                    chapter no:<span>{currentChapter}</span>
                  </p>
                  <p>
                    chapter name:
                    <span>
                      {
                        elem.all_chapters_detail[currentChapterIndex]
                          .chapter_title_arabic
                      }
                    </span>
                  </p>
                  <p>
                    translation:
                    <span>
                      {
                        elem.all_chapters_detail[currentChapterIndex]
                          .chapter_title_english
                      }
                    </span>
                  </p>
                  <p>
                    total hadiths:
                    <span>
                      {
                        elem.all_chapters_detail[currentChapterIndex]
                          .total_hadiths_inChapter
                      }
                    </span>
                  </p>
                  <p>
                    first hadith:
                    <span>
                      {
                        elem.all_chapters_detail[currentChapterIndex]
                          .chapter_first_hadith
                      }
                    </span>
                  </p>
                  <p>
                    last hadith:
                    <span>
                      {
                        elem.all_chapters_detail[currentChapterIndex]
                          .chapter_last_hadith
                      }
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
