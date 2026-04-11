
import Navbar from "../components/nav";
import { GetUser } from "../provider";
import Chart from "./chart";

export default function Pagechart() {



    return (
        <div className='page-layout'>
            <GetUser>
                <Navbar />
                <Chart />
            </GetUser>
        </div>
    )

}