// File generated from our OpenAPI spec

declare module 'stripe' {
  namespace Stripe {
    /**
     * The DeletedInvoice object.
     */
    interface DeletedInvoice {
      /**
       * Unique identifier for the object.
       */
      id: string;

      /**
       * String representing the object's type. Objects of the same type share the same value.
       */
      object: 'invoice';

      /**
       * Always true for a deleted object
       */
      deleted: true;
    }

    /**
     * Invoices are statements of amounts owed by a customer, and are either
     * generated one-off, or generated periodically from a subscription.
     *
     * They contain [invoice items](https://stripe.com/docs/api#invoiceitems), and proration adjustments
     * that may be caused by subscription upgrades/downgrades (if necessary).
     *
     * If your invoice is configured to be billed through automatic charges,
     * Stripe automatically finalizes your invoice and attempts payment. Note
     * that finalizing the invoice,
     * [when automatic](https://stripe.com/docs/invoicing/integration/automatic-advancement-collection), does
     * not happen immediately as the invoice is created. Stripe waits
     * until one hour after the last webhook was successfully sent (or the last
     * webhook timed out after failing). If you (and the platforms you may have
     * connected to) have no webhooks configured, Stripe waits one hour after
     * creation to finalize the invoice.
     *
     * If your invoice is configured to be billed by sending an email, then based on your
     * [email settings](https://dashboard.stripe.com/account/billing/automatic),
     * Stripe will email the invoice to your customer and await payment. These
     * emails can contain a link to a hosted page to pay the invoice.
     *
     * Stripe applies any customer credit on the account before determining the
     * amount due for the invoice (i.e., the amount that will be actually
     * charged). If the amount due for the invoice is less than Stripe's [minimum allowed charge
     * per currency](https://docs.stripe.com/docs/currencies#minimum-and-maximum-charge-amounts), the
     * invoice is automatically marked paid, and we add the amount due to the
     * customer's credit balance which is applied to the next invoice.
     *
     * More details on the customer's credit balance are
     * [here](https://stripe.com/docs/billing/customer/balance).
     *
     * Related guide: [Send invoices to customers](https://stripe.com/docs/billing/invoices/sending)
     */
    interface Invoice {
      /**
       * Unique identifier for the object. For preview invoices created using the [create preview](https://stripe.com/docs/api/invoices/create_preview) endpoint, this id will be prefixed with `upcoming_in`.
       */
      id?: string;

      /**
       * String representing the object's type. Objects of the same type share the same value.
       */
      object: 'invoice';

      /**
       * The country of the business associated with this invoice, most often the business creating the invoice.
       */
      account_country: string | null;

      /**
       * The public name of the business associated with this invoice, most often the business creating the invoice.
       */
      account_name: string | null;

      /**
       * The account tax IDs associated with the invoice. Only editable when the invoice is a draft.
       */
      account_tax_ids: Array<
        string | Stripe.TaxId | Stripe.DeletedTaxId
      > | null;

      /**
       * Final amount due at this time for this invoice. If the invoice's total is smaller than the minimum charge amount, for example, or if there is account credit that can be applied to the invoice, the `amount_due` may be 0. If there is a positive `starting_balance` for the invoice (the customer owes money), the `amount_due` will also take that into account. The charge that gets generated for the invoice will be for the amount specified in `amount_due`.
       */
      amount_due: number;

      /**
       * Amount that was overpaid on the invoice. The amount overpaid is credited to the customer's credit balance.
       */
      amount_overpaid: number;

      /**
       * The amount, in cents (or local equivalent), that was paid.
       */
      amount_paid: number;

      /**
       * The difference between amount_due and amount_paid, in cents (or local equivalent).
       */
      amount_remaining: number;

      /**
       * This is the sum of all the shipping amounts.
       */
      amount_shipping: number;

      /**
       * ID of the Connect Application that created the invoice.
       */
      application:
        | string
        | Stripe.Application
        | Stripe.DeletedApplication
        | null;

      /**
       * Number of payment attempts made for this invoice, from the perspective of the payment retry schedule. Any payment attempt counts as the first attempt, and subsequently only automatic retries increment the attempt count. In other words, manual payment attempts after the first attempt do not affect the retry schedule. If a failure is returned with a non-retryable return code, the invoice can no longer be retried unless a new payment method is obtained. Retries will continue to be scheduled, and attempt_count will continue to increment, but retries will only be executed if a new payment method is obtained.
       */
      attempt_count: number;

      /**
       * Whether an attempt has been made to pay the invoice. An invoice is not attempted until 1 hour after the `invoice.created` webhook, for example, so you might not want to display that invoice as unpaid to your users.
       */
      attempted: boolean;

      /**
       * Controls whether Stripe performs [automatic collection](https://stripe.com/docs/invoicing/integration/automatic-advancement-collection) of the invoice. If `false`, the invoice's state doesn't automatically advance without an explicit action.
       */
      auto_advance?: boolean;

      automatic_tax: Invoice.AutomaticTax;

      /**
       * The time when this invoice is currently scheduled to be automatically finalized. The field will be `null` if the invoice is not scheduled to finalize in the future. If the invoice is not in the draft state, this field will always be `null` - see `finalized_at` for the time when an already-finalized invoice was finalized.
       */
      automatically_finalizes_at: number | null;

      /**
       * Indicates the reason why the invoice was created.
       *
       * * `manual`: Unrelated to a subscription, for example, created via the invoice editor.
       * * `subscription`: No longer in use. Applies to subscriptions from before May 2018 where no distinction was made between updates, cycles, and thresholds.
       * * `subscription_create`: A new subscription was created.
       * * `subscription_cycle`: A subscription advanced into a new period.
       * * `subscription_threshold`: A subscription reached a billing threshold.
       * * `subscription_update`: A subscription was updated.
       * * `upcoming`: Reserved for simulated invoices, per the upcoming invoice endpoint.
       */
      billing_reason: Invoice.BillingReason | null;

      /**
       * Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this invoice using the default source attached to the customer. When sending an invoice, Stripe will email this invoice to the customer with payment instructions.
       */
      collection_method: Invoice.CollectionMethod;

      /**
       * The confirmation secret associated with this invoice. Currently, this contains the client_secret of the PaymentIntent that Stripe creates during invoice finalization.
       */
      confirmation_secret?: Invoice.ConfirmationSecret | null;

      /**
       * Time at which the object was created. Measured in seconds since the Unix epoch.
       */
      created: number;

