import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
const ProceedToCheckout = ({ totalAmount }) => {
  const stripePromise = loadStripe('pk_test_51NXg2iSBI7zXRnwRAf83sGqLA58nX8Yw9jxH2GQpSfHyzWdo1QCwnbjfNBw86z7q6H0acD2Lcq7F6wLgXRNB1yrW004ohSjfFA'); // Replace with your Stripe public key

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: stripe.elements.getElement('card'),
        },
      });

      if (result.error) {
        console.error('Error processing payment:', result.error.message);
      } else {
        console.log('Payment successful:', result.paymentIntent.id);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Proceed to Checkout
      </Typography>
      <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Total Amount: ${totalAmount.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ display: 'block', margin: '0 auto' }}
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </div>
  );
};

export default ProceedToCheckout;
