# دليل الربط مع نظام أودو (Odoo Integration Guide)

## 1. إعداد أودو للربط

### أ. تثبيت módulos المطلوبة في أودو

```bash
# في خادم أودو، قم بتثبيت الحزم التالية:
- rental_management
- api_rest
- maintenance
```

### ب. إنشاء مستخدم API

1. اذهب إلى **الإعدادات** → **المستخدمين**
2. أنشئ مستخدم جديد باسم `api_user`
3. أعطِ الصلاحيات التالية:
   - مدير العقارات (Rental Manager)
   - مدير الحجوزات (Booking Manager)
   - مدير الصيانة (Maintenance Manager)
   - وصول API (API Access)

4. في تبويب **الأمان**:
   - فعّل **External API Access**
   - أنشئ **API Key** واحتفظ به

### ج. إعداد CORS في أودو

في ملف `odoo.conf`:

```ini
[options]
cors = *
# أو حدد النطاقات المسموحة
# cors = https://your-domain.com,http://localhost:5173
```

## 2. نقاط API (API Endpoints)

### أ. العقارات (Properties)

```javascript
// جلب جميع العقارات
GET /api/v1/rental/properties
Headers:
  X-API-Key: your-api-key
  X-Database: your-database
  X-Username: your-username

Response:
{
  "status": "success",
  "data": [
    {
      "id": "1",
      "name": "فيلا النخيل الفاخرة",
      "type": "villa",
      "location": "الرياض",
      "status": "available",
      "dailyRate": 2500,
      "monthlyRate": 60000,
      "occupancyRate": 78,
      "revenue": 185000,
      "bookings": 45,
      "rating": 4.9,
      "guests": 12,
      "bedrooms": 5,
      "bathrooms": 4,
      "amenities": ["مسبح خاص", "مجلس", "مطبخ مجهز"]
    }
  ]
}

// إنشاء عقار جديد
POST /api/v1/rental/properties
Body:
{
  "name": "فيلا جديدة",
  "type": "villa",
  "location": "جدة",
  "dailyRate": 3000,
  "monthlyRate": 70000,
  "guests": 10,
  "bedrooms": 4,
  "bathrooms": 3
}

// تحديث عقار
PUT /api/v1/rental/properties/{id}
Body:
{
  "status": "occupied",
  "dailyRate": 3200
}

// حذف عقار
DELETE /api/v1/rental/properties/{id}
```

### ب. الحجوزات (Bookings)

```javascript
// جلب جميع الحجوزات
GET /api/v1/rental/bookings
Query Parameters:
  - status: confirmed|pending|completed|cancelled
  - date_from: YYYY-MM-DD
  - date_to: YYYY-MM-DD
  - property_id: string

Response:
{
  "status": "success",
  "data": [
    {
      "id": "BK001",
      "propertyId": "1",
      "propertyName": "فيلا النخيل الفاخرة",
      "customerName": "أحمد الرشيد",
      "customerEmail": "ahmed@email.com",
      "customerPhone": "+966 50 123 4567",
      "startDate": "2026-01-20",
      "endDate": "2026-01-25",
      "totalAmount": 12500,
      "status": "confirmed",
      "paymentStatus": "paid",
      "guests": 8,
      "notes": "حجز خاص"
    }
  ]
}

// إنشاء حجز جديد
POST /api/v1/rental/bookings
Body:
{
  "propertyId": "1",
  "customerId": "C001",
  "startDate": "2026-02-01",
  "endDate": "2026-02-07",
  "guests": 6,
  "totalAmount": 15000,
  "paymentMethod": "credit_card",
  "notes": "مناسبة خاصة"
}

// تأكيد الحجز
POST /api/v1/rental/bookings/{id}/confirm

// إلغاء الحجز
POST /api/v1/rental/bookings/{id}/cancel

// تحديث حالة الدفع
PUT /api/v1/rental/bookings/{id}/payment
Body:
{
  "paymentStatus": "paid",
  "paymentDate": "2026-01-20",
  "paymentMethod": "bank_transfer"
}
```

### ج. العملاء (Customers)