      /**
       * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
       */
      currency: string;

      /**
       * Custom fields displayed on the invoice.
       */
      custom_fields: Array<Invoice.CustomField> | null;

      /**
       * The ID of the customer who will be billed.
       */
      customer: string | Stripe.Customer | Stripe.DeletedCustomer | null;

      /**
       * The customer's address. Until the invoice is finalized, this field will equal `customer.address`. Once the invoice is finalized, this field will no longer be updated.
       */
      customer_address: Stripe.Address | null;

      /**
       * The customer's email. Until the invoice is finalized, this field will equal `customer.email`. Once the invoice is finalized, this field will no longer be updated.
       */
      customer_email: string | null;

      /**
       * The customer's name. Until the invoice is finalized, this field will equal `customer.name`. Once the invoice is finalized, this field will no longer be updated.
       */
      customer_name: string | null;

      /**
       * The customer's phone number. Until the invoice is finalized, this field will equal `customer.phone`. Once the invoice is finalized, this field will no longer be updated.
       */
      customer_phone: string | null;

      /**
       * The customer's shipping information. Until the invoice is finalized, this field will equal `customer.shipping`. Once the invoice is finalized, this field will no longer be updated.
       */
      customer_shipping: Invoice.CustomerShipping | null;

      /**
       * The customer's tax exempt status. Until the invoice is finalized, this field will equal `customer.tax_exempt`. Once the invoice is finalized, this field will no longer be updated.
       */
      customer_tax_exempt: Invoice.CustomerTaxExempt | null;

      /**
       * The customer's tax IDs. Until the invoice is finalized, this field will contain the same tax IDs as `customer.tax_ids`. Once the invoice is finalized, this field will no longer be updated.
       */
      customer_tax_ids?: Array<Invoice.CustomerTaxId> | null;

      /**
       * ID of the default payment method for the invoice. It must belong to the customer associated with the invoice. If not set, defaults to the subscription's default payment method, if any, or to the default payment method in the customer's invoice settings.
       */
      default_payment_method: string | Stripe.PaymentMethod | null;

      /**
       * ID of the default payment source for the invoice. It must belong to the customer associated with the invoice and be in a chargeable state. If not set, defaults to the subscription's default source, if any, or to the customer's default source.
       */
      default_source: string | Stripe.CustomerSource | null;

      /**
       * The tax rates applied to this invoice, if any.
       */
      default_tax_rates: Array<Stripe.TaxRate>;

      /**
       * Always true for a deleted object
       */
      deleted?: void;

      /**
       * An arbitrary string attached to the object. Often useful for displaying to users. Referenced as 'memo' in the Dashboard.
       */
      description: string | null;

      /**
       * The discounts applied to the invoice. Line item discounts are applied before invoice discounts. Use `expand[]=discounts` to expand each discount.
       */
      discounts: Array<string | Stripe.Discount | Stripe.DeletedDiscount>;

      /**
       * The date on which payment for this invoice is due. This value will be `null` for invoices where `collection_method=charge_automatically`.
       */
      due_date: number | null;

      /**
       * The date when this invoice is in effect. Same as `finalized_at` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the invoice PDF and receipt.
       */
      effective_at: number | null;

      /**
       * Ending customer balance after the invoice is finalized. Invoices are finalized approximately an hour after successful webhook delivery or when payment collection is attempted for the invoice. If the invoice has not been finalized yet, this will be null.
       */
      ending_balance: number | null;

      /**
       * Footer displayed on the invoice.
       */
      footer: string | null;

      /**
       * Details of the invoice that was cloned. See the [revision documentation](https://stripe.com/docs/invoicing/invoice-revisions) for more details.
       */
      from_invoice: Invoice.FromInvoice | null;

      /**
       * The URL for the hosted invoice page, which allows customers to view and pay an invoice. If the invoice has not been finalized yet, this will be null.
       */
      hosted_invoice_url?: string | null;

      /**
       * The link to download the PDF for the invoice. If the invoice has not been finalized yet, this will be null.
       */
      invoice_pdf?: string | null;

      issuer: Invoice.Issuer;

      /**
       * The error encountered during the previous attempt to finalize the invoice. This field is cleared when the invoice is successfully finalized.
       */
      last_finalization_error: Invoice.LastFinalizationError | null;

      /**
       * The ID of the most recent non-draft revision of this invoice
       */
      latest_revision: string | Stripe.Invoice | null;

      /**
       * The individual line items that make up the invoice. `lines` is sorted as follows: (1) pending invoice items (including prorations) in reverse chronological order, (2) subscription items in reverse chronological order, and (3) invoice items added after invoice creation in chronological order.
       */
      lines: ApiList<Stripe.InvoiceLineItem>;

      /**
       * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
       */
      livemode: boolean;

      /**
       * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
       */
      metadata: Stripe.Metadata | null;

      /**
       * The time at which payment will next be attempted. This value will be `null` for invoices where `collection_method=send_invoice`.
       */
      next_payment_attempt: number | null;

      /**
       * A unique, identifying string that appears on emails sent to the customer for this invoice. This starts with the customer's unique invoice_prefix if it is specified.
       */
      number: string | null;

      /**
       * The account (if any) for which the funds of the invoice payment are intended. If set, the invoice will be presented with the branding and support information of the specified account. See the [Invoices with Connect](https://stripe.com/docs/billing/invoices/connect) documentation for details.
       */
      on_behalf_of: string | Stripe.Account | null;

      /**
       * The parent that generated this invoice
       */
      parent: Invoice.Parent | null;

      payment_settings: Invoice.PaymentSettings;

      /**
       * Payments for this invoice
       */
      payments?: ApiList<Stripe.InvoicePayment>;

      /**
       * End of the usage period during which invoice items were added to this invoice. This looks back one period for a subscription invoice. Use the [line item period](https://docs.stripe.com/api/invoices/line_item#invoice_line_item_object-period) to get the service period for each price.
       */
      period_end: number;

      /**
       * Start of the usage period during which invoice items were added to this invoice. This looks back one period for a subscription invoice. Use the [line item period](https://docs.stripe.com/api/invoices/line_item#invoice_line_item_object-period) to get the service period for each price.
       */
      period_start: number;

      /**
       * Total amount of all post-payment credit notes issued for this invoice.
       */
      post_payment_credit_notes_amount: number;

      /**
       * Total amount of all pre-payment credit notes issued for this invoice.
       */
      pre_payment_credit_notes_amount: number;

