import s from "./Pagination.module.css";
import { getPaginationPages } from "@/shared/utils";

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pagesCount: number;
};

export const Pagination = ({ currentPage, setCurrentPage, pagesCount }: Props) => {
  if (pagesCount <= 1) {
    return null;
  }

  const pages = getPaginationPages(currentPage, pagesCount);

  return (
    <div className={s.pagination}>
      {pages.map((page, idx) =>
        page === "..." ? (
          <span className={s.ellipsis} key={`ellipsis-${idx}`}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={page === currentPage ? `${s["page-button"]} ${s["page-button-active"]}` : s["page-button"]}
            onClick={() => page !== currentPage && setCurrentPage(Number(page))}
            disabled={page === currentPage}
            type="button"
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};
