const CurrentInfoExtra = ({ data, title, info }) => {
  return (
    <>
      <article className="current-info-weather">
        <aside>
          <h5>{title}</h5>
        </aside>
        <div>
          <p>
            <span className="wind-speed">{data}</span> {info}
          </p>
        </div>
      </article>
    </>
  );
};

export default CurrentInfoExtra;
