// import { enlistedSchools, enlistedZone } from "@component/app/Reducers/schoolReducer";
// import { useSelector } from "react-redux";

const DashboardHome = () => {
    // const { zoneInfo, schoolInfo } = useSelector((state) => state.school);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(enlistedZone());
    //   dispatch(enlistedSchools("all"));
    // }, []);

    // console.log(zoneInfo)
    return (
        <div>
            <h1 style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>Welcome to Admin Dashboard</h1>
        </div>
    );
};

export default DashboardHome;