import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ButtonProps {
  content: any; 
  onClick: () => void;
  active?: boolean, 
  disabled?: boolean
}

function Button({ content, onClick, active, disabled }: ButtonProps) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
                  ${active ? "bg-pink-500 text-white" : disabled ? 'text-pink-300 bg-white cursor-not-allowed' : "bg-white text-pink-500 hover:bg-pink-500 hover:text-white "}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

interface PaginatorProps {
  gotoPage: Dispatch<SetStateAction<number>>;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  visiblePage?: number; 
}

function Paginator({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  visiblePage = 4
}: PaginatorProps) {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;
    let numberOfButtons = pageCount < visiblePage ? pageCount : visiblePage;

    const pageIndices = [pageIndex];
    numberOfButtons--;

    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;

      if (
        pageNumberBefore > 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        if (pageNumberAfter <= pageCount) {
          pageIndices.push(pageNumberAfter);
        }
      }
    });

    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <Button
          content={pageIndexToMap}
          onClick={() => gotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
        />
      </li>
    ));
  }, [gotoPage, pageCount, pageIndex, visiblePage]);

  return (
    <ul className="flex gap-2">
      <li>
        <Button
          content={
            <div className="flex ml-1">
              <FaChevronLeft size="0.6rem" />
              <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(1)}
          disabled={!canPreviousPage}
        />
      </li>
      {renderPageLinks()}
      <li>
        <Button
          content={
            <div className="flex ml-1">
              <FaChevronRight size="0.6rem" />
              <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(pageCount)}
          disabled={!canNextPage}
        />
      </li>
    </ul>
  );
}

export default Paginator;
