import { useMutation, useQuery, useQueryClient } from "react-query";

import { request } from "../utils/axios.utils";

const fetchSuperHeroes = () => {
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
};

const useSuperHeroesData = (props) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    ...props,
    // staleTime: 30000, // default 0m
    // cacheTime: 5000, // default 5min
    // refetchOnMount: false, // default true
    // refetchOnWindowFocus: "always", // default true
    // refetchInterval: 3000, // default false
    // refetchIntervalInBackground: true,
    // enabled: false,
    // onSuccess,
    // onError,
    // select // tranform data
  });
};

export default useSuperHeroesData;

export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: (newData) => {
    // queryClient.setQueryData("super-heroes", (oldQueryData) => ({
    //   ...oldQueryData,
    //   data: [...oldQueryData.data, newData.data],
    // }));
    // queryClient.invalidateQueries("super-heroes");
    // },

    onMutate: async (newData) => {
      await queryClient.cancelQueries("super-heroes");

      const previousData = queryClient.getQueryData("super-heroes");

      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData?.data,
            { id: oldQueryData?.data?.length + 1, ...newData },
          ],
        };
      });
      return {
        previousData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueriesData("super-heroes", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
