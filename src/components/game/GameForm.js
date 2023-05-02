import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createGame,
  getGameTypes,
  getSingleGame,
  updateGame,
} from "../../managers/GameManager.js";

export const GameForm = () => {
  const { game_id } = useParams();
  const navigate = useNavigate();
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 1,
    numOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0,
  });

  useEffect(() => {
    getGameTypes().then((data) => setGameTypes(data));
    if (game_id) {
      getSingleGame(game_id).then((gameObj) => {
        setCurrentGame(gameObj);
      });
    }
  }, [game_id]);

  const changeGameState = (domEvent) => {
    const { name, value } = domEvent.target;
    setCurrentGame((currentGame) => ({
      ...currentGame,
      [name]: value,
    }));
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">
        {game_id ? "Edit " : "Create "}
        Game
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
        <div>
          <label htmlFor="maker">Maker: </label>
          <input
            type="text"
            name="maker"
            required
            autoFocus
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
        <div>
          <label htmlFor="numOfPlayers">Number of Players: </label>
          <input
            type="number"
            name="numOfPlayers"
            required
            autoFocus
            className="form-control"
            value={currentGame.numOfPlayers}
            onChange={changeGameState}
          />
        </div>
        <div>
          <label htmlFor="skillLevel">Skill Level: </label>
          <input
            type="number"
            name="skillLevel"
            required
            autoFocus
            className="form-control"
            value={currentGame.skillLevel}
            onChange={changeGameState}
          />
        </div>
        <div>
          <select
            name="gameTypeId"
            value={currentGame.gameTypeId}
            onChange={changeGameState}
          >
            <option value="0">Select a Game Type</option>
            {gameTypes.map((gt) => {
              return (
                <option key={gt.id} value={gt.id}>
                  {gt.label}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          if (game_id) {
            let editGame = {
              ...currentGame,
              num_of_players: parseInt(currentGame.numOfPlayers),
              skill_level: parseInt(currentGame.skillLevel),
              game_type: parseInt(currentGame.gameTypeId),
              id: game_id,
            };
            console.log(editGame);
            updateGame(editGame).then(() => navigate(`/games`));
          } else {
            const game = {
              maker: currentGame.maker,
              title: currentGame.title,
              num_of_players: parseInt(currentGame.numOfPlayers),
              skill_level: parseInt(currentGame.skillLevel),
              game_type: parseInt(currentGame.gameTypeId),
            };
            createGame(game).then(() => navigate("/games"));
          }
        }}
        className="btn btn-primary"
      >
        {game_id ? "Edit" : "Create"}
      </button>
    </form>
  );
};
