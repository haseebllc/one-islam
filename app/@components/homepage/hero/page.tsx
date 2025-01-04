"use client";

import React, { useState, useReducer, useMemo, useRef, useEffect } from "react";
import classNames from "classnames";
import {
  hadithBooks,
  reducer,
  initialState,
} from "@/app/reducerHook/setHadithBookReducer";

// components
import Header from "./header";

// scss
import scss from "./page.module.scss";
import light from "./light.module.scss";
import dark from "./dark.module.scss";
import { useGContext } from "@/app/contextApi/contextApi";

const HomePage = () => {
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;
  //
  const memoizedHadithBooks = useMemo(() => hadithBooks, []);
  const [findVerse, setFindVerse] = useState(true);
  const [hadithMenuShow, setHadithMenuShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [surahNumber, setSurahNumber] = useState<number | undefined>();
  const [verseNumber, setVerseNumber] = useState<number | undefined>();
  const [hadithNumber, setHadithNumber] = useState<number | undefined>();

  const hadithMenuRef = useRef<HTMLDivElement | null>(null);

  // find-type toggle action
  const toggleFindType = (isVerse: boolean) => {
    setFindVerse(isVerse);
    setSurahNumber(undefined);
    setVerseNumber(undefined);
    setHadithNumber(undefined);
  };
  const handleToggleHadithMenu = () => setHadithMenuShow((prev) => !prev);
  const handleVerseSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (surahNumber && verseNumber) {
      if (surahNumber > 0 && surahNumber <= 114 && verseNumber > 0) {
        alert(`Searching Quran: Surah ${surahNumber}, Verse ${verseNumber}`);
      } else {
        alert("Search surah between 1 & 114 and verse must be positive.");
      }
    }
  };
  const handleHadithSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentBook = hadithBooks.find(
      (elem) => elem.name === state.currentBook
    );
    const lastHadithNumber = currentBook?.lastHadith;

    if (typeof hadithNumber === "number" && lastHadithNumber) {
      if (hadithNumber < 1 || hadithNumber > lastHadithNumber) {
        alert(`Please enter a valid hadith number (1 - ${lastHadithNumber})`);
      } else {
        alert(
          `Searching Hadith: Book ${state.currentBook}, Hadith ${hadithNumber}`
        );
      }
    } else {
      alert("Please enter a valid hadith number.");
    }
  };
  const handleSetHadithBook = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedBook = e.currentTarget.querySelector("p")?.textContent;
    if (selectedBook) {
      dispatch({ type: selectedBook });
      handleToggleHadithMenu();
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hadithMenuRef.current &&
        !hadithMenuRef.current.contains(event.target as Node)
      )
        setHadithMenuShow(false);
    };
    document.addEventListener("click", handleClickOutside);
    return document.removeEventListener("click", handleClickOutside);
  }, [hadithMenuRef]);

  return (
    <section className={classNames(ThemeScss.Hero_Section, scss.Hero_Section)}>
      <div className="container">
        <Header />

        <main className={classNames(ThemeScss.heroBody, scss.heroBody)}>
          <div
            className={classNames(
              ThemeScss.heroBody__inner,
              scss.heroBody__inner
            )}
          >
            {/* heading */}
            <div className={classNames(ThemeScss.heading, scss.heading)}>
              <p
                className={classNames(
                  ThemeScss.heading__text__01,
                  scss.heading__text__01
                )}
              >
                The Verse
              </p>
              <h1
                className={classNames(
                  ThemeScss.heading__text__02,
                  scss.heading__text__02,
                  "syne"
                )}
              >
                Seek meaningful verses & hadiths that engage your spirit.
              </h1>
              <p
                className={classNames(
                  ThemeScss.heading__text__03,
                  scss.heading__text__03
                )}
              >
                Our collection offers thoughtful insights and meaningful
                inspiration to help you deepen your understanding and strengthen
                your faith each day. Through carefully selected resources.
              </p>
            </div>

            {/* verse hadith finder */}
            <div
              className={classNames(
                ThemeScss.hadith_verse_find_container,
                scss.hadith_verse_find_container
              )}
            >
              {findVerse ? (
                <form
                  onSubmit={handleVerseSubmit}
                  className={classNames(
                    ThemeScss.verseFind_form,
                    scss.verseFind_form
                  )}
                >
                  <div
                    className={classNames(
                      ThemeScss.chapterInputContainer,
                      scss.chapterInputContainer
                    )}
                  >
                    <input
                      type="number"
                      value={surahNumber || ""}
                      onChange={(e) =>
                        setSurahNumber(
                          e.target.value
                            ? globalThis.Number(e.target.value)
                            : undefined
                        )
                      }
                      placeholder="chapter  1 - 114"
                      required
                    />
                  </div>
                  <div
                    className={classNames(
                      ThemeScss.verseInputContainer,
                      scss.verseInputContainer
                    )}
                  >
                    <input
                      type="number"
                      value={verseNumber || ""}
                      onChange={(e) =>
                        setVerseNumber(
                          e.target.value
                            ? globalThis.Number(e.target.value)
                            : undefined
                        )
                      }
                      placeholder="Verse"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className={classNames(
                      ThemeScss.verseHadith_findBtn,
                      scss.verseHadith_findBtn
                    )}
                  >
                    <p>Search</p>
                    <span className="material-symbols-outlined">
                      trending_flat
                    </span>
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handleHadithSubmit}
                  className={classNames(
                    ThemeScss.hadithFind_form,
                    scss.hadithFind_form
                  )}
                >
                  <div
                    className={classNames(
                      ThemeScss.hadithBookSelectorContainer,
                      scss.hadithBookSelectorContainer
                    )}
                    ref={hadithMenuRef}
                  >
                    <div
                      className={classNames(
                        ThemeScss.hadithBooksMenu,
                        scss.hadithBooksMenu,
                        hadithMenuShow && scss.hadithBooksMenuScript,
                        ThemeScss.hadithBooksMenuScript
                      )}
                      role="menu"
                      aria-expanded={hadithMenuShow}
                    >
                      <ul>
                        {(memoizedHadithBooks as any).map((elem: any) => (
                          <li
                            key={elem.name}
                            onClick={handleSetHadithBook}
                            role="menuitem"
                          >
                            <p>{elem.name}</p>
                            <span className="material-symbols-outlined">
                              keyboard_arrow_down
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={classNames(
                        ThemeScss.hadithBookSelector,
                        scss.hadithBookSelector
                      )}
                      onClick={handleToggleHadithMenu}
                      role="button"
                      aria-haspopup="true"
                      aria-expanded={hadithMenuShow}
                      tabIndex={0}
                    >
                      <p>{state.currentBook}</p>
                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      ThemeScss.hadithNoInputContainer,
                      scss.hadithNoInputContainer
                    )}
                  >
                    <input
                      type="number"
                      value={hadithNumber || ""}
                      onChange={(e) =>
                        setHadithNumber(
                          e.target.value
                            ? globalThis.Number(e.target.value)
                            : undefined
                        )
                      }
                      placeholder={`Hadith 1 - ${
                        memoizedHadithBooks.find(
                          (el) => el.name == state.currentBook
                        )?.lastHadith || 0
                      }`}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className={classNames(
                      ThemeScss.verseHadith_findBtn,
                      scss.verseHadith_findBtn
                    )}
                  >
                    <p>Search</p>
                    <span className="material-symbols-outlined">
                      trending_flat
                    </span>
                  </button>
                </form>
              )}
            </div>

            {/* verse hadith selector  */}
            <div
              className={classNames(
                ThemeScss.QuranHadithSelector,
                scss.QuranHadithSelector
              )}
            >
              <div
                className={classNames(
                  ThemeScss.QuranHadithSelector_anim,
                  scss.QuranHadithSelector_anim
                )}
                style={{ left: findVerse ? "0" : "110px" }}
              />
              {/* icon */}
              {(
                [
                  {
                    class: [ThemeScss.QuranSelectIcon, scss.QuranSelectIcon],
                    color: findVerse ? "white" : "black",
                    icon: "auto_stories",
                    toggleType: true,
                    p: "Quran",
                  },
                  {
                    class: [ThemeScss.HadithSelectIcon, scss.HadithSelectIcon],
                    color: !findVerse ? "white" : "black",
                    icon: "collections_bookmark",
                    toggleType: false,
                    p: "Hadith",
                  },
                ] as any
              ).map((elem, index) => (
                <div
                  key={index}
                  className={classNames(...elem.class)}
                  onClick={() => toggleFindType(elem.toggleType)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: elem.color }}
                  >
                    {elem.icon}
                  </span>
                  <p style={{ color: elem.color }}>{elem.p}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default HomePage;
