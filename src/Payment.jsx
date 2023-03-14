import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js';
import { SendMail } from './SendMail';

export function Payment() {

    const paypalOptions = {
        "client-id": "AdCgq612duLsoz1YMIH8B4tSNBpWtJtlfXE0TZ1wGIegRuDKc7Sg1Y95gq7Z_24rlieuHC6pKsbrWgzi", 
        "currency": "EUR"
    }

    return (
      <>
        <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons           createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {            
                  amount: {
                    value: "13.99",
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            const name = details.payer.name.given_name;
            alert("Transaction completed by " + name);
          }}/>
        </PayPalScriptProvider>
        <SendMail/>
        </>
    )
}