// pages/quran/page.tsx
"use client";
import { metadata_type } from "./components/quran_schema";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useGContext } from "@/app/contextApi/contextApi";
// scss
import scss from "./page.module.scss";
import light_scss from "./theme/light.module.scss";
import dark_scss from "./theme/dark.module.scss";
// componnt
import Footer from "@/app/@components/global/footer/page";
import Navigation from "@/app/@components/global/navbar/page";
import FindChapter from "./components/FindChaper";
import AllChapters from "./components/AllChapters";
import SoloChapter from "./components/SoloChapter";
import { GetQuranMetaData } from "./components/FetchQuran";
import Tool, { toolsArray } from "./components/Tool";
import { LanguageSelector } from "./components/LangVersion";

const QuranHomePage = () => {
  // theme
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light_scss : dark_scss;

  const [metaData, setMetaData] = useState<metadata_type[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetQuranMetaData();
      if (data) setMetaData(data);
    };
    fetchData();
  }, []);

  // Reference to the AllChapters component for scrolling
  const allChaptersRef = useRef<any>(null);
  const scrollToCurrent = () => {
    if (allChaptersRef.current) allChaptersRef.current.scrollToCurrentSurah();
  };

  const { SurahFullView, setSurahFullView } = useGContext();
  const viewToggle = () => setSurahFullView((prev) => !prev);

  return (
    <>
      <Navigation />

      <div
        className={classNames(scss.themeContaining, ThemeScss.themeContaining)}
      >
        {!SurahFullView ? (
          <section
            className={classNames(
              ThemeScss.QuranPage_Container,
              scss.QuranPage_Container
            )}
          >
            <main className={classNames("container")}>
              <div className={classNames(ThemeScss.Container, scss.Container)}>
                {/* heading and chapter-searchbar */}
                <div
                  className={classNames(
                    ThemeScss.heading_nd_surahSearch,
                    scss.heading_nd_surahSearch
                  )}
                >
                  <div className={classNames(ThemeScss.heading, scss.heading)}>
                    <h4 className="raleway">surah - verses</h4>
                    <p className="syne">
                      select or search the surah you want to read!
                    </p>
                  </div>

                  <FindChapter metaData={metaData} />
                </div>

                {/* Useful-tools | buttons */}
                <div
                  className={classNames(
                    ThemeScss.usefull_toolsContainer,
                    scss.usefull_toolsContainer
                  )}
                >
                  <div
                    className={classNames(
                      ThemeScss.containerInner,
                      scss.containerInner
                    )}
                  >
                    <div onClick={scrollToCurrent}>
                      <Tool props={toolsArray[0]} />
                    </div>
                    <div onClick={viewToggle}>
                      <Tool props={toolsArray[1]} />
                    </div>
                  </div>

                  <LanguageSelector />
                </div>

                {/* chapters-view content */}
                <div
                  className={classNames(
                    ThemeScss.content__wrap,
                    scss.content__wrap
                  )}
                >
                  {/* Pass ref to AllChapters */}
                  <AllChapters metaData={metaData} ref={allChaptersRef} />
                  <SoloChapter metaData={metaData} />
                </div>
              </div>
            </main>
          </section>
        ) : (
          <div
            className={classNames(
              ThemeScss.fullViewContainer,
              scss.fullViewContainer,
              "container"
            )}
          >
            <div
              className={classNames(
                ThemeScss.closeFullView,
                scss.closeFullView
              )}
            >
              <div className="material-symbols-outlined" onClick={viewToggle}>
                close
              </div>
            </div>
            <SoloChapter metaData={metaData} />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default QuranHomePage;
