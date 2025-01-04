"use client";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetQuran__SoloChapter } from "./FetchQuran";
import { useRouter } from "next/navigation";
import bismillahImg from "@/public/images/QuranPage/bismillah.png";
import bismillahImg_white from "@/public/images/QuranPage/bismillah-white.png";
// scss
import scss from "../page.module.scss";
import light from "../theme/light.module.scss";
import dark from "../theme/dark.module.scss";
import { useGContext } from "@/app/contextApi/contextApi";
import { chapter_details_type, metadata_type } from "./quran_schema";

const SoloChapter = ({ metaData }: { metaData: metadata_type[] }) => {
  // theme
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;

  const [chapterData, setChapterData] = useState<chapter_details_type | any>(
    []
  );
  const [loading, setLoading] = useState(true);

  // Initial scroll-force on render
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  // currentSurah Redux-state
  const CurrentSurahSlice_state = useSelector(
    (state: any) => state.CurrentSurahSlice_key
  );
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching for first language
        const firstLangData = await GetQuran__SoloChapter(
          CurrentSurahSlice_state.lang,
          CurrentSurahSlice_state.vrsn,
          CurrentSurahSlice_state.id
        );
        // Fetching for second language
        const secondLangData = await GetQuran__SoloChapter(
          CurrentSurahSlice_state.secLang.lang,
          CurrentSurahSlice_state.secLang.vrsn,
          CurrentSurahSlice_state.id
        );
        if (metaData && metaData[0]?.chapter_details) {
          const targetMeta = await metaData[0].chapter_details.find(
            (elem: any) => elem.surahNo === CurrentSurahSlice_state.id
          );
          setChapterData([
            {
              metaData: targetMeta,
              chapterVerses: [
                {
                  firstLangVerses: (await firstLangData?.verses) || [],
                  secLangVerses: (await secondLangData?.verses) || [],
                },
              ],
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching chapter data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [
    metaData,
    CurrentSurahSlice_state.id,
    CurrentSurahSlice_state.secLang.lang,
    CurrentSurahSlice_state.secLang.vrsn,
  ]);

  if (loading)
    return (
      <p className={classNames(ThemeScss.loading, scss.loading)}>Loading...</p>
    );
  return (
    <>
      {chapterData &&
        chapterData.length > 0 &&
        chapterData.map((elem: any, index: number) => (
          <div
            className={classNames(
              ThemeScss.SurahViewContainer,
              scss.SurahViewContainer
            )}
            key={index}
          >
            {/* Surah Info Section */}
            <div
              className={classNames(
                ThemeScss.surahInfoBox__outter,
                scss.surahInfoBox__outter
              )}
            >
              <div
                className={classNames(
                  ThemeScss.surahInfoBox__bgAnim,
                  scss.surahInfoBox__bgAnim
                )}
              ></div>
              <div
                className={classNames(
                  ThemeScss.surahInfoBox__inner,
                  scss.surahInfoBox__inner
                )}
              >
                {/* Surah Name and Verse Info */}
                <div
                  className={classNames(
                    ThemeScss.surahName_nd_ayah,
                    scss.surahName_nd_ayah
                  )}
                >
                  <h4 className="raleway">{elem.metaData.surahName}</h4>
                  <p>
                    <span className="raleway">
                      {elem.metaData.surahNameTranslation}
                    </span>
                    <span className={classNames(ThemeScss.symbol, scss.symbol)}>
                      -
                    </span>
                    <span>{elem.metaData.totalAyah} ayat</span>
                  </p>
                </div>

                {/* Surah Number */}
                <div className={classNames(ThemeScss.surahNum, scss.surahNum)}>
                  <span>{elem.metaData.surahNo}</span>
                </div>
              </div>
            </div>

            {/* Bismillah-img before each Verse */}
            <div
              className={classNames(
                ThemeScss.currentSurahContainer,
                scss.currentSurahContainer
              )}
            >
              <div
                className={classNames(
                  ThemeScss.bismillah__img,
                  scss.bismillah__img
                )}
              >
                <Image
                  src={theme === "light" ? bismillahImg : bismillahImg_white}
                  alt="Bismillah Image - Arabic phrase meaning 'In the name of Allah"
                  width={300}
                  height={300}
                />
              </div>

              {/* Duo-Lang Ayahs */}
              {elem.chapterVerses &&
                elem.chapterVerses[0].firstLangVerses?.map(
                  (firstLangVerse: any, index: number) => (
                    <div
                      key={index}
                      className={classNames(
                        ThemeScss.currentSurahVersesView,
                        scss.currentSurahVersesView
                      )}
                    >
                      {/* Render First Language Verse */}
                      <p
                        className={classNames(
                          ThemeScss.arabicVerse,
                          scss.arabicVerse
                        )}
                        style={{
                          textTransform: "none",
                        }}
                      >
                        {firstLangVerse} <span>{index + 1}</span>
                      </p>

                      {/* Render Second Language Verse */}
                      {elem.chapterVerses[0].secLangVerses &&
                        elem.chapterVerses[0].secLangVerses[index] && (
                          <p
                            className={classNames(
                              ThemeScss.englishVerse,
                              scss.englishVerse
                            )}
                            style={{
                              textTransform: "none",
                            }}
                          >
                            <span>{index + 1}</span>
                            {elem.chapterVerses[0].secLangVerses[index]}
                          </p>
                        )}
                    </div>
                  )
                )}
            </div>
          </div>
        ))}
    </>
  );
};

export default SoloChapter;
