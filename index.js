const express = require('express');
const app = express();
const port = process.env.PORT || 4242
const cors = require('cors');
app.use(cors({
  origin: true
}));
app.use(express.json());
const stripe = require('stripe')(process.env.SECRET_KEY)

app.get('/', (req, res) => {
  res.send('hello');
})
app.post('/create-checkout-session', async (req, res) => {
  const payment_data = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: payment_data,
    mode: 'payment',
    success_url: 'https://naughty-mccarthy-84f156.netlify.app/orderSuccess',
    cancel_url: 'https://naughty-mccarthy-84f156.netlify.app/',
  });
  res.json({ id: session.id });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

