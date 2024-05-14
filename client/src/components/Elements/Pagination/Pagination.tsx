import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { TfiReload } from 'react-icons/tfi';
import { useTranslation } from 'react-i18next';
import { totalPerPageOptions } from '../Table';

interface PaginationProps {
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  totalItemsPerPage: number;
  setTotalItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  onRefresh?: () => void;
}
export const Pagination = ({
  startIndex,
  setStartIndex,
  totalItems,
  totalItemsPerPage,
  setTotalItemsPerPage,
  onRefresh,
}: PaginationProps) => {
  const { t } = useTranslation();
  const isLastPage = startIndex + totalItemsPerPage >= totalItems;

  const onClickRefresh = () => {
    onRefresh && onRefresh();
  };

  return (
    <div className="flex items-center justify-between pt-2 px-3">
      <button className="flex gap-x-3 items-center text-[#53575A]" onClick={onClickRefresh}>
        <TfiReload className="text-xl text-[#737A87] stroke-[0.5px] cursor-pointer" />
        {t('actions.refresh')}
      </button>
      <div className="flex items-center justify-end gap-x-7 text-[#53575A]">
        <div className="flex items-center">
          <p>{t('messages.info.rows_per_page')}: </p>
          <select
            className="focus:outline-0 focus:ring-0 border-0"
            name="totalItemsPerPage"
            onChange={(e) => {
              setStartIndex(0);
              setTotalItemsPerPage(Number(e.target.value));
            }}
          >
            {totalPerPageOptions?.map((totalItemsPerPage, index) => (
              <option value={totalItemsPerPage} key={index}>
                {totalItemsPerPage}
              </option>
            ))}
          </select>
        </div>
        <p>
          {t('actions.view')} {startIndex + 1}-
          {Math.min(startIndex + totalItemsPerPage, totalItems)} of {totalItems}
        </p>
        <button
          onClick={() => setStartIndex((prev) => prev - totalItemsPerPage)}
          className="text-[#737A87] disabled:text-[#A4AFB7] disabled:cursor-not-allowed"
          disabled={!startIndex}
        >
          <MdOutlineChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={() => setStartIndex((prev) => prev + totalItemsPerPage)}
          className="text-[#737A87] disabled:text-[#A4AFB7] disabled:cursor-not-allowed"
          disabled={isLastPage}
        >
          <MdOutlineChevronRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
