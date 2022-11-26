import { useState } from "react";
import { Link } from "react-router-dom";
import useSuperHeroesData, {
  useAddSuperHeroesData,
} from "../hooks/useSuperHeroesData";

const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log({ data });
  };

  const onError = (error) => {
    console.log({ error });
  };

  const { data, error, isLoading, isError, refetch } = useSuperHeroesData({
    onSuccess,
    onError,
  });

  const { mutate } = useAddSuperHeroesData();

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    mutate(hero);
  };

  if (isLoading) {
    return <h6>Loading ...</h6>;
  }

  if (isError) {
    return (
      <h6>
        Error: <span>{error.message}</span>
      </h6>
    );
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      <button onClick={refetch}>Fetch heroes</button>
      {data.data?.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
};

export default RQSuperHeroesPage;
