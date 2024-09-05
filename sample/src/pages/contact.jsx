import { useState } from "react";
import AnimationWrapper from "../common/page-animation";
import Footer from "../components/footer";
import InputBox from "../components/input";

const Contact = () => {
  let maxLimit = 150
  const [text, setText] = useState("")
  const updateValue = (event) => {
    setText(event.target.value)
  }
  return (
    <>
      <section className="flex items-center justify-center">
        <AnimationWrapper>
          <form className="border bg-white p-5 shadow-lg">
            <p className="my-3 text-center font-bold">Contact Us</p>
            <InputBox
              icon="bi-person"
              className="input-box mt-2"
              placeholder="Enter Your Name"
              type="text"
            />

            <InputBox
              icon="bi-envelope"
              className="input-box mt-2"
              placeholder="Enter Your Email"
              type="email"
            />

            <textarea className="input-box1 h-20 resize-none leading-5 w-full line-clamp-6" onChange={updateValue} maxLength={maxLimit} placeholder="Message" />
            <p className="text-dark-50 text-sm text-right">{maxLimit - text.length} characters left</p>

            <button className="btn-dark bg-gray-200 text-xl py-2 center text-black mt-2">Send Message</button>
          </form>
        </AnimationWrapper>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
