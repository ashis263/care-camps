import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import SpinnerSmall from '../../components/SpinnerSmall/SpinnerSmall'

const Statistics = () => {
    const axiosPublic = UseAxiosPublic();
    const { data = [], isPending } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const result = await axiosPublic.get('/stat');
            return result.data;
        }
    });
    return (
        <div id="statistics" className="">
            <div className="my-5 lg:my-10">
                <h2 className='font-bold text-4xl sm:text-5xl text-secondary drop-shadow-2xl text-center'>Our Statistics</h2>
                <p className="text-center py-2">About our camps and clients</p>
            </div>
            {
                isPending
                    ?
                    <SpinnerSmall></SpinnerSmall>
                    :
                    <div className="sm:flex justify-between">
                        <div className="sm:w-2/5 max-sm:mx-auto flex flex-col justify-between max-sm:mb-5">
                            <button className='w-1/2 lg:w-52 xl:w-60 text-primary text-3xl sm:text-4xl lg:text-5xl font-bold border-r-8 border-b-8 border-primary'>{data.totalCamps} <span className='text-xs font-light text-gray-400 text-end'> Available Camps</span></button>
                            <div className="flex justify-end">
                                <button className='w-1/2 lg:w-52 xl:w-60 text-primary text-3xl sm:text-4xl lg:text-5xl font-bold border-t-8 border-primary border-l-8'>{data.totalParticipants}<span className='text-xs font-light text-gray-400'>  Camp participants</span></button>
                            </div>
                        </div>
                        <div className='sm:w-2/5 max-sm:mx-auto'>
                            <p className="text-primary font-mono font-bold text-center sm:text-end">Who we are</p>
                            <p className={`text-justify`}>
                                We work to bridge the gap in healthcare by organizing impactful medical camps that deliver quality care to various communities. From preventive screenings to life-saving treatments, our camps are designed to inspire hope and transform lives.
                            </p>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Statistics;
