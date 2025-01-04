// pages/Quran/AllChapters.tsx
"use client";
import { chapter_details_type, metadata_type } from "./quran_schema";
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  LegacyRef,
} from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { changeSurahId } from "@/app/redux/reducers/CurrentSurahReducer";
import { useGContext } from "@/app/contextApi/contextApi";
// scss
import scss from "../page.module.scss";
import light from "../theme/light.module.scss";
import dark from "../theme/dark.module.scss";

const AllChapters = forwardRef(
  ({ metaData }: { metaData: metadata_type }, ref) => {
    // theme
    const { theme } = useGContext();
    const ThemeScss = theme === "light" ? light : dark;

    const dispatch = useDispatch();
    const [chaptersData, setChaptersData] = useState<chapter_details_type>([]);
    const [currentSurah, setCurrentSurah] = useState(1);

    useEffect(() => {
      if (metaData && metaData[0]?.chapter_details)
        setChaptersData(metaData[0].chapter_details as chapter_details_type);
    }, [metaData]);

    const CurrentSurahSlice_state = useSelector(
      (state: any) => state.CurrentSurahSlice_key
    );
    useEffect(() => {
      if (CurrentSurahSlice_state) setCurrentSurah(CurrentSurahSlice_state.id);
    }, [CurrentSurahSlice_state.id]);

    // Declare stc_ref and surahRefs
    const stc_ref = useRef<HTMLDivElement>(null);
    const surahRefs = useRef<HTMLDivElement[]>([]);

    // Scroll to the current surah
    const surahElement = surahRefs.current[currentSurah - 1];
    useEffect(() => {
      if (stc_ref.current && surahElement) {
        stc_ref.current.scrollTo({
          top: surahElement.offsetTop - 265,
          behavior: "smooth",
        });
      }
    }, [currentSurah]);

    // Exposing scrollToCurrentSurah method to parent component
    useImperativeHandle(ref, () => ({
      scrollToCurrentSurah: () => {
        const surahElement = surahRefs.current[currentSurah - 1];
        if (surahElement && stc_ref.current) {
          return surahElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      },
    }));

    if (!chaptersData) return <p>no data found!</p>;
    return (
      <div
        className={classNames(
          ThemeScss.chaptersContainer,
          scss.chaptersContainer
        )}
      >
        <div
          className={classNames(
            ThemeScss.chaptersContainer__scroller,
            scss.chaptersContainer__scroller
          )}
          ref={stc_ref}
        >
          {(chaptersData as any).map((elem: any, index: number) => (
            <div
              key={index}
              className={classNames(
                ThemeScss.surahNum_nd_surahName,
                scss.surahNum_nd_surahName,
                currentSurah === index + 1
                  ? (scss.surahNum_nd_surahName_Box__active,
                    ThemeScss.surahNum_nd_surahName_Box__active)
                  : ""
              )}
              onClick={() => dispatch(changeSurahId(index + 1))}
              ref={(el) => {
                surahRefs.current[index] = el; // Assign ref to the current index
              }}
            >
              <div className={classNames(ThemeScss.surahNum, scss.surahNum)}>
                <span>{elem.surahNo}</span>
              </div>
              <div className={classNames(ThemeScss.surahInfo, scss.surahInfo)}>
                <h4>
                  <span
                    className={classNames(
                      ThemeScss.nameEng,
                      scss.nameEng,
                      "raleway"
                    )}
                  >
                    {elem.surahName}
                  </span>
                  <span className={classNames(ThemeScss.symbol, scss.symbol)}>
                    -
                  </span>
                  <span
                    className={classNames(
                      ThemeScss.nameArb,
                      scss.nameArb,
                      "raleway"
                    )}
                  >
                    {elem.surahNameArabic}
                  </span>
                </h4>
                <p>
                  <span
                    className={classNames(
                      ThemeScss.nameMeaning,
                      scss.nameMeaning,
                      "raleway"
                    )}
                  >
                    {elem.surahNameTranslation}
                  </span>
                  <span className={classNames(ThemeScss.symbol, scss.symbol)}>
                    -
                  </span>
                  <span
                    className={classNames(
                      ThemeScss.totalAyah,
                      scss.totalAyah,
                      "outfit"
                    )}
                  >
                    {elem.totalAyah} ayat
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

// display name for dev tool .\
AllChapters.displayName = "AllChapters";
export default AllChapters;
