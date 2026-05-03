# Remove "Teller Consulting" branding from Stripe

The repo is now clean of `Teller Consulting` references, but the
Stripe Checkout page donors land on after clicking *Donate* still
shows the agency name. Those strings come from the Stripe **account
profile**, not from this codebase, so they have to be changed in the
Stripe Dashboard by an account owner.

Stripe account: `acct_1SYgcrCwirqouaTF` (display name: *Campaign
Consulting*).

## Manual checklist

- [ ] Log into [Stripe Dashboard](https://dashboard.stripe.com) →
      **Settings → Public details**.
- [ ] Change **Public business name** from
      `Teller Consulting Group` → `NDIS Exposed`.
      *(This is what shows as the tab title and "Pay securely at …"
      header on the Checkout page, and is what Link saves under.)*
- [ ] Change **Statement descriptor** to `NDIS EXPOSED`
      (max 22 chars, alphanumerics + spaces — appears on donors'
      bank statements).
- [ ] **Settings → Branding**: upload the NDIS Exposed logo and set
      brand colors so the Checkout page is visually on-brand.
- [ ] **Settings → Payments → Adaptive Pricing**: turn **OFF**.
      Adaptive Pricing was converting AUD prices to GBP for some
      donors. With it off, the Payment Link's currency (AUD or USD,
      whichever the donor selected on the site) is what they pay in.

## Side effects to be aware of

- This Stripe account also hosts the **Farmers Fightback Donation**
  product. The Public business name is account-wide, so flipping it
  to `NDIS Exposed` will also re-brand the Farmers Fightback Checkout
  page. If both campaigns need to keep distinct branding, create a
  second Stripe account for one of them (or use Stripe Connect).

## Verification

- [ ] After making the changes, run a full donate flow:
      `give.ndisexposed.com` → pick an amount → land on
      `buy.stripe.com/...`. Confirm the tab title, page header, and
      Link branding all read **NDIS Exposed**, and that the displayed
      currency matches what was selected on the site.
- [ ] `git grep -i "teller"` should return zero hits in this repo
      (excluding `node_modules`, `dist`, `.git`).
