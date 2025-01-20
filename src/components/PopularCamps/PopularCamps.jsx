import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import SpinnerSmall from "../SpinnerSmall/SpinnerSmall";
import Camp from "../Camp/Camp";
import { Link } from "react-router-dom";

const PopularCamps = () => {
    const axiosPublic = UseAxiosPublic();
    const { data: camps = [], isPending } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const result = axiosPublic.get('/camps/popular');
            return (await result).data;
        }
    });
    return (
        <div className="sm:w-4/5 mx-auto self-stretch">
            <div className="my-5 lg:my-10">
                <h2 className='font-bold text-4xl sm:text-5xl text-primary text-center'>Popular Camps</h2>
                <p className="text-center py-2">Camps people joined the most</p>
            </div>
            <div className="shadow-md shadow-primary rounded-xl">
                {
                    isPending
                    &&
                    <SpinnerSmall></SpinnerSmall>
                }
                <div className={`grid grid-cols-1 sm:grid-cols-2 p-5 lg:p-10 :grid-cols-3 gap-5 lg:gap-20 py-5 lg:py-10`}>
                    {
                        !isPending
                        &&
                        camps.map(camp => <Camp key={camp._id} camp={camp}></Camp>)
                    }
                </div>
                <div className="flex justify-center pb-5 px-10 lg:py-10">
                <Link to="/camps" className="btn bg-primary text-white hover:bg-primary max-sm:btn-sm w-full">Available Camps</Link>
                </div>
            </div>
        </div>
    );
}

export default PopularCamps;
