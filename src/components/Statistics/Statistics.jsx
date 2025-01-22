import { useLoaderData } from "react-router-dom";
import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie
} from "recharts";

const Statistics = () => {
    const data = useLoaderData();
    return (
        <div>
            <div className="my-5 lg:my-10">
                <h2 className='font-bold text-4xl sm:text-5xl text-secondary drop-shadow-2xl text-center'>Our Statistics</h2>
                <p className="text-center py-2">About our camps and clients</p>
            </div>
            <div className="sm:flex justify-center items-center space-y-28">
                <div className="sm:w-2/5 w-[55%] mx-auto -mt-20">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart width={730} height={250}>
                        <Pie data={data.camps} dataKey="participantCount" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#198298" />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <h4 className="text-xl text-center text-slate-500 font-mono -m-20">Participants by camp</h4>
                </div>
                <div className='sm:w-2/5 mx-auto self-end'>
                    <p className="text-primary font-mono font-bold text-center sm:text-end">About us</p>
                    <p className={`text-justify`}>
                        We work to bridge the gap in healthcare by organizing impactful medical camps that deliver quality care to various communities. From preventive screenings to life-saving treatments, our camps are designed to inspire hope and transform lives.
                    </p>
                    <div className='flex gap-3 text-white font-bold justify-center sm:justify-end pt-5 sm:pt-10 items-start'>
                        <button className='px-5 w-32 sm:w-40 lg:w-52 xl:w-60 xl:px-10 py-2 text-primary text-3xl sm:text-4xl lg:text-5xl font-bold rounded-lg'>{data.totalCamps} <span className='text-xs font-light text-gray-400'> Available Camps</span></button>
                        <button className='px-5 w-32 sm:w-40 lg:w-52 xl:w-60 xl:px-10 py-2 text-primary text-3xl sm:text-4xl lg:text-5xl font-bold rounded-lg'>{data.totalParticipants}<span className='text-xs font-light text-gray-400'>  Camp participants</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
