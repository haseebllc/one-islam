"use client";
import React from "react";
import classNames from "classnames";
import Image from "next/image";
import NavigateButton from "./NavigateButton";

// scss
import scss from "./page.module.scss";
import light from "./light.module.scss";
import dark from "./dark.module.scss";

import quranThumb1 from "@/public/images/main/quran4.jpg";
import { useGContext } from "@/app/contextApi/contextApi";

const QuranicAbout: React.FC = () => {
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;
  const NavigateButtonDataArray = [
    {
      title: "explore the wisdom of hadith and surah verses",
      text: "delve into the teachings of islam through authentic hadith and powerfull surah verses that offer guidenece and inspiration for your daily life.",
      btnText: "discover now",
      btnHref: "/",
    },
  ];

  return (
    <>
      <section
        className={classNames(
          ThemeScss.QuranAboutContainer,
          scss.QuranAboutContainer
        )}
      >
        <main
          className={classNames(
            ThemeScss.QuranAboutContainer__row,
            scss.QuranAboutContainer__row,
            "container"
          )}
        >
          <div
            className={classNames(
              ThemeScss.row__imgWrapper,
              scss.row__imgWrapper,
              ThemeScss.row__col,
              scss.row__col,
              ThemeScss.row__col1,
              scss.row__col1
            )}
          >
            <Image
              src={quranThumb1}
              alt="islamic-image"
              width={700}
              height={900}
            />
          </div>
          <div
            className={classNames(
              ThemeScss.row__textWrapper,
              scss.row__textWrapper,
              ThemeScss.row__col,
              scss.row__col,
              ThemeScss.row__col2,
              scss.row__col2
            )}
          >
            {[
              {
                title: "Quranic verses exploration",
                text: "read & reflect on the verces of the quran with ease & conveinence.",
              },
              {
                title: "comperhensive hadith library",
                text: "acess a wide range of hadiths catagorized for easy reference & understanding.",
              },
              {
                title: "Authentic Hadith collection",
                text: "explore a vast collection of authentic hadith & delve into the teacing of islam.",
              },
            ].map((elem, index) => (
              <div
                key={index}
                className={classNames(
                  ThemeScss.textBox,
                  ThemeScss[`textBox` + (index + 1)],
                  scss.textBox,
                  scss[`textBox` + (index + 1)]
                )}
              >
                <h4 className="syne">{elem.title}</h4>
                <p className="outfit">{elem.text}</p>
              </div>
            ))}
            {/* explore button */}
            <button
              className={classNames(
                ThemeScss.exploreButton,
                scss.exploreButton
              )}
            >
              <a href="#">
                <p>explore Quran</p>
                <span className="material-symbols-outlined">trending_flat</span>
              </a>
            </button>
          </div>
        </main>
      </section>

      <NavigateButton dataArray={NavigateButtonDataArray} />
    </>
  );
};

export default QuranicAbout;
