export const profileRoutes = [
  {
    id: 1,
    icon: 'orders',
    item: 'ჩემი შეკვეთები',
    path: '/profile/orders?page=1'
  },
  {
    id: 2,
    icon: 'favIconOutlinedDark',
    item: 'ფავორიტები',
    path: '/profile/favourites?page=1'
  },
  {
    id: 3,
    icon: 'card',
    item: 'ტრანზაქციები',
    path: '/profile/transactions?page=1'
  },
  {
    id: 4,
    icon: 'settings',
    item: 'პარამეტრები',
    path: '/profile/personal-information/'
  },
  {
    id: 5,
    icon: 'createCompany',
    item: 'კომპანიის შექმნა',
    path: '/profile/create-company/'
  },
  {
    id: 6,
    icon: 'bellOutline',
    item: 'შეტყობინებები',
    path: '/profile/notifications?page=1'
  },
  {
    id: 7,
    icon: 'logout',
    item: 'გასვლა',
    onClick: null
  }
]

export const dashboardRoutes = [
  {
    id: 1,
    icon: 'dashboard',
    item: 'დეშბორდი',
    path: '/dashboard/dashboard/'
  },
  {
    id: 2,
    icon: 'newProduct',
    item: 'განცხადების დამატება',
    path: '/dashboard/new-product/'
  },
  {
    id: 3,
    icon: 'incomingOrders',
    item: 'შემოსული ჯავშნები',
    path: '/dashboard/orders?status_id=&page=1'
  },
  {
    id: 4,
    icon: 'bellOutline',
    item: 'შეტყობინება',
    path: '/dashboard/notifications?page=1'
  },
  {
    id: 5,
    icon: 'payments',
    item: 'გადახდები',
    path: '/dashboard/payments?page=1'
  },
  {
    id: 6,
    icon: 'car',
    item: 'ავტომობილები',
    path: '/dashboard/products?is_active=&page=1'
  },
  {
    id: 7,
    icon: 'editOutline',
    item: 'კომპანიის რედაქტირება',
    path: '/dashboard/edit-company/'
  },
  {
    id: 8,
    icon: 'logout',
    item: 'გასვლა',
    onClick: null
  }
]
