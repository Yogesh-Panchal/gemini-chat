import './App.css'
import { useState } from 'react'
import { URL } from './constants';
import Answer from './components/Answer';
function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recenthistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')));

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

    if(localStorage.getItem('history')){
      let history = JSON.parse(localStorage.getItem('history'));
      history = [question,...history];
      localStorage.setItem('history',JSON.stringify(history));
      setRecentHistory(history);
    }
    else{
      localStorage.setItem('history',JSON.stringify([question]));
      setRecentHistory([question]);
    }
    console.log(recenthistory)
   
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    setResult([...result, { type: 'q', text: question }, { type: 'a', text: dataString }]);
    
  }

  const clearHistory = () => {
    localStorage.removeItem('history');
    setRecentHistory([]);
  }

  return (
    <div className='grid grid-cols-5 '>
      <div className='col-span-1 bg-zinc-800 h-screen pt-5'>
        <h1 className='text-xl text-center text-white flex justify-center'>
          <spa>Recent History</spa>
          <button onClick={clearHistory} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
        </h1>
        <ul className='text-left overflow-auto border-zinc-700 text-white ml-1 text-sm text-white m-5'>
          {
            recenthistory && recenthistory.map((item) => (
              <li key={item} className='border-b p-1 truncate cursor-pointer hover:bg-zinc-700 hover:text-zinc-200'>{item}</li>
            ))
          }
        </ul>
      </div>
      <div className='col-span-4 p-10 '>
        <div className='container h-110 overflow-y-auto '>
          <div className=' text-zinc-300 '>
            <ul>
              {
                result.map((item, index) => (
                  <div key={index + Math.random()} className={item.type === 'q' ? 'flex justify-end' : 'justify-start'}>
                    {
                      item.type === 'q' ? (
                        <li key={index + Math.random()} className='text-right p-1 border-5 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit text-white'>
                          <Answer ans={item.text} totalResult={1} index={index} type={item.type} /></li>)
                        : item.text.map((ansItem, ansIndex) => (<li key={index + Math.random()} className='text-left p-2'><Answer ans={ansItem} totalResult={item.length} index={ansIndex} type={item.type} /></li>
                        ))                  
                  }
                  </div>
                ))
              }
            </ul>            
          </div>
        </div>
        <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl 
            border border-zinc-700 flex h-16'>
          <input type='text' value={question} onChange={(event) => setQuestion(event.target.value)} className='w-full h-full p-3 outline-none ' placeholder='Ask me anything...' />
          <button onClick={askQuestion} >Ask</button>
        </div>
      </div>
    </div>
  )
}
export default App
