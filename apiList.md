1. Category
	GET: /api/category/get
	POST: /api/category/add -> nhận vào cat_name
	PUT: /api/category/update/:id -> nhận vào cat_name và 1 id
	DELETE: /api/category/delete/:id -> nhận vào 1 id 
2. Product
	GET: /api/product/get
    POST: /api/product/add -> nhận vào id_cat, name_product, price
    PUT: /api/product/update/:id -> nhận vào id_cat, name_product, price và 1 id
    DELETE: /api/product/delete/:id -> nhận vào id của product
    POST: /api/product/img/add/:id -> nhận vào id của product
    DELETE: /api/product/img/delete/:id -> nhận vào id của img
