const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: true
}));
app.use(express.json());
const stripe = require('stripe')('sk_test_iPKB77psH3YICxlLnZ7ykhEp')

app.post('/create-checkout-session', async (req, res) => {
  const payment_data = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: payment_data,
    mode: 'payment',
    success_url: 'http://https://naughty-mccarthy-84f156.netlify.app/orderSuccess',
    cancel_url: 'http://https://naughty-mccarthy-84f156.netlify.app/',
  });
  res.json({ id: session.id });
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));