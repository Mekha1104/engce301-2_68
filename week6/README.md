# 📚 ENGCE301: การออกแบบและพัฒนาซอฟต์แวร์
## Software Design and Development

---

## 👤 ข้อมูลผู้จัดทำ

```
┌─────────────────────────────────────────────────────────────┐
│  ชื่อ-สกุล  : เมย์คาร์ สุวรรณวิสุทธิ์                          │
│  รหัสนักศึกษา: 66543206085-3                                 │
│  รายวิชา   : ENGCE301 การออกแบบและพัฒนาซอฟต์แวร์              │
└─────────────────────────────────────────────────────────────┘
```

---

# 📅 สัปดาห์ที่ 6
## Software Architecture & Design Patterns + Node.js/Express Introduction

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   🏗️  Software Architecture & Design Patterns                    ║
║                           +                                      ║
║   🟢 Node.js/Express Introduction (JSON File Storage)            ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 📋 หน่วยเรียนและวัตถุประสงค์

### หน่วยเรียนที่ 6: Software Architecture & Design Patterns + Node.js/Express Intro

#### ชื่อบทเรียน:
- **6.1** รูปแบบสถาปัตยกรรมซอฟต์แวร์ (Software Architecture Patterns)
- **6.2** แนะนำ Design Patterns เบื้องต้น
- **6.3** Node.js และ Express Framework พื้นฐาน
- **6.4** การอ่านและเขียนไฟล์ JSON ด้วย Node.js

#### วัตถุประสงค์การสอน:
- **6.1.1** อธิบายและเปรียบเทียบรูปแบบสถาปัตยกรรมซอฟต์แวร์ต่างๆ เช่น Monolithic, Client-Server, และ Microservices ได้
- **6.1.2** เลือกสถาปัตยกรรมที่เหมาะสมกับข้อกำหนดของระบบได้
- **6.2.1** อธิบายแนวคิดพื้นฐานของ Design Patterns และประโยชน์ของการใช้งานได้
- **6.3.1** อธิบายบทบาทของ Backend API ในสถาปัตยกรรมเว็บแอปพลิเคชันได้
- **6.3.2** ติดตั้งและตั้งค่า Node.js และสร้าง Express Server เบื้องต้นได้
- **6.4.1** สร้าง RESTful Routes (GET, POST, PUT, DELETE) สำหรับการอ่านและเขียนข้อมูลใน JSON file ได้
- **6.4.2** จัดการ Error Handling และ Validation ใน Express ได้

```
┌─────────────────────────────────────────────────────────────┐
│  🎯 CLO ที่เกี่ยวข้อง: CLO1, CLO3, CLO4                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 โครงสร้างโปรเจกต์

```
week6/
├── Lab/
│   ├── my-express-app/            ← ตัวอย่าง Express เบื้องต้น
│   │   ├── data.json              ← ข้อมูล products (format: { products: [] })
│   │   ├── index.html             ← Frontend สำหรับทดสอบ API ด้วย fetch()
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── server.js              ← Express server + CRUD routes (callback style)
│   │
│   └── week6-workshop/            ← Workshop หลัก CRUD สมบูรณ์
│       ├── data/
│       │   └── products.json      ← ข้อมูล products (format: Array)
│       ├── routes/
│       │   └── products.js        ← CRUD routes ครบทุก endpoint (async/await)
│       ├── package-lock.json
│       ├── package.json
│       └── server.js              ← Express server พร้อม middleware และ error handler
│
├── README.md                      ← ไฟล์นี้
└── WEEK6_Workshop_Guide.md        ← คู่มือ Workshop
```

---

## 🚀 วิธีติดตั้งและรัน

### week6-workshop (หลัก)

```bash
# เข้าโฟลเดอร์
cd Lab/week6-workshop

# ติดตั้ง dependencies
npm install

# รัน development server (auto-restart เมื่อแก้ไขโค้ด)
npm run dev

