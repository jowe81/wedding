import { useEffect, useState } from "react";
import Badge from 'react-bootstrap/Badge';

export default function Countdown(props) {

  const [ms, setMs] = useState(0);
 
  useEffect(() => {
    update();
    const clear = setInterval(update, 1000);
    return () => clearInterval(clear);
  }, []);

  const update = () => {
    console.log("running update");
    const timezone_offset_min = new Date().getTimezoneOffset();
    const timezone_offset_ms = timezone_offset_min * 60 * 1000;
    const now = new Date().getTime();
    const target = new Date("2023-02-18 06:00").getTime() + timezone_offset_ms;
    const ms = target - now;
    setMs(ms);
  }

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  
  const dDays = (days);
  const dHours = (hours - days * 24);
  const dMinutes = (minutes - hours * 60);
  const dSeconds = (seconds - minutes * 60);

  const getWord = (n, t) => {
    return n !== 1 ? `${t}s` : t;
  }


  return (
    <div className="aligner">
      <div>
        <Badge bg="primary" style={{minWidth:90 + 'px'}}>{dDays} {getWord(dDays, "day")}</Badge>
        <Badge bg="primary" style={{minWidth:90 + 'px'}}>{dHours} {getWord(dHours, "hour")}</Badge>
        <Badge bg="primary" style={{minWidth:90 + 'px'}}>{dMinutes} {getWord(dMinutes, "minute")}</Badge>
        <Badge bg="primary" style={{minWidth:90 + 'px'}}>{dSeconds} {getWord(dSeconds, "second")}</Badge>
        <div className="linkBtn">
          <a href="https://www.weddingwire.ca/web/jessica-bjorkman-and-johannes-weber">
            <Badge bg="secondary" style={{minWidth:110 + 'px'}}>Learn more...</Badge>
          </a>
        </div>
      </div>
    </div>
  );
}