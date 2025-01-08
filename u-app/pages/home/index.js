import { useSelector } from "react-redux";
import Layout from "../../components/layout"

export default function Home(){
    // console.log('Redux state after setting currentUid:', useSelector((state) => state.chat));
    return <>
        <p>Work in progress</p>
    </>
}

Home.getLayout = function getLayout(page){
    return (
        <Layout>
            {page}
        </Layout>
    )
}