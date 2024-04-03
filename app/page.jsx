import { CardsInfo } from '../utils/constants'
import Nav from "@components/Nav";
import { TextGenerateEffect } from "@components/Text-Generate";
import Cards from "../components/Cards.jsx";
const Home = () => {
  const words = `Mobistack serves as a collaborative hub for Mobelite team members, facilitating the exposition and resolution of technical issues and enabling the exchange of ideas.
`;

  return (
    <div>
      <div className='mt-4'>
        <Nav />
      </div>
      <div className='home'>
        <section className="w-full flex-center flex-col">
          <h1 className="head_text text-center">Solve & Share
            <br className="max-md:hidden" />
            <span className="blue_gradient text-center">Coding Problems</span></h1>
          <div className="desc text-center"><TextGenerateEffect words={words} /></div>
          <div className='flex justify-center items-center flex-wrap gap-4 mt-10'>
            {
              CardsInfo?.map((card, index) => (
                <Cards key={index} title={card.title} description={card.description} icon={card.icon} />
              ))
            }
          </div>
        </section>
      </div>
    </div>
  )
}
export default Home;