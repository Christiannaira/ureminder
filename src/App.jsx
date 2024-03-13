
import { useState } from "react";
import axios from "axios";

function App() {

  const [advice, setAdvice] = useState('Generate reminder');
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomAdviceApi = () => {

    setLoading(true);

    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {

        const adviceData = response.data.slip.advice;
        const adviceId = response.data.slip.id;

        console.log(adviceData);

        setAdvice(adviceData);
        setId(adviceId);



      })
      .catch((error) => {

        console.log(error);

      })
      .finally(() => {

        setLoading(false);

      })


  }


  const handleNextAdvice = () => {

    fetchRandomAdviceApi();

  }

  return (
    <>
      <h1>HELLO WORLD</h1>
      <button onClick={handleNextAdvice}>Remind me</button>
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <h1>{advice}</h1>
        )
      }

    </>
  )
}

export default App
