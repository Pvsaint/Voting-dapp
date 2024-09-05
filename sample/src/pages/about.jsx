import Footer from "../components/footer";
import AnimationWrapper from "../common/page-animation"



const About = () => {
  return (
    <>
      <AnimationWrapper>
        <section>
          <div>
            <h3 className="text-center text-2xl font-bold ">About Us</h3>
            <h2 className="text-xl font-semibold">Welcome To Electra Vote</h2>
            <p className="my-2 text-[16px]">Electra vote is an open governance initiative built on blockchain technology, aimed at promoting transparency, accountability, and trust in decision-making processes. Our mission is to empower communities and organizations to participate in governance decisions through a secure, decentralized platform that ensures fairness and inclusivity.</p>
            <h2 className="text-xl font-semibold">Our Vision</h2>
            <p className="my-2 text-[16px]">We envision a world where decision-making processes are transparent, democratic, and accessible to all. By leveraging the power of blockchain technology, we aim to create a governance model that is not only efficient and secure but also resilient to manipulation and corruption.
            </p>
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="my-2 text-[16px]">Our mission is to provide a platform that enables open and fair governance for communities and organizations worldwide. We strive to create a system where every participant has a voice and where decisions are made based on consensus and verifiable data. Through our project, we aim to foster a culture of transparency, inclusivity, and collaboration.
            </p>
          </div>

          <Footer />
        </section>
      </AnimationWrapper>

    </>
  )
}


export default About;