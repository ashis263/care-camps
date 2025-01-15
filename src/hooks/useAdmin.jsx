import useAuth from "./useAuth";
import useAxiosPrivate from './useAxiosPrivate';
import { useQuery } from "@tanstack/react-query";

const UseAdmin = () => {
    const { user, isTokenSet } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [ user?.email, 'isAdmin'],
        enabled: isTokenSet,
        queryFn: async () => {
            const result = await axiosPrivate.get(`/admin/?email=${user.email}`);
            return result.data?.role === 'admin';
        }
    });
    return [isAdmin, isAdminLoading];
}

export default UseAdmin;
