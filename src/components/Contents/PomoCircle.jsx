import classes from "./PomoCircle.module.css";
const PomoCircle = ({ timer = "00:00", percentage = 100 }) => {
  let root = document.documentElement;
  percentage = Math.floor(percentage * 0.8);
  root.style.setProperty("--adjust-height", percentage + "%");

  return (
    <>
      <div className={classes.wrapper} id="pomoCircleID">
        <div className={classes.ocean}>
          <div className={classes.wave}></div>
          <div className={classes.wave}></div>
          <div className={classes.wave}></div>
          <div className={classes.wave__footer}></div>
          <h2 className={classes.time}>{timer}</h2>
        </div>
      </div>
    </>
  );
};

export default PomoCircle;
