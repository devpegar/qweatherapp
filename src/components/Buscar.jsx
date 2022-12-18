import { useState } from "react";
import { MdSearch } from "react-icons/md";

const Buscar = () => {
  const [ciudad, setCiudad] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (ciudad === "" || !ciudad) return;

    const handlerSubmit = () => {};
  };

  return (
    <form onSubmit={handlerSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          className="bg-gray-300 rounded-md p-2"
          placeholder="Buscar ciudad"
          onChange={(e) => setCiudad(e.target.value)}
        />
        <button className="bg-yellow-500 text-white text-xl cursor-pointer p-2 rounded-lg">
          <MdSearch />
        </button>
      </div>
    </form>
  );
};

export default Buscar;
