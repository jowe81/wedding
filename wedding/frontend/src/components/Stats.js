import Navigation from "./Navigation";
import './stats.scss';
import { useState, useEffect } from "react";
import axios from "axios";

const DAY = 1000 * 60 * 60 * 24;


//Return first and last timestamp for the day the date falls in
const getDateBoundaries = (date) => {
  const s = date.toDateString();

  const beginning = new Date(s);
  const end = beginning.getTime() + (1000 * 60 * 60 * 24) - 1;
  
  const boundaries = {
    start: beginning.getTime(),
    end: end,
  }    
  
  return boundaries;
}

const getYesterday = (date) => {
  const t = date ? new Date(date) : new Date();
  const d = new Date(t.getTime() - DAY);
  const { start } = getDateBoundaries(d);
  const yesterday12am = new Date(start);
  console.log('Yesterday: ' + yesterday12am);
  return yesterday12am;
}

const Home = (appData) => {
  const {status, embedId} = appData.getData();

  const [stats, setStats] = useState({});

  useEffect(async () => {
    const dToday = await axios
      .get(appData.T_API_SERVER_URL + 'viewer-stats/all?date=today')
    const dYesterday = await axios
      .get(appData.T_API_SERVER_URL + 'viewer-stats/all?date=' + getYesterday().getTime())
    const dAll = await axios
      .get(appData.T_API_SERVER_URL + 'viewer-stats/all')

    const data = {
      today: dToday.data,
      yesterday: dYesterday.data,
      allTime: dAll.data,
    };

    console.log('All returned:', data);

    setStats(data);

  }, [])

  let content = 'Loading...';

  if (Object.keys(stats).length) {
    //Got data
    content = 
      <div>
        <div className="section-header">Today:</div>
        <section className="data">
          <div>{stats.today.uniqueIds.length} visits from unique IDs.</div>
          <div>{stats.today.uniqueIds.length} visits from unique IPs.</div>
          <div>{stats.today.allVisits.length} visits total.</div>
        </section>
        <div className="section-header">Yesterday:</div>
        <section className="data">
          <div>{stats.yesterday.uniqueIds.length} visits from unique IDs.</div>
          <div>{stats.yesterday.uniqueIds.length} visits from unique IPs.</div>
          <div>{stats.yesterday.allVisits.length} visits total.</div>
        </section>
        <div className="section-header">All Time:</div>
        <section className="data">
          <div>{stats.allTime.uniqueIds.length} visits from unique IDs.</div>
          <div>{stats.allTime.uniqueIds.length} visits from unique IPs.</div>
          <div>{stats.allTime.allVisits.length} visits total.</div>
        </section>
        <div></div>
      </div>
  }

   
  return (
    <div> 
      
      <h1 className="top-header">Statistics</h1>
      <Navigation {...appData}/>

      <div class="stats-container">
        { content }

      </div>      
      
    </div>
  )
}

export default Home;