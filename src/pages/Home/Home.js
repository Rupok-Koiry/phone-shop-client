import React from "react";
import SmartPhones from "../../components/SmartPhones/SmartPhones";
import Banner from "../../components/Banner/Banner";
import Reviews from "../../components/Reviews/Reviews";
import About from "../../components/About/About";
const Home = () => {
  return (
    <>
      <Banner />
      <SmartPhones />
      <About />
      <Reviews />
    </>
  );
};

export default Home;
