import React from 'react'
import {  MDBView, MDBCard, MDBCardBody } from 'mdbreact';
import { useForm } from "react-hook-form";
import {ingresarKeytHandler} from '../handler/ingresarKeyt';

export default function IngresarKeyt({refresh}) {

    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (data, e) => {
        ingresarKeytHandler(data, e)
        .then(res => {
            if(res){
                refresh(Math.floor(Math.random() * 3000) + 1);
            }
        })
    }

    return (<React.Fragment>

        <MDBCard className="mt-5">
            <MDBView className="gradient-card-header red darken-2">
                <h4 className="h4-responsive text-white">NO USAR</h4>
            </MDBView>
            <MDBCardBody>
            <form className="qr-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="keyt">Keyt</label>
                <input
                    name="keyt"
                    className="form-control"
                    ref={register({
                    required: "Required",
                    })}
                />
                <label htmlFor="value">Value</label>
                <input
                    name="value"
                    className="form-control"
                    ref={register({
                    required: "Required",
                    })}
                />
                <span>{errors.name && errors.name.message}</span>
                        <div className="text-center">
                            <button className="btn btn-danger" type="submit">Ingresar</button>
                        </div>
            </form>
            </MDBCardBody>
        </MDBCard>

    </React.Fragment>)

}