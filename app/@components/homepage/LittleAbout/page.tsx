// components/AboutUs.tsx
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import classNames from "classnames";
import useMouseDirection from "@/app/hooks/useMouseDirection";
import { useGContext } from "@/app/contextApi/contextApi";

// scss
import scss from "./page.module.scss";
import light from "./light.module.scss";
import dark from "./dark.module.scss";

// imgs
import quranicThumb1 from "@/public/images/main/hhh.jpeg";
import quranicThumb2 from "@/public/images/main/1.webp";

const AboutUs = () => {
  const umdTargetRef1 = useRef<HTMLDivElement>(null);
  const umdTargetRef2 = useRef<HTMLDivElement>(null);

  // custom hook mouse-direction
  const { handleMouseEnterUMD, handleMouseLeaveUMD } = useMouseDirection();

  // theme
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;
  return (
    <>
      <section
        className={classNames(
          ThemeScss.aboutUs_container,
          scss.aboutUs_container
        )}
      >
        <main className={classNames("container")}>
          {/* heading */}
          <div className={classNames(ThemeScss.heading, scss.heading)}>
            <div
              className={classNames(
                ThemeScss.heading_pseudo,
                scss.heading_pseudo
              )}
            >
              <span></span>
            </div>
            <div
              className={classNames(ThemeScss.heading_text, scss.heading_text)}
            >
              <h4 className="syne">
                A littke About US for you to intouch with us.
              </h4>
            </div>
          </div>

          <div
            className={classNames(ThemeScss.flex__parrent, scss.flex__parrent)}
          >
            {(
              [
                {
                  title: "title1",
                  desc: "heu am iaam dsxrition heis wahats are whts iex you doing oare yoibfine.",
                  btnText: "explore now",
                  btnHref: "/",
                  img_alt: "quranic-image-bakground-1",
                  img_src: quranicThumb1,
                  umdTargetRef: umdTargetRef1,
                },
                {
                  title: "title2",
                  desc: "heu am iaam dsxrition heis wahats are whts iex you doing oare yoibfine.",
                  btnText: "explore now",
                  btnHref: "/",
                  img_alt: "quranic-image-bakground-2",
                  img_src: quranicThumb2,
                  umdTargetRef: umdTargetRef2,
                },
              ] as any
            ).map((elem: any, index: number) => (
              <div key={index}>
                <div
                  className={classNames(
                    ThemeScss.flex__childRow,
                    ThemeScss[`flex__childRow${index + 1}`],
                    scss.flex__childRow,
                    scss[`flex__childRow${index + 1}`]
                  )}
                >
                  {/* text-box */}
                  <div
                    className={classNames(
                      ThemeScss.textBox__container,
                      scss.textBox__container
                    )}
                  >
                    <div
                      className={classNames(ThemeScss.textBox, scss.textBox)}
                    >
                      <h4 className={classNames(ThemeScss.title, scss.title)}>
                        {elem.title}
                      </h4>
                      <p className={classNames(ThemeScss.desc, scss.desc)}>
                        {elem.desc}
                      </p>
                      <button
                        className={classNames(ThemeScss.button, scss.button)}
                      >
                        <a href={elem.btnHref}>
                          <p>{elem.btnText}</p>
                          <span className="material-symbols-outlined">
                            chevron_right
                          </span>
                        </a>
                      </button>
                    </div>
                  </div>
                  {/* img-box  */}
                  <div
                    className={classNames(ThemeScss.imgBox, scss.imgBox)}
                    onMouseEnter={(e) =>
                      handleMouseEnterUMD(e, elem.umdTargetRef.current)
                    }
                    onMouseLeave={(e) =>
                      handleMouseLeaveUMD(e, elem.umdTargetRef.current)
                    }
                  >
                    <div
                      className={classNames(ThemeScss.imgAnim, scss.imgAnim)}
                      ref={elem.umdTargetRef}
                    >
                      <a href="#">
                        <span className="material-symbols-outlined">add</span>
                      </a>
                    </div>
                    <Image
                      src={elem.img_src}
                      alt={elem.img_alt}
                      width={500}
                      height={900}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </>
  );
};

export default AboutUs;
