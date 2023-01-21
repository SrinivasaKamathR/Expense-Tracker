import React, { useRef, useContext, useEffect } from "react";
import classes from "./UserProfileForm.module.css";
import profileContext from "../store/profile-context";

const UserProfileForm = () => {
  const profileCtx = useContext(profileContext);
  const nameRef = useRef();
  const photoRef = useRef();

  const profileSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // console.log('called');
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAQs7bI7d64xgfIx12vFZcTVaM1c4_k08A",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("idToken"),
            displayName: nameRef.current.value,
            photoUrl: photoRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        profileCtx.update();
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    nameRef.current.value = profileCtx.name;
    photoRef.current.value = profileCtx.photo;
  });

  return (
    <form className={classes.form} onSubmit={profileSubmitHandler}>
      <div className={classes.formHead}>
        <span>Contact Details</span>
        <button>Cancel</button>
      </div>
      <div className={classes.formBody}>
        <label>Full Name:</label>
        <input type="text" ref={nameRef} />
        <label>Profile Photo URL:</label>
        <input type="text" ref={photoRef} />
        <div className={classes.button}>
          <button type="submit">Update</button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;
