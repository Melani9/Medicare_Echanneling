import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
import WhatsAppIcon from "../components/WhatsAppIcon"; // Import the WhatsAppIcon component

const Home = () => {
  return (
    <>
      <Hero
        title={"Welcome to medicare | Your Trusted Healthcare Provider"}
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />

      {/* Add the WhatsApp Icon component */}
      <WhatsAppIcon />
    </>
  );
};

export default Home;
