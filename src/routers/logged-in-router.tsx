import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { useMe } from "../hooks/useMe";
import { GetAllPodcasts } from "../pages/listener/getAllPodcasts";
import { EditProfile } from "../pages/user/edit-profile";
import { CreatePodcast } from "../pages/host/createPodcast";
import { EditPodcast } from "../pages/host/editPodcast";
import { PodcastDetail } from "../pages/user/seePodcast";
import { UpdateEpisode } from "../pages/host/updateEpisode";
import { EditEpisode } from "../pages/host/editEpisode";
import { SearchPodcast } from "../pages/listener/searchPodcast";
import { GetMyPodcasts } from "../pages/host/getMyPodcast";
import { UserRole } from "../__generated__/globalTypes";
import { SearchCategory } from "../pages/listener/searchCategory";
import { Loader } from "../components/loader";
import { SubAndFeed } from "../pages/listener/subAndFeed";

const HostRoutes = [
  { path: "/", component: <GetMyPodcasts /> },
  { path: "/create-podcast", component: <CreatePodcast /> },
  { path: "/edit-podcast/:id", component: <EditPodcast /> },
  { path: "/podcast/:id", component: <PodcastDetail /> },
  { path: "/podcast/:podcastId/upload-episode", component: <UpdateEpisode /> },
  {
    path: "/podcast/:podcastId/edit-episode/:episodeId",
    component: <EditEpisode />,
  },
];

const ListenerRoutes = [
  { path: "/", component: <GetAllPodcasts /> },
  { path: "/search-podcast/:term", component: <SearchPodcast /> },
  { path: "/podcast/:id", component: <PodcastDetail /> },
  { path: "/category/:slug", component: <SearchCategory /> },
  { path: "/see-me", component: <SubAndFeed /> },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center bg-white">
        <Loader />
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/edit-profile">
          <EditProfile />
        </Route>
        {data.me.role === UserRole.Listener &&
          ListenerRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Host &&
          HostRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
