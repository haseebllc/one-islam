"use client";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { GetQuranMetaData } from "./FetchQuran";
import {
  changeSecSurahLang,
  changeSecSurahLangVrsn,
} from "@/app/redux/reducers/CurrentSurahReducer";
// scss
import scss from "../page.module.scss";
import light from "../theme/light.module.scss";
import dark from "../theme/dark.module.scss";
import { useGContext } from "@/app/contextApi/contextApi";

export const LanguageSelector = () => {
  // theme
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;

  const dbRef2 = useRef<HTMLDivElement | null>(null);
  const no_dbRef2 = useRef<HTMLInputElement>(null);
  const dbRef = useRef<HTMLDivElement | null>(null);
  const no_dbRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState<string | any>("");
  const [languages, setLanguages] = useState<any>([]);
  const [currrentVrsn, setCurrrentVrsn] = useState<string>("original");
  const [LangVersion, setLangVersion] = useState<any>([]);
  const [LangData, setLangData] = useState<any>([]);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isDropdown2Visible, setDropdown2Visible] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

  const CurrentSurahSlice_state = useSelector(
    (state: any) => state.CurrentSurahSlice_key
  );

  useEffect(() => {
    if (CurrentSurahSlice_state)
      setSelectedLanguage(CurrentSurahSlice_state.secLang.lang);
  }, [CurrentSurahSlice_state?.secLang?.lang]);

  useEffect(() => {
    const fetchAction = async () => {
      try {
        const data = await GetQuranMetaData();
        const langDetails = data[0].source.map((elem: any) => ({
          language: elem.language,
          version: [
            { original: elem.link.original },
            { latin: elem.link.latin },
            { latin_diacritical: elem.link.latin_diacritical },
          ],
        }));
        setLangData(langDetails);
      } catch (error) {
        console.error("Error fetching language data:", error);
      }
    };
    fetchAction();
  }, []);

  useEffect(() => {
    const filteredLanguages = LangData.filter((elem: any) =>
      elem.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setLanguages(filteredLanguages);
  }, [LangData, searchTerm]);

  useEffect(() => {
    const filteredLangVrsn = LangData.find(
      (elem: any) => elem.language === selectedLanguage
    );
    if (filteredLangVrsn) {
      setLangVersion(filteredLangVrsn?.version);
    }
  }, [LangData, selectedLanguage]);

  const dispatch = useDispatch();
  const handleLanguageSelect = (language: string) => {
    dispatch(changeSecSurahLang(language));
    setSelectedLanguage(language);
    setDropdownVisible(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dbRef.current && dbRef.current.contains(e.target as Node)) {
        setDropdownVisible((prev) => !prev);
      } else if (
        no_dbRef.current &&
        !no_dbRef.current.contains(e.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside2 = (e: MouseEvent) => {
      if (dbRef2.current && dbRef2.current.contains(e.target as Node)) {
        setDropdown2Visible(true);
      } else if (
        no_dbRef2.current &&
        no_dbRef2.current.contains(e.target as Node)
      ) {
        setDropdown2Visible((prev) => !prev);
      } else {
        setDropdown2Visible(false);
      }
    };
    window.addEventListener("click", handleClickOutside2);
    return () => window.removeEventListener("click", handleClickOutside2);
  }, []);

  return (
    <div
      className={classNames(
        ThemeScss.langSelectContainer,
        scss.langSelectContainer
      )}
    >
      {/* language --  */}
      <div
        className={classNames(
          ThemeScss.langFetre,
          scss.langFetre,
          ThemeScss.selectBox,
          scss.selectBox
        )}
      >
        <div className={classNames(ThemeScss.currentView, scss.currentView)}>
          <p>Language</p>
          <input type="button" value={selectedLanguage} />
          <span className="material-symbols-outlined" ref={dbRef}>
            keyboard_arrow_down
          </span>

          {isDropdownVisible && (
            <div
              className={classNames(ThemeScss.displayBox, scss.displayBox)}
              ref={no_dbRef}
            >
              <input
                type="text"
                placeholder="Search language"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={no_dbRef}
              />
              <div className={classNames(ThemeScss.box, scss.box)}>
                {languages.length > 0 ? (
                  languages.map((language: any, index: number) => (
                    <div
                      key={index}
                      className={classNames(
                        ThemeScss.languageOption,
                        scss.languageOption
                      )}
                      onClick={() => handleLanguageSelect(language.language)}
                    >
                      <p className="raleway">{language.language}</p>
                      <span className="material-symbols-outlined">
                        keyboard_arrow_right
                      </span>
                    </div>
                  ))
                ) : (
                  <p
                    className={classNames(
                      ThemeScss.noMatch,
                      scss.noMatch,
                      "syne"
                    )}
                  >
                    Oops! No matching languages found --
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* verson --  */}
      <div
        className={classNames(
          ThemeScss.vrsnFetre,
          scss.vrsnFetre,
          ThemeScss.selectBox,
          scss.selectBox
        )}
      >
        <div className={classNames(ThemeScss.currentView, scss.currentView)}>
          <p>version</p>
          <input type="button" value={currrentVrsn} />
          <span className="material-symbols-outlined" ref={no_dbRef2}>
            keyboard_arrow_down
          </span>
          {isDropdown2Visible && (
            <div
              className={classNames(
                ThemeScss.vrsnFetredisplayBox,
                scss.vrsnFetredisplayBox,
                ThemeScss.displayBox,
                scss.displayBox
              )}
              ref={dbRef2}
            >
              {LangVersion &&
                LangVersion.map((elem: any, index: number) => (
                  <div className={classNames(ThemeScss.box, scss.box)}>
                    <div
                      key={index}
                      className={classNames(
                        ThemeScss.languageOption,
                        scss.languageOption
                      )}
                    >
                      {elem.original && (
                        <p
                          className="raleway"
                          onClick={() => [
                            setCurrrentVrsn("original"),
                            dispatch(changeSecSurahLangVrsn("original")),
                            setDropdown2Visible(false),
                          ]}
                        >
                          original
                          <span className="material-symbols-outlined">
                            keyboard_arrow_right
                          </span>
                        </p>
                      )}
                      {elem.latin && (
                        <p
                          className="raleway"
                          onClick={() => [
                            setCurrrentVrsn("latin"),
                            setDropdown2Visible(false),
                            dispatch(changeSecSurahLangVrsn("latin")),
                          ]}
                        >
                          latin
                          <span className="material-symbols-outlined">
                            keyboard_arrow_right
                          </span>
                        </p>
                      )}
                      {elem.latin_diacritical && (
                        <p
                          className="raleway"
                          onClick={() => [
                            setCurrrentVrsn("latin-diacritical"),
                            setDropdown2Visible(false),
                            dispatch(
                              changeSecSurahLangVrsn("latin-diacritical")
                            ),
                          ]}
                        >
                          latin-diacritical
                          <span className="material-symbols-outlined">
                            keyboard_arrow_right
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
