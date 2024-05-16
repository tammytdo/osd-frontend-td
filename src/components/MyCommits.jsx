import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../api_calls/UserContext";
import octocatHoldingDonut from "../assets/octocat-holding-donut.png";
import donutBoxFull from "../assets/donut-box-full.png";
import FetchContributions from "./FetchContributions";

const MyCommits = () => {
  const { opensource_commit_count, commits_url } = useContext(UserContext);
  const totalCommits = opensource_commit_count || 0;
  const donutBoxes = Math.floor(totalCommits / 6);

  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Attribution: https://github.com/Ashutosh00710/github-readme-activity-graph/blob/main/src/fetcher.ts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     const username = "tammytdo";  // Replace with dynamic value if needed
  //     const data = await FetchContributions(username);
  //     if (typeof data === 'string') {
  //       setError(data);
  //     } else {
  //       setContributions(data.contributions);
  //       console.log('contributions', data.contributions)
  //     }
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="row-1-card">
      <h2 className="mb-4 text-xl font-bold">My Commits</h2>
      <div className="flex flex-col card-content">
        <div className="flex items-center justify-between p-4">
          <div className="border-gray-300 bg-white bg-opacity-50 rounded-lg p-2">
            <h3 className="text-lg font-bold">Total Opensource Commits</h3>
            <p className="mt-3 text-xs italic text-center text-gray-800 ">
              Total commits since joining{" "}
            </p>
            <img src={octocatHoldingDonut} alt="Octocat holding donut" />
            <p className="text-2xl font-bold text-center">{totalCommits}</p>
            {loading && <p>Loading contributions...</p>}
            {error && <p>{error}</p>}
            {/* {!loading && !error && (
              <ul>
                {contributions.map((day, index) => (
                  <li key={index}>
                    Date: {day.date}, Contributions: {day.contributionCount}
                  </li>
                ))}
              </ul>
            )} */}
          </div>
          <div className="order-gray-300 bg-white bg-opacity-50 rounded-lg p-2">
            <h3 className="text-lg font-bold">My Donut Boxes</h3>
            <p className="mt-3 text-xs italic text-center text-gray-800 ">
              Earn 6 donuts to get a donut box!{" "}
            </p>
            <img src={donutBoxFull} alt="Donut box full" />
            <p className="text-2xl font-bold text-center">{donutBoxes}</p>
          </div>
        </div>

        {/* PASS IN USERNAME */}
        <a
          href="https://github.com/tammytdo#js-contribution-activity"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-2 mt-4 text-center text-white rounded bg-teal-500 border-2 border-grey-500"
        >
          My Latest Commits
        </a>
      </div>
    </div>
  );
};

export default MyCommits;
