
import { useState } from "react";
import axios from "axios";

function App() {

  const [advice, setAdvice] = useState('');
  const [id, setId] = useState(null);

  const fetchRandomAdviceApi = () => {

    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {

        const adviceData = response.data.slip.advice;
        const adviceId = response.data.slip.id;

        setAdvice(adviceData);
        setId(adviceId);

      })
      .catch((error) => {

        console.log(error);

      })

  }

  fetchRandomAdviceApi();


  return (
    <>
      <h1>HELLO WORLD</h1>
      <button>Remind me</button>
      {advice}

    </>
  )
}

export default App
