
import React, { useMemo, useState } from "react";
import { useTable, usePagination, useExpanded, useSortBy } from "react-table";



import FooterTable from "./footerTable";
import LoadingInline from "HelperComponents/LoadingInline";
import HeaderSearch from "./search/header_search";
import MainRows from "./rows/main_rows";
import TemporaryDrawer from "./search/drawerBottom";
import swal from "sweetalert";
import { Urls } from "helper"; 
import axios from "axios";
import { dir } from "helper";
import EditRoles from "./modals/EditRoles";
import AddRoles from "./modals/AddRoles";
import { get } from "helper";
const TableComponent =  ({
    columns,
  data,
    Roles,
  trans,
  fetchData,
  pageCount: controlledPageCount,
    loading,
    _handleSearch,
    loadingupdate,
    goBack,
    handleBack,

                        endDataResponse,
                        endData,
    fetchAPIData,
    categories,
    brands,
    // deleteData,
     allrowsLength,

  isPaginated = true,
  ...props
}) => {



  const defaultColumn = useMemo(
    () => ({
      // minWidth: 20,
      // maxWidth: 115
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // setHiddenColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        // hiddenColumns: columns
        //   .filter((column) => !column.show)
        //   .map((column) => column.id),
      },
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      pageCount: controlledPageCount,
    },
    useSortBy,
    useExpanded,
    usePagination
  );



    const [fetchdatas, setfetchdatas] = useState(true)

    const [roles, setRoles] = useState({})
    const [addRolesShow, setaddRolesShow] = useState(false)
    const [editRolesShow, setEditRolesShow] = useState(false)

    React.useEffect(() => {
        if (fetchdatas) {
            fetchData && fetchData({ pageIndex, pageSize });


      }
  }, [/*fetchData,*/ pageIndex, pageSize]);



  React.useEffect(() => {
            if (!fetchdatas) {
                gotoPage(0)

            }

  }, [fetchdatas]);

    React.useEffect(() => {

        if (goBack) {
            setfetchdatas(true)
                gotoPage(0)

            handleBack()
        }

  }, [goBack]);

    const handleDataDrawer = () => {
         setfetchdatas(false)
    }
    const deleteRoles = (id) => {
            const destroy_url = Urls.static + `role_delete/${id}`;

 swal({
  title: trans("Are you sure?"),

  icon: "warning",
  buttons:[trans("cancel"), trans("remove")],
     dangerMode: true,


})
.then((willDelete) => {
    if (willDelete) {
        loadingupdate();

        get(destroy_url, res => {
              fetchData && fetchData({ pageIndex, pageSize });

        })
      

  }
});
    }

    const addRoles = () => {
              setaddRolesShow(true)

    }

      const editRoles = (row) => {
        setRoles(row)
              setEditRolesShow(true)

    }
    const AddRolesHandleSave = () => {
                         fetchData && fetchData({ pageIndex, pageSize });

    }
    const EditRoleshandleSave = () => {
                 fetchData && fetchData({ pageIndex, pageSize });

    }
    const addRolesClose = () => {
        setaddRolesShow(false)

    }

       const editRolesClose = () => {
        setEditRolesShow(false)

    }
        return (
            <>
                <div>
                    <div className="card ">
                        <div className="card-header ">
                            <div className="d-flex" style={{ justifyContent: "space-between",alignItems:"center" }}>
                                    <h1> <i className="las la-roless"></i> {trans("Roles")} </h1>
                            <button onClick={addRoles} className="btn btn-primary">{ trans("Create Role")}</button>
                            </div>
                        
                        </div>
                        <div className="card-body ">

                            <HeaderSearch trans={trans}  _handleSearch={_handleSearch} loadingupdate={loadingupdate} setfetchdatas={setfetchdatas} />
                            <div className="table-responsive">
                                <table className="table  " {...getTableProps()}>
                                    <thead className="thead-light">
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                    <th style={{textAlign:"center"}} {...column.getHeaderProps({})}>
                                                        <span>{column.render("Header")}</span>
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                        </thead>
                                        {loading ? (<tbody >
                                                <tr  style={{textAlign:"center",verticalAlign:"middle"}} >
                                                        <td colSpan={10} ><LoadingInline/></td>
                                            </tr>
                                        </tbody>): (
                                            <tbody {...getTableBodyProps()}>
                                                        {data.length > 0?page.map((row, i) => {
                                                            prepareRow(row);
                                                            return (
                                                                <tr key={i} {...row.getRowProps()}>
                                                                    {row.cells.map((cell, i) => {

                                                                        return (
                                                                                <MainRows editRoles={editRoles}  swalRemove={deleteRoles} key={i} trans={trans} row={row} cell={cell} i={i} />
                                                                            )
                                                                    })}
                                                                </tr>
                                                            );
                                                        }):<tr  style={{textAlign:"center",verticalAlign:"middle"}} >
                                                        <td colSpan={10} ><div style={{padding:60,fontSize:18,fontWeight:"bold"}}>{trans("Not Found Data")}</div></td>
                                            </tr>}
                                            </tbody>
                                            )}
                                </table>


                                    {Boolean(isPaginated) ? (
                                        <FooterTable
                                            trans={trans}
                                            allrowsLength={allrowsLength}
                                            pageOptions={pageOptions}
                                            canPreviousPage={canPreviousPage}
                                            gotoPage={gotoPage}
                                            previousPage={previousPage}
                                            pageCount={pageCount}
                                            canNextPage={canNextPage}
                                            nextPage={nextPage}
                                            pageIndex={pageIndex}
                                            pageSize={pageSize}
                                            setPageSize={setPageSize}
                                                    />) : null}
                            </div>
                        </div>

                    </div>

                    <div style={{ display: "flex", justifyContent: "center",marginBlock:20 }}>
                                        <TemporaryDrawer  handleDataDrawer={handleDataDrawer} endDataResponse={endDataResponse} endData={endData} fetchAPIData={fetchAPIData}  trans={trans}  />
                    </div>

                    <div className="display_modal">
                      {editRolesShow?<EditRoles Roles={Roles} handleSave={EditRoleshandleSave} show={editRolesShow} handleClose={editRolesClose}  trans={trans} row={roles} />:null}
                    </div>

                     <div className="display_modal">
                      {addRolesShow?<AddRoles Roles={Roles} handleSave={AddRolesHandleSave} show={addRolesShow} handleClose={addRolesClose}  trans={trans} />:null}
                    </div>
                </div>
            </>
        )

  }

export default TableComponent;


