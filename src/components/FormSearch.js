import { useRef } from "react";

const FormSearch = ({ setCity }) => {
  const cityInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.current.value !== "") {
      setCity(cityInput.current.value);
      cityInput.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={cityInput}
        type="text"
        name="name"
        placeholder="search location"
      />
      <input type="submit" value="Search" />
    </form>
  );
};

export default FormSearch;
