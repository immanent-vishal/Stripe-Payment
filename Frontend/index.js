
var stripe = Stripe('pk_test_51Nq6nmSC2MKQ5asjtOs0vWKn86hRfJC5IONWH3rUskHPxYcKHwziw2LcCsvvFC3j2fP9IeeR5HSUlzPmoWPkFOGG00SgSwgR9y');
var elements = stripe.elements();

// Customize the style of the card Element
var style = {
  base: {
    fontSize: '16px',
    color: '#32325d',
  },
};

// Create an instance of the card Element
var card = elements.create('card', { style: style });

// Add an instance of the card Element into the `card-element` div
card.mount('#card-element');
var form = document.getElementById('payment-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createPaymentMethod({
    type: 'card',
    card: card,
  }).then(function(result) {
    if (result.error) {
      // Display error message to user
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Payment method created successfully, send to server
      fetch('http://localhost:8585/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_method_id: result.paymentMethod.id }),
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        // Handle server response (success or failure)
        console.log(data);
      });
    }
  });
});
