import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState({}); // { [itemId]: averageRating }
  const [userRatings, setUserRatings] = useState({}); // { [itemId]: userRating }

  // 🔹 Fetch all averages and user ratings
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const { data } = await axios.get("http://localhost:5000/api/ratings", {
          headers,
        });

        // Expected data format:
        // {
        //   1: { average: 4.2, ratings: [{ userId: 1, rating: 5 }, ...] },
        //   2: { average: 3.5, ratings: [...] }
        // }
        const avgMap = {};
        const userMap = {};

        for (let productId in data) {
          avgMap[productId] = data[productId].average || 0;

          // If user is logged in, find their rating
          const tokenPayload = token ? parseJwt(token) : null; // utility function to decode JWT
          if (tokenPayload) {
            const userRatingObj = data[productId].ratings.find(
              (r) => r.userId === tokenPayload.id
            );
            if (userRatingObj) {
              userMap[productId] = userRatingObj.rating;
            }
          }
        }

        setRatings(avgMap);
        console.log(avgMap);
        setUserRatings(userMap);
      } catch (err) {
        console.error("Failed to fetch ratings:", err);
      }
    };

    fetchRatings();
  }, []);

  // 🔹 Submit new rating
  const submitRating = async (itemId, ratingValue) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to rate this product.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/ratings",
        { item_id: itemId, rating: ratingValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update user’s rating and average rating
      setUserRatings((prev) => ({ ...prev, [itemId]: ratingValue }));
      if (data.average) {
        setRatings((prev) => ({ ...prev, [itemId]: data.average }));
      }
    } catch (err) {
      console.error("Failed to submit rating:", err);
    }
  };

  return (
    <RatingContext.Provider value={{ ratings, userRatings, submitRating }}>
      {children}
    </RatingContext.Provider>
  );
};

// Custom hook
export const useRating = () => useContext(RatingContext);

// Utility: decode JWT to get userId
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
