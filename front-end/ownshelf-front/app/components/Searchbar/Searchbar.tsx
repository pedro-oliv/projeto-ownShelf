import { SearchContext } from "@/app/utils/contexts/SearchContext";
import { Search } from "lucide-react";
import { useContext, useState } from "react";

export default function SearchBar() {

    const { setSearch } = useContext(SearchContext);

    const [valor, setValor] = useState('');

    function handleSearch(){
        setSearch(valor);
    }

  return (
    <div className="flex flex-col">
      <div className="relative transition-all duration-150 ease-in-out focus-within:scale-[1.01]">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-zinc-400
            pointer-events-none
            z-10
          "
        />

        <input
          type="text"
          onChange={(e) => setValor(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
                handleSearch()
            }
          }}
          value={valor}
          placeholder="Pesquisar livros..."
          className="
            w-full
            bg-[#131416]
            rounded-md
            text-white
            py-3
            pl-11
            pr-4
            border
            border-[#28292c]
            transition-all
            duration-150
            ease-in-out
            focus:outline-none
            focus:border-[#f58142]
            focus:shadow-lg
          "
        />
      </div>
    </div>
  );
}