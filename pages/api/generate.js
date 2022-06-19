
// Suggest questions to ask guest speakers
/**
Suggest a name for a tech question generator app:
TechQs
 * Create logo
Create the greeting part. To save API tokens, generate 20, and create an object, that randomly displays on of them....
 * 
 */


import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
 

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.topic),
    temperature: 0.6,  max_tokens: 500,
  });
 

  res.status(200).json({ result: completion.data.choices[0].text }); //
  console.log(completion.data)
  //console.log('complication JSON file..... ******: ', res.json(completion))
 

}


function generatePrompt(topic) {
  const capitalizedTopic =
    topic[0].toUpperCase() + topic.slice(1).toLowerCase();
    console.log('this is topic..',topic)
    console.log('This is capitalized topic', capitalizedTopic)
   
  return `Suggest five questions for a topic that is related to  web development.
Topic: React
Questions: Why are other React alternatives that you've considered?, Why did you choose React?, What are the advantages of using React vs NextJs?, What is the job interview process like at your company?, How do you support your developers?
Topic: Javascript
Questions: What percentage of your developers are pure Javascript developers?, Do you mainly use the ES6 version of Javascript?, Does your company use any Javascript frameworks?, Why do you expect a juniour developer to know?, How often does your company hire junior developers?
Topic: ${capitalizedTopic}
Questions:`;

}
