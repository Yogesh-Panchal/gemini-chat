import { useEffect,useState } from 'react';
import { checkHeading, replaceHeadingStarts } from '../helper';

const Answer = ({ ans,totalResult,index}) => {

const [heading,setHeading]=useState(false);
const [answer,setAnswer]=useState(ans);
//  console.log(index);
  useEffect(() => {
    if (checkHeading(ans)) {
        setHeading(true);
        setAnswer(replaceHeadingStarts(ans));
    }
    console.log(ans, checkHeading(ans));
  }, []);

  return (
    <>
        {index === 0 && totalResult > 1 ? (
        <span className="pt-1 text-lg block text-white">{answer}</span>
        ) : heading && totalResult > 1 ? (
        <span className="pt-1 text-lg block text-white">{answer}</span>
        ) : (
        <span className="pl-5">{answer}</span>
        )}

          

      {/* {ans} */}
      {/* {heading?<span className='pt-1 text-lg block text-white'>{answer}</span>:
      <span className='pl-5'>{answer}</span>} */}
    </>
  );
};

export default Answer;
