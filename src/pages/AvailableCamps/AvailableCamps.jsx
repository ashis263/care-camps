import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import Camp from "../../components/Camp/Camp";
import UsePages from "../../hooks/usePages";
import { useEffect, useState } from "react";

const AvailableCamps = () => {
    const axiosPublic = UseAxiosPublic();
    const [activePage, setActivePage] = useState(1);
    const [showing, setShowing] = useState();
    const { data: camps = [], isPending, refetch } = useQuery({
        queryKey: [activePage, 'camps'],
        queryFn: async () => {
            const result = await axiosPublic.get(`/camps/?page=${activePage}`);
            return result.data;
        }
    });
    const { paginationData, isPagesLoading } = UsePages('/camps/count', 6);
    const { pages, totalData } = paginationData;
    const handlePagination = page => {
        if(page > 0 && page <= pages.length){
            setActivePage(page);
            refetch();
        }
    };
    useEffect(() => {
        const skippped = (activePage - 1) * 6;
        const remaining = totalData - skippped;
        setShowing(`${skippped +1} to ${remaining < 6 ? totalData : skippped + 6}`)
    }, [activePage, totalData]);
    return (
        <div>
            <h2 className='font-bold text-3xl lg:text-5xl text-primary max-lg:text-center lg:text-end drop-shadow'>Explore available camps to join now</h2>
            {
                isPending
                &&
                <div className="flex justify-center w-1/2 mx-auto h-40 items-center">
                    <span className="loading loading-ring loading-lg text-8xl text-primary"></span>
                </div>
            }
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-5 lg:py-10">
                {
                    !isPending
                    &&
                    camps.map(camp => <Camp key={camp._id} camp={camp}></Camp>)
                }
            </div>
            <div className="flex justify-between items-center py-5 lg:py-10">
                <p>Showing {showing} of {totalData}</p>
                <div className="space-x-1">
                    <button  onClick={() => handlePagination(activePage - 1)} className={`btn btn-xs text-gray-400`}>Prev</button>
                    {
                        !isPagesLoading
                        &&
                        pages.map(page => <button key={page} onClick={() => handlePagination(page)} className={`btn btn-xs text-gray-400 ${activePage === page ? "text-slate-50 bg-primary" : ""}`}>{page}</button>)
                    }
                    <button  onClick={() => handlePagination(activePage + 1)} className={`btn btn-xs text-gray-400`}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default AvailableCamps;
