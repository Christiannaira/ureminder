
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";
import { Helmet } from "react-helmet";

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

function Result({ advice }) {

  return (
    <>
      {advice}
    </>
  )

}

function App() {

  const [advice, setAdvice] = useState('Generate reminder');
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const previousAdviceValue = useRef("");

  useEffect(() => {

    previousAdviceValue.current = advice;


  }, [advice])

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



  const handleResetAdvice = () => {

    setAdvice('Generate reminder');

  }



  return (
    <>
      <header>
        <Helmet>
          <title>Ureminder</title>
          {/* <link rel="icon" type="image/svg+xml" href="/vite.svg" /> */}
          <meta name="description" content="ureminder is an application that gives you daily reminder" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charset="UTF-8" />

        </Helmet>
      </header>

      <main>
        <div className="ureminder">

          <div className="ureminder--content container-sm h-100 text-md-center d-sm-flex align-items-center">

            <div className="ureminder--content w-100 h-50 p-3">

              <h1 className="text-white fw-bolder">Your Daily Reminder Buddy</h1>
              <button onClick={handleNextAdvice}>Remind me</button>
              <button onClick={handleResetAdvice}>Reset</button>
              {
                loading ? (
                  <Loader />
                ) : (
                  <h2 className="text-light fw-normal slide-in-fwd-center fetch--result" >
                    <Result advice={advice} />
                  </h2>

                )
              }

            </div>


          </div>

          <footer>
            <p className="tip text-white text-center">Tip: Click the <span>'remind me'</span> slowly 3-5 seconds before clicking again</p>
          </footer>

        </div>

      </main>


    </>
  )
}

export default App
