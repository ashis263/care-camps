import Banner from "../../components/Banner/Banner";
import Feedback from "../../components/Feedback/Feedback";
import PopularCamps from "../../components/PopularCamps/PopularCamps";

const Home = () => {
    return (
        <div className="space-y-10 lg:space-y-24">
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <Feedback></Feedback>
        </div>
    );
}

export default Home;
