import vote from "../assets/onlinevote.png";
import sensi from "../assets/sinsei.png";
import AnimationWrapper from "../common/page-animation";
import Footer from "../components/footer";
import { Link } from "react-router-dom"


const Home = () => {
  return (
    <>

      <AnimationWrapper>
        <div className="lg:px-160 mt-[10px] flex min-h-[400px] items-center justify-center px-4 md:px-8">
          <div className="m-1 rounded-lg bg-gray-50">
            <section className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
              <div className="mt-20 flex flex-col justify-center">
                <h3 className=" text-5xl font-[800] uppercase">
                  Instant Voting With Just A Tap
                </h3>
                <p className="text-[18px] my-4">
                  Transparent & Secured
                </p>
                <button className="btn-dark mt-2 w-fit rounded-full bg-gray-200 text-[16px] text-gray-800">
                  Get The App
                </button>
              </div>

              <div className="flex flex-col mt-5 items-center justify-center">
                <img src={vote} alt="People Voting" className="ml-20" />
                <h2 className="font-bold text-center text-2xl">
                  Now Everyone Can participate
                </h2>
                <h2 className="font-bold text-center text-sm">
                  From your comfort!!!
                </h2>
              </div>
            </section>
          </div>
        </div>


        <section className="mt-[1px] grid grid-cols-1 md:mt-[20px] md:grid-cols-2 md:gap-5">
          <div className="mt-10">
            <h1 className="text-5xl font-bold">
              The same experience online even better and faster
            </h1>
            <h3 className="mt-2">
              For those who are hooked to their PCs, we got you, Sensei
            </h3>
            <Link to="/create"> <button className="btn-dark mt-5 w-fit rounded-full bg-gray-200 text-[16px] text-gray-800">
              Vote Online
            </button>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <img src={sensi} alt="sinsei" />
          </div>
        </section>

        <section className="mt-[10px] md:mt-[20px]">
          <div className="flex flex-col items-center justify-center lg:px-16 md:px-8 min-h-80 rounded-lg bg-gray-100 px-4">
            <h1 className="text-center text-4xl font-bold text-gray-800">
              Download The App To Get Started
            </h1>
            <div className="flex items-center justify-center">
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <button className="btn-dark mt-5 flex items-center justify-center gap-2" type="submit">
                  <i className="bi bi-apple"></i>
                  <p className="text-[16px] text-center">
                    Get it on <strong>App Store</strong>
                  </p>
                </button>
                <button className="btn-dark bg-gray-100 border border-gray-800 mt-5 flex items-center justify-center gap-2" type="submit">
                  <i className="bi bi-google-play text-gray-800"></i>
                  <p className="text-[16px] text-gray-800">
                    Get it on <strong>Play Store</strong>
                  </p>
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </AnimationWrapper>

    </>
  );
};

export default Home;
