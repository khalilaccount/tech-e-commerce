import React from "react";
import Hero from "../components/home/Hero";
import HomeServices from "../components/home/HomeServices";
import LatestProductsSlider from "../components/home/LatestProductsSlider";
import EmailNewsletter from "../components/home/EmailNewsletter";

function Home() {
  return (
    <div>
      <Hero />
      <HomeServices />
      <LatestProductsSlider />
      <EmailNewsletter />
    </div>
  );
}

export default Home;