      /**
       * This is the transaction number that appears on email receipts sent for this invoice.
       */
      receipt_number: string | null;

      /**
       * The rendering-related settings that control how the invoice is displayed on customer-facing surfaces such as PDF and Hosted Invoice Page.
       */
      rendering: Invoice.Rendering | null;

      /**
       * The details of the cost of shipping, including the ShippingRate applied on the invoice.
       */
      shipping_cost: Invoice.ShippingCost | null;

      /**
       * Shipping details for the invoice. The Invoice PDF will use the `shipping_details` value if it is set, otherwise the PDF will render the shipping address from the customer.
       */
      shipping_details: Invoice.ShippingDetails | null;

      /**
       * Starting customer balance before the invoice is finalized. If the invoice has not been finalized yet, this will be the current customer balance. For revision invoices, this also includes any customer balance that was applied to the original invoice.
       */
      starting_balance: number;

      /**
       * Extra information about an invoice for the customer's credit card statement.
       */
      statement_descriptor: string | null;

      /**
       * The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or `void`. [Learn more](https://stripe.com/docs/billing/invoices/workflow#workflow-overview)
       */
      status: Invoice.Status | null;

      status_transitions: Invoice.StatusTransitions;

      /**
       * Total of all subscriptions, invoice items, and prorations on the invoice before any invoice level discount or exclusive tax is applied. Item discounts are already incorporated
       */
      subtotal: number;

      /**
       * The integer amount in cents (or local equivalent) representing the subtotal of the invoice before any invoice level discount or tax is applied. Item discounts are already incorporated
       */
      subtotal_excluding_tax: number | null;

      /**
       * ID of the test clock this invoice belongs to.
       */
      test_clock: string | Stripe.TestHelpers.TestClock | null;

      threshold_reason?: Invoice.ThresholdReason;

      /**
       * Total after discounts and taxes.
       */
      total: number;

      /**
       * The aggregate amounts calculated per discount across all line items.
       */
      total_discount_amounts: Array<Invoice.TotalDiscountAmount> | null;

      /**
       * The integer amount in cents (or local equivalent) representing the total amount of the invoice including all discounts but excluding all tax.
       */
      total_excluding_tax: number | null;

      /**
       * Contains pretax credit amounts (ex: discount, credit grants, etc) that apply to this invoice. This is a combined list of total_pretax_credit_amounts across all invoice line items.
       */
      total_pretax_credit_amounts: Array<
        Invoice.TotalPretaxCreditAmount
      > | null;

      /**
       * The aggregate tax information of all line items.
       */
      total_taxes: Array<Invoice.TotalTax> | null;

      /**
       * Invoices are automatically paid or sent 1 hour after webhooks are delivered, or until all webhook delivery attempts have [been exhausted](https://stripe.com/docs/billing/webhooks#understand). This field tracks the time when webhooks for this invoice were successfully delivered. If the invoice had no webhooks to deliver, this will be set while the invoice is being created.
       */
      webhooks_delivered_at: number | null;
    }

    namespace Invoice {
      interface AutomaticTax {
        /**
         * If Stripe disabled automatic tax, this enum describes why.
         */
        disabled_reason: AutomaticTax.DisabledReason | null;

        /**
         * Whether Stripe automatically computes tax on this invoice. Note that incompatible invoice items (invoice items with manually specified [tax rates](https://stripe.com/docs/api/tax_rates), negative amounts, or `tax_behavior=unspecified`) cannot be added to automatic tax invoices.
         */
        enabled: boolean;

        /**
         * The account that's liable for tax. If set, the business address and tax registrations required to perform the tax calculation are loaded from this account. The tax transaction is returned in the report of the connected account.
         */
        liability: AutomaticTax.Liability | null;

        /**
         * The tax provider powering automatic tax.
         */
        provider: string | null;

        /**
         * The status of the most recent automated tax calculation for this invoice.
         */
        status: AutomaticTax.Status | null;
      }

      namespace AutomaticTax {
        type DisabledReason =
          | 'finalization_requires_location_inputs'
          | 'finalization_system_error';

        interface Liability {
          /**
           * The connected account being referenced when `type` is `account`.
           */
          account?: string | Stripe.Account;

          /**
           * Type of the account referenced.
           */
          type: Liability.Type;
        }

        namespace Liability {
          type Type = 'account' | 'self';
        }

        type Status = 'complete' | 'failed' | 'requires_location_inputs';
      }

      type BillingReason =
        | 'automatic_pending_invoice_item_invoice'
        | 'manual'
        | 'quote_accept'
        | 'subscription'
        | 'subscription_create'
        | 'subscription_cycle'
        | 'subscription_threshold'
        | 'subscription_update'
        | 'upcoming';

      type CollectionMethod = 'charge_automatically' | 'send_invoice';

      interface ConfirmationSecret {
        /**
         * The client_secret of the payment that Stripe creates for the invoice after finalization.
         */
        client_secret: string;

        /**
         * The type of client_secret. Currently this is always payment_intent, referencing the default payment_intent that Stripe creates during invoice finalization
         */
        type: string;
      }

      interface CustomerShipping {
        address?: Stripe.Address;

        /**
         * The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.
         */
        carrier?: string | null;

        /**
         * Recipient name.
         */
        name?: string;

        /**
         * Recipient phone (including extension).
         */
        phone?: string | null;

        /**
         * The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.
         */
        tracking_number?: string | null;
      }

      type CustomerTaxExempt = 'exempt' | 'none' | 'reverse';

