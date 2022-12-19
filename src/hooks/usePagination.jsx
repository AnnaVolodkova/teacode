import React, { useCallback, useState } from 'react';
import { Pagination } from 'evergreen-ui';

const usePagination = ({
  perPage,
  data,
}) => {
  const [page, setPage] = useState(1);

  const onNextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const onPreviousPage = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  const onPageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  if (!perPage) {
    return {
      pageData: data,
      paginationView: null,
    };
  }

  return {
    pageData: data?.slice(page * perPage - perPage, page * perPage),
    Pagination: () => (
      <Pagination
        page={page}
        totalPages={Math.ceil(data?.length / perPage)}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onPageChange={onPageChange}
      />
    ),
  };
};

export default usePagination;
