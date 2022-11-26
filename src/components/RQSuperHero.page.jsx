import React from "react";
import { useParams } from "react-router-dom";
import useSuperHeroData from "../hooks/useSuperHeroData";

const RQSuperHeroPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useSuperHeroData(id);
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
    <div>
      <h1>
        {data.data.name} - <span>{data.data.alterEgo}</span>
      </h1>
    </div>
  );
};

export default RQSuperHeroPage;
