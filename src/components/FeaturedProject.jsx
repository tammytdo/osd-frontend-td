import React, { useContext } from "react";
import { RepoContext } from "../api_calls/RepoContext";
import backupDonutImage from '../assets/donut-icons/color/1.png';

const FeaturedProject = () => {
  const { featuredRepo } = useContext(RepoContext);
  console.log('featuredRepo', featuredRepo)
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-1/3">
      <h2 className="mb-4 text-xl font-bold">Featured Opensource Project of the Month</h2>

      {Object.keys(featuredRepo).length > 0? (
        featuredRepo.map((repo) => (
          <div key={repo.id}>
    {repo.owner && repo.owner.avatar_url ? (
      <img
        src={repo.owner.avatar_url}
        alt={repo.name}
        style={{ width: "150px", height: "150px" }}
      />
    ) : (
      <img
        src={backupDonutImage} 
        alt={repo.name}
        style={{ width: "150px", height: "150px" }}
      />
    )}
            <h1><a href={repo.owner.avatar_url}>{repo.name}</a></h1>
            <p>{repo.description}</p>
            <p className="text-sm text-gray-600">
                  Topics:{" "}
                  {repo.topics.map((topic, index) => (
                    <span key={topic}>
                      {topic}
                      {index !== repo.topics.length - 1 && ", "}
                    </span>
                  ))}
                </p>


          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FeaturedProject;