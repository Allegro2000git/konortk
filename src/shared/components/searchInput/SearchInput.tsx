import { type ChangeEvent, useState } from "react";
import s from "./SearchInput.module.css";
import { useNavigate } from "react-router";
import * as React from "react";

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={s.container}>
      <input
        type={"search"}
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder={"Search..."}
        className={s.input}
      />
      <button disabled={!isSearchButtonActive || search.trim() === ""} onClick={handleSearchClick} className={s.button}>
        Search
      </button>
    </div>
  );
}