```javascript
// جلب جميع العملاء
GET /api/v1/rental/customers
Query Parameters:
  - loyalty_tier: bronze|silver|gold|platinum
  - search: string

Response:
{
  "status": "success",
  "data": [
    {
      "id": "C001",
      "name": "أحمد الرشيد",
      "email": "ahmed@email.com",
      "phone": "+966 50 123 4567",
      "totalBookings": 12,
      "totalSpent": 85000,
      "lastBooking": "2026-01-20",
      "loyaltyTier": "gold",
      "notes": "عميل مميز"
    }
  ]
}

// إنشاء عميل جديد
POST /api/v1/rental/customers
Body:
{
  "name": "اسم العميل",
  "email": "email@example.com",
  "phone": "+966 50 000 0000",
  "idNumber": "1234567890",
  "nationality": "سعودي"
}

// تحديث مستوى الولاء
PUT /api/v1/rental/customers/{id}/loyalty
Body:
{
  "loyaltyTier": "platinum"
}
```

### د. الصيانة (Maintenance)

```javascript
// جلب جميع طلبات الصيانة
GET /api/v1/maintenance/requests
Query Parameters:
  - status: pending|assigned|in_progress|completed|cancelled
  - priority: low|medium|high|urgent
  - category: electrical|plumbing|hvac|cleaning|furniture|appliance|other
  - property_id: string

Response:
{
  "status": "success",
  "data": [
    {
      "id": "MR001",
      "propertyId": "1",
      "propertyName": "فيلا النخيل الفاخرة",
      "title": "عطل في نظام التكييف",
      "description": "التكييف في الغرفة الرئيسية لا يعمل",
      "category": "hvac",
      "priority": "high",
      "status": "in_progress",
      "reportedBy": "أحمد الرشيد",
      "reportedDate": "2026-01-18",
      "assignedTo": "فريق الصيانة 1",
      "assignedDate": "2026-01-18",
      "estimatedCost": 500,
      "actualCost": null,
      "completedDate": null
    }
  ]
}

// إنشاء طلب صيانة جديد
POST /api/v1/maintenance/requests
Body:
{
  "propertyId": "1",
  "title": "عطل كهربائي",
  "description": "انقطاع الكهرباء في المطبخ",
  "category": "electrical",
  "priority": "urgent",
  "reportedBy": "اسم المبلغ",
  "images": ["url1", "url2"]
}

// تعيين الطلب لفريق صيانة
POST /api/v1/maintenance/requests/{id}/assign
Body:
{
  "assignedTo": "فريق الكهرباء",
  "notes": "يرجى السرعة في الإنجاز"
}

// تحديث حالة الطلب
PUT /api/v1/maintenance/requests/{id}/status
Body:
{
  "status": "completed",
  "actualCost": 450,
  "completedDate": "2026-01-20",
  "notes": "تم إصلاح العطل بنجاح"
}

// جلب فرق الصيانة
GET /api/v1/maintenance/teams

// إنشاء فريق صيانة
POST /api/v1/maintenance/teams
Body:
{
  "name": "فريق الصيانة 5",
  "specialization": "كهرباء",
  "phone": "+966 50 000 0000",
  "email": "team5@maintenance.com"
}
```

### هـ. الإيرادات والتحليلات (Revenue & Analytics)

```javascript
// جلب بيانات الإيرادات
GET /api/v1/rental/revenue
Query Parameters:
  - period: month|quarter|year
  - from_date: YYYY-MM-DD
  - to_date: YYYY-MM-DD

Response:
{
  "status": "success",
  "data": [
    {
      "month": "يناير",
      "revenue": 462000,
      "expenses": 158000,
      "profit": 304000,
      "bookings": 165,
      "occupancyRate": 76
    }
  ]
}

// جلب مؤشرات الأداء
GET /api/v1/rental/kpis
Query Parameters:
  - date_range: today|week|month|quarter|year

Response:
{
  "status": "success",
  "data": {
    "totalRevenue": 462000,
    "occupancyRate": 76,
    "activeBookings": 165,
    "avgRentalDuration": 5.2,
    "customerRetention": 68,
    "revenuePerUnit": 17750
  }
}

// جلب إحصائيات الصيانة
GET /api/v1/maintenance/stats
Query Parameters:
  - period: month|quarter|year

Response:
{
  "status": "success",
  "data": {
    "totalRequests": 156,
    "pendingRequests": 12,
    "inProgressRequests": 8,
    "completedRequests": 136,
    "avgCompletionTime": 2.5,
    "totalCost": 45000,
    "monthlyCost": 8500
  }
}
```

