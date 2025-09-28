export const environment = {
  backend_products: process.env['BACKEND_PRODUCTS'] || 'http://localhost:8093/api',
  backend_user: process.env['BACKEND_USER'] || 'http://localhost:8090/api',
  backend_validation: process.env['BACKEND_VALIDATION'] || 'http://localhost:8092/api',
  backend_login: process.env['BACKEND_LOGIN'] || 'http://localhost:8091/api',
  backend_cart: process.env['BACKEND_CART'] || 'http://localhost:8094/api',
  backend_orders: process.env['BACKEND_ORDERS'] || 'http://localhost:8095/api',
};
