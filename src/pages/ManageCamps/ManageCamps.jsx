import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SpinnerSmall from "../../components/SpinnerSmall/SpinnerSmall";
import AdminCamp from "../../components/AdminCamp/AdminCamp";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";

const ManageCamps = () => {
    const { user } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [searchKey, setSearchKey] = useState('');
    const [activePage, setActivePage] = useState(1);
    const [isDeleted, setIsDeleted] = useState(false);
    console.log(isDeleted);
    const { data: camps = [], isPending, refetch } = useQuery({
        queryKey: [user.email, searchKey, activePage, 'camps'],
        queryFn: async () => {
            const result = await axiosPrivate.get(`/adminCamps/?email=${user.email}&page=${activePage}&searchKey=${searchKey}`);
            return result.data;
        }
    });
    const handleSearch = ( e ) => {
        setSearchKey(e.target.value);
        setActivePage(1);
    }
    return (
        <div>
            <div className="mb-5 lg:mb-10">
                <h2 className='font-bold text-4xl sm:text-5xl text-primary'>Manage Camps</h2>
            </div>
            <div className="flex justify-end max-sm:justify-center mb-3">
                <label className="input input-sm input-bordered flex items-center gap-2">
                    <input onChange={handleSearch} type="text" className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
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
                            camps.map(camp => <AdminCamp key={camp._id} isDeleted={isDeleted} setIsDeleted={setIsDeleted} camp={camp} refetch={refetch} ></AdminCamp>)
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
            <Pagination link={`/adminCamps/count/?email=${user.email}&searchKey=${searchKey}`} count={10} isDeleted={isDeleted} refetch={refetch} activePage={activePage} setActivePage={setActivePage}></Pagination>
        </div>
    );
}

export default ManageCamps;
