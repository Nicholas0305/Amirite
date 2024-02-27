import App from "./App";
import LoginPage from "./components/login/LoginPage";
import MainPage from "./components/home/MainPage";
import Audio from "./components/Audio";
import Stats from "./components/stats/StatsPage";
import RegisterPage from "./components/register/RegisterPage";
import LeaderboardsPage from "./components/leaderboards/LeaderboardsPage";
import AboutPage from "./updates/UpdatePage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/Register", element: <RegisterPage /> },
      { path: "/MainPage", element: <MainPage /> },
      { path: "/Stats", element: <Stats /> },
      { path: "/Leaderboards", element: <LeaderboardsPage /> },
      { path: "/About", element: <AboutPage /> },
    ],
  },
];

export default routes;
