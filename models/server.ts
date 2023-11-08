import  express, {Express} from 'express';
import { dbConnection } from '../database/config.db';

import userRoutes from '../routes/user.routes';
import authRoutes from '../routes/auth.routes';
import categoriesRoutes from '../routes/categories.routes';
import productsRoutes from '../routes/products.routes';
import searchRoutes from '../routes/search.routes';

const cors = require('cors')
class Server {
  
  app: Express;
  port: string | undefined;
  paths: {
    auth: string;
    categories: string;
    products: string;
    search: string;
    users: string;
  };

  constructor () {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth:'/api/auth',
      categories:'/api/categories',
      products:'/api/products',
      search: '/api/search',
      users:'/api/users'
    }
    // Conectar a bd
    this.connectDB();

    // Middlewares
    this.middlewares();
    
    // Rutas de mi aplicación
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Lectura del body
    this.app.use(express.json());
    
    // Directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use( this.paths.auth, authRoutes);
    this.app.use( this.paths.categories, categoriesRoutes);
    this.app.use( this.paths.products, productsRoutes);
    this.app.use( this.paths.users, userRoutes);
    this.app.use( this.paths.search, searchRoutes);
  }
  
  listen(){
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}!\n`) 
    })
  }

}

export default Server;