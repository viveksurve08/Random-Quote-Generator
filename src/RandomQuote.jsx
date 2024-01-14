import React, { useState, useEffect } from "react";
import "./RandomQuote.css";
import { BsTwitterX } from "react-icons/bs";
import { IoReload } from "react-icons/io5";

const RandomQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang von Goethe.",
  });

  useEffect(() => {
    async function loadQuotes() {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    }

    loadQuotes();
  }, []);

  const random = () => {
    const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(selectedQuote);
  };

  const twitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${quote.text}-${
        quote.author.split(",")[0]
      }`
    );
  };

  return (
    <>
      <h1>Random Quote Generator</h1>
      <div className="container">
        <div className="quote">{quote.text}</div>
        <div>
          <div className="line"></div>
          <div className="buttom">
            <div className="author">- {quote.author.split(",")[0]}</div>
            <div className="icons">
              <IoReload
                className="img"
                onClick={() => {
                  random();
                }}
              />
              <BsTwitterX
                className="img"
                onClick={() => {
                  twitter();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RandomQuote;
