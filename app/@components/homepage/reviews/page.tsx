"use client";

import React from "react";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useGContext } from "@/app/contextApi/contextApi";

// styles
import scss from "./page.module.scss";
import "swiper/scss"; // core Swiper
import "swiper/scss/pagination";

import light from "./light.module.scss";
import dark from "./dark.module.scss";

const Reviews: React.FC = () => {
  const reviewsArray = [
    {
      name: "lena daniel",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores debitis soluta consectetur voluptatum laudantium quasi? Libero cupiditate doloremque architecto iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores debitis soluta consectetur voluptatum laudantium quasi? Libero cupiditate doloremque architecto iste.",
    },
    {
      name: "john doe",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores debitis soluta consectetur voluptatum laudantium quasi? Libero cupiditate doloremque architecto iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores debitis soluta consectetur voluptatum laudantium quasi? Libero cupiditate doloremque architecto iste.",
    },
    {
      name: "trever",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores debitis soluta consectetur voluptatum laudantium quasi? Libero cupiditate doloremque architecto iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores debitis soluta consectetur voluptatum laudantium quasi? Libero cupiditate doloremque architecto iste.",
    },
  ];
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;
  return (
    <>
      <section
        className={classNames(
          ThemeScss.ReviewsSect_container,
          scss.ReviewsSect_container
        )}
      >
        <main className="container">
          {/* heading */}
          <div
            className={classNames(ThemeScss.heading_wrap, scss.heading_wrap)}
          >
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
                className={classNames(
                  ThemeScss.heading_text,
                  scss.heading_text
                )}
              >
                <h4 className="syne">
                  A littke reviews US for you to intouch with us.
                </h4>
                {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
              </div>
            </div>
          </div>

          {/* content */}
          <div
            className={classNames(ThemeScss.reviews__row, scss.reviews__row)}
          >
            <div
              className={classNames(
                ThemeScss.review_boxWrap,
                scss.review_boxWrap
              )}
            >
              <div
                className={classNames(
                  ThemeScss.boxWrap__anim,
                  scss.boxWrap__anim,
                  ThemeScss.boxWrap__anim_01,
                  scss.boxWrap__anim_01
                )}
              ></div>
              <div
                className={classNames(
                  ThemeScss.boxWrap__anim,
                  scss.boxWrap__anim,
                  ThemeScss.boxWrap__anim_02,
                  scss.boxWrap__anim_02
                )}
              ></div>
              <div
                className={classNames(
                  ThemeScss.slide__box__outter,
                  scss.slide__box__outter
                )}
              >
                <h4 className={classNames(ThemeScss.title, scss.title, "syne")}>
                  our community say
                </h4>

                <Swiper
                  className={classNames(
                    ThemeScss.swiper,
                    scss.swiper,
                    "mySwiper",
                    "mySwiper__reviews"
                  )}
                  loop={true}
                  speed={700}
                  spaceBetween={10}
                  slidesPerView={1}
                  modules={[Autoplay, Pagination, Navigation]}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                >
                  {(reviewsArray as any).map((elem: any, index: number) => (
                    <SwiperSlide key={index}>
                      <div
                        className={classNames(
                          ThemeScss.slide__box__inner,
                          scss.slide__box__inner
                        )}
                      >
                        <p>{elem.text}</p>
                        <h4>{elem.name}</h4>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Reviews;
