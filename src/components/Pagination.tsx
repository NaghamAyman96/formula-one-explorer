interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    isLastPage?: boolean;
}

const Pagination = ({ page, setPage, isLastPage }: PaginationProps) => (
    <div className="flex justify-between mt-6">
        <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
            Previous
        </button>
        <button
            onClick={() => setPage(page + 1)}
            disabled={isLastPage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Next
        </button>
    </div>
);

export default Pagination;
