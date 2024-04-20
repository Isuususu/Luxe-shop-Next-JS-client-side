import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

export async function POST(req) {
  const { products } = await req.json();
  // const params = {
  //   submit_type: "pay",
  //   mode: "payment",
  //   payment_method_types: ["card"],
  //   billing_address_collection: "auto",
  //   shipping_options: [
  //     { shipping_rate: "shr_1ObRImF04NJVyUy68GWDYKI4" },
  //     { shipping_rate: "shr_1ObRJuF04NJVyUy6mhDy6VYh" },
  //   ],
  //   line_items: req.body.map((item) => {
  //     const img = item.image[0].asset._ref;
  //     const newImage = img
  //       .replace(
  //         "image-",
  //         "https://cdn.sanity.io/images/uvoyl5qm/production/"
  //       )
  //       .replace("-webp", ".webp");

  //     return {
  //       price_data: {
  //         currency: "gbp",
  //         product_data: {
  //           name: item.name,
  //           images: [newImage],
  //           // price: item.price,
  //         },
  //         unit_amount: item.price * 100,
  //       },
  //       adjustable_quantity: {
  //         enabled: true,
  //         minimum: 1,
  //       },
  //       quantity: item.quantity,
  //     };
  //   }),
  //   success_url: `/success/success`,
  //   cancel_url: `/?canceled=true`,
  //   automatic_tax: { enabled: true },
  // };
  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    shipping_options: [
      { shipping_rate: "shr_1ObRImF04NJVyUy68GWDYKI4" },
      { shipping_rate: "shr_1ObRJuF04NJVyUy6mhDy6VYh" },
    ],
    line_items: products.map((item) => {
      const img = item.image[0].asset._ref;
      const newImage = img
        .replace(
          "image-",
          "https://cdn.sanity.io/images/uvoyl5qm/production/"
        )
        .replace("-webp", ".webp");

      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
            images: [newImage],
            // price: item.price,
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    }),
    success_url: `/success/success`,
    cancel_url: `/?canceled=true`,
    automatic_tax: { enabled: true },
  });
  return NextResponse.json({ url: session.url });
}
