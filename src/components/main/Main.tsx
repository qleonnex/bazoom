import {
  useInitData,
  useShowPopup,
  WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import FriendList from "../../pages/friend-list/FriendList";
import MainPage from "../../pages/main/MainPage";
import RegisterPage from "../../pages/register/RegisterPage";
import WorkInProgressPage from "../../pages/work-in-progress/WorkInProgressPage";
import PageLayout from "../page-layout/PageLayout";
import { useEffect } from "react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import { I18nextProvider } from "react-i18next";
import BoostsBage from "../../pages/boosts/BoostsPage";
import VideosPage from "../../pages/videos/VideosPage";
import FriendsPage from "../../pages/friends/FriendsPage";
import { useTranslation } from "react-i18next";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<PageLayout />}>
      <Route path="/" element={<MainPage />} />
      <Route path="/groups" element={<WorkInProgressPage />} />
      <Route path="/wallet" element={<WorkInProgressPage />} />
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/friends/list" element={<FriendList />} />
      <Route path="/boosts" element={<BoostsBage />} />
      <Route path="/boosts/videos" element={<VideosPage />} />
    </Route>,
    <Route path="/register" element={<RegisterPage />} />,
  ]),
);

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

const Main = () => {
  const [initDataUnsafe] = useInitData();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = initDataUnsafe?.user?.language_code;
    if (lang) i18n.changeLanguage(lang);
    else i18n.changeLanguage("en");
  }, [initDataUnsafe]);

  return (
    <I18nextProvider i18n={i18next}>
      <WebAppProvider>
        <RouterProvider router={router}></RouterProvider>
      </WebAppProvider>
    </I18nextProvider>
  );
};

export default Main;
