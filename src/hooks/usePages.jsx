import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./useAxiosPublic";
import UseAxiosPrivate from "./useAxiosPrivate";
import useAdmin from "./useAdmin";

const UsePages = (link, itemsPerPage) => {
    const axiosPublic = UseAxiosPublic();
    const axiosPrivate = UseAxiosPrivate();
    const [ isAdmin ] = useAdmin();
    const { data: paginationData = {}, isPending, refetch } = useQuery({
            queryKey: ['paginationData', link, itemsPerPage],
            queryFn: async() => {
                let result;
                if(isAdmin){
                    result = await axiosPrivate.get(link);
                }else{
                    result = await axiosPublic.get(link);
                }
                const totalPages = Math.ceil(result.data.count/itemsPerPage);
                const indexArr = [ ...Array(totalPages).keys() ];
                const plusOneArr = indexArr.map(i => i+1);
                return { pages: plusOneArr, totalData: result.data.count};
            }
        });
        return { paginationData, isPagesLoading: isPending, refetch };
}

export default UsePages;
