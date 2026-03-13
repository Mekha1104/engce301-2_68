// ============================================
// ENGCE301 Week 6 Workshop - Express Server
// ============================================

// นำเข้า modules ที่จำเป็น
const express = require('express');  // Framework สำหรับสร้าง web server
const cors = require('cors');        // แก้ปัญหา Cross-Origin Resource Sharing
const path = require('path');        // จัดการ path ของไฟล์

const app = express();   // สร้าง Express application
const PORT = 3000;       // กำหนด port ที่ server จะรับฟัง

// ===== MIDDLEWARE =====
// Middleware คือ function ที่ทำงานระหว่าง Request และ Response

app.use(cors());           // อนุญาตให้ frontend ต่าง domain เรียก API ได้
app.use(express.json());   // แปลง JSON body ใน request ให้เป็น JavaScript object อัตโนมัติ

// Logging middleware - แสดง log ทุก request ที่เข้ามา
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next(); // เรียก next() เพื่อส่งต่อไปยัง middleware/route ถัดไป
});

// ===== IMPORT ROUTES =====
// นำเข้า router จากไฟล์ routes/products.js
const productsRouter = require('./routes/products');

// กำหนดว่า URL ที่ขึ้นต้นด้วย /api/products ให้ใช้ productsRouter
app.use('/api/products', productsRouter);

// ===== ROOT ENDPOINT =====
// เมื่อเข้า http://localhost:3000/ จะแสดงข้อมูล API
app.get('/', (req, res) => {
    res.json({
        message: 'Week 6 Workshop - Express API',
        endpoints: {
            getAllProducts:    'GET    /api/products',
            getProductById:   'GET    /api/products/:id',
            createProduct:    'POST   /api/products',
            updateProduct:    'PUT    /api/products/:id',
            deleteProduct:    'DELETE /api/products/:id'
        }
    });
});

// ===== 404 HANDLER =====
// ถ้าไม่มี route ไหนตรงกับ request จะตกมาที่นี่
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
});

// ===== ERROR HANDLER =====
// จัดการ error ที่เกิดขึ้นใน route handlers (ต้องมี 4 parameter)
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('='.repeat(50));
    console.log('📋 Endpoints:');
    console.log(`   GET    http://localhost:${PORT}/api/products`);
    console.log(`   GET    http://localhost:${PORT}/api/products/:id`);
    console.log(`   POST   http://localhost:${PORT}/api/products`);
    console.log(`   PUT    http://localhost:${PORT}/api/products/:id`);
    console.log(`   DELETE http://localhost:${PORT}/api/products/:id`);
    console.log('='.repeat(50));
});