      interface CustomerTaxId {
        /**
         * The type of the tax ID, one of `ad_nrt`, `ar_cuit`, `eu_vat`, `bo_tin`, `br_cnpj`, `br_cpf`, `cn_tin`, `co_nit`, `cr_tin`, `do_rcn`, `ec_ruc`, `eu_oss_vat`, `hr_oib`, `pe_ruc`, `ro_tin`, `rs_pib`, `sv_nit`, `uy_ruc`, `ve_rif`, `vn_tin`, `gb_vat`, `nz_gst`, `au_abn`, `au_arn`, `in_gst`, `no_vat`, `no_voec`, `za_vat`, `ch_vat`, `mx_rfc`, `sg_uen`, `ru_inn`, `ru_kpp`, `ca_bn`, `hk_br`, `es_cif`, `tw_vat`, `th_vat`, `jp_cn`, `jp_rn`, `jp_trn`, `li_uid`, `li_vat`, `my_itn`, `us_ein`, `kr_brn`, `ca_qst`, `ca_gst_hst`, `ca_pst_bc`, `ca_pst_mb`, `ca_pst_sk`, `my_sst`, `sg_gst`, `ae_trn`, `cl_tin`, `sa_vat`, `id_npwp`, `my_frp`, `il_vat`, `ge_vat`, `ua_vat`, `is_vat`, `bg_uic`, `hu_tin`, `si_tin`, `ke_pin`, `tr_tin`, `eg_tin`, `ph_tin`, `al_tin`, `bh_vat`, `kz_bin`, `ng_tin`, `om_vat`, `de_stn`, `ch_uid`, `tz_vat`, `uz_vat`, `uz_tin`, `md_vat`, `ma_vat`, `by_tin`, `ao_tin`, `bs_tin`, `bb_tin`, `cd_nif`, `mr_nif`, `me_pib`, `zw_tin`, `ba_tin`, `gn_nif`, `mk_vat`, `sr_fin`, `sn_ninea`, `am_tin`, `np_pan`, `tj_tin`, `ug_tin`, `zm_tin`, `kh_tin`, `aw_tin`, `az_tin`, `bd_bin`, `bj_ifu`, `et_tin`, `kg_tin`, `la_tin`, `cm_niu`, `cv_nif`, `bf_ifu`, or `unknown`
         */
        type: CustomerTaxId.Type;

        /**
         * The value of the tax ID.
         */
        value: string | null;
      }

      namespace CustomerTaxId {
        type Type =
          | 'ad_nrt'
          | 'ae_trn'
          | 'al_tin'
          | 'am_tin'
          | 'ao_tin'
          | 'ar_cuit'
          | 'au_abn'
          | 'au_arn'
          | 'aw_tin'
          | 'az_tin'
          | 'ba_tin'
          | 'bb_tin'
          | 'bd_bin'
          | 'bf_ifu'
          | 'bg_uic'
          | 'bh_vat'
          | 'bj_ifu'
          | 'bo_tin'
          | 'br_cnpj'
          | 'br_cpf'
          | 'bs_tin'
          | 'by_tin'
          | 'ca_bn'
          | 'ca_gst_hst'
          | 'ca_pst_bc'
          | 'ca_pst_mb'
          | 'ca_pst_sk'
          | 'ca_qst'
          | 'cd_nif'
          | 'ch_uid'
          | 'ch_vat'
          | 'cl_tin'
          | 'cm_niu'
          | 'cn_tin'
          | 'co_nit'
          | 'cr_tin'
          | 'cv_nif'
          | 'de_stn'
          | 'do_rcn'
          | 'ec_ruc'
          | 'eg_tin'
          | 'es_cif'
          | 'et_tin'
          | 'eu_oss_vat'
          | 'eu_vat'
          | 'gb_vat'
          | 'ge_vat'
          | 'gn_nif'
          | 'hk_br'
          | 'hr_oib'
          | 'hu_tin'
          | 'id_npwp'
          | 'il_vat'
          | 'in_gst'
          | 'is_vat'
          | 'jp_cn'
          | 'jp_rn'
          | 'jp_trn'
          | 'ke_pin'
          | 'kg_tin'
          | 'kh_tin'
          | 'kr_brn'
          | 'kz_bin'
          | 'la_tin'
          | 'li_uid'
          | 'li_vat'
          | 'ma_vat'
          | 'md_vat'
          | 'me_pib'
          | 'mk_vat'
          | 'mr_nif'
          | 'mx_rfc'
          | 'my_frp'
          | 'my_itn'
          | 'my_sst'
          | 'ng_tin'
          | 'no_vat'
          | 'no_voec'
          | 'np_pan'
          | 'nz_gst'
          | 'om_vat'
          | 'pe_ruc'
          | 'ph_tin'
          | 'ro_tin'
          | 'rs_pib'
          | 'ru_inn'
          | 'ru_kpp'
          | 'sa_vat'
          | 'sg_gst'
          | 'sg_uen'
          | 'si_tin'
          | 'sn_ninea'
          | 'sr_fin'
          | 'sv_nit'
          | 'th_vat'
          | 'tj_tin'
          | 'tr_tin'
          | 'tw_vat'
          | 'tz_vat'
          | 'ua_vat'
          | 'ug_tin'
          | 'unknown'
          | 'us_ein'
          | 'uy_ruc'
          | 'uz_tin'
          | 'uz_vat'
          | 've_rif'
          | 'vn_tin'
          | 'za_vat'
          | 'zm_tin'
          | 'zw_tin';
      }

      interface CustomField {
        /**
         * The name of the custom field.
         */
        name: string;

        /**
         * The value of the custom field.
         */
        value: string;
      }

      interface FromInvoice {
        /**
         * The relation between this invoice and the cloned invoice
         */
        action: string;

        /**
         * The invoice that was cloned.
         */
        invoice: string | Stripe.Invoice;
      }

      interface Issuer {
        /**
         * The connected account being referenced when `type` is `account`.
         */
        account?: string | Stripe.Account;

        /**
         * Type of the account referenced.
         */
        type: Issuer.Type;
      }

      namespace Issuer {
        type Type = 'account' | 'self';
      }

      interface LastFinalizationError {
        /**
         * For card errors resulting from a card issuer decline, a short string indicating [how to proceed with an error](https://stripe.com/docs/declines#retrying-issuer-declines) if they provide one.
         */
        advice_code?: string;

        /**
         * For card errors, the ID of the failed charge.
         */
        charge?: string;

        /**
         * For some errors that could be handled programmatically, a short string indicating the [error code](https://stripe.com/docs/error-codes) reported.
         */
        code?: LastFinalizationError.Code;

        /**
         * For card errors resulting from a card issuer decline, a short string indicating the [card issuer's reason for the decline](https://stripe.com/docs/declines#issuer-declines) if they provide one.
         */
        decline_code?: string;

        /**
         * A URL to more information about the [error code](https://stripe.com/docs/error-codes) reported.
         */
        doc_url?: string;

        /**
         * A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
         */
        message?: string;

        /**
         * For card errors resulting from a card issuer decline, a 2 digit code which indicates the advice given to merchant by the card network on how to proceed with an error.
         */
        network_advice_code?: string;

        /**
         * For card errors resulting from a card issuer decline, a brand specific 2, 3, or 4 digit code which indicates the reason the authorization failed.
         */
        network_decline_code?: string;

