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
import { PieChart } from 'react-minimal-pie-chart';

const UserOverview = () => {
    const axiosPrivate = UseAxiosPrivate();
    const { user } = useAuth();
    const { data: stat = [], isPending } = useQuery({
        queryKey: [user.email, 'stat'],
        queryFn: async () => {
            const result = await axiosPrivate.get(`/userStat/?email=${user.email}`);
            return result.data;
        }
    });
    if (isPending) {
        return <SpinnerSmall></SpinnerSmall>
    }
    let sum = 0;
    stat.payments.map(payment => sum += parseInt(payment.amount));
    let confirmed = 0;
    stat.camps.map(camp => camp.confirmationStatus ? confirmed += 1 : "")
    return (
        <div className="animate__animated animate__fadeIn">
            <Helmet>
                <title>Overview</title>
            </Helmet>
            <div className="mb-10 lg:mb-20">
                <h2 className='font-bold text-4xl sm:text-5xl text-primary'></h2>
            </div>
            <div className="flex max-sm:flex-col items-center justify-between mb-5 lg:mb-10">
                <div className="w-1/2 sm:w-1/4 max-sm:mx-auto mb-5">
                    <PieChart
                        data={[
                            { title: 'Confirmed', value: confirmed, color: '#198298' },
                            { title: 'Pending', value: stat.camps.length - confirmed, color: '#dc404e' },
                        ]}
                    />
                    <div className="font-medium flex gap-2 justify-center">
                        <p className="text-primary">Confirmed Camps</p>
                        <p className="text-secondary">Pending Camps</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-5 mb-5 sm:mb-10">
                    <div className="p-5 flex flex-col items-center w-full sm:w-1/3 rounded-lg shadow-lg shadow-primary text-center justify-between">
                        <p className="">Camps Joined</p>
                        <p className="text-primary font-bold text-xl lg:text-2xl">{stat.camps.length} camps</p>
                    </div>
                    <div className="p-5 flex flex-col items-center w-full sm:w-1/3 rounded-lg shadow-lg shadow-primary text-center justify-between">
                        <p className="">Paid for</p>
                        <p className="text-primary font-bold text-xl lg:text-2xl">{stat.payments.length} camps</p>
                    </div>
                    <div className="p-5 flex flex-col items-center w-full sm:w-1/3 rounded-lg shadow-lg shadow-primary text-center justify-between">
                        <p className="">Total payments</p>
                        <p className="text-primary font-bold text-xl lg:text-2xl">
                            {
                                sum
                            }$
                        </p>
                    </div>
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
