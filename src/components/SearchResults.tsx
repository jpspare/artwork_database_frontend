import { useContext } from "react";
import { useDispatch, useStore } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { ArtworkSearch } from "../custom-hooks/ArtworkSearch";
import { server_calls } from "../api/server";
import { 
    chooseTitle, 
    chooseArtist, 
    chooseMedium, 
    chooseDate, 
    chooseOrigin 
  } from "../redux/slices/RootSlice";
import { UserContext } from "../App";

type searchResultProps = {
    searchInput: string;
}

function SearchResults( props: searchResultProps ) {
    const { artData } = ArtworkSearch(props.searchInput);
    const dispatch = useDispatch();
    const store = useStore();
    
    const { isAuthenticated } = useAuth0();
    const { userInfo } = useContext(UserContext);

    const onSubmit = () => {
        dispatch(chooseTitle(artData.title));
        dispatch(chooseArtist(artData.artist_title));
        dispatch(chooseMedium(artData.medium_display));
        dispatch(chooseDate(artData.date_display));
        dispatch(chooseOrigin(artData.place_of_origin));

        server_calls.create(store.getState(), `${userInfo.userID}`);
        console.log(`Added: ${artData.title}`)
        setTimeout(() => {window.location.reload()}, 500);
    }

    const artSearchImage = new Image()
    if (props.searchInput=="") {
        artSearchImage.src = ""
    } else if (artData.thumbnail.width > 843) {
        artSearchImage.src = `https://www.artic.edu/iiif/2/${artData.image_id}/full/843,/0/default.jpg`
    } else if (artData.thumbnail.width > 600) {
      artSearchImage.src = `https://www.artic.edu/iiif/2/${artData.image_id}/full/600,/0/default.jpg`
    } else {
      artSearchImage.src = `https://www.artic.edu/iiif/2/${artData.image_id}/full/400,/0/default.jpg`
    }
    

    return (
    <div className={`${props.searchInput=="" ? 'hidden' : ''} fixed top-1/2 
      left-1/2 -translate-x-1/2 -translate-y-1/2 h-2/5 sm:h-1/2 md:h-3/5`}
    >
        <img src={artSearchImage.src} alt={artData.title} 
            className="h-full w-full aspect-auto object-contain p-3 shadow-xl 
              bg-slate-50 rounded-sm"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          opacity-0 transition duration-500 ease-in-out hover:bg-white 
          hover:bg-opacity-70 hover:opacity-100 w-full h-full flex flex-col 
          place-items-center place-content-center"
        >
            <div className="table border-spacing-2 text-xs sm:text-sm 
              md:text-base px-3"
            >
              <div className="table-row">
                <div className="table-cell text-right lowercase font-extralight">
                  Title:
                </div>
                <div className="table-cell italic">{artData.title}</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-right lowercase font-extralight">
                  Artist:
                </div>
                <div className="table-cell">{artData.artist_title}</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-right lowercase font-extralight">
                  Medium:
                </div>
                <div className="table-cell">{artData.medium_display}</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-right lowercase font-extralight">
                  Date:
                </div>
                <div className="table-cell">{artData.date_display}</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-right lowercase font-extralight">
                  Origin:
                </div>
                <div className="table-cell">{artData.place_of_origin}</div>
              </div>
            </div>
            <div className="table-row">
            {isAuthenticated? (
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

export default SearchResults
