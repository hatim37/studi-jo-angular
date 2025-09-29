export const environment = {
  backend_products: process.env['NG_APP_BACKEND_PRODUCTS'] || 'https://studi-jo-products-285073083479.europe-west1.run.app/api',
  backend_user: process.env['NG_APP_BACKEND_USER'] || 'https://studi-jo-users-285073083479.europe-west1.run.app/api',
  backend_validation: process.env['NG_APP_BACKEND_VALIDATION'] || 'https://studi-jo-validation-285073083479.europe-west1.run.app/api',
  backend_login: process.env['NG_APP_BACKEND_LOGIN'] || 'http://localhost:8091/api',
  backend_cart: process.env['NG_APP_BACKEND_CART'] || 'http://localhost:8094/api',
  backend_orders: process.env['NG_APP_BACKEND_ORDERS'] || 'http://localhost:8095/api',
  preparation_prod: process.env['NG_APP_PREPARATION_PROD'] || 'deploiement'
};