        /**
         * If the error is parameter-specific, the parameter related to the error. For example, you can use this to display a message near the correct form field.
         */
        param?: string;

        /**
         * A PaymentIntent guides you through the process of collecting a payment from your customer.
         * We recommend that you create exactly one PaymentIntent for each order or
         * customer session in your system. You can reference the PaymentIntent later to
         * see the history of payment attempts for a particular session.
         *
         * A PaymentIntent transitions through
         * [multiple statuses](https://stripe.com/docs/payments/intents#intent-statuses)
         * throughout its lifetime as it interfaces with Stripe.js to perform
         * authentication flows and ultimately creates at most one successful charge.
         *
         * Related guide: [Payment Intents API](https://stripe.com/docs/payments/payment-intents)
         */
        payment_intent?: Stripe.PaymentIntent;

        /**
         * PaymentMethod objects represent your customer's payment instruments.
         * You can use them with [PaymentIntents](https://stripe.com/docs/payments/payment-intents) to collect payments or save them to
         * Customer objects to store instrument details for future payments.
         *
         * Related guides: [Payment Methods](https://stripe.com/docs/payments/payment-methods) and [More Payment Scenarios](https://stripe.com/docs/payments/more-payment-scenarios).
         */
        payment_method?: Stripe.PaymentMethod;

        /**
         * If the error is specific to the type of payment method, the payment method type that had a problem. This field is only populated for invoice-related errors.
         */
        payment_method_type?: string;

        /**
         * A URL to the request log entry in your dashboard.
         */
        request_log_url?: string;

        /**
         * A SetupIntent guides you through the process of setting up and saving a customer's payment credentials for future payments.
         * For example, you can use a SetupIntent to set up and save your customer's card without immediately collecting a payment.
         * Later, you can use [PaymentIntents](https://stripe.com/docs/api#payment_intents) to drive the payment flow.
         *
         * Create a SetupIntent when you're ready to collect your customer's payment credentials.
         * Don't maintain long-lived, unconfirmed SetupIntents because they might not be valid.
         * The SetupIntent transitions through multiple [statuses](https://docs.stripe.com/payments/intents#intent-statuses) as it guides
         * you through the setup process.
         *
         * Successful SetupIntents result in payment credentials that are optimized for future payments.
         * For example, cardholders in [certain regions](https://stripe.com/guides/strong-customer-authentication) might need to be run through
         * [Strong Customer Authentication](https://docs.stripe.com/strong-customer-authentication) during payment method collection
         * to streamline later [off-session payments](https://docs.stripe.com/payments/setup-intents).
         * If you use the SetupIntent with a [Customer](https://stripe.com/docs/api#setup_intent_object-customer),
         * it automatically attaches the resulting payment method to that Customer after successful setup.
         * We recommend using SetupIntents or [setup_future_usage](https://stripe.com/docs/api#payment_intent_object-setup_future_usage) on
         * PaymentIntents to save payment methods to prevent saving invalid or unoptimized payment methods.
         *
         * By using SetupIntents, you can reduce friction for your customers, even as regulations change over time.
         *
         * Related guide: [Setup Intents API](https://docs.stripe.com/payments/setup-intents)
         */
        setup_intent?: Stripe.SetupIntent;

        source?: Stripe.CustomerSource;

        /**
         * The type of error returned. One of `api_error`, `card_error`, `idempotency_error`, or `invalid_request_error`
         */
        type: LastFinalizationError.Type;
      }

      namespace LastFinalizationError {
        type Code =
          | 'account_closed'
          | 'account_country_invalid_address'
          | 'account_error_country_change_requires_additional_steps'
          | 'account_information_mismatch'
          | 'account_invalid'
          | 'account_number_invalid'
          | 'acss_debit_session_incomplete'
          | 'alipay_upgrade_required'
          | 'amount_too_large'
          | 'amount_too_small'
          | 'api_key_expired'
          | 'application_fees_not_allowed'
          | 'authentication_required'
          | 'balance_insufficient'
          | 'balance_invalid_parameter'
          | 'bank_account_bad_routing_numbers'
          | 'bank_account_declined'
          | 'bank_account_exists'
          | 'bank_account_restricted'
          | 'bank_account_unusable'
          | 'bank_account_unverified'
          | 'bank_account_verification_failed'
          | 'billing_invalid_mandate'
          | 'bitcoin_upgrade_required'
          | 'capture_charge_authorization_expired'
          | 'capture_unauthorized_payment'
          | 'card_decline_rate_limit_exceeded'
          | 'card_declined'
          | 'cardholder_phone_number_required'
          | 'charge_already_captured'
          | 'charge_already_refunded'
          | 'charge_disputed'
          | 'charge_exceeds_source_limit'
          | 'charge_exceeds_transaction_limit'
          | 'charge_expired_for_capture'
          | 'charge_invalid_parameter'
          | 'charge_not_refundable'
          | 'clearing_code_unsupported'
          | 'country_code_invalid'
          | 'country_unsupported'
          | 'coupon_expired'
          | 'customer_max_payment_methods'
          | 'customer_max_subscriptions'
          | 'customer_tax_location_invalid'
          | 'debit_not_authorized'
          | 'email_invalid'
          | 'expired_card'
          | 'financial_connections_account_inactive'
          | 'financial_connections_no_successful_transaction_refresh'
          | 'forwarding_api_inactive'
          | 'forwarding_api_invalid_parameter'
          | 'forwarding_api_retryable_upstream_error'
          | 'forwarding_api_upstream_connection_error'
          | 'forwarding_api_upstream_connection_timeout'
          | 'forwarding_api_upstream_error'
          | 'idempotency_key_in_use'
          | 'incorrect_address'
          | 'incorrect_cvc'
          | 'incorrect_number'
          | 'incorrect_zip'
          | 'instant_payouts_config_disabled'
          | 'instant_payouts_currency_disabled'
          | 'instant_payouts_limit_exceeded'
          | 'instant_payouts_unsupported'
          | 'insufficient_funds'
          | 'intent_invalid_state'
          | 'intent_verification_method_missing'
          | 'invalid_card_type'
          | 'invalid_characters'
          | 'invalid_charge_amount'
          | 'invalid_cvc'
          | 'invalid_expiry_month'
          | 'invalid_expiry_year'
          | 'invalid_mandate_reference_prefix_format'
          | 'invalid_number'
          | 'invalid_source_usage'
          | 'invalid_tax_location'
          | 'invoice_no_customer_line_items'
          | 'invoice_no_payment_method_types'
          | 'invoice_no_subscription_line_items'
          | 'invoice_not_editable'
          | 'invoice_on_behalf_of_not_editable'
          | 'invoice_payment_intent_requires_action'
          | 'invoice_upcoming_none'
          | 'livemode_mismatch'
          | 'lock_timeout'
          | 'missing'
          | 'no_account'
          | 'not_allowed_on_standard_account'
          | 'out_of_inventory'
          | 'ownership_declaration_not_allowed'
          | 'parameter_invalid_empty'
          | 'parameter_invalid_integer'
          | 'parameter_invalid_string_blank'
          | 'parameter_invalid_string_empty'
          | 'parameter_missing'
          | 'parameter_unknown'
          | 'parameters_exclusive'
          | 'payment_intent_action_required'
          | 'payment_intent_authentication_failure'
          | 'payment_intent_incompatible_payment_method'
          | 'payment_intent_invalid_parameter'
          | 'payment_intent_konbini_rejected_confirmation_number'
          | 'payment_intent_mandate_invalid'
          | 'payment_intent_payment_attempt_expired'
          | 'payment_intent_payment_attempt_failed'
          | 'payment_intent_unexpected_state'
          | 'payment_method_bank_account_already_verified'
          | 'payment_method_bank_account_blocked'
          | 'payment_method_billing_details_address_missing'
          | 'payment_method_configuration_failures'
          | 'payment_method_currency_mismatch'
          | 'payment_method_customer_decline'
          | 'payment_method_invalid_parameter'
          | 'payment_method_invalid_parameter_testmode'
          | 'payment_method_microdeposit_failed'
          | 'payment_method_microdeposit_verification_amounts_invalid'
          | 'payment_method_microdeposit_verification_amounts_mismatch'
          | 'payment_method_microdeposit_verification_attempts_exceeded'
          | 'payment_method_microdeposit_verification_descriptor_code_mismatch'
          | 'payment_method_microdeposit_verification_timeout'
          | 'payment_method_not_available'
          | 'payment_method_provider_decline'
          | 'payment_method_provider_timeout'
          | 'payment_method_unactivated'
          | 'payment_method_unexpected_state'
          | 'payment_method_unsupported_type'
          | 'payout_reconciliation_not_ready'
          | 'payouts_limit_exceeded'
          | 'payouts_not_allowed'
          | 'platform_account_required'
          | 'platform_api_key_expired'
          | 'postal_code_invalid'
          | 'processing_error'
          | 'product_inactive'
          | 'progressive_onboarding_limit_exceeded'
          | 'rate_limit'
          | 'refer_to_customer'
          | 'refund_disputed_payment'
          | 'resource_already_exists'
          | 'resource_missing'
          | 'return_intent_already_processed'
          | 'routing_number_invalid'
          | 'secret_key_required'
          | 'sepa_unsupported_account'
          | 'setup_attempt_failed'
          | 'setup_intent_authentication_failure'
          | 'setup_intent_invalid_parameter'
          | 'setup_intent_mandate_invalid'
          | 'setup_intent_mobile_wallet_unsupported'
          | 'setup_intent_setup_attempt_expired'
          | 'setup_intent_unexpected_state'
          | 'shipping_address_invalid'
          | 'shipping_calculation_failed'
          | 'sku_inactive'
          | 'state_unsupported'
          | 'status_transition_invalid'
          | 'stripe_tax_inactive'
          | 'tax_id_invalid'
          | 'tax_id_prohibited'
          | 'taxes_calculation_failed'
          | 'terminal_location_country_unsupported'
          | 'terminal_reader_busy'
          | 'terminal_reader_hardware_fault'
          | 'terminal_reader_invalid_location_for_activation'
          | 'terminal_reader_invalid_location_for_payment'
          | 'terminal_reader_offline'
          | 'terminal_reader_timeout'
          | 'testmode_charges_only'
          | 'tls_version_unsupported'
          | 'token_already_used'
          | 'token_card_network_invalid'
          | 'token_in_use'
          | 'transfer_source_balance_parameters_mismatch'
          | 'transfers_not_allowed'
          | 'url_invalid';

        type Type =
          | 'api_error'
          | 'card_error'
          | 'idempotency_error'
          | 'invalid_request_error';
      }

      interface Parent {
        /**
         * Details about the quote that generated this invoice
         */
        quote_details: Parent.QuoteDetails | null;

        /**
         * Details about the subscription that generated this invoice
         */
        subscription_details: Parent.SubscriptionDetails | null;

        /**
         * The type of parent that generated this invoice
         */
        type: Parent.Type;
      }

      namespace Parent {
        interface QuoteDetails {
          /**
           * The quote that generated this invoice
           */
          quote: string;
        }

        interface SubscriptionDetails {
          /**
           * Set of [key-value pairs](https://stripe.com/docs/api/metadata) defined as subscription metadata when an invoice is created. Becomes an immutable snapshot of the subscription metadata at the time of invoice finalization.
           *  *Note: This attribute is populated only for invoices created on or after June 29, 2023.*
           */
          metadata: Stripe.Metadata | null;

          /**
           * The subscription that generated this invoice
           */
          subscription: string | Stripe.Subscription;

          /**
           * Only set for upcoming invoices that preview prorations. The time used to calculate prorations.
           */
          subscription_proration_date?: number;
        }

        type Type = 'quote_details' | 'subscription_details';
      }

      interface PaymentSettings {
        /**
         * ID of the mandate to be used for this invoice. It must correspond to the payment method used to pay the invoice, including the invoice's default_payment_method or default_source, if set.
         */
        default_mandate: string | null;

        /**
         * Payment-method-specific configuration to provide to the invoice's PaymentIntent.
         */
        payment_method_options: PaymentSettings.PaymentMethodOptions | null;

        /**
         * The list of payment method types (e.g. card) to provide to the invoice's PaymentIntent. If not set, Stripe attempts to automatically determine the types to use by looking at the invoice's default payment method, the subscription's default payment method, the customer's default payment method, and your [invoice template settings](https://dashboard.stripe.com/settings/billing/invoice).
         */
        payment_method_types: Array<PaymentSettings.PaymentMethodType> | null;
      }

      namespace PaymentSettings {
        interface PaymentMethodOptions {
          /**
           * If paying by `acss_debit`, this sub-hash contains details about the Canadian pre-authorized debit payment method options to pass to the invoice's PaymentIntent.
           */
          acss_debit: PaymentMethodOptions.AcssDebit | null;

          /**
           * If paying by `bancontact`, this sub-hash contains details about the Bancontact payment method options to pass to the invoice's PaymentIntent.
           */
          bancontact: PaymentMethodOptions.Bancontact | null;

          /**
           * If paying by `card`, this sub-hash contains details about the Card payment method options to pass to the invoice's PaymentIntent.
           */
          card: PaymentMethodOptions.Card | null;

          /**
           * If paying by `customer_balance`, this sub-hash contains details about the Bank transfer payment method options to pass to the invoice's PaymentIntent.
           */
          customer_balance: PaymentMethodOptions.CustomerBalance | null;

          /**
           * If paying by `konbini`, this sub-hash contains details about the Konbini payment method options to pass to the invoice's PaymentIntent.
           */
          konbini: PaymentMethodOptions.Konbini | null;

          /**
           * If paying by `sepa_debit`, this sub-hash contains details about the SEPA Direct Debit payment method options to pass to the invoice's PaymentIntent.
           */
          sepa_debit: PaymentMethodOptions.SepaDebit | null;

          /**
           * If paying by `us_bank_account`, this sub-hash contains details about the ACH direct debit payment method options to pass to the invoice's PaymentIntent.
           */
          us_bank_account: PaymentMethodOptions.UsBankAccount | null;
        }

        namespace PaymentMethodOptions {
          interface AcssDebit {
            mandate_options?: AcssDebit.MandateOptions;

            /**
             * Bank account verification method.
             */
            verification_method?: AcssDebit.VerificationMethod;
          }

          namespace AcssDebit {
            interface MandateOptions {
              /**
               * Transaction type of the mandate.
               */
              transaction_type: MandateOptions.TransactionType | null;
            }

            namespace MandateOptions {
              type TransactionType = 'business' | 'personal';
            }

            type VerificationMethod = 'automatic' | 'instant' | 'microdeposits';
          }

          interface Bancontact {
            /**
             * Preferred language of the Bancontact authorization page that the customer is redirected to.
             */
            preferred_language: Bancontact.PreferredLanguage;
          }

          namespace Bancontact {
            type PreferredLanguage = 'de' | 'en' | 'fr' | 'nl';
          }

          interface Card {
            installments?: Card.Installments;

            /**
             * We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://stripe.com/docs/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Read our guide on [manually requesting 3D Secure](https://stripe.com/docs/payments/3d-secure/authentication-flow#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
             */
            request_three_d_secure: Card.RequestThreeDSecure | null;
          }

          namespace Card {
            interface Installments {
              /**
               * Whether Installments are enabled for this Invoice.
               */
              enabled: boolean | null;
            }

            type RequestThreeDSecure = 'any' | 'automatic' | 'challenge';
          }

          interface CustomerBalance {
            bank_transfer?: CustomerBalance.BankTransfer;

            /**
             * The funding method type to be used when there are not enough funds in the customer balance. Permitted values include: `bank_transfer`.
             */
            funding_type: 'bank_transfer' | null;
          }

          namespace CustomerBalance {
            interface BankTransfer {
              eu_bank_transfer?: BankTransfer.EuBankTransfer;

              /**
               * The bank transfer type that can be used for funding. Permitted values include: `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`, `mx_bank_transfer`, or `us_bank_transfer`.
               */
              type: string | null;
            }

            namespace BankTransfer {
              interface EuBankTransfer {
                /**
                 * The desired country code of the bank account information. Permitted values include: `BE`, `DE`, `ES`, `FR`, `IE`, or `NL`.
                 */
                country: EuBankTransfer.Country;
              }

              namespace EuBankTransfer {
                type Country = 'BE' | 'DE' | 'ES' | 'FR' | 'IE' | 'NL';
              }
            }
          }

          interface Konbini {}

          interface SepaDebit {}

          interface UsBankAccount {
            financial_connections?: UsBankAccount.FinancialConnections;

            /**
             * Bank account verification method.
             */
            verification_method?: UsBankAccount.VerificationMethod;
          }

          namespace UsBankAccount {
            interface FinancialConnections {
              filters?: FinancialConnections.Filters;

              /**
               * The list of permissions to request. The `payment_method` permission must be included.
               */
              permissions?: Array<FinancialConnections.Permission>;

              /**
               * Data features requested to be retrieved upon account creation.
               */
              prefetch: Array<FinancialConnections.Prefetch> | null;
            }

            namespace FinancialConnections {
              interface Filters {
                /**
                 * The account subcategories to use to filter for possible accounts to link. Valid subcategories are `checking` and `savings`.
                 */
                account_subcategories?: Array<Filters.AccountSubcategory>;
              }

              namespace Filters {
                type AccountSubcategory = 'checking' | 'savings';
              }

              type Permission =
                | 'balances'
                | 'ownership'
                | 'payment_method'
                | 'transactions';

              type Prefetch = 'balances' | 'ownership' | 'transactions';
            }

            type VerificationMethod = 'automatic' | 'instant' | 'microdeposits';
          }
        }

        type PaymentMethodType =
          | 'ach_credit_transfer'
          | 'ach_debit'
          | 'acss_debit'
          | 'affirm'
          | 'amazon_pay'
          | 'au_becs_debit'
          | 'bacs_debit'
          | 'bancontact'
          | 'boleto'
          | 'card'
          | 'cashapp'
          | 'crypto'
          | 'customer_balance'
          | 'eps'
          | 'fpx'
          | 'giropay'
          | 'grabpay'
          | 'ideal'
          | 'jp_credit_transfer'
          | 'kakao_pay'
          | 'klarna'
          | 'konbini'
          | 'kr_card'
          | 'link'
          | 'multibanco'
          | 'naver_pay'
          | 'nz_bank_account'
          | 'p24'
          | 'payco'
          | 'paynow'
          | 'paypal'
          | 'promptpay'
          | 'revolut_pay'
          | 'sepa_credit_transfer'
          | 'sepa_debit'
          | 'sofort'
          | 'swish'
          | 'us_bank_account'
          | 'wechat_pay';
      }

      interface Rendering {
        /**
         * How line-item prices and amounts will be displayed with respect to tax on invoice PDFs.
         */
        amount_tax_display: string | null;

        /**
         * Invoice pdf rendering options
         */
        pdf: Rendering.Pdf | null;

        /**
         * ID of the rendering template that the invoice is formatted by.
         */
        template: string | null;

        /**
         * Version of the rendering template that the invoice is using.
         */
        template_version: number | null;
      }

      namespace Rendering {
        interface Pdf {
          /**
           * Page size of invoice pdf. Options include a4, letter, and auto. If set to auto, page size will be switched to a4 or letter based on customer locale.
           */
          page_size: Pdf.PageSize | null;
        }

        namespace Pdf {
          type PageSize = 'a4' | 'auto' | 'letter';
        }
      }

      interface ShippingCost {
        /**
         * Total shipping cost before any taxes are applied.
         */
        amount_subtotal: number;

        /**
         * Total tax amount applied due to shipping costs. If no tax was applied, defaults to 0.
         */
        amount_tax: number;

        /**
         * Total shipping cost after taxes are applied.
         */
        amount_total: number;

        /**
         * The ID of the ShippingRate for this invoice.
         */
        shipping_rate: string | Stripe.ShippingRate | null;

        /**
         * The taxes applied to the shipping rate.
         */
        taxes?: Array<ShippingCost.Tax>;
      }

      namespace ShippingCost {
        interface Tax {
          /**
           * Amount of tax applied for this rate.
           */
          amount: number;

          /**
           * Tax rates can be applied to [invoices](https://docs.stripe.com/invoicing/taxes/tax-rates), [subscriptions](https://docs.stripe.com/billing/taxes/tax-rates) and [Checkout Sessions](https://docs.stripe.com/payments/checkout/use-manual-tax-rates) to collect tax.
           *
           * Related guide: [Tax rates](https://docs.stripe.com/billing/taxes/tax-rates)
           */
          rate: Stripe.TaxRate;

          /**
           * The reasoning behind this tax, for example, if the product is tax exempt. The possible values for this field may be extended as new tax rules are supported.
           */
          taxability_reason: Tax.TaxabilityReason | null;

          /**
           * The amount on which tax is calculated, in cents (or local equivalent).
           */
          taxable_amount: number | null;
        }

        namespace Tax {
          type TaxabilityReason =
            | 'customer_exempt'
            | 'not_collecting'
            | 'not_subject_to_tax'
            | 'not_supported'
            | 'portion_product_exempt'
            | 'portion_reduced_rated'
            | 'portion_standard_rated'
            | 'product_exempt'
            | 'product_exempt_holiday'
            | 'proportionally_rated'
            | 'reduced_rated'
            | 'reverse_charge'
            | 'standard_rated'
            | 'taxable_basis_reduced'
            | 'zero_rated';
        }
      }

      interface ShippingDetails {
        address?: Stripe.Address;

        /**
         * The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.
         */
        carrier?: string | null;

        /**
         * Recipient name.
         */
        name?: string;

        /**
         * Recipient phone (including extension).
         */
        phone?: string | null;

        /**
         * The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.
         */
        tracking_number?: string | null;
      }

      type Status = 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';

      interface StatusTransitions {
        /**
         * The time that the invoice draft was finalized.
         */
        finalized_at: number | null;

        /**
         * The time that the invoice was marked uncollectible.
         */
        marked_uncollectible_at: number | null;

        /**
         * The time that the invoice was paid.
         */
        paid_at: number | null;

        /**
         * The time that the invoice was voided.
         */
        voided_at: number | null;
      }

      interface ThresholdReason {
        /**
         * The total invoice amount threshold boundary if it triggered the threshold invoice.
         */
        amount_gte: number | null;

        /**
         * Indicates which line items triggered a threshold invoice.
         */
        item_reasons: Array<ThresholdReason.ItemReason>;
      }

      namespace ThresholdReason {
        interface ItemReason {
          /**
           * The IDs of the line items that triggered the threshold invoice.
           */
          line_item_ids: Array<string>;

          /**
           * The quantity threshold boundary that applied to the given line item.
           */
          usage_gte: number;
        }
      }

      interface TotalDiscountAmount {
        /**
         * The amount, in cents (or local equivalent), of the discount.
         */
        amount: number;

        /**
         * The discount that was applied to get this discount amount.
         */
        discount: string | Stripe.Discount | Stripe.DeletedDiscount;
      }

      interface TotalPretaxCreditAmount {
        /**
         * The amount, in cents (or local equivalent), of the pretax credit amount.
         */
        amount: number;

        /**
         * The credit balance transaction that was applied to get this pretax credit amount.
         */
        credit_balance_transaction?:
          | string
          | Stripe.Billing.CreditBalanceTransaction
          | null;

        /**
         * The discount that was applied to get this pretax credit amount.
         */
        discount?: string | Stripe.Discount | Stripe.DeletedDiscount;

        /**
         * Type of the pretax credit amount referenced.
         */
        type: TotalPretaxCreditAmount.Type;
      }

      namespace TotalPretaxCreditAmount {
        type Type = 'credit_balance_transaction' | 'discount';
      }

      interface TotalTax {
        /**
         * The amount of the tax, in cents (or local equivalent).
         */
        amount: number;

        /**
         * Whether this tax is inclusive or exclusive.
         */
        tax_behavior: TotalTax.TaxBehavior;

        /**
         * Additional details about the tax rate. Only present when `type` is `tax_rate_details`.
         */
        tax_rate_details: TotalTax.TaxRateDetails | null;

        /**
         * The reasoning behind this tax, for example, if the product is tax exempt. The possible values for this field may be extended as new tax rules are supported.
         */
        taxability_reason: TotalTax.TaxabilityReason;

        /**
         * The amount on which tax is calculated, in cents (or local equivalent).
         */
        taxable_amount: number | null;

        /**
         * The type of tax information.
         */
        type: 'tax_rate_details';
      }

      namespace TotalTax {
        type TaxabilityReason =
          | 'customer_exempt'
          | 'not_available'
          | 'not_collecting'
          | 'not_subject_to_tax'
          | 'not_supported'
          | 'portion_product_exempt'
          | 'portion_reduced_rated'
          | 'portion_standard_rated'
          | 'product_exempt'
          | 'product_exempt_holiday'
          | 'proportionally_rated'
          | 'reduced_rated'
          | 'reverse_charge'
          | 'standard_rated'
          | 'taxable_basis_reduced'
          | 'zero_rated';

        type TaxBehavior = 'exclusive' | 'inclusive';

        interface TaxRateDetails {
          tax_rate: string;
        }
      }
    }
  }
}
