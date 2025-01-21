import { useQuery } from "@tanstack/react-query";
import UseAxiosPrivate from "./useAxiosPrivate";

const UsePages = (link, itemsPerPage) => {
    const axiosPrivate = UseAxiosPrivate();
    const { data: paginationData = {}, isPending, refetch } = useQuery({
            queryKey: ['paginationData', link, itemsPerPage],
            queryFn: async() => {
                const result = await axiosPrivate.get(link);
                const totalPages = Math.ceil(result.data.count/itemsPerPage);
                const indexArr = [ ...Array(totalPages).keys() ];
                const plusOneArr = indexArr.map(i => i+1);
                return { pages: plusOneArr, totalData: result.data.count};
            }
        });
        return { paginationData, isPagesLoading: isPending, refetch };
}

export default UsePages;
