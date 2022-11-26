import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHero = ({ queryKey }) => {
  const [_, id] = queryKey;
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

const useSuperHeroData = (id, props) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", id], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(id));

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
    ...props,
  });
};

export default useSuperHeroData;
