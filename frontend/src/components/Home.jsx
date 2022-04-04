import { useEffect, useState } from "react";
import baseAxios from "../helpers/axios";

import UserBox from "./UserBox";
import UserContainer from "./UserContainer";

const Home = () => {
  const [userWScores, setUserWScores] = useState();

  useEffect(async () => {
    const users = (await baseAxios("users/")).data;
    const scores = (await baseAxios("scores/")).data;

    const usersScores = users.map((user) => {
      for (let i = 0; i < scores.length; i++) {
        if (user.id === scores[i].user) {
          return [user.username, scores[i].score];
        }
      }
      return [user.username, 0];
    });
    setUserWScores(usersScores);
  }, []);

  return (
    <div className="fixed bottom-[9.5vh] overflow-y-scroll w-screen top-[9.5vh]">
      <UserContainer>
        {userWScores &&
          userWScores.map((user) => {
            return <UserBox key={user[0]} username={user[0]} score={user[1]} />;
          })}
      </UserContainer>
    </div>
  );
};

export default Home;
