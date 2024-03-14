const express = require("express");
const { getCat, addCat, updateCat, deleteCat } = require("../controllers/catController");
const routercat = express.Router();
/**
 * @swagger
 * /api/category/get:
 *   get:
 *     summary: Retrieve all categories
 *     description: Retrieve a list of all categories
 *     responses:
 *       '200':
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful
 *                 error:
 *                   type: string
 *                   description: Error message
 */

routercat.get("/api/category/get", getCat);

routercat.get("/api/category/get", getCat);

/**
 * @swagger
 * /api/category/add:
 *   post:
 *     summary: Add a new category
 *     description: Add a new category to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       '200':
 *         description: Successfully added category
 *       '400':
 *         description: Bad request
 */

routercat.post("/api/category/add", addCat);

/**
 * @swagger
 * /api/category/update/{id}:
 *   put:
 *     summary: Update a category
 *     description: Update an existing category in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       '200':
 *         description: Successfully updated category
 *       '404':
 *         description: Category not found
 */

routercat.put("/api/category/update/:id", updateCat);

/**
 * @swagger
 * /api/category/delete/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete a category from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       '200':
 *         description: Successfully deleted category
 *       '404':
 *         description: Category not found
 */

routercat.delete("/api/category/delete/:id", deleteCat);

module.exports = {
  routercat,
};
