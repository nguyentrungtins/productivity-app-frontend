import React from "react";
import classes from "./Pomodoro.module.css";
import PomoCircle from "./PomoCircle";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPomos, createPomo, reset } from "../../features/pomo/pomoSlice";
import CardPomo from "../Layouts/CardPomo";
import Sound from "./sound.mp3";
const Pomodoro = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let cardPomoData = [
    {
      time: 15,
      count: 0,
    },
    {
      time: 25,
      count: 0,
    },
    {
      time: 45,
      count: 0,
    },
    {
      time: 60,
      count: 0,
    },
  ];
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [cardActive, setCardActive] = useState({ index: 1, amount: 25 });
  const [settingsInfo, setSettingsInfo] = useState({
    workMinutes: 0.2,
    breakMinutes: 0.2,
  });
  const [time, setTime] = useState();
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  // Redux

  // -----------------
  const { user } = useSelector((state) => state.auth);
  const { pomos, isLoading, isError, message } = useSelector(
    (state) => state.pomo
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("../login");
    }
    dispatch(getPomos());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  // ----------------->

  // Count Down Timer
  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }
  const cardOnclickHandler = (value, amount) => () => {
    setCardActive({ index: value, amount: amount });
  };

  useEffect(() => {
    function Timeups() {
      const nextSeconds = cardActive.amount * 60;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
      setIsPaused(true);
      isPausedRef.current = true;

      var NotiSound = new Audio(Sound);
      NotiSound.play();
      const pomoData = {
        type: cardActive.amount,
      };
      dispatch(createPomo(pomoData));
    }
    secondsLeftRef.current = cardActive.amount * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return Timeups();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [cardActive]);

  // Calculate Time
  const totalSeconds = cardActive.amount * 60;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  const timeDisplay = `${minutes}:${seconds}`;
  console.log("Pomo: ", pomos);
  pomos.map((pomo) => {
    cardPomoData.map((data) => {
      if (data.time === parseInt(pomo.type)) {
        data.count = data.count + 1;
      }
    });
  });
  return (
    <div className={classes.pomodoro}>
      <h1 className="header__content">Pomodoro</h1>
      <div className={classes.top}>
        <PomoCircle timer={timeDisplay} percentage={percentage} />
        <div className={classes.pomo__control}>
          <div className={classes.header_wrapper}>
            <h3 className={classes.header}>{cardActive.amount}m</h3>
          </div>
          <div className={classes.pomo__control_mid}>
            <label htmlFor="status_focus">Status</label>
            <div className={classes.selector_wrapper}>
              <select className={classes.selector} id="status_focus">
                <option value="" disabled selected>
                  Focus
                </option>
                <option value="1">Study</option>
                <option value="2">Work</option>
                <option value="3">Break</option>
              </select>
            </div>
          </div>
          {isPaused ? (
            <button
              type="button"
              className={classes.btn}
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            >
              Start
            </button>
          ) : (
            <button
              type="button"
              className={classes.btn}
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            >
              Stop
            </button>
          )}
        </div>
      </div>
      <div className={classes.bottom}>
        {cardPomoData.map((data, index) => {
          let isActive = false;
          if (cardActive.index === index) {
            isActive = true;
          }
          return (
            <div onClick={cardOnclickHandler(index, data.time)}>
              <CardPomo
                key={index}
                amount={data.time}
                today={data.count}
                isActive={isActive}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pomodoro;
