import { type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  onSearch?: (search: string) => void;
  isSearchButtonActive?: boolean;
};

export function SearchInput({ onSearch, isSearchButtonActive = false }: Props) {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (search.trim() !== "") {
      onSearch?.(search);
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

  return (
    <>
      <input value={search} onChange={handleSearchChange} placeholder={"Search..."} />
      <button disabled={!isSearchButtonActive || search.trim() === ""} onClick={handleSearchClick}>
        Search
      </button>
    </>
  );
}
