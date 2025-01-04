// app/Pg/Hadith
"use client";
import React, { useState } from "react";
import classNames from "classnames";
import Navigation from "@/app/@components/global/navbar/page";
import Footer from "@/app/@components/global/footer/page";
import { HadithPageTools } from "./components/Tools";
import { Chapter_Hadiths } from "./components/ChapterHadiths";
import { Current_Book_Details } from "./components/BookDetails";
// scss
import scss from "./page.module.scss";
import ChangeBookChap from "./components/ChangeBookChap";
import { useGContext } from "@/app/contextApi/contextApi";
import light from "./theme/light.module.scss";
import dark from "./theme/dark.module.scss";

const HadithHomePage: React.FC = () => {
  const book_chapter_ref = React.useRef<HTMLDivElement>(null);
  const { changeHadithBookChapterState, currentHadithDetailsState } =
    useGContext();

  const { theme } = useGContext();
  const themeScss = theme === "light" ? light : dark;

  return (
    <>
      <Navigation />

      <section
        className={classNames(themeScss.Hadithage__main, scss.Hadithage__main)}
      >
        <main className={classNames("container")}>
          <div
            className={classNames(
              themeScss.hadithPage_container,
              scss.hadithPage_container
            )}
          >
            {changeHadithBookChapterState ? (
              <>
                <ChangeBookChap />
              </>
            ) : (
              <>
                <HadithPageTools book_chapter_ref={book_chapter_ref} />
                <div
                  className={classNames(
                    themeScss.currentBook_nd_chapHadiths_wrap,
                    scss.currentBook_nd_chapHadiths_wrap
                  )}
                  ref={book_chapter_ref}
                >
                  {currentHadithDetailsState && <Current_Book_Details />}
                  <Chapter_Hadiths />
                </div>
              </>
            )}
          </div>
        </main>
      </section>

      <Footer />
    </>
  );
};

export default HadithHomePage;
