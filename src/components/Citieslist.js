const CitiesList = ({ name }) => {
  return (
    <div className="list-cities">
      <p>
        <span className="name-city">{name}</span>
        <span className="material-icons">keyboard_arrow_right</span>
      </p>
    </div>
  );
};

export default CitiesList;
