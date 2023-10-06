import { useContext, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { getRandomArtwork } from "../custom-hooks/GetRandomArtwork"
import { server_calls } from "../api/server";
import { 
    chooseTitle, 
    chooseArtist, 
    chooseMedium, 
    chooseDate, 
    chooseOrigin 
  } from "../redux/slices/RootSlice";
import { UserContext } from "../App";
import { userAPI } from "../api/userAPI";


function Home() {
    const { artwork } = getRandomArtwork();
    const dispatch = useDispatch();
    const store = useStore();
    const { isAuthenticated, user, isLoading } = useAuth0();

    const { userInfo, setUserInfo } = useContext(UserContext);

    const onSubmit = () => {
        dispatch(chooseTitle(artwork.title));
        dispatch(chooseArtist(artwork.artist_title));
        dispatch(chooseMedium(artwork.medium_display));
        dispatch(chooseDate(artwork.date_display));
        dispatch(chooseOrigin(artwork.place_of_origin));

        server_calls.create(store.getState(), `${userInfo.userID}`);
        console.log(`Added: ${artwork.title}`)
        setTimeout(() => {window.location.reload()}, 500);
    }

    const artImage = new Image()
    if (artwork.thumbnail.width > 843 ) {
      artImage.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    } else if (artwork.thumbnail.width > 600) {
      artImage.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/600,/0/default.jpg`
    } else {
      artImage.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
    }

    useEffect(() => {
      if (!isLoading && isAuthenticated) {
        window.localStorage.setItem('email',`${user?.email}`);
        window.localStorage.setItem('userID',`${user?.sub}`);
        setUserInfo({
          'email': window.localStorage.getItem('email'),
          'userID': window.localStorage.getItem('userID'),
        });
      }
    }, [isAuthenticated]);

    useEffect(() => {
      if (!isLoading && isAuthenticated) {
        userAPI.add_user({'email': userInfo.email, 'user_token': userInfo.userID})
      };
      
    }, [userInfo.email])

  return (
    <div 
      className='bg-slate-50 h-screen w-screen'
    >
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          h-2/5 sm:h-1/2 md:h-3/5"
        >
          <div className="h-full w-full transition duration-500 ease-in-out 
            hover:opacity-30"
          >
            <figure className="h-full w-full ">
                <img 
                  className="h-full w-full aspect-auto object-contain p-3 shadow-xl"
                  src={artImage.src}
                  alt={artwork.title}
                  id="image"
                />
                <figcaption className="mt-3 text-end text-black me-0 sm:-me-10">
                  <p className="italic">{artwork.title}</p>
                  <p>{artwork.artist_title}</p>
                </figcaption>
            </figure>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 
            -translate-y-1/2 opacity-0 transition duration-500 ease-in-out 
            hover:bg-white hover:bg-opacity-70 hover:opacity-100 w-full h-full 
            flex flex-col place-items-center place-content-center"
          >
            <div className="table border-spacing-2 text-xs sm:text-sm 
              md:text-base px-3"
            >
              <div className="table-row">
                <div className="table-cell text-right lowercase font-extralight">
                  Title:
                </div>
                <div className="table-cell italic">{artwork.title}</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-right lowercase font-extralight">
                  Artist:
                </div>
                <div className="table-cell">{artwork.artist_title}</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-right lowercase font-extralight">
                  Medium:
                </div>
                <div className="table-cell">{artwork.medium_display}</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-right lowercase font-extralight">
                  Date:
                </div>
                <div className="table-cell">{artwork.date_display}</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-right lowercase font-extralight">
                  Origin:
                </div>
                <div className="table-cell">{artwork.place_of_origin}</div>
              </div>
            </div>
            { isAuthenticated  ? (
            <button onClick={onSubmit}
                className="lowercase bg-slate-50 opacity-70 p-2 rounded-sm 
                  border border-black border-opacity-50 hover:border-opacity-100 
                  hover:underline"
            >
                Add to My Database
            </button>
            ) : (<></>)}
          </div>
        </div>
    </div>
  )
}

export default Home