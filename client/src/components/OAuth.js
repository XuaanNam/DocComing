import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../api/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loginFulfilled } from '../redux-toolkit/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginGoogle } from '../redux-toolkit/authSlice';

export default function OAuth() {
    const { data } = useSelector((state) => state.user);
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })

            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const body = {
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL,
            }
            dispatch(loginGoogle(body))
            .then(() =>{
                navigate('/');
            })
            

            console.log( data)


    } 
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}