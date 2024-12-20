import Layout from "../../components/layout"

export default function Home(){
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