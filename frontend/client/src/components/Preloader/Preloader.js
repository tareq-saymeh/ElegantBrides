import './Preloader.css';

const Preloader = () => {
  return (
    <div className="container" id="NewPreloader">
      <div className="circle">
        <div className="inner-circle"></div>
      </div>
      <div className="title">
        <h1 id='newLoaderHeader'>ElegantBridel<span id='newDot'></span></h1>
      </div>
      <div className="role">
        <p id='newSlogan'>bridal worth it</p>
      </div>
    </div>
  );
}

export default Preloader;
