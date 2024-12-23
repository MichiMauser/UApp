import Layout from "../../components/layout"

export default function AdminDashboard(){
    return <>
        <p>This is the admin dashboard</p>
    </>
}

AdminDashboard.getLayout = function getLayout(page){
    return (
        <Layout>
            {page}
        </Layout>
    )
}