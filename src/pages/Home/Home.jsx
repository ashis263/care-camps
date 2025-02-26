import Feedback from "../../components/Feedback/Feedback";
import PopularCamps from "../../components/PopularCamps/PopularCamps";
import 'animate.css';
import { Helmet } from "react-helmet-async";
import Statistics from "../../components/Statistics/Statistics";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Professionals from "../../components/Professionals/Professionals";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import RecentCamps from "../../components/RecentCamps/RecentCamps";
import FAQ from "../../components/FAQ/FAQ";

const Home = () => {
    const axiosPublic = UseAxiosPublic();
    const { data: doctors = [], isPending } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const result = await axiosPublic.get('/professionals');
            return result.data;
        }
    })
    return (
        <div className="space-y-10 lg:space-y-24 animate__animated animate__fadeIn">
            <Helmet>
                <title>Home</title>
            </Helmet>
            <RecentCamps doctors={doctors} isPending={isPending}></RecentCamps>
            <PopularCamps></PopularCamps>
            <Professionals doctors={doctors} isPending={isPending}></Professionals>
            <Feedback></Feedback>
            <Statistics></Statistics>
            <FAQ></FAQ>
            <NewsLetter></NewsLetter>
        </div>
    );
}

export default Home;
