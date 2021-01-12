import React from "react";
import Layout from "../../layouts/layout"
import Form from "../../components/Forms/AnalisisForms"
import Cookies from 'universal-cookie';

export default function Analisis({data}) {
    return(
        <Layout data={data}>
        <Form data={data}></Form>
        </Layout>
    )
    
}

export async function getServerSideProps(ctx) {
    const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null)
    var data = await cookies.get("mySession")
    if(data==null){
      data = new Object();
      data.email="admin@upiita.com"
      data.name="no-login"
    }
    return { props: { data  } };
    
    }