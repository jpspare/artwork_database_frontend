import Background from '../assets/images/Art_Gallery.jpg'
import DataTable from '../components/DataTable';


function Dashboard() {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${ Background })`}}
        className='bg-cover bg-center bg-fixed h-screen justify-center'
      >
        <div className='place-items-center h-screen pt-16 pb-8 bg-white 
          bg-opacity-40 flex'
        >
            <DataTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
