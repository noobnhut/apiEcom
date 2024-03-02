npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,address:string

npx sequelize-cli model:generate --name Cart --attributes id_user:integer,status:enum,method_payment:enum('COD','VNPAY'),vnp_orderID:integer,total_bank:double,date_bank:date //

npx sequelize-cli model:generate --name Notification --attributes id_user:integer,title:string,content:string //

npx sequelize-cli model:generate --name Category --attributes cat_name:string

npx sequelize-cli model:generate --name Product --attributes id_cat:integer,name_product:string,price:double //

npx sequelize-cli model:generate --name Img_product --attributes id_product:integer,name_img:string,url_img:string //

npx sequelize-cli model:generate --name Cart_order --attributes id_product:integer,id_order:integer,quantity:integer,single_price:double //





npx sequelize-cli db:migrate

id_cat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },


