import './datatable.css'
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';


const columns = [
  { field: 'id', 
    headerName: 'ID', 
    width: 90 
  },
  {
    field: 'firstName',
    headerName: 'Nombre',
    width: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Apellido',
    width: 150,
    editable: false,
  },
  {
    field: 'age',
    headerName: 'Años',
    type: 'number',
    width: 100,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'User',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    renderCell: (params) =>{
        return(
            <>
            <span>{params.row.lastName}</span>
            <p>{params.row.age}</p>
            </>
          );
        }
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 67 },
  { id: 6, lastName: 'Melisandre', firstName: 'Gabriela', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const Datatable = () => {

  const actionColumn = [
    {field:"action", 
    headerName:"Action", 
    width: 200, 
    renderCell: ()=> {
      return(
        <div className="cellAction">
          <Link to="/users/test" style={{textDecoration: "none"}}>
            <abbr title="Ver"><div className='viewButton'><VisibilityIcon/></div></abbr>
          </Link>
          <abbr title="Eliminar"><div className='deleteButton'><DeleteIcon className='iconDelete'/></div></abbr>
          <abbr title="Editar"><div className='editButton'><EditIcon/></div></abbr>
        </div>
      )
  } }]

  
  return (
      <div className='datatable'>
        <div className="table">

          <div className="datatableTitle">
            Nuevo Usuario
            <Link to="/users/new" className='linkDatatable'>
              Agregar
            </Link>
          </div>
          <DataGrid
            className='datagrid'
            rows={rows}
            columns={columns.concat(actionColumn)}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            />
          </div>
      </div>
  )
}

export default Datatable
