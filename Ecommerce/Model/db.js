const Sequelize = require('sequelize')

const db = new Sequelize('shopdb', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
    }
})

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Order = db.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    
    payment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    order_destination: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ordertime: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        
    }
    
})

User.hasMany(Order,{
       onDelete:"cascade"
    });

Order.belongsTo(User,{
    foreignKey: {
        allowNull:false
    }
});
 


const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    manufacturer: Sequelize.STRING,
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    }
})

Product.hasMany(Order,{
    onDelete:"cascade"
 });

Order.belongsTo(Product,{
 foreignKey: {
     allowNull:false
 }
});

db.sync()
    .then(() => console.log("Database has been synced"))
    .catch((err) => console.error("Error creating database"))

exports = module.exports = {
     User,Product,Order
}