 import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password, nickname);

      const user = await auth.currentUser;

          await updateProfile(user, {
            displayName: nickname,
            email: email,
          });
        

      const { uid, displayName, email } = await auth.currentUser;

      dispatch(authSlice.actions.updateUserProfile({
        userId: uid,
        nickname: displayName,
        email: email
      }));
      
      console.log(uid, displayName);
      
    } catch (error) {
      console.log("error.message", error.message);
    }
    };
  
    export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
     const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);

    } catch (error) {
      console.log("error.message", error.message);
    }
    };

export const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile({
        userId: user.uid,
        nickname: user.displayName,
        email: user.email
      }));
      
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => { 
  try {
    await auth.signOut();
    console.log('User signed out successfully.');
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.error('Error occurred during sign-out:', error.message);
    // You can also add more specific error handling based on the error code if needed.
  }
};


  
    