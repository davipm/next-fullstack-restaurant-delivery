import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

function AddressForm() {
  return (
    <address>
      <h3 className="mb-3">Address</h3>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address;
          }
        }}
      />
    </address>
  );
}

export default AddressForm;
