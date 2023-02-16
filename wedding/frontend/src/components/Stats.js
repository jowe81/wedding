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
  return getNDaysAgo(date, 1);
}

const getNDaysAgo = (date, n) => {
  const t = date ? new Date(date) : new Date();
  const d = new Date(t.getTime() - (n * DAY));
  const { start } = getDateBoundaries(d);
  const startDate = new Date(start);
  return startDate;
}

const getSectionContent = data => {
  return (
    <section className="data">
      <div>Visits (total, IDs, IPs): {data.allVisits}, {data.uniqueIds}, {data.uniqueIds}</div>      
      <div>Contributors: {data.contributors}</div>
      <div>Files (all, images, videos): {data.allFiles}, {data.images}, {data.videos}</div>
    </section>
  );
}

const Home = (appData) => {
  const {status, embedId} = appData.getData();

  const [stats, setStats] = useState({});
  
  const statsRoot = 'viewer-stats/all?countsOnly=true&';

  useEffect(async () => {
    const dToday = await axios
      .get(appData.T_API_SERVER_URL + statsRoot + 'date=today')
    const dYesterday = await axios
      .get(appData.T_API_SERVER_URL + statsRoot + 'date=' + getYesterday().getTime())
    const dTwoDaysAgo = await axios
      .get(appData.T_API_SERVER_URL + statsRoot + 'date=' + getNDaysAgo(null, 2).getTime())
    const dAll = await axios
      .get(appData.T_API_SERVER_URL + statsRoot);

    const data = {
      today: dToday.data,
      yesterday: dYesterday.data,
      twoDaysAgo: dTwoDaysAgo.data,
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
        { getSectionContent(stats.today) }
        <div className="section-header">Yesterday:</div>
        { getSectionContent(stats.yesterday) }
        <div className="section-header">2 days ago:</div>
        { getSectionContent(stats.twoDaysAgo) }
        <div className="section-header">All Time:</div>
        { getSectionContent(stats.allTime) }
      </div>
  }

   
  return (
    <div> 
      
      <h1 className="top-header">Statistics</h1>
      <Navigation {...appData}/>

      <div className="stats-container">
        { content }

      </div>      
      
    </div>
  )
}

export default Home;