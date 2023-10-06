import { useState } from 'react'
import Background from '../assets/images/Art_Gallery.jpg'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults';



function Search() {
  const [ searchInput, setSearchInput ] = useState("");  
  const searchInputCallbackFunction = (searchString: string) => {
    setSearchInput(searchString);
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${ Background })`}}
        className='bg-cover bg-center bg-fixed h-screen justify-center opacity-40'
      >
      </div>
      <div>
        <SearchBar searchCallback={searchInputCallbackFunction} />
        <SearchResults searchInput={searchInput}/>
      </div>
    </div>
  )
}

export default Search
