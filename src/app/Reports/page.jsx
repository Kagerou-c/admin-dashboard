
import Navbar from "../components/nav";
import { GetUser } from "../provider";
import Chart from "./chart";
import { LoadingProvider } from "../get-loading";

export default function Pagechart() {



    return (
        <div className='page-layout'>
            <GetUser>
                <LoadingProvider>
                    <Navbar />
                    <Chart />
                </LoadingProvider>
            </GetUser>
        </div>
    )

}