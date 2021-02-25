/* global chrome */
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const App = () => {
  const [domain, setDomain] = useState("");
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url);
      const domain = url.hostname;
      setDomain(domain);
      getHeadlines(domain);
    });
  });

  const getHeadlines = (query) => {
    axios
      .get("https://newsapi.org/v2/everything", {
        params: {
          q: query,
          language: "en",
          apiKey: "f657b2aeab874db4a76c0b0091976d2d",
        },
      })
      .then((results) => {
        setHeadlines(results.data.articles.slice(0, 5));
      })
      .catch((error) => {
        console.log("Error in obtaining headlines", error);
      });
  };

  return (
    <div className="App">
      <h1 className="App-title">{domain}</h1>
      Top headlines:
      {headlines.map((headline) => (
        <h4
          className="link"
          onClick={() => {
            window.open(headline.url);
          }}
        >
          {headline.title}
        </h4>
      ))}
    </div>
  );
};

export default App;
