import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Chatgpt() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Hello there, How can NIERA help you today?");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take upto 10 seconds");
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_SECRET_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
    setQuestion("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      generateAnswer(e);
    }
  };


  return (
    <>

    <div className="bg-slate-800">


      <div className="top">
        <img
          className="image1"
          src="https://wikiwandv2-19431.kxcdn.com/_next/image?url=https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/NIE_University_logo.svg/640px-NIE_University_logo.svg.png&w=640&q=50"
          alt=""
          />

        <h1 className="font-bold text-2xl" >NIERA</h1>
      </div>


<hr />
<br />
<h1 className="text-center text-2xl text-white font-mono">The National Institute of Engineering Robot Assistance</h1>
<br />
<hr />


      <div className=" answer w-full md:w-2/3 m-auto  rounded bg-black my-1 p-4 text-white h-[450px] overflow-scroll ">
        <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
      </div>


      <div className=" p-3 bg-slate-800 ">
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 m-auto text-center rounded py-2 flex gap-4 mt-[33px] "
          >
          <textarea
            required
            className="border rounded-2xl w-11/12 my-2 min-h-fit p-3 h-16 placeholder:"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask anything"
            ></textarea>
          <button
            type="submit"
            className="bg-blue-500 p-1 rounded-md hover:bg-blue-800 transition-all duration-300 h-16 mt-2 text-white "
            disabled={generatingAnswer}
            >
            Generate answer
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Chatgpt;
