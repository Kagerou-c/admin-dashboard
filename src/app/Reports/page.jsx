
import Navbar from "../component/nav";
import { GetUser } from "../provider";
import Chart from "./chart";

export default function Pagechart() {
    


    return (
        <div className='Reports-wrap'>
            <GetUser>
                <Navbar/>
                <Chart/>
            </GetUser>
        </div>
    )

}