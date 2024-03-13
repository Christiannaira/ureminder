
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
  const [listOfAdvice, setListOfAdvice] = useState([]);

  const fetchRandomAdviceApi = () => {

    setLoading(true);
    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {

        const adviceData = response.data.slip.advice;
        const adviceId = response.data.slip.id;

        // console.log(adviceData); 

        setAdvice(adviceData);
        setId(adviceId);

        setListOfAdvice((prevItem) => {

          return [prevItem, adviceData];

        })




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
      <div className="ureminder">

        <div className="ureminder--content container-sm h-100 text-center d-flex align-items-center">

          <div className="ureminder--content w-100 h-50 p-3">

            <h1 className="text-white fw-bolder">Your Daily Reminder Buddy</h1>
            <button onClick={handleNextAdvice} className="ureminder--btn border border-white w-25 bg-transparent text-white fw-normal rounded-pill p-3 mb-5 mt-3">Remind me</button>
            {
              loading ? (
                <Loader />
              ) : (
                <h2 className="text-light fw-normal slide-in-fwd-center" >{advice}</h2>
              )
            }

          </div>


        </div>

      </div>


    </>
  )
}

export default App
