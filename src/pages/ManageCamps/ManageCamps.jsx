import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SpinnerSmall from "../../components/SpinnerSmall/SpinnerSmall";
import AdminCamp from "../../components/AdminCamp/AdminCamp";

const ManageCamps = () => {
    const { user } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { data: camps = [], isPending, refetch } = useQuery({
        queryKey: [user.email, 'camps'],
        queryFn: async () => {
            const result = await axiosPrivate.get(`/adminCamps/?email=${user.email}`);
            return result.data;
        }
    });
    return (
        <div>
            <div className="mb-5 lg:mb-10">
                <h2 className='font-bold text-4xl sm:text-5xl text-primary'>Manage Camps</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Camp Name</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th>Healthcare Professional</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isPending
                            ||
                            camps.map(camp => <AdminCamp key={camp._id} camp={camp} refetch={refetch} ></AdminCamp>)
                        }
                    </tbody>
                </table>
                    <div>
                        {
                            isPending
                            &&
                            <SpinnerSmall></SpinnerSmall>
                        }
                    </div>
            </div>
        </div>
    );
}

export default ManageCamps;