# หรือรัน production
npm start
```

เปิด Browser ไปที่ **http://localhost:3000** จะเห็น:
```json
{
  "message": "Week 6 Workshop - Express API",
  "endpoints": {
    "getAllProducts":  "GET    /api/products",
    "getProductById": "GET    /api/products/:id",
    "createProduct":  "POST   /api/products",
    "updateProduct":  "PUT    /api/products/:id",
    "deleteProduct":  "DELETE /api/products/:id"
  }
}
```

### my-express-app (ตัวอย่างเบื้องต้น)

```bash
cd Lab/my-express-app
npm install
node server.js
```

---

## 🏗️ สถาปัตยกรรมที่ใช้ใน Lab นี้

```
┌──────────────────────────────────────────────────────────────┐
│              CLIENT-SERVER ARCHITECTURE                      │
│                                                              │
│   ┌─────────────────┐    HTTP Request     ┌───────────────┐  │
│   │    CLIENT       │  ─────────────────▶ │    SERVER     │  │
│   │                 │                     │               │  │
│   │  • Browser      │  ◀─────────────────  │  Express.js   │  │
│   │  • Postman      │    JSON Response     │  Port 3000    │  │
│   │  • index.html   │                     │               │  │
│   └─────────────────┘                     └──────┬────────┘  │
│                                                  │           │
│                                                  ▼           │
│                                         ┌────────────────┐   │
│                                         │  products.json │   │
│                                         │  (JSON File    │   │
│                                         │   Storage)     │   │
│                                         └────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### โครงสร้างโค้ดใน week6-workshop

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER STRUCTURE                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  server.js          ← Entry Point + Middleware              │
│       │                                                     │
│       └─▶ routes/products.js  ← Route + Business Logic     │
│                   │                                         │
│                   └─▶ data/products.json  ← Data Storage   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔌 API Endpoints (week6-workshop)

### Base URL: `http://localhost:3000`

```
┌────────┬──────────────────────┬──────────────────────────────┐
│ Method │ Endpoint             │ คำอธิบาย                     │
├────────┼──────────────────────┼──────────────────────────────┤
│  GET   │ /api/products        │ ดึงสินค้าทั้งหมด               │
│  GET   │ /api/products/:id    │ ดึงสินค้าตาม ID               │
│  POST  │ /api/products        │ สร้างสินค้าใหม่                │
│  PUT   │ /api/products/:id    │ อัปเดตสินค้าตาม ID            │
│ DELETE │ /api/products/:id    │ ลบสินค้าตาม ID               │
└────────┴──────────────────────┴──────────────────────────────┘
```

### รายละเอียดแต่ละ Endpoint

#### 🟢 GET /api/products — ดึงสินค้าทั้งหมด

```
Request:
  GET http://localhost:3000/api/products

Response (200 OK):
  {
    "success": true,
    "count": 3,
    "data": [
      { "id": 1, "name": "iPhone 15 Pro", "category": "Electronics",
        "price": 42900, "stock": 15, "description": "..." },
      ...
    ]
  }
```

#### 🟢 GET /api/products/:id — ดึงสินค้าตาม ID

```
Request:
  GET http://localhost:3000/api/products/1

Response (200 OK):
  {
    "success": true,
    "data": { "id": 1, "name": "iPhone 15 Pro", ... }
  }

Response (404 Not Found):
  {
    "success": false,
    "error": "Product with id 99 not found"
  }
```

#### 🔵 POST /api/products — สร้างสินค้าใหม่

```
Request:
  POST http://localhost:3000/api/products
  Content-Type: application/json

  Body:
  {
    "name": "iPad Air",
    "category": "Electronics",
    "price": 19900,
    "stock": 12,
    "description": "10.9-inch iPad Air"
  }

Response (201 Created):
  {
    "success": true,
    "message": "Product created successfully",
    "data": { "id": 4, "name": "iPad Air", ... }
  }

Response (400 Bad Request) — กรณีข้อมูลไม่ครบ:
  {
    "success": false,
    "error": "Missing required fields",
    "required": ["name", "category", "price", "stock"]
  }
```

#### 🟠 PUT /api/products/:id — อัปเดตสินค้า

```
Request:
  PUT http://localhost:3000/api/products/1
  Content-Type: application/json

  Body:
  {
    "name": "iPhone 15 Pro Max",
    "category": "Electronics",
    "price": 47900,
    "stock": 10,
    "description": "iPhone 15 Pro Max 256GB"
  }

Response (200 OK):
  {
    "success": true,
    "message": "Product updated successfully",
    "data": { "id": 1, "name": "iPhone 15 Pro Max", ... }
  }
```

#### 🔴 DELETE /api/products/:id — ลบสินค้า

```
Request:
  DELETE http://localhost:3000/api/products/1

Response (200 OK):
  {
    "success": true,
    "message": "Product deleted successfully",
    "data": { "id": 1, "name": "iPhone 15 Pro", ... }
  }
```

---

## 📊 HTTP Status Codes ที่ใช้

