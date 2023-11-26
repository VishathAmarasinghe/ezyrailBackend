const router=require("express").Router();
const bodyParser = require('body-parser');
const axios=require('axios');
const OpenAI=require('openai');

const promptmsg="if user asked anything not related to railway srilanka  do not answer those questions. please say that you are only. trained to answer specific questions. always use very short answers.  if user need anything to add other than basic system requirments, please tell them to contact ezyrail@gmail.com.\n      if anything asked about system or railway related thing, please say to contact ezyRail@gmail.com. total 31 stations are there. pettah and Avissawella are the coner stations(End stations) normal delay duration for trains are approximately 5 to 10 minutes";


const chatWithGPT3 = async (userInput) => {
    const openai = new OpenAI({
    //   apiKey: "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",
      dangerouslyAllowBrowser: true,
    });

    const data = {
      prompt: userInput,
      max_tokens: 150,
    };
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: promptmsg,
          },
          {
            role: "user",
            content: userInput,
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(response.choices[0].message);
      //   response.data.choices[0].text.trim()
      return String(response.choices[0].message.content);
    } catch (error) {
      console.error("Error communicating with the API:", error.message);
      return "";
    }
  };





router.post("/chatresponse", async(req,res)=>{
    try {
        console.log("request  ",req.body.message);
        const response=await chatWithGPT3(req.body.message);
        console.log(response);
        
        res.send(response);
    } catch (error) {
        console.log("chat Error "+error);
    }
})



module.exports = router;