import { useState, useContext } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAuth0 } from "@auth0/auth0-react";

import MyDialog from "./MyDialog";
import { server_calls } from "../api/server";
import { useGetData } from "../custom-hooks/FetchData";
import { UserContext } from "../App";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, hideable:false },
    { field: 'title', headerName: 'Title', flex: 3, minWidth:150, hideable:false },
    { field: 'artist', headerName: 'Artist', flex: 2, minWidth:125, hideable:true },
    { field: 'medium', headerName: 'Medium', flex: 2, minWidth:125, hideable:true },
    { field: 'date', headerName: 'Date', flex: 1, minWidth:70, hideable:true },
    { field: 'origin', headerName: 'Origin', flex: 2, minWidth:125, hideable:true },
]

const getTogglableColumns = (columns: GridColDef[]) => {
    return columns
        .filter((column) => column.field!='id')
        .map((column) => column.field);
}

function DataTable() {
    const [ open, setOpen ] = useState(false);
    const [ selectionModel, setSelectionModel ] = useState<string[]>([]);
    const { user } = useAuth0();
    const { userInfo } = useContext(UserContext)

    const { artworkData, getData } = useGetData(`${userInfo.userID}`)

    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    const deleteData = () => {
        server_calls.delete(selectionModel[0], `${userInfo.userID}`)
        getData();
        setTimeout( () => {window.location.reload()}, 500)
    }

  return (
    <>
        <MyDialog
            id={selectionModel}
            open={ open }
            onClose={handleClose}
        />
        <div className="mx-auto w-screen">
            <div className="w-5/6 space-x-3 mx-auto">
                <button onClick={ () => {handleOpen(); setSelectionModel([])} }
                    className="lowercase bg-slate-50 opacity-70 p-2 rounded-sm 
                        border border-black border-opacity-50 
                        hover:border-opacity-100 hover:underline"
                >
                    Add Artwork
                </button>
                {selectionModel.length > 0 ?
                    (<button 
                        onClick={handleOpen} 
                        className="lowercase bg-slate-50 opacity-70 p-2 
                            rounded-sm border border-black border-opacity-50 
                            hover:border-opacity-100 hover:underline"
                    >
                        Update
                    </button>
                    ) :
                    (<button disabled 
                        className="lowercase bg-slate-900 text-slate-300 
                            opacity-70 p-2 rounded-sm border border-black 
                            border-opacity-50"
                    >
                        Update
                    </button>)
                }
                {selectionModel.length > 0 ?
                    (<button 
                        onClick={deleteData} 
                        className="lowercase bg-slate-50 opacity-70 p-2 
                            rounded-sm border border-black border-opacity-50 
                            hover:border-opacity-100 hover:underline"
                    >
                        Delete
                    </button>
                    ) :
                    (<button disabled 
                        className="lowercase bg-slate-900 text-slate-300 
                            opacity-70 p-2 rounded-sm border border-black 
                            border-opacity-50"
                    >
                        Delete
                    </button>)
                }
            </div>
            <div className="container mx-auto my-5 flex flex-col justify-center 
                w-11/12 max-w-screen-xl h-[26rem]"
            >
                <h2 className="p-3 bg-white bg-opacity-80 my-2 rounded 
                    text-center text-xl "
                >
                    {user?.name}'s Artwork Database
                </h2>
                <DataGrid 
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                id: false
                            }
                        }
                    }}    
                    slotProps={{
                        columnsPanel: {
                            getTogglableColumns,
                        }
                    }}
                    rows={artworkData} columns={columns} 
                    pageSizeOptions={[100]}
                    onRowSelectionModelChange={ (item:any) => {
                        setSelectionModel(item)
                    }}
                    className='bg-white bg-opacity-80 h-full'
                />
            </div>
        </div>
    </>
  )
}

export default DataTable
