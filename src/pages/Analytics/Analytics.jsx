import { useQuery } from "@tanstack/react-query";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    AreaChart,
    Area,
    Legend
} from "recharts";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const Analytics = () => {
    const axiosPrivate = UseAxiosPrivate();
    const { user } = useAuth();
    const { data: camps = [] } = useQuery({
        queryKey: [user.email, 'camps'],
        queryFn: async () => {
            const result = await axiosPrivate.get(`/registeredCamps/?email=${user.email}`);
            return result.data;
        }
    });
    return (
        <div>
            <div className="mb-10 lg:mb-20">
                <h2 className='font-bold text-4xl sm:text-5xl text-primary'>Statistics</h2>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart width={730} height={250} data={camps}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#198298" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#198298" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <YAxis dataKey="fees" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Legend />
                    <Area type="monotone" dataKey="fees" stroke="#dc404e" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
            <h3 className="text-2xl text-center font-bold mb-5 font-mono text-slate-500 pt-5 lg:pt-10">Fees of registered camps</h3>
        </div>
    );
}

export default Analytics;
