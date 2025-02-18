import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import SpinnerSmall from "../SpinnerSmall/SpinnerSmall";
import Camp from "../Camp/Camp";

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
        <div className="">
            <div className="my-5 lg:my-10">
                <h2 className='font-bold text-4xl sm:text-5xl text-secondary drop-shadow-2xl text-center'>Popular Camps</h2>
                <p className="text-center py-2">Camps people joined the most</p>
            </div>
            <div className="rounded-xl">
                {
                    isPending
                    &&
                    <SpinnerSmall></SpinnerSmall>
                }
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20 pt-5 lg:pt-10`}>
                    {
                        !isPending
                        &&
                        camps.map(camp => <Camp key={camp._id} camp={camp}></Camp>)
                    }
                </div>
            </div>
        </div>
    );
}

export default PopularCamps;
