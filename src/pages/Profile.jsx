import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviewsByUserId, getUserById } from "../services/backend_api";
import UserReviewComponent from "../components/UserReviewComponent";
import ReviewCard from "../components/ReviewCard";
import "../css/Profile.css";

function Profile() {
  const { userID } = useParams();
  const [username, setUsername] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [errorGettingUser, setErrorGettingUser] = useState(null);
  const [errorGettingReviews, setErrorGettingReviews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserInfo = async (id) => {
      if (loading) return;
      setLoading(true);
      try {
        const user = await getUserById(id);
        setUsername(user.username);
        setFirstname(user.first_name);
        setLastname(user.last_name);
      } catch (err) {
        setErrorGettingUser(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo(userID);
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>{username}</h1>
      </div>

      <h2>Reviews</h2>

      <UserReviewComponent userID={userID}/>

      {loading && <div>Loading...</div>}
    </div>
  );
}

export default Profile;
