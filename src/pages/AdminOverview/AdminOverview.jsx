import { useQuery } from "@tanstack/react-query";
import { PieChart } from 'react-minimal-pie-chart';
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import 'animate.css';
import { Helmet } from "react-helmet-async";
import SpinnerSmall from "../../components/SpinnerSmall/SpinnerSmall";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminOverview = () => {
    const axiosPrivate = UseAxiosPrivate();
    const { user } = useAuth();
    const { data: stat = [], isPending: isStatPending } = useQuery({
        queryKey: [user.email, 'stat'],
        queryFn: async () => {
            const result = await axiosPrivate.get(`/adminStat/?email=${user.email}`);
            return result.data;
        }
    });
    console.log(stat);
    const { data: regStat = [], isPending: isRegStatPending } = useQuery({
        queryKey: ['regStat'],
        queryFn: async () => {
            const result = await axiosPrivate.get(`/stat`);
            return result.data;
        }
    });
    console.log(stat, regStat);
    if (isStatPending || isRegStatPending) {
        return <SpinnerSmall></SpinnerSmall>
    }
    let sum = 0;
    stat.payments.map(payment => sum += parseInt(payment.amount));
    let confirmed = 0;
    stat.camps.map(camp => camp.confirmationStatus ? confirmed += 1 : "")
    let paid = 0;
    stat.camps.map(camp => camp.paymentStatus === "Paid" ? paid += 1 : "")
    return (
        <div className="animate__animated animate__fadeIn">
            <Helmet>
                <title>Overview</title>
            </Helmet>
            <div className="mb-10 lg:mb-20">
                <h2 className='font-bold text-4xl sm:text-5xl text-primary'></h2>
            </div>
            <div className="flex max-sm:flex-col items-center mb-5 lg:mb-10">
                <div className="w-1/2 sm:w-1/4 max-sm:mx-auto mb-5">
                    <PieChart
                        data={[
                            { title: 'Confirmed', value: paid, color: '#198298' },
                            { title: 'Pending', value: regStat.totalParticipants - paid, color: '#dc404e' },
                        ]}
                    />
                    <div className="font-medium flex gap-2 justify-center">
                        <p className="text-primary">Paid Participant</p>
                        <p className="text-secondary">Pending Participant</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-5 mb-5 sm:mb-10 flex-wrap items-center justify-center">
                    <div className="p-5 flex flex-col justify-center items-center text-center sm:w-1/4 rounded-xl shadow-lg shadow-primary w-full sm:h-28 lg:h-20">
                        <p className="">Total Camps</p>
                        <p className="text-primary font-bold text-xl lg:text-2xl">{regStat.totalCamps} camps</p>
                    </div>
                    <div className="p-5 flex flex-col justify-center items-center text-center sm:w-1/4 rounded-xl shadow-lg shadow-primary w-full sm:h-28 lg:h-20">
                        <p className="">Total Participants</p>
                        <p className="text-primary font-bold text-xl lg:text-2xl">{regStat.totalParticipants} camps</p>
                    </div>
                    <div className="p-5 flex flex-col justify-center items-center text-center sm:w-1/4 rounded-xl shadow-lg shadow-primary w-full sm:h-28 lg:h-20">
                        <p className="">Total Revenue</p>
                        <p className="text-primary font-bold text-xl lg:text-2xl">
                            {sum}$
                        </p>
                    </div>
                    <div className="p-5 flex flex-col justify-center items-center text-center sm:w-1/4 rounded-xl shadow-lg shadow-primary w-full sm:h-28 lg:h-20">
                        <p className="">Paid Participants</p>
                        <p className="text-primary font-bold text-xl lg:text-2xl">
                            {stat.payments.length}
                        </p>
                    </div>
                    <div className="p-5 flex flex-col justify-center items-center text-center sm:w-1/4 rounded-xl shadow-lg shadow-primary w-full sm:h-28 lg:h-20">
                        <p className="">Confirmed Participants</p>
                        <p className="text-primary font-bold text-xl lg:text-2xl">
                            {confirmed}
                        </p>
                    </div>
                    <div className="p-5 flex flex-col justify-center items-center text-center sm:w-1/4 rounded-xl shadow-lg shadow-primary w-full sm:h-28 lg:h-20">
                        <p className="">Pending Participants</p>
                        <p className="text-primary font-bold text-xl lg:text-2xl">
                            {regStat.totalParticipants - confirmed}
                        </p>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={730} height={250} data={stat.allCamps}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="participantCount" fill="#198298" />
                    <Bar dataKey="campName" fill="#dc404e" />
                </BarChart>
            </ResponsiveContainer>
            <h3 className="text-2xl text-center font-bold mb-5 font-mono text-slate-500 lg:pt-10">Participants by camps</h3>
        </div>
    );
}

export default AdminOverview;
