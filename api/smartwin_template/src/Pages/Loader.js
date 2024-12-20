import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// function Loader() {
//   const [value, setValue] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setValue((prevValue) => {
//         const newValue = prevValue + 10;
//         if (newValue > 100) {
//           clearInterval(intervalId);
//           navigate("/home");
//         }
//         return newValue;
//       });
//     }, 1000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const divs = Array.from({ length: value / 10 }, (_, index) => (
//     <div key={index}></div>
//   ));
//   return (
//     <div style={{ width: "100vw", height: "100vh", backgroundColor: "#000" }}>
//       <div className="spinner">
//         {divs}
//         <label>{value}%</label>
//       </div>
//     </div>
//   );
// }

// export default Loader;

function Loader() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, []);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", backgroundColor: "#000" }}>
        <div className="loader">
          <img src={require("../Assets/images/skint.png").default} />
        </div>
      </div>
    </>
  );
}

export default Loader;
