import './App.css'
import { useState } from 'react'
import { URL } from './constants';
import Answer from './components/Answer';
function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);

  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ],
  }

  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    //console.log(dataString);
    //setResult([question,dataString]);
    setResult([...result,{type:'q',text:question},{type:'a',text:dataString}]);

    //setResult(response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model");
    // console.log(
    //   response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model"
    // );
    //console.log(result);
  }
  return (
    <div className='grid grid-cols-5 '>
      <div className='col-span-1 bg-zinc-800 h-screen'>

      </div>
      <div className='col-span-4 p-10 '>
        <div className='container h-110 overflow-scroll'> 
          <div className=' text-zinc-300'>
            <ul>  
              {              
              result.map((item, index) => (
                item.type === 'q' ? ( 
                  <li  key={index+Math.random()} className='text-left p-2'><Answer ans={item.text} totalResult={1} index={index} /></li> )
                  : item.text.map((ansItem,ansIndex) => ( <li  key={index+Math.random()} className='text-left p-2'><Answer ans={ansItem} totalResult={item.length} index={ansIndex} /></li>
                  ))
                ))
              
              }
            </ul>  
            {/* <ul>              
              {
                result && result.map((item, index) => (
                  <li  key={index+Math.random()} className='text-left p-2'><Answer ans={item} totalResult={result.length} index={index} /></li>
                ))
              }
            </ul> */}
          </div>
        </div>
        <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl 
            border border-zinc-700 flex h-16'>
          <input type='text' value={question} onChange={(event) => setQuestion(event.target.value)} className='w-full h-full p-3 outline-none ' placeholder='Ask me anythig...' />
          <button onClick={askQuestion} >Ask</button>
        </div>
      </div>
    </div>
  )
}

export default App
