import Banner from "../../components/Banner/Banner";
import Feedback from "../../components/Feedback/Feedback";
import PopularCamps from "../../components/PopularCamps/PopularCamps";
import 'animate.css';
import { Helmet } from "react-helmet-async";
import Statistics from "../../components/Statistics/Statistics";

const Home = () => {
    return (
        <div className="space-y-10 lg:space-y-24 animate__animated animate__fadeIn">
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <Feedback></Feedback>
            <Statistics></Statistics>
        </div>
    );
}

export default Home;