### و. المزامنة (Sync)

```javascript
//触发 مزامنة البيانات
POST /api/v1/rental/sync
Body:
{
  "syncTypes": ["properties", "bookings", "customers", "maintenance"]
}

Response:
{
  "status": "success",
  "message": "تمت المزامنة بنجاح",
  "syncedAt": "2026-01-20T10:30:00Z",
  "details": {
    "properties": 10,
    "bookings": 8,
    "customers": 8,
    "maintenanceRequests": 6
  }
}

// جلب آخر مزامنة
GET /api/v1/rental/sync/last

Response:
{
  "status": "success",
  "data": {
    "lastSync": "2026-01-20T10:30:00Z",
    "nextSync": "2026-01-20T11:00:00Z",
    "status": "completed"
  }
}
```

## 3. تكوين التطبيق للاتصال بأودو

### أ. ملف البيئة (.env)

```env
VITE_ODOO_URL=https://your-odoo-instance.com
VITE_ODOO_DATABASE=rental_db
VITE_ODOO_USERNAME=api_user
VITE_ODOO_API_KEY=your-secret-api-key
VITE_ODOO_SYNC_INTERVAL=300000
```

### ب. تحديث خدمة Odoo

في `src/services/odooService.ts`:

```typescript
class OdooService {
  private config: OdooConfig = {
    url: import.meta.env.VITE_ODOO_URL || 'http://localhost:8069',
    database: import.meta.env.VITE_ODOO_DATABASE || 'rental_db',
    username: import.meta.env.VITE_ODOO_USERNAME || 'admin',
    apiKey: import.meta.env.VITE_ODOO_API_KEY || '',
  };

  // ... rest of the implementation
}
```

## 4. اختبار الاتصال

### أ. اختبار بسيط

```javascript
// في المتصفح أو Postman
fetch('https://your-odoo-instance.com/api/v1/rental/properties', {
  method: 'GET',
  headers: {
    'X-API-Key': 'your-api-key',
    'X-Database': 'your-database',
    'X-Username': 'your-username',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### ب. من التطبيق

1. اذهب إلى صفحة **ربط أودو**
2. أدخل بيانات الاتصال
3. اضغط على **اختبار الاتصال**
4. إذا نجح، اضغط على **حفظ**
5. اضغط على **مزامنة الآن** لجلب البيانات

## 5. الأمان

### أ. أفضل الممارسات

1. **استخدام HTTPS** دائماً
2. **تخزين API Keys** في متغيرات البيئة
3. **تفعيل CORS** للنطاقات المسموحة فقط
4. **معدل الطلبات** (Rate Limiting)
5. **تسجيل الدخول** (Logging) لجميع الطلبات
6. **انتهاء صلاحية المفاتيح** وتجديدها دورياً

### ب. صلاحيات الوصول

```xml
<!-- في أودو، ملف security/ir.model.access.csv -->
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_rental_property_user,rental.property.user,model_rental_property,group_rental_user,1,0,0,0
access_rental_property_manager,rental.property.manager,model_rental_property,group_rental_manager,1,1,1,1
access_rental_booking_user,rental.booking.user,model_rental_booking,group_rental_user,1,0,1,0
access_rental_booking_manager,rental.booking.manager,model_rental_booking,group_rental_manager,1,1,1,1
```

## 6. استكشاف الأخطاء

### أ. الأخطاء الشائعة

| الخطأ | السبب | الحل |
|-------|-------|------|
| 401 Unauthorized | API Key غير صحيح | تحقق من المفتاح |
| 403 Forbidden | لا توجد صلاحيات | تحقق من صلاحيات المستخدم |
| 404 Not Found | endpoint غير موجود | تحقق من الرابط |
| 500 Internal Server Error | خطأ في أودو | راجع سجلات أودو |
| CORS Error | CORS غير مُعد | فعّل CORS في odoo.conf |

### ب. سجلات أودو

```bash
# عرض سجلات أودو
tail -f /var/log/odoo/odoo.log

# أو من الواجهة
الإعدادات → تقنية → سجلات الأحداث
```

## 7. الدعم

للحصول على مساعدة إضافية:
- راجع توثيق أودو الرسمي: https://www.odoo.com/documentation
- اتصل بفريق الدعم الفني
- افتح تذكرة دعم
