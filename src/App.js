import { Routes, Route } from "react-router-dom";

import HomePage from "./components/Home.page";
import Nav from "./components/Nav";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import SuperHeroesPage from "./components/SuperHeroes.page";
import RQSuperHeroPage from "./components/RQSuperHero.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import { DynamicParallelPage } from "./components/DynamicParallel.page";
import { DependentQueriesPage } from "./components/DependentQueries.page";
import { PaginatedQueriesPage } from "./components/PaginatedQueries.page";
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page";

import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route>
          <Route index element={<HomePage />} />
          <Route
            path="rq-dynamic-parallel"
            element={<DynamicParallelPage heroIds={[1, 3]} />}
          />
          <Route
            path="rq-dependent"
            element={<DependentQueriesPage email="vishwas@example.com" />}
          />
          <Route path="rq-paginated" element={<PaginatedQueriesPage />} />
          <Route path="rq-parallel" element={<ParallelQueriesPage />} />
          <Route path="super-heroes" element={<SuperHeroesPage />} />
          <Route path="rq-infinite" element={<InfiniteQueriesPage />} />
          <Route path="rq-super-heroes">
            <Route index element={<RQSuperHeroesPage />} />
            <Route path=":id" element={<RQSuperHeroPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
