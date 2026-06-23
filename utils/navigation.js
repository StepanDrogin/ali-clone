export const topMenuLinks = [
  {
    label: 'Seller center',
    to: '/info/seller-center',
    icon: 'ph:storefront'
  },
  {
    label: 'Buyer protection',
    to: '/info/buyer-protection',
    icon: 'ph:shield-check'
  },
  {
    label: 'Help',
    to: '/info/help',
    icon: 'ph:question'
  },
  {
    label: 'Download app',
    to: '/info/download-app',
    icon: 'ph:device-mobile'
  }
]

export const categoryMenuLinks = [
  {
    label: 'Today deals',
    to: '/info/today-deals',
    icon: 'ph:tag'
  },
  {
    label: 'Free shipping',
    to: '/info/free-shipping',
    icon: 'ph:truck'
  },
  {
    label: 'Top rated',
    to: '/info/top-rated',
    icon: 'ph:star'
  },
  {
    label: 'New arrivals',
    to: '/info/new-arrivals',
    icon: 'ph:sparkle'
  },
  {
    label: 'Secure checkout',
    to: '/info/secure-checkout',
    icon: 'ph:lock-key'
  }
]

export const infoPages = {
  'seller-center': {
    eyebrow: 'Marketplace tools',
    title: 'Seller center',
    description: 'A compact operations page for sellers to understand listing quality, order readiness and payout expectations in the demo marketplace.',
    stats: ['Catalog tools', 'Order readiness', 'Payout basics'],
    sections: [
      {
        title: 'List products clearly',
        text: 'Use product titles, stable prices and sharp images so customers can scan and compare items quickly.'
      },
      {
        title: 'Prepare fulfillment',
        text: 'Keep delivery expectations visible before checkout and keep order history easy to review after purchase.'
      },
      {
        title: 'Track checkout health',
        text: 'Payment, address and order routes are backed by API checks so seller flows fail with readable states.'
      }
    ]
  },
  'buyer-protection': {
    eyebrow: 'Customer confidence',
    title: 'Buyer protection',
    description: 'A guide-style page for the marketplace guarantees shown across cart, checkout and product details.',
    stats: ['Refund path', 'Order history', 'Secure payment'],
    sections: [
      {
        title: 'Clear delivery details',
        text: 'Shipping address and order contents are reviewed before payment so mistakes are easier to catch.'
      },
      {
        title: 'Protected payment flow',
        text: 'Stripe handles card details while the app stores only the order record needed for history.'
      },
      {
        title: 'Readable order status',
        text: 'Completed orders stay available in the customer account area for later checks.'
      }
    ]
  },
  help: {
    eyebrow: 'Support',
    title: 'Help',
    description: 'A support hub for the main demo flows: catalog browsing, cart selection, address entry, checkout and orders.',
    stats: ['Shopping help', 'Checkout help', 'Account help'],
    sections: [
      {
        title: 'Shopping',
        text: 'Open any product card to review details, switch preview images and add the item to the cart.'
      },
      {
        title: 'Cart and address',
        text: 'Choose products in the cart, continue to checkout and add a delivery address when required.'
      },
      {
        title: 'Payments',
        text: 'Use Stripe test mode for payment checks. If a provider is not configured, the app now shows a styled setup message.'
      }
    ]
  },
  'download-app': {
    eyebrow: 'Mobile experience',
    title: 'Download app',
    description: 'A mobile-focused page that mirrors the app navigation and keeps the marketplace usable on smaller screens.',
    stats: ['Mobile menu', 'Cart access', 'Account flows'],
    sections: [
      {
        title: 'Browse on mobile',
        text: 'The mobile menu now includes the same content destinations as the desktop header.'
      },
      {
        title: 'Keep shopping state',
        text: 'Cart and checkout selections are persisted, while transient UI state such as loading is not.'
      },
      {
        title: 'Responsive checkout',
        text: 'Cards, forms and summary panels keep the same visual language across desktop and mobile.'
      }
    ]
  },
  'today-deals': {
    eyebrow: 'Catalog',
    title: 'Today deals',
    description: 'A curated landing page for the highlighted demo catalog and the promotional chips used on the homepage.',
    stats: ['Fresh picks', 'Promo chips', 'Fast scan'],
    sections: [
      {
        title: 'Deal cards',
        text: 'Product cards keep price, rating and shipping cues visible without adding extra clutter.'
      },
      {
        title: 'Simple browsing',
        text: 'Customers can move from deal discovery to product detail and cart in one or two clicks.'
      },
      {
        title: 'Stable loading',
        text: 'Route transitions now show an overlay without removing content from the page underneath.'
      }
    ]
  },
  'free-shipping': {
    eyebrow: 'Delivery',
    title: 'Free shipping',
    description: 'A delivery information page explaining the free-shipping promise used across product and cart surfaces.',
    stats: ['No extra fee', 'Address check', 'Delivery copy'],
    sections: [
      {
        title: 'Visible before checkout',
        text: 'Free-shipping labels are shown on product cards and detail pages before the customer reaches payment.'
      },
      {
        title: 'Address required',
        text: 'Checkout asks for a delivery address before payment so the order record stays complete.'
      },
      {
        title: 'Consistent message',
        text: 'The same delivery promise appears in product detail, cart and checkout support content.'
      }
    ]
  },
  'top-rated': {
    eyebrow: 'Quality',
    title: 'Top rated',
    description: 'A quality page for rating labels, social proof and review-style signals in the marketplace UI.',
    stats: ['Rating cue', 'Review copy', 'Trust labels'],
    sections: [
      {
        title: 'Product confidence',
        text: 'Top-rated badges and review counts help customers understand why a product is highlighted.'
      },
      {
        title: 'Compact presentation',
        text: 'Labels use small chips and restrained colors so product imagery remains the primary signal.'
      },
      {
        title: 'Repeatable pattern',
        text: 'The same visual treatment works on cards, details and informational pages.'
      }
    ]
  },
  'new-arrivals': {
    eyebrow: 'Catalog updates',
    title: 'New arrivals',
    description: 'A landing page for newly-added marketplace items and freshness messaging.',
    stats: ['Fresh catalog', 'New labels', 'Quick compare'],
    sections: [
      {
        title: 'New product discovery',
        text: 'Customers can scan newly added products with the same grid density as the homepage catalog.'
      },
      {
        title: 'No dead navigation',
        text: 'Header labels now lead to real content pages instead of acting like inactive text.'
      },
      {
        title: 'Shared layout',
        text: 'The page uses the same panels, chips and typography as the rest of Market Express.'
      }
    ]
  },
  'secure-checkout': {
    eyebrow: 'Payments',
    title: 'Secure checkout',
    description: 'A payment confidence page for Stripe, address validation and friendly error handling.',
    stats: ['Stripe test mode', 'Address gate', 'Friendly errors'],
    sections: [
      {
        title: 'Payment details',
        text: 'Stripe collects card details; the app receives only the payment result needed to create an order.'
      },
      {
        title: 'Readable failures',
        text: 'Payment and provider setup problems are shown in styled error panels instead of raw system text.'
      },
      {
        title: 'Order creation',
        text: 'Successful payments clear the cart and create an order history entry through the server API.'
      }
    ]
  }
}