```
┌───────┬────────────────┬──────────────────────────────────────┐
│ Code  │ Status         │ ใช้เมื่อ                              │
├───────┼────────────────┼──────────────────────────────────────┤
│  200  │ OK             │ GET, PUT, DELETE สำเร็จ               │
│  201  │ Created        │ POST สร้างข้อมูลสำเร็จ                  │
│  400  │ Bad Request    │ ข้อมูลที่ส่งมาไม่ถูกต้องหรือไม่ครบ         │
│  404  │ Not Found      │ ไม่พบ resource ที่ขอ                   │
│  500  │ Server Error   │ เกิดข้อผิดพลาดภายใน Server             │
└───────┴────────────────┴──────────────────────────────────────┘
```

---

## 🧪 วิธีทดสอบ API ด้วย Postman

### ขั้นตอนการทดสอบ

**1. ติดตั้ง Postman** — https://www.postman.com/downloads

**2. สร้าง Collection ใหม่** ชื่อ `Week6 Products API`

**3. ทดสอบตามลำดับนี้:**

```
┌─────────────────────────────────────────────────────────────┐
│  TESTING ORDER                                              │
├─────┬──────────────────────────────────────────────────────┤
│  1  │ GET /api/products          → ดูข้อมูลเริ่มต้น          │
│  2  │ GET /api/products/1        → ดูสินค้า id=1            │
│  3  │ POST /api/products         → เพิ่มสินค้าใหม่ id=4     │
│  4  │ GET /api/products          → ตรวจสอบว่าเพิ่มแล้ว       │
│  5  │ PUT /api/products/1        → แก้ไขสินค้า id=1         │
│  6  │ GET /api/products/1        → ตรวจสอบว่าแก้ไขแล้ว      │
│  7  │ DELETE /api/products/3     → ลบสินค้า id=3           │
│  8  │ GET /api/products          → ตรวจสอบว่าเหลือ 3 รายการ │
│  9  │ GET /api/products/999      → ทดสอบ 404 Not Found      │
│ 10  │ POST /api/products (ไม่มี name) → ทดสอบ 400 Validation │
└─────┴──────────────────────────────────────────────────────┘
```

**4. ตั้งค่า POST/PUT Request ใน Postman:**
- Tab **Body** → เลือก **raw** → เลือก **JSON**
- ใส่ข้อมูลในช่อง body

---

## ⚙️ อธิบายโค้ดสำคัญ

### server.js — Middleware

```javascript
app.use(cors());          // แก้ปัญหา CORS เมื่อ Frontend อยู่คนละ Port
app.use(express.json());  // แปลง JSON body → JavaScript object อัตโนมัติ

// Logging: แสดง log ทุก request ที่เข้ามา
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next(); // ส่งต่อไปยัง route handler
});
```

### routes/products.js — Helper Functions

```javascript
// อ่านข้อมูลจาก JSON file (async/await)
async function readProducts() {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data); // JSON string → Array
}

// เขียนข้อมูลลง JSON file
async function writeProducts(products) {
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2), 'utf8');
}
```

### routes/products.js — สร้าง ID อัตโนมัติ

```javascript
// หา ID สูงสุดใน array แล้วบวก 1
// ถ้า array ว่างให้เริ่มที่ 1
const maxId = products.length > 0
    ? Math.max(...products.map(p => p.id))
    : 0;
const newId = maxId + 1;
```

```
┌─────────────────────────────────────────────────────────────┐
│  💡 ทำไมต้อง parseInt(req.params.id)?                        │
│  ─────────────────────────────────────                       │
│                                                             │
│  ค่าจาก URL params เป็น string เสมอ                            │
│  เช่น /api/products/3  →  req.params.id = "3" (string)       │
│                                                             │
│  แต่ id ใน Array เป็น number: { id: 3, name: "..." }          │
│                                                             │
│  "3" === 3  →  false  ❌  (หาไม่เจอ!)                         │
│   3  === 3  →  true   ✅  (เจอ!)                              │
│                                                             │
│  ดังนั้นต้องแปลงด้วย parseInt() ก่อนทุกครั้ง                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ รูปแบบข้อมูล (Data Format)

### week6-workshop — data/products.json

```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "category": "Electronics",
    "price": 42900,
    "stock": 15,
    "description": "Latest iPhone with A17 Pro chip"
  }
]
```

### my-express-app — data.json

```json
{
  "products": [
    { "id": 1, "name": "Laptop", "price": 25000 },
    { "id": 2, "name": "Mouse",  "price": 350   }
  ]
}
```

```
┌─────────────────────────────────────────────────────────────┐
│  📌 ข้อแตกต่างระหว่าง 2 โปรเจกต์                               │
│  ─────────────────────────────                               │
│                                                             │
│  my-express-app        week6-workshop                       │
│  ────────────────       ──────────────                       │
│  • callback style       • async/await style                 │
│  • ข้อมูลใน Object        • ข้อมูลเป็น Array ตรงๆ              │
│    { products: [] }       [ {...}, {...} ]                   │
│  • ไม่มี cors             • มี cors middleware               │
│  • ไม่มี validation       • มี validation + error handling   │
│  • routes อยู่ใน server.js  • แยก routes ออกเป็นไฟล์แยก       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🐛 Common Errors & Solutions

