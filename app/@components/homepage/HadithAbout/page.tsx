"use client";

import React, { useRef, useState } from "react";
import classNames from "classnames";
import Image from "next/image";

// scss
import scss from "./page.module.scss";
import light from "./light.module.scss";
import dark from "./dark.module.scss";

// images
import HadithThumb1 from "@/public/images/main/hadith4.jpg";
import useCountScroll from "@/app/hooks/uesCountScroll";
import { useGContext } from "@/app/contextApi/contextApi";

const HadithAbout: React.FC = () => {
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;

  const counterParentRef = useRef<HTMLDivElement>(null);
  const [ElementCount1, setElementCount1] = useState(0);
  const [ElementCount2, setElementCount2] = useState(0);
  const [ElementCount3, setElementCount3] = useState(0);
  const [ElementCount4, setElementCount4] = useState(0);
  useCountScroll(counterParentRef, setElementCount1, 100);
  useCountScroll(counterParentRef, setElementCount2, 200);
  useCountScroll(counterParentRef, setElementCount3, 300);
  useCountScroll(counterParentRef, setElementCount4, 300);
  return (
    <>
      <section
        className={classNames(
          ThemeScss.HadithAboutContainer,
          scss.HadithAboutContainer
        )}
      >
        <main
          className={classNames(
            ThemeScss.HadithAboutContainer__row,
            scss.HadithAboutContainer__row,
            "container"
          )}
        >
          {/* text wrap */}
          <div
            className={classNames(
              ThemeScss.row__textWrapper,
              scss.row__textWrapper,
              ThemeScss.row__col,
              scss.row__col,
              ThemeScss.row__col1,
              scss.row__col1
            )}
          >
            {(
              [
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
              ] as any
            ).map((elem: any, index: number) => (
              <div
                key={index}
                className={classNames(
                  scss.textBox,
                  scss[`textBox` + (index + 1)],
                  ThemeScss.textBox,
                  ThemeScss[`textBox` + (index + 1)]
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

          {/* img wrap */}
          <div
            className={classNames(
              ThemeScss.row__imgWrapper,
              scss.row__imgWrapper,
              ThemeScss.row__col,
              scss.row__col,
              ThemeScss.row__col2,
              scss.row__col2
            )}
          >
            <Image
              src={HadithThumb1}
              alt="islamic-image"
              width={500}
              height={900}
            />
          </div>
        </main>
      </section>

      {/* hadith books info section */}
      <section
        className={classNames(
          ThemeScss.hadithBooks__infoRowContainer,
          scss.hadithBooks__infoRowContainer
        )}
      >
        <main className="container">
          <div
            className={classNames(
              ThemeScss.hadithBooks__infoRow,
              scss.hadithBooks__infoRow
            )}
            ref={counterParentRef}
          >
            {/* box */}
            {(
              [
                {
                  icon: "sentiment_satisfied",
                  count: ElementCount1,
                  text: "customers",
                },
                {
                  icon: "stacks",
                  count: ElementCount2,
                  text: "wages staisfied",
                },
                {
                  icon: "hourglass_top",
                  count: ElementCount3,
                  text: "gomwampaire",
                },
                {
                  icon: "new_releases",
                  count: ElementCount4,
                  text: "gomwampaire",
                },
              ] as any
            ).map((elem, index) => (
              <div
                className={classNames(ThemeScss.infoRowBox, scss.infoRowBox)}
                key={index}
              >
                <div
                  className={classNames(
                    ThemeScss.infoRowBox_icon,
                    scss.infoRowBox_icon
                  )}
                >
                  <span className="material-symbols-outlined">{elem.icon}</span>
                </div>
                <div
                  className={classNames(
                    ThemeScss.infoRowBox_text,
                    scss.infoRowBox_text
                  )}
                >
                  <h4 className="outfit">{elem.count}</h4>
                  <p className="raleway">{elem.text}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </>
  );
};

export default HadithAbout;
