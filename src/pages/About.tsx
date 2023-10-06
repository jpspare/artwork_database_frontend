import { Link } from 'react-router-dom'

import Background from '../assets/images/Art_Gallery.jpg'

function About() {

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${ Background })`}}
        className='bg-cover bg-center bg-fixed h-screen justify-center opacity-40'
      >
      </div>
      <div className='mt-16 pb-10 absolute top-0 left-0 w-full rounded-sm'>
        <div className='bg-slate-50 m-5 p-5'>
          <h1
            className='p-5 text-3xl text-black
            text-center'
          >
            {`about {gallery + database}`}
          </h1>
          <Link to='/'>
            <h3 className='text-xl font-light'>
              | home |
            </h3>
          </Link>
          <p className='font-extralight mb-5'>
            The home page is curated to display a random piece of art from the Art
            Insitute of Chicago {`(AIC)`}. Upon refreshing the page, or returning
            to the page, a new piece of art will be displayed. The title and the
            artist for the work are displayed beneath the work. Additionally, if
            the user hovers thier mouse over the artwork, additional information,
            including the medium, date, and place of origin for the work will be
            displayed.
          </p>
          <Link to='/search'>
            <h3 className='text-xl font-light'>
              | search |
            </h3>
          </Link>
          <p className='font-extralight mb-5'>
            The search tab performs a seach of the AIC database based on the
            user-supplied query. If the user hovers over the artwork, the information
            about the piece will be displayed. Moreover, if the user is logged in,
            they will have the ability to add that artwork to thier database.
          </p>
          <Link to='/dashboard'>
            <h3 className='text-xl font-light'>
              | database |
            </h3>
          </Link>
          <p className='font-extralight'>
            The database provides an opportunity for a user to store information
            about various artworks. Art information can be easily added through the
            random search and the user-query search. The user can also manually
            input thier information, update that information, as well as remove
            any works they would like from the database.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
