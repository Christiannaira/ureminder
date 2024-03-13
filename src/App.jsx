
import { useState } from "react";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";

function Loader() {

  return (

    <div>

      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />

    </div>

  )

}

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
      <div className="container">

        <h1>HELLO WORLD</h1>
        <button onClick={handleNextAdvice}>Remind me</button>
        {
          loading ? (
            <Loader />
          ) : (
            <h1>{advice}</h1>
          )
        }

      </div>

    </>
  )
}

export default App
