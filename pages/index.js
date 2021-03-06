import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css"


const thanks = ['Thank you for taking the time to speak with us today. ',
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
  const [disable, setDisable] = useState([false, 'Generate Questions'])
  async function onSubmit(event) { //When form is submited
    console.log('Form Submited')
    event.preventDefault(); //Stop page from re-loading
    setDisable([true, 'Loading...'])
    const response = await fetch("./api/generate", { //fetch to OpenAI API using the code in apo/generate
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ topic: topicInput }), //send topic variable to OpenAI, with value of topicInpit from text box
    });

    console.log('Fetch Success')
    const data = await response.json();
    console.log('Data is ...', data)
    setResult(data.result); //result state now updated.
    console.log('Line 45 Executed....')
    const randomNumber = Math.random(12)*12
    const roundedNumber = Math.floor(randomNumber)
    console.log('********* RANDOM NUMBER ********', roundedNumber)
  const newThanks = thanks[roundedNumber]
    setThanks(newThanks);
    setInRegards('. Just a quick question, In regards to ' + topicInput)
    setTopicInput("");
    setDisable([false, 'Generate Questions'])
  }

  return (
    <div>
      <Head>
        <title>TechQs</title>
        <link rel="icon" href="/techqs-logo.png" />
      </Head>

      <main className={styles.main}>
        <img src="/techqs-logo.png" className={styles.icon} />
        <h3>TechQs V1.0.1 - Generate questions for Tech presentations...</h3>
        
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="topic"
            placeholder="Enter a tech subject"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
          />
 
          <input type="submit" value={disable[1]} disabled={ disable[0] } />
        </form>
        <div className={styles.result} >
        <span > {thanksM} </span>
        <span  className={styles.result}> {inRegards} </span>
        <span> {result} </span>
        </div>
      </main>
    </div>
  );
}
