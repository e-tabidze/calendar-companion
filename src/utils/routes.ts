export const profileRoutes = [
  {
    id: 1,
    icon: 'orders',
    item: 'my_orders',
    path: '/profile/orders?page=1'
  },
  {
    id: 2,
    icon: 'favIconOutlinedDark',
    item: 'favourites',
    path: '/profile/favourites?page=1'
  },
  {
    id: 3,
    icon: 'card',
    item: 'transactions',
    path: '/profile/transactions?page=1'
  },
  {
    id: 4,
    icon: 'settings',
    item: 'parameters',
    path: '/profile/personal-information/'
  },
  {
    id: 5,
    icon: 'createCompany',
    item: 'create_company',
    path: '/profile/create-company/'
  },
  {
    id: 6,
    icon: 'bellOutline',
    item: 'messages',
    path: '/profile/notifications?page=1'
  },
  {
    id: 7,
    icon: 'logout',
    item: 'logout',
    onClick: null
  }
]

export const dashboardRoutes = [
  {
    id: 1,
    icon: 'dashboard',
    item: 'dashboard',
    path: '/dashboard/dashboard/'
  },
  {
    id: 2,
    icon: 'newProduct',
    item: 'add_product',
    path: '/dashboard/new-product/'
  },
  {
    id: 3,
    icon: 'incomingOrders',
    item: 'incoming_orders',
    path: '/dashboard/orders?status_id=&page=1'
  },
  {
    id: 4,
    icon: 'bellOutline',
    item: 'message',
    path: '/dashboard/notifications?page=1'
  },
  {
    id: 5,
    icon: 'payments',
    item: 'payments',
    path: '/dashboard/payments?page=1'
  },
  {
    id: 6,
    icon: 'car',
    item: 'cars',
    path: '/dashboard/products?is_active=&page=1'
  },
  {
    id: 7,
    icon: 'editOutline',
    item: 'company_edit',
    path: '/dashboard/edit-company/'
  },
  {
    id: 8,
    icon: 'logout',
    item: 'logout',
    onClick: null
  }
]
