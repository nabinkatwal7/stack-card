import { useState, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import "./App.css";

function App() {
  const cards = document.querySelectorAll(".card");
  const header = document.querySelector(".header");
  const animation = gsap.timeline();
  let cardHeight;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function initCards() {
      animation.clear();
      cardHeight = cards[0].offsetHeight;
      console.log("initCards()", cardHeight);
      cards.forEach((card, index) => {
        if (index > 0) {
          //increment y value of each card by cardHeight
          gsap.set(card, { y: index * cardHeight });
          //animate each card back to 0 (for stacking)
          animation.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0);
        }
      });
    }

    initCards();

    ScrollTrigger.create({
      trigger: ".wrapper",
      start: "top top",
      pin: true,
      end: () => `+=${cards.length * cardHeight + header.offsetHeight}`,
      scrub: true,
      animation: animation,
      markers: true,
      invalidateOnRefresh: true,
    });

    ScrollTrigger.addEventListener("refreshInit", initCards);
  }, []);

  return (
    <div>
      <div className="spacer h-[50vh]">Scroll Down</div>
      <div className="wrapper">
        <div className="header">
          GSAP SCROLLTRIGGER
          <br /> <span>FREE DEMO</span>
        </div>
        <div className="cards">
          <div className="card">stacking</div>
          <div className="card">cards</div>
          <div className="card">for</div>
          <div className="card">you</div>
          <div className="card">to</div>
          <div className="card">explore</div>
          <div className="card">and</div>
          <div className="card">use</div>
        </div>
      </div>
      <div className="spacer h-[100vh] text-center">
        SEE VIDEO DESCRIPTION FOR DEMO LINK
      </div>
    </div>
  );
}

export default App;
