import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = ({ queryKey }) => {
  const [_, email] = queryKey;
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = ({ queryKey }) => {
  const [_, channelId] = queryKey;
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const {
    data: user,
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
  } = useQuery(["user", email], fetchUserByEmail);

  const channelId = user?.data?.channelId;

  const { data, isLoading, isError, error } = useQuery(
    ["courses", channelId],
    fetchCoursesByChannelId,
    {
      enabled: !!channelId,
    }
  );

  return (
    <div>
      <div>
        {userLoading ? (
          <h1>Loadind ...</h1>
        ) : isError ? (
          <h1>
            Error: <span> {error.message} </span>
          </h1>
        ) : (
          <h1>
            {user?.data.channelId + ":"} <small>{user?.data.id}</small>
          </h1>
        )}
      </div>
      <hr />
      <div>
        {isLoading ? (
          <h1>Loadind ...</h1>
        ) : userIsError ? (
          <h1>
            Error: <span> {userError.message} </span>
          </h1>
        ) : (
          data?.data?.courses.map((course) => <h2 key={course}>{course}</h2>)
        )}
      </div>
    </div>
  );
};
