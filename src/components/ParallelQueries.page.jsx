import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes`);
};
const fetchfriends = () => {
  return axios.get(`http://localhost:4000/friends`);
};

const ParallelQueriesPage = () => {
  const { _data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { _data: friends } = useQuery("friends", fetchfriends);
  return <div>ParallelQueriesPage</div>;
};

export default ParallelQueriesPage;
