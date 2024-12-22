"use client"

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function StripePage({amount}: {amount: number}) {

    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [formLoading, setFormLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const order = useSelector((state: RootState) => state.order.order);

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({ amount }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            setClientSecret(data.clientSecret);
            setLoading(false);
        })
        .catch(error => {
            setErrorMessage(error.message);
        })
        
    }, [amount])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormLoading(true);

        if (!stripe || !elements) {
            return <Skeleton />
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            setFormLoading(false);
            return;
        }

        if(!elements) {
            alert("NONE")
            return; 
        }
        console.log(elements)
        console.log("ORDER: ",order);
        alert("Payment successful, ready to create order");
        const res = await axios.post("/api/order", order);
        if (res.status === 200) {
            dispatch(setCart([]));
        } else {
            alert("Error creating order");
            setErrorMessage("Error processing payment");
        }

        const { error } = await stripe.confirmPayment({
            clientSecret,
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success` // redirect to order page after payment
            },
        });

        if (error) {
            alert("Failed Stripe payment");
            setErrorMessage(error.message);
            setFormLoading(false);
            return;
        }

        
        setFormLoading(false);
    }

    if (loading) {
        return <Skeleton />
    }
    
    return (
        <form onSubmit={handleSubmit} className="bg-gradient-to-b from-teal-300 via-cyan-300 to-cyan-400 flex flex-col items-center xl:w-full py-10 px-5 md:px-10 xl:px-5  rounded-md">
            {clientSecret && <PaymentElement />}
            
            <Button className="px-20 mt-5 text-white font-semibold bg-gradient-to-b from-gray-500 via-gray-800 to-cyan-900 hover:scale-105 hover:from-gray-500 hover:to-cyan-900"
              type="submit"
            >
                {formLoading ? "Processing..." : `Pay $ ${(amount/100).toFixed(2)}`}
            </Button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    )
    
}

//  simulate a loading skeleton for a form while the payment intent is being created with 4 input fields and a button
const Skeleton = () => {
    return (
        <div className="bg-gradient-to-b from-teal-300 via-cyan-300 to-cyan-400 flex flex-col items-center px-5 py-10 rounded-md">
            <div className="h-10 w-96 bg-gray-300 animate-pulse rounded-md mb-5"></div>
            <div className="h-10 w-96 bg-gray-300 animate-pulse rounded-md mb-5"></div>
            <div className="h-10 w-96 bg-gray-300 animate-pulse rounded-md mb-5"></div>
            <div className="h-10 w-96 bg-gray-300 animate-pulse rounded-md mb-5"></div>
            <Button className="px-20 mt-5 text-white font-semibold bg-gradient-to-b from-teal-600 via-cyan-600 to-cyan-800 hover:scale-105 hover:from-teal-700 hover:to-cyan-900"
              disabled
            >
                Pay
            </Button>
        </div>
    )
}