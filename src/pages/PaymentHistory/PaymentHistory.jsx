import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import SpinnerSmall from "../../components/SpinnerSmall/SpinnerSmall";
import History from "../../components/History/History";
import 'animate.css';
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
    const { user } = useAuth();
    const [searchKey, setSearchKey] = useState('');
    const [activePage, setActivePage] = useState(1);
    const axiosPrivate = UseAxiosPrivate();
    const { data: payments = [], isPending, refetch } = useQuery({
        queryKey: [user.email, searchKey, activePage, 'payments'],
        queryFn: async () => {
            const result = await axiosPrivate.get(`/payments/?email=${user.email}&page=${activePage}&searchKey=${searchKey}`);
            return result.data;
        }
    });
    const handleSearch = (e) => {
        setSearchKey(e.target.value);
        setActivePage(1);
        refetch();
    }
    return (
        <div className="animate__animated animate__fadeIn">
            <Helmet>
                <title>Payment History</title>
            </Helmet>
            <div className="mb-5 lg:mb-10">
                <h2 className='font-bold text-4xl sm:text-5xl text-primary'>Payment history</h2>
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
                            <th>Fees</th>
                            <th>Payment status</th>
                            <th>Confirmation Status</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isPending
                            ||
                            payments.map(payment => <History key={payment._id} payment={payment} refetch={refetch} ></History>)
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
            <Pagination link={`/payments/count/?email=${user.email}&searchKey=${searchKey}`} count={10} refetch={refetch} activePage={activePage} setActivePage={setActivePage}></Pagination>
        </div>
    );
}

export default PaymentHistory;
