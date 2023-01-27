import React ,{useState,useRef,useEffect} from 'react'
import { Urls } from 'helper'; 
import _ from "lodash";
import Table from "./filteringTable";
import { useTranslation } from "react-i18next";
import LoadingInline from 'HelperComponents/LoadingInline';
import { post ,get,getLang,dir} from 'helper';
export default function RoleTable() {

    const [goBack, setgoBack] = useState(false)
    const [loading, setloading] = useState(true)
    const [pageCount, setpageCount] = useState(0)
    const [data, setdata] = useState([])
    const [allrowsLength, setallrowsLength] = useState(0)
    const [endDataResponse, setendDataResponse] = useState(true)
    const [isLoading, setisLoading] = useState(true)
         const [trans,i18n] = useTranslation();

    var objectData_data = {
                startDate: new Date(2020, 12).toISOString().substring(0, 10),
                endDate: new Date().toISOString().substring(0, 10),
                name_ar:"",


    }
  const [datat_obj, setData_obj] = useState({
                startDate: new Date(2020, 12).toISOString().substring(0, 10),
                endDate: new Date().toISOString().substring(0, 10),
                name_ar:"",


  })
    const fetchIdRef = useRef(null)



      const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {

        
        mounted.current = true;
      } else {


        // do componentDidUpdate logic
      } 
    }, []);



    const handleBack = () => {
        setgoBack(false)
    }

    const loadingupdate = () => {
        setloading(true)
    }

   const  fetchData = ({ pageSize, pageIndex }) => {
        const fetchId = ++ fetchIdRef.current;
                setloading(true)

            //setLoading(true);
       if (fetchId === fetchIdRef.current) {

            fetchAPIData({
                limit: pageSize,
                skip: pageSize * pageIndex
                ,data:datat_obj
            });
        }
   };

     const  _handleSearch = _.debounce(
            (limit, skip, data,{type,value}) => {
             setData_obj(prevState => ({
                 ...prevState,
                 [data.type]: data.value
             }))

             for (const [key, value_data] of Object.entries(data)) {
                 if (key == type) {
                   objectData_data[type] = value
  setData_obj(prevState => ({
                         ...prevState,
                         [type]:value
                     }))
                 } else {
                     objectData_data[key] = value_data
                     setData_obj(prevState => ({
                         ...prevState,
                         [key]:value_data
                     }))
                 }
}
             fetchAPIData({ limit, skip, data: objectData_data })
                                                    setgoBack(true)

        },
        500, {
            maxWait: 500,
        }
     );




    const fetchAPIData = ({ limit, skip,data = null, advanceSearch = false }) => {

        // objectData = objectData_data;

        try {


            setloading(true)
            if (advanceSearch) {
                              setData_obj(data)
            }
         
                data["limit"] = limit
                data["skip"] = skip

            post(Urls.static + "roles", data, res => {
                console.log({res:res.data});
                    setdata(res.data)
                    setpageCount(res.counter)
                    setallrowsLength(res.rows)
                   
                setendDataResponse(false)
                    setloading(false)
                    setgoBack(true)
            },err=>{},true)
    

        } catch (e) {
            console.log("Error while fetching", e);
            // setLoading(false)
        }
    };


     const  endData = () => {
        setendDataResponse(true)
    }
         const COLUMNS = [
                {
                    Header: trans("Id"),
                    accessor: "id",
                },
                {
                    Header: trans("Name"),
                    accessor: `name_${getLang()}`,
             },
                {
                    Header: trans("Created At"),
                    accessor: 'created_at',
                },
                {
                    Header: trans("Options"),
                },
            ];
    
            return (
                <div className='content'>

                           <Table handleBack = { handleBack }
                loadingupdate = { loadingupdate }
                pageCount = { pageCount }
                fetchData = { fetchData }
                columns = { COLUMNS }
                trans = { trans }
                data = { data }
                loading = { loading }
                _handleSearch = { _handleSearch }
                allrowsLength = { allrowsLength }
                goBack = { goBack }
                endDataResponse = { endDataResponse }
                endData = { endData }
                        fetchAPIData={fetchAPIData}
              

                />

                </div>
            )
        
    
}
