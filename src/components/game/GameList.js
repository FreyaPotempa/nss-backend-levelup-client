import React, { useEffect, useState } from "react";
import { deleteGame, getGames } from "../../managers/GameManager.js";
import { useNavigate } from "react-router-dom";

export const GameList = (props) => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  const fetchGames = () => {
    getGames().then((data) => setGames(data));
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: "/games/new" });
        }}
      >
        Register New Game
      </button>
      <article className="games">
        {games.map((game) => {
          return (
            <section key={`game--${game.id}`} className="game">
              <div className="game__title">
                {game.title} by {game.maker}
              </div>
              <div className="game__players">
                {game.number_of_players} players needed
              </div>
              <div className="game__skillLevel">
                Skill level is {game.skill_level}
              </div>
              <button
                type="button"
                onClick={() => {
                  navigate(`/games/edit/${game.id}`);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => deleteGame(game.id).then(() => fetchGames())}
              >
                Delete
              </button>
            </section>
          );
        })}
      </article>
    </>
  );
};
