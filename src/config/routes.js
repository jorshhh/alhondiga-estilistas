
import Dashboard from '../routes/Dashboard';
import Locations from '../routes/Locations';
import Customers from '../routes/Customers';
import Employees from '../routes/Employees';
import Products from '../routes/Products';
import RequestPassword from '../routes/RequestPassword';
import SetPassword from '../routes/SetPassword';

import strings from '../config/strings';

const routes = [
  { path: '/',                component: Dashboard,       sidebar: true,  isPublic: false, label: strings().menu.dashboard, icon: 'dashboard' },

  { path: '/customers',       component: Customers,       sidebar: true,  isPublic: false, label: strings().menu.customers, icon: 'money bill alternate outline' },
  { path: '/employees',       component: Employees,       sidebar: true,  isPublic: false, label: strings().menu.employees, icon: 'users'             },
  { path: '/products',        component: Products,        sidebar: true,  isPublic: false, label: strings().menu.products,  icon: 'barcode'           },
  { path: '/locations',       component: Locations,       sidebar: true,  isPublic: false, label: strings().menu.locations, icon: 'building outline'  },

  { path: '/requestPassword',     component: RequestPassword, sidebar: false, isPublic: true },
  { path: '/setPassword/:token',  component: SetPassword,     sidebar: false, isPublic: true },
];

export default routes;