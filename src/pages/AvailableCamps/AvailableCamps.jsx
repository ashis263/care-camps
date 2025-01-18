import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import Camp from "../../components/Camp/Camp";
import usePages from "../../hooks/usePages";
import { useEffect, useState } from "react";
import { RiLayoutGrid2Fill, RiLayoutGridFill } from "react-icons/ri";
import SpinnerSmall from "../../components/SpinnerSmall/SpinnerSmall";

const AvailableCamps = () => {
    const axiosPublic = UseAxiosPublic();
    const [activePage, setActivePage] = useState(1);
    const [showing, setShowing] = useState();
    const [isLayoutToggled, setIsLayoutToggled] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [sortBy, setSortBy] = useState('_id');
    const { data: camps = [], isPending, refetch } = useQuery({
        queryKey: [activePage, sortBy, searchKey, 'camps'],
        queryFn: async () => {
            const result = await axiosPublic.get(`/camps/?page=${activePage}&sortBy=${sortBy}&searchKey=${searchKey}`);
            return result.data;
        }
    });
    const { paginationData, isPagesLoading } = usePages('/camps/count', 6);
    const { pages, totalData } = paginationData;
    const handlePagination = page => {
        if (page > 0 && page <= pages.length) {
            setActivePage(page);
            refetch();
        }
    };
    useEffect(() => {
        const skippped = (activePage - 1) * 6;
        const remaining = totalData - skippped;
        setShowing(`${totalData === 0 ? 0 : skippped + 1} to ${remaining < 6 ? totalData : skippped + 6}`)
    }, [activePage, totalData]);
    return (
        <div>
            <h2 className='font-bold text-3xl sm:text-5xl text-primary max-lg:text-center lg:text-end drop-shadow'>Explore available camps to join now</h2>
            <div className="mt-5 flex items-center gap-10 max-lg:justify-center">
                <div onClick={() => setIsLayoutToggled(!isLayoutToggled)} className="text-3xl max-lg:hidden">
                    {
                        isLayoutToggled ? <RiLayoutGrid2Fill /> : <RiLayoutGridFill />
                    }
                </div>
                <label className="input input-sm input-bordered flex items-center gap-2">
                    <input onChange={(e) => setSearchKey(e.target.value)} type="text" className="grow" placeholder="Search" />
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
                <select onChange={(e) => {
                    setSortBy(e.target.value);
                    refetch();
                }} className="select select-sm select-bordered max-w-xs">
                    <option disabled selected>Sort by</option>
                    <option value="name">Name</option>
                    <option value="fees">Fees</option>
                    <option value="participantCount">Most registered</option>
                </select>
            </div>
            {
                isPending
                &&
                <SpinnerSmall></SpinnerSmall>
            }
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isLayoutToggled ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-5 lg:gap-20 py-5 lg:py-10`}>
                {
                    !isPending
                    &&
                    camps.map(camp => <Camp key={camp._id} camp={camp}></Camp>)
                }
            </div>
            <div className="flex justify-between items-center py-5 lg:py-10">
                <p>Showing {showing} of {totalData}</p>
                <div className="space-x-1">
                    <button onClick={() => handlePagination(activePage - 1)} className={`btn btn-xs text-gray-400`}>Prev</button>
                    {
                        !isPagesLoading
                        &&
                        pages.map(page => <button key={page} onClick={() => handlePagination(page)} className={`btn btn-xs text-gray-400 ${activePage === page ? "text-slate-50 bg-primary" : ""}`}>{page}</button>)
                    }
                    <button onClick={() => handlePagination(activePage + 1)} className={`btn btn-xs text-gray-400`}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default AvailableCamps;
