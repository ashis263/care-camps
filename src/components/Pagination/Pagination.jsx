import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import UsePages from '../../hooks/usePages';


const Pagination = ({ link, count, refetch, activePage, setActivePage }) => {
    const [showing, setShowing] = useState();
    const { paginationData, isPagesLoading } = UsePages(link, count);
    const { pages, totalData } = paginationData;
    const handlePagination = page => {
        if (page > 0 && page <= pages.length) {
            setActivePage(page);
            refetch();
        }
    };
    useEffect(() => {
        const skippped = (activePage - 1) * count;
        const remaining = totalData - skippped;
        setShowing(`${totalData === 0 ? 0 : skippped + 1} to ${remaining < count ? totalData : skippped + count}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage, totalData]);
    return (
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
    );
}


Pagination.propTypes = {
    link: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    refetch: PropTypes.func.isRequired,
    activePage: PropTypes.number.isRequired,
    setActivePage: PropTypes.func.isRequired
};


export default Pagination;
