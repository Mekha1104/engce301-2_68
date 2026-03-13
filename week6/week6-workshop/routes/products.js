// ============================================
// routes/products.js
// Product Routes - CRUD Operations ครบทุกอย่าง
// ============================================

const express = require('express');
const router  = express.Router();     // สร้าง Router object แยกออกมาจาก app
const fs      = require('fs').promises; // ใช้ fs แบบ Promise (async/await ได้)
const path    = require('path');

// กำหนด path ไปยังไฟล์ data
// __dirname = โฟลเดอร์ที่ไฟล์นี้อยู่ (routes/)
// '../data/products.json' = ขึ้นไปหนึ่งระดับแล้วเข้า data/
const dataPath = path.join(__dirname, '../data/products.json');


// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * อ่านข้อมูล products ทั้งหมดจากไฟล์ JSON
 * @returns {Array} - array ของ products
 */
async function readProducts() {
    try {
        const data = await fs.readFile(dataPath, 'utf8'); // อ่านไฟล์เป็น string
        return JSON.parse(data);                          // แปลง JSON string → Array
    } catch (error) {
        console.error('Error reading products:', error);
        return []; // ถ้าอ่านไม่ได้ ให้ return array ว่าง
    }
}

/**
 * เขียนข้อมูล products ลงไฟล์ JSON
 * @param {Array} products - array ของ products ที่จะบันทึก
 * @returns {boolean} - true ถ้าสำเร็จ
 */
async function writeProducts(products) {
    try {
        await fs.writeFile(
            dataPath,
            JSON.stringify(products, null, 2), // แปลง Array → JSON string (indent 2 spaces)
            'utf8'
        );
        return true;
    } catch (error) {
        console.error('Error writing products:', error);
        return false;
    }
}


// ============================================
// GET /api/products
// ดึงสินค้าทั้งหมด
// ============================================
router.get('/', async (req, res) => {
    try {
        const products = await readProducts(); // อ่านข้อมูลจากไฟล์

        res.json({
            success: true,
            count: products.length, // จำนวนสินค้าทั้งหมด
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// ============================================
// GET /api/products/:id
// ดึงสินค้าตาม ID
// ============================================
router.get('/:id', async (req, res) => {
    try {
        const products = await readProducts();

        // req.params.id คือค่าที่อยู่ใน URL เช่น /api/products/3 → id = "3"
        // parseInt() แปลงจาก string → number เพราะ id ในไฟล์เป็น number
        const id = parseInt(req.params.id);

        // .find() วนหาสินค้าที่ id ตรงกัน ถ้าไม่เจอ return undefined
        const product = products.find(p => p.id === id);

        // ถ้าหาไม่เจอ ส่ง 404 กลับไป
        if (!product) {
            return res.status(404).json({
                success: false,
                error: `Product with id ${id} not found`
            });
        }

        res.json({
            success: true,
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// ============================================
// POST /api/products
// สร้างสินค้าใหม่
// Body: { name, category, price, stock, description }
// ============================================
router.post('/', async (req, res) => {
    try {
        const products = await readProducts();

        // ดึงข้อมูลจาก request body (JSON ที่ client ส่งมา)
        const { name, category, price, stock, description } = req.body;

        // --- STEP 1: Validate ข้อมูล ---
        // ตรวจสอบว่า field ที่จำเป็นมีครบหรือไม่
        if (!name || !category || price === undefined || stock === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                required: ['name', 'category', 'price', 'stock']
            });
        }

        // ตรวจสอบค่า price และ stock ต้องเป็นตัวเลขบวก
        if (isNaN(price) || parseFloat(price) < 0) {
            return res.status(400).json({
                success: false,
                error: 'Price must be a non-negative number'
            });
        }

        if (isNaN(stock) || parseInt(stock) < 0) {
            return res.status(400).json({
                success: false,
                error: 'Stock must be a non-negative integer'
            });
        }

        // --- STEP 2: สร้าง ID ใหม่ ---
        // หา id ที่มากที่สุดใน array แล้วบวก 1
        // ถ้า array ว่าง (ไม่มีสินค้า) ให้เริ่มที่ 1
        const maxId = products.length > 0
            ? Math.max(...products.map(p => p.id))
            : 0;
        const newId = maxId + 1;

        // --- STEP 3: สร้าง product object ใหม่ ---
        const newProduct = {
            id:          newId,
            name:        name,
            category:    category,
            price:       parseFloat(price),   // แปลงเป็น float
            stock:       parseInt(stock),     // แปลงเป็น integer
            description: description || ''   // ถ้าไม่ส่ง description มาให้เป็น string ว่าง
        };

        // --- STEP 4: เพิ่มเข้า array ---
        products.push(newProduct);

        // --- STEP 5: บันทึกลงไฟล์ ---
        await writeProducts(products);

        // ส่ง 201 Created กลับพร้อมสินค้าที่สร้างใหม่
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: newProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// ============================================
// PUT /api/products/:id
// อัปเดตสินค้าตาม ID
// Body: { name, category, price, stock, description }
// ============================================
router.put('/:id', async (req, res) => {
    try {
        const products = await readProducts();
        const id = parseInt(req.params.id);
        const { name, category, price, stock, description } = req.body;

        // --- STEP 1: หา index ของสินค้าที่ต้องการแก้ไข ---
        // .findIndex() คืนค่า index ใน​array ถ้าไม่เจอคืน -1
        const productIndex = products.findIndex(p => p.id === id);

        // --- STEP 2: ตรวจสอบว่าเจอสินค้าหรือไม่ ---
        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                error: `Product with id ${id} not found`
            });
        }

        // --- STEP 3: Validate ข้อมูลที่ส่งมา ---
        if (!name || !category || price === undefined || stock === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                required: ['name', 'category', 'price', 'stock']
            });
        }

        // --- STEP 4: อัปเดตข้อมูล ---
        // เขียนทับ object เดิมด้วยข้อมูลใหม่ (รักษา id เดิมไว้)
        products[productIndex] = {
            id:          id,          // รักษา id เดิม
            name:        name,
            category:    category,
            price:       parseFloat(price),
            stock:       parseInt(stock),
            // ถ้าไม่ส่ง description มา ให้ใช้ค่าเดิม
            description: description !== undefined ? description : products[productIndex].description
        };

        // --- STEP 5: บันทึกลงไฟล์ ---
        await writeProducts(products);

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: products[productIndex]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// ============================================
// DELETE /api/products/:id
// ลบสินค้าตาม ID
// ============================================
router.delete('/:id', async (req, res) => {
    try {
        const products = await readProducts();
        const id = parseInt(req.params.id);

        // --- STEP 1: หา index ของสินค้าที่ต้องการลบ ---
        const productIndex = products.findIndex(p => p.id === id);

        // --- STEP 2: ตรวจสอบว่าเจอสินค้าหรือไม่ ---
        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                error: `Product with id ${id} not found`
            });
        }

        // เก็บข้อมูลสินค้าที่จะลบไว้ก่อน (เพื่อส่งกลับใน response)
        const deletedProduct = products[productIndex];

        // --- STEP 3: ลบออกจาก array ---
        // .splice(index, deleteCount) ลบ 1 element ที่ index นั้น
        products.splice(productIndex, 1);

        // --- STEP 4: บันทึกลงไฟล์ ---
        await writeProducts(products);

        res.json({
            success: true,
            message: 'Product deleted successfully',
            data: deletedProduct // ส่งข้อมูลสินค้าที่ลบไปกลับด้วย
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Export router เพื่อให้ server.js นำไปใช้ได้
module.exports = router;
