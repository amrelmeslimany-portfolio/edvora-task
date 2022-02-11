import loading from "../imgs/metaball-loader.gif";

const Loading = () => {
  return (
    <div className="loading-gif">
      <img src={loading} width="300px" alt="loading" />
      <h5>Loading...</h5>
    </div>
  );
};

export default Loading;
