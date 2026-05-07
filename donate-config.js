// Shared donate config used by both the main site (app.jsx) and the
// embeddable widget (embed.html). Single source of truth for amount tiers
// and Stripe Payment Link URLs.
window.DONATE_CONFIG = {
  LADDER: [
    { amt: 35,   desc: "One hour of investigation research" },
    { amt: 65,   desc: "Funds a Freedom of Information request" },
    { amt: 265,  desc: "One day of video production" },
    { amt: 550,  desc: "Private security on one investigation day" },
    { amt: 1500, desc: "A complete interstate investigation trip" },
  ],
  STRIPE_LINKS: {
    oneTime: {
      AUD: {
        35:     "https://buy.stripe.com/5kQ28qgVo8OTfv55FCbV60k",
        65:     "https://buy.stripe.com/00wdR89sWe9d96H2tqbV60l",
        265:    "https://buy.stripe.com/6oUaEWax06GL82D1pmbV60m",
        550:    "https://buy.stripe.com/5kQfZgeNgghler16JGbV60n",
        1500:   "https://buy.stripe.com/6oUdR86gK3uzgz9gkgbV60o",
        custom: "https://buy.stripe.com/8x23cu8oS4yD0Ab0libV60E",
      },
      USD: {
        35:     "https://buy.stripe.com/4gM28qbB42qver1c40bV60p",
        65:     "https://buy.stripe.com/7sYdR820ue9dciT3xubV60q",
        265:    "https://buy.stripe.com/00w3cufRk0in5Uv6JGbV60r",
        550:    "https://buy.stripe.com/28EaEW34y6GLdmX8RObV60s",
        1500:   "https://buy.stripe.com/7sY00i34yfdhciT2tqbV60t",
        custom: "https://buy.stripe.com/dRmaEW20ufdh2Ij9VSbV60F",
      },
    },
    monthly: {
      AUD: {
        35:   "https://buy.stripe.com/00w6oGcF8c15ciTaZWbV60G",
        65:   "https://buy.stripe.com/8x200ieNg7KPer18RObV60H",
        265:  "https://buy.stripe.com/eVqdR87kO7KPaaL0libV60I",
        550:  "https://buy.stripe.com/eVq8wOeNgfdhdmX9VSbV60J",
        1500: "https://buy.stripe.com/00wdR8ax02qvciTgkgbV60K",
      },
      USD: {
        35:   "https://buy.stripe.com/5kQ4gyfRk4yDdmXfgcbV60L",
        65:   "https://buy.stripe.com/4gM7sKax0e9d0Ab9VSbV60M",
        265:  "https://buy.stripe.com/fZucN4bB4c153Mn3xubV60N",
        550:  "https://buy.stripe.com/8x2cN4bB4e9d82D2tqbV60O",
        1500: "https://buy.stripe.com/fZuaEW9sWaX1ciT9VSbV60P",
      },
    },
  },
};
