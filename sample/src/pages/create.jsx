// import { useState } from "react";
// import MyDatePicker from "../common/datepicker";
// import InputBox from "../components/input";
// import Footer from "./footer";

// const CreatePage = () => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const handleCreate = async(e) => {
//     e.preventDefault();
//     console.log(startDate);
//     console.log(endDate);
//   }
//   return (
//     <>
//       <section className="flex items-center justify-center">
//         <form className="block rounded-md bg-white p-5 shadow-lg">
//           <h3 className="mb-4 text-center text-xl">Create a Voting Poll</h3>
//           <InputBox
//             icon="bi-person"
//             className="input-box mt-2"
//             placeholder="Enter Your Name"
//             type="text"
//           />

//           <div className="my-4">
//             <label className="text-sm">Select Start Date</label>
//             <MyDatePicker setDate={(date) => setStartDate(date)}/>
//           </div>

//           <div>
//             <label className="text-sm">Select End Date</label>
//             <MyDatePicker setDate={(date) => setEndDate(date)} />
//           </div>

//           <button className="btn-dark center mt-5 min-w-[150px] bg-gray-800 px-4 py-2 text-sm" onClick={handleCreate}>
//             Create Poll
//           </button>
//         </form>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default CreatePage;


import { useState } from "react";
import MyDatePicker from "../common/datepicker";
import InputBox from "../components/input";
import Footer from "../components/footer";
import AnimationWrapper from "../common/page-animation";


const CreatePage = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    
    
    if ( !startDate || !endDate) {
      alert("Please fill in all fields");
      return; 
    }

    console.log(name);
    console.log(startDate);
    console.log(endDate);
  }

  return (
    <>
      <section className="flex items-center justify-center">
        <AnimationWrapper>
        <form className="block rounded-md bg-white p-5 shadow-lg" onSubmit={handleCreate}>
          <h3 className="mb-4 text-center text-xl font-bold">Create a Voting Poll</h3>
          
   
          <InputBox
            icon="bi-person"
            className="input-box mt-2"
            placeholder="Enter Your Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


          <div className="my-4">
            <label className="text-sm">Select Start Date</label>
            <MyDatePicker setDate={(date) => setStartDate(date)} />
          </div>

     
          <div>
            <label className="text-sm">Select End Date</label>
            <MyDatePicker setDate={(date) => setEndDate(date)} />
          </div>

       
          <button className="btn-dark center mt-5 min-w-[150px] bg-gray-800 px-4 py-2 text-sm" type="submit">
            Create Poll
          </button>
        </form>
        </AnimationWrapper>
        
      </section>
        <Footer/>
      
    </>
  );
};

export default CreatePage;
