import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

const thanks = ['Thank you for taking the time to speak with us today',
 'Thank you for sharing your valuable insights with us.', 
 'Thank you for sharing your expertise with us.',
 'Thank you for sharing your knowledge with us.',
 'Thank you for sharing your wisdom with us.',
 'Thank you for sharing your experience with us.',
 'Thank you for sharing your stories with us.',
 ' Thank you for sharing your time with us',
 'Thank you for sharing your knowledge and expertise with us',
 ' Thank you for your patience in answering our questions.',
 'Thank you for providing us with valuable information.',
 'Thank you for your insights and observations.',
 'Thank you for making your presentation interesting and enjoyable.',
]
    


export default function Home() {
  const [topicInput, setTopicInput] = useState(""); //topicInput is fed from textbox
  const [result, setResult] = useState();
  const [thanksM, setThanks] = useState(); 
  const [inRegards, setInRegards] = useState(); 

  async function onSubmit(event) { //When form is submited
    event.preventDefault(); //Stop page from re-loading
    const response = await fetch("/api/generate", { //fetch to OpenAI API using the code in apo/generate
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: topicInput }), //send topic variable to OpenAI, with value of topicInpit from text box
    });
    const data = await response.json();
    setResult(data.result); //result state now updated.
   
    const randomNumber = Math.random(12)*12
    const roundedNumber = Math.floor(randomNumber)
    console.log('********* RANDOM NUMBER ********', roundedNumber)
  const newThanks = thanks[roundedNumber]
    setThanks(newThanks);
    setInRegards('In regards to ' + topicInput)
    setTopicInput("");
  }

  return (
    <div>
      <Head>
        <title>TechQs</title>
        <link rel="icon" href="/techqs-logo.png" />
      </Head>

      <main className={styles.main}>
        <img src="/techqs-logo.png" className={styles.icon} />
        <h3>TechQs - Generate questions for Tech presentations...</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="topic"
            placeholder="Enter a tech subject"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
          />
          <input type="submit" value="Generate Questions" />
        </form>
        <div className={styles.result}>{thanksM}</div>
        <div className={styles.result}>{inRegards}</div>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
