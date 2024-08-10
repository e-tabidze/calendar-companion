import authHOC from "src/hoc/authHOC";
import GettingStartedPage from "src/views/pages/getting-started";

const GettingStarted = () => {
    return ( 
        <GettingStartedPage />
     );
}
 
export default authHOC(GettingStarted);