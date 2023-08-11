require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
// const readline = require("readline");

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// userInterface.prompt();

const createChat = async (input, callback) => {
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
     messages: [{role:"system", content:"if the result is a list return the response in html format"},{ role: "user", content: input }],
    })
    .then((res) => {
      // userInterface.prompt();
      callback({
        chatInput: + input,
        chatResponse: " >> " + res.data.choices[0].message.content,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

// userInterface.on("line", (input) => {
//   createChat(input);
// });

module.exports = {
  createChat: createChat,
};