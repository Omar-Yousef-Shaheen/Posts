import { usePostContext } from "../contexts/PostContext";

const SearchInput = () => {
  const { handleSearch } = usePostContext();
  return (
    <div className="flex justify-center py-[26px] mb-4 w-full">
      <input
        type="text"
        placeholder="Search by full title"
        defaultValue={""}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-3/5  py-2 px-4 rounded-lg border  border-gray-200 focus:outline-none focus:border-slate-400 focus:shadow-lg "
      />
    </div>
  );
};

export default SearchInput;
