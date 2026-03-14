import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function OAuthSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch(`${API}/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        navigate("/auth");
        return;
      }

      const data = await res.json();
      dispatch(setUser(data.user));

      navigate("/task");
    };

    loadUser();
  }, [dispatch, navigate]);

  return <div>Signing you in...</div>;
}

export default OAuthSuccess;