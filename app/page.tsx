// components/home/page.ts
"use client";
import React from "react";

// components
import CustomCursor from "./@components/global/cursor/page";
import Navigation from "./@components/global/navbar/page";
import Hero from "./@components/homepage/hero/page";
import LinkSlides from "./@components/homepage/linkslides/page";
import QuranicAbout from "./@components/homepage/QuranicAbout/page";
import HadithAbout from "./@components/homepage/HadithAbout/page";
import LittleAbout from "./@components/homepage/LittleAbout/page";
import PricingDonate from "./@components/homepage/pricing/page";
import Reviews from "./@components/homepage/reviews/page";
import JoinComunity from "./@components/homepage/joinComunity/page";
import Footer from "./@components/global/footer/page";

const Home: React.FC = () => {
  // useEffect(() => {
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //     /*---*/
  //     const locomotivescroll = new LocomotiveScroll({
  //       lenisOptions: {
  //         lerp: 30,
  //         duration: 1,
  //       },
  //     });
  //     /*---*/
  //   })();
  // }, []);

  return (
    <>
      <CustomCursor />
      <Navigation />
      <Hero />
      <LinkSlides />
      <QuranicAbout />
      <HadithAbout />
      <LittleAbout />
      <PricingDonate />
      <Reviews />
      <JoinComunity />
      <Footer />
    </>
  );
};

export default Home;
