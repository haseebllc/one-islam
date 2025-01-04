"use client";

import React from "react";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// scss
import scss from "./page.module.scss";
import "swiper/scss"; // core Swiper
import "swiper/scss/pagination";

import light from "./light.module.scss";
import dark from "./dark.module.scss";

// hooks
import useIslamicDate from "@/app/hooks/useIslamicDate";
import { useGContext } from "@/app/contextApi/contextApi";

const page = () => {
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;

  const swiperSlidesContent = [
    {
      title: "Rise to the top of the client's list",
      text: "Boosted Proposals deliver 10x more earnings Boosted Proposals deliver 10x more earnings on ad spend on ad spend",
      buttonText: "learn more",
      buttonHref: "/",
      imgHref: "/images/main/quran9.jpg",
    },
    {
      title: "Rise to the top of the client's list",
      text: "Boosted Proposals deliver 10x more earnings Boosted Proposals deliver 10x more earnings on ad spend on ad spend",
      buttonText: "learn more",
      buttonHref: "/",
      imgHref: "/images/main/quran9.jpg",
    },
    {
      title: "Rise to the top of the client's list",
      text: "Boosted Proposals deliver 10x more earnings Boosted Proposals deliver 10x more earnings on ad spend on ad spend",
      buttonText: "learn more",
      buttonHref: "/",
      imgHref: "/images/main/quran9.jpg",
    },
    {
      title: "Rise to the top of the client's list",
      text: "Boosted Proposals deliver 10x more earnings Boosted Proposals deliver 10x more earnings on ad spend on ad spend",
      buttonText: "learn more",
      buttonHref: "/",
      imgHref: "/images/main/quran9.jpg",
    },
  ];

  // islamic-calander-hook destructuring
  const {
    islamicDayRoman,
    islamicMonthRoman,
    islamicYearRoman,
    islamicDayArabic,
    islamicMonthArabic,
    islamicYearArabic,
  } = useIslamicDate();

  return (
    <>
      <section
        className={classNames(
          ThemeScss.LinkSlidesContainer,
          scss.LinkSlidesContainer
        )}
      >
        <div
          className={classNames(
            ThemeScss.container,
            scss.container,
            "container"
          )}
        >
          {/* slides  */}
          <Swiper
            className={classNames(
              scss.swiper,
              ThemeScss.swiper,
              "mySwiper",
              "swiper__linkSlide"
            )}
            loop={true}
            speed={700}
            spaceBetween={10}
            slidesPerView={1}
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
          >
            {(swiperSlidesContent as any).map((elem: any, index: number) => (
              <SwiperSlide
                key={index}
                className={classNames(ThemeScss.SwiperSlide, scss.SwiperSlide)}
              >
                <div
                  className={classNames(
                    scss.LinkSlide,
                    scss[`LinkSlide${index + 1}`],
                    ThemeScss.LinkSlide,
                    ThemeScss[`LinkSlide${index + 1}`]
                  )}
                >
                  <div
                    className={classNames(
                      ThemeScss.slideText_nd_btn,
                      scss.slideText_nd_btn
                    )}
                  >
                    <h4 className="raleway">{elem.title}</h4>
                    <p>{elem.text}</p>
                    <button>
                      <a href={elem.buttonHref}>{elem.buttonText}</a>
                    </button>
                  </div>
                  <div
                    className={classNames(ThemeScss.slideImg, scss.slideImg)}
                  >
                    <img src={elem.imgHref} alt="slide image svg" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* islamic-calendar-view */}
          <div
            className={classNames(
              ThemeScss.calanderViewContainer,
              scss.calanderViewContainer
            )}
          >
            <h3 className="syne">Islamic Calendar</h3>
            <p>
              islamic date : {islamicDayRoman}th {islamicMonthRoman}
            </p>
            <p> {islamicYearRoman} AH</p>
            <button
              className={classNames(
                ThemeScss.exploreButton,
                scss.exploreButton
              )}
            >
              <p className="raleway">
                Explore the Islamic calendar—key dates, insights in many
                languages. Begin below!
              </p>
              <a href="#">
                <p>Explore Now</p>
                <span className="material-symbols-outlined">chevron_right</span>
              </a>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