```
┌─────────────────────────────────────────────────────────────┐
│  ERROR 1: Cannot find module 'express'                      │
│  ─────────────────────────────────────                       │
│  สาเหตุ: ยังไม่ได้ติดตั้ง dependencies                          │
│  แก้:    npm install                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ERROR 2: ENOENT: no such file or directory                 │
│  ─────────────────────────────────────────                   │
│  สาเหตุ: path ไปยัง products.json ผิด                          │
│  แก้:    ตรวจสอบ dataPath ใน products.js                      │
│          ใช้ path.join(__dirname, '../data/products.json')   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ERROR 3: Port 3000 already in use                          │
│  ─────────────────────────────────                           │
│  สาเหตุ: มี process อื่นใช้ port 3000 อยู่                      │
│  แก้:    เปลี่ยน PORT เป็น 3001 ใน server.js                   │
│          หรือ kill process เดิมก่อน                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ERROR 4: CORS error ใน Browser                              │
│  ──────────────────────────────                              │
│  สาเหตุ: Frontend และ Backend อยู่คนละ origin                   │
│  แก้:    ตรวจสอบว่า app.use(cors()) อยู่ใน server.js แล้ว      │
│          และติดตั้ง cors: npm install cors                   │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist งานที่ทำสำเร็จ

```
┌─────────────────────────────────────────────────────────────┐
│  week6-workshop                                             │
├─────────────────────────────────────────────────────────────┤
│  ✅ สร้าง Express Server พร้อม Middleware (cors, json)       │
│  ✅ GET /api/products — ดึงสินค้าทั้งหมด                      │
│  ✅ GET /api/products/:id — ดึงสินค้าตาม ID + 404 handling  │
│  ✅ POST /api/products — สร้างสินค้า + Validation            │
│  ✅ PUT /api/products/:id — อัปเดตสินค้า + Validation        │
│  ✅ DELETE /api/products/:id — ลบสินค้า + ส่งข้อมูลที่ลบกลับ  │
│  ✅ Error Handling (400, 404, 500)                          │
│  ✅ อ่าน/เขียน JSON file ด้วย fs.promises (async/await)     │
│  ✅ Auto-generate ID จาก max + 1                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  my-express-app                                             │
├─────────────────────────────────────────────────────────────┤
│  ✅ Express Server เบื้องต้น                                  │
│  ✅ CRUD ครบ (GET, POST, PUT, DELETE) แบบ callback           │
│  ✅ Frontend index.html เชื่อมต่อ API ด้วย fetch()            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📚 สรุปสิ่งที่ได้เรียนรู้

```
╔══════════════════════════════════════════════════════════════╗
║  ✅ WHAT WE LEARNED THIS WEEK                                ║
╚══════════════════════════════════════════════════════════════╝
```

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ✓ Client-Server Architecture                                │
│    → แยก Frontend และ Backend ออกจากกัน                        │
│    → สื่อสารกันผ่าน HTTP/JSON                                   │
│                                                              │
│  ✓ สร้าง Express Server                                       │
│    → Middleware (cors, express.json, logging)                │
│    → Route Handler และ Router                                │
│    → Error Handler (404, 500)                                │
│                                                              │
│  ✓ RESTful API Design                                        │
│    → HTTP Methods: GET, POST, PUT, DELETE                    │
│    → Route Parameters: /api/products/:id                     │
│    → HTTP Status Codes: 200, 201, 400, 404, 500              │
│                                                              │
│  ✓ JSON File Operations (async/await)                        │
│    → fs.readFile() → JSON.parse() → อ่านข้อมูล               │
│    → JSON.stringify() → fs.writeFile() → เขียนข้อมูล          │
│                                                              │
│  ✓ Input Validation                                          │
│    → ตรวจสอบ required fields                                  │
│    → ตรวจสอบ data types (parseFloat, parseInt)               │
│    → ส่ง error message ที่ชัดเจน                                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📚 แหล่งข้อมูลเพิ่มเติม

- **Node.js**: https://nodejs.org/docs
- **Express.js**: https://expressjs.com
- **HTTP Status Codes**: https://httpstatuses.com
- **Postman**: https://learning.postman.com

---

```
═══════════════════════════════════════════════════════════════
                    END OF WEEK 6 LAB
═══════════════════════════════════════════════════════════════
```
