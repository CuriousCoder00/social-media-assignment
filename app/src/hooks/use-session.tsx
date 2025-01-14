import { sessionState } from "@/lib/recoil/atoms/auth";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useSession = () => {
  const [session, setSession] = useRecoilState(sessionState);

  useEffect(() => {
    const token = localStorage.getItem("social_media_app_token");
    const sessionData = localStorage.getItem("social_media_app_session");
    if (!token) {
      localStorage.removeItem("social_media_app_session");
    }
    if (sessionData) {
      setSession(JSON.parse(sessionData));
    } else {
      setSession({
        isLoggedIn: false,
        token: null,
        user: {
          id: "",
          email: "",
          name: "",
          username: "",
        },
        friends: [],
      });
    }
  }, []);

  return {
    session,
    setSession,
  };
};
