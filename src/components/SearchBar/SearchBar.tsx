import styles from "./SearchBar.module.css";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ search, setSearch }: SearchProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className={styles.searchBar}>
      <input className={styles.inputFilter} placeholder="제목으로 검색하기 🔍" onChange={onChange} value={search} name="search" />
    </div>
  );
}
