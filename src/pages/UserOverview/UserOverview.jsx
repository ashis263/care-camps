import { useQuery } from "@tanstack/react-query";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend,
    BarChart,
    Bar
} from "recharts";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import 'animate.css';
import { Helmet } from "react-helmet-async";
import SpinnerSmall from '../../components/SpinnerSmall/SpinnerSmall'

const UserOverview = () => {
    const axiosPrivate = UseAxiosPrivate();
    const { user } = useAuth();
    const { data: stat = [], isPending } = useQuery({
        queryKey: [user.email, 'stat'],
        queryFn: async () => {
            const result = await axiosPrivate.get(`http://localhost:5000/userStat/?email=${user.email}`);
            return result.data;
        }
    });
    if (isPending) {
        return <SpinnerSmall></SpinnerSmall>
    }
    let sum = 0;
    stat.payments.map(payment => sum += parseInt(payment.amount));
    return (
        <div className="animate__animated animate__fadeIn">
            <Helmet>
                <title>Overview</title>
            </Helmet>
            <div className="mb-10 lg:mb-20">
                <h2 className='font-bold text-4xl sm:text-5xl text-primary'></h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 mb-5 sm:mb-10">
                <div className="p-5 flex flex-col justify-center items-center w-full sm:w-1/3 rounded-xl shadow-lg shadow-primary">
                    <p className="">Camps Joined</p>
                    <p className="text-primary font-bold text-xl lg:text-2xl">{stat.camps.length} camps</p>
                </div>
                <div className="p-5 flex flex-col justify-center items-center w-full sm:w-1/3 rounded-xl shadow-lg shadow-primary">
                    <p className="">Paid for</p>
                    <p className="text-primary font-bold text-xl lg:text-2xl">{stat.payments.length} camps</p>
                </div>
                <div className="p-5 flex flex-col justify-center items-center w-full sm:w-1/3 rounded-xl shadow-lg shadow-primary">
                    <p className="">Total payments</p>
                    <p className="text-primary font-bold text-xl lg:text-2xl">
                        {
                            sum
                        }$
                    </p>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={730} height={250} data={stat.payments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#198298" />
                    <Bar dataKey="campName" fill="#dc404e" />
                </BarChart>
            </ResponsiveContainer>
            <h3 className="text-2xl text-center font-bold mb-5 font-mono text-slate-500">Fees of paid camps</h3>
        </div>
    );
}

export default UserOverview;
