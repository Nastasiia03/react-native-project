import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase/config';

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    try {
     const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);

    } catch (error) {
      console.log("error.message", error.message);
    }
  };