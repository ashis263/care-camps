import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./useAxiosPublic";

const UsePages = (link, itemsPerPage) => {
    const axiosPublic = UseAxiosPublic();
    const { data: paginationData = {}, isPending } = useQuery({
            queryKey: ['paginationdata', link, itemsPerPage],
            queryFn: async() => {
                const result = await axiosPublic.get(link);
                const totalPages = Math.ceil(result.data.count/itemsPerPage);
                const indexArr = [ ...Array(totalPages).keys() ];
                const plusOneArr = indexArr.map(i => i+1);
                return { pages: plusOneArr, totalData: result.data.count};
            }
        });
        return { paginationData, isPagesLoading: isPending };
}

export default UsePages;
