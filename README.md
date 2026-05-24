# نظام حجز الفيلات والشاليهات والأجنحة - ربط أودو

تطبيق React متكامل لحجز وإدارة الفيلات والشاليهات والأجنحة مع إمكانية الربط الكامل مع نظام أودو ERP.

## المميزات الرئيسية

### 🏠 أنواع العقارات المدعومة
- **الفيلات** - فيلات فاخرة بمواصفات عالية
- **الشاليهات** - شاليهات ساحلية وترفيهية
- **الأجنحة** - أجنحة فندقية وخدمية

### 📊 لوحة التحكم
- مؤشرات الأداء الرئيسية (KPI)
- تحليلات الإيرادات والمصروفات
- معدلات الإشغال
- آخر الحجوزات

### 📅 إدارة الحجوزات
- نموذج حجز متكامل
- تتبع حالة الحجز
- متابعة المدفوعات
- تقويم الحجوزات

### 👥 إدارة العملاء
- مستويات الولاء (برونزي، فضي، ذهبي، بلاتيني)
- سجل الحجوزات
- بيانات التواصل

### 🔧 إدارة الصيانة
- طلبات الصيانة والإبلاغ عنها
- تتبع حالة الطلبات
- فرق الصيانة والتعيين
- تكاليف الصيانة
- أولويات الطلبات (عاجل، عالي، متوسط، منخفض)

### 💰 التحليلات المالية
- تقارير الإيرادات الشهرية
- تتبع المصروفات
- هوامش الربح
- التوزيع حسب نوع العقار

### 🔗 الربط مع أودو
- مزامنة تلقائية للبيانات
- API كامل للتكامل
- إدارة العقارات والحجوزات والعملاء والصيانة
- إعدادات الاتصال المرنة


## Features

### 📊 Dashboard Overview
- **KPI Cards**: Real-time metrics including revenue, occupancy rate, bookings, and more
- **Revenue Analytics**: Interactive charts showing revenue, expenses, and profit trends
- **Occupancy Charts**: Visual representation of property occupancy rates
- **Recent Bookings**: Quick view of latest booking activities

### 🏠 Property Management
- View all properties in a grid layout
- Filter by property type (Apartment, House, Commercial, Vehicle, Equipment)
- Filter by status (Available, Occupied, Maintenance, Reserved)
- Property performance metrics (occupancy rate, revenue, ratings)

### 📅 Booking Management
- Comprehensive booking table with status tracking
- Payment status monitoring (Paid, Partial, Unpaid)
- Search and filter capabilities
- Booking statistics and revenue tracking

### 👥 Customer Analytics
- Customer loyalty tiers (Bronze, Silver, Gold, Platinum)
- Total bookings and spending tracking
- Contact information management
- Customer search and filtering

### 💰 Revenue Analytics
- Monthly revenue breakdown
- Expense tracking
- Profit margin calculations
- Revenue by property type distribution
- Historical financial data

### 📈 Advanced Analytics
- Booking vs Revenue correlation
- Property performance comparisons
- Customer spending analysis
- Key performance indicators

### 📄 Reports
- Pre-built report templates
- Multiple export formats (PDF, Excel)
- Scheduled reports
- Custom report generation

### 🔗 Odoo Integration
- Full API integration with Odoo ERP
- Real-time data synchronization
- Property, booking, and customer sync
- Configurable connection settings
- API endpoint documentation

### ⚙️ Settings
- General company settings
- Notification preferences
- Appearance customization (Light/Dark/Auto themes)
- Regional settings (Currency, Language, Timezone)
- Security settings with 2FA support
- Data management (Export/Import)

## التقنيات المستخدمة

- **الواجهة الأمامية**: React 18 مع TypeScript
- **أداة البناء**: Vite
- **التنسيق**: Tailwind CSS
- **الرسوم البيانية**: Recharts
- **الأيقونات**: Lucide React
- **عميل HTTP**: Axios
- **معالجة التواريخ**: date-fns

## التقنيات المستخدمة

- **الواجهة الأمامية**: React 18 مع TypeScript
- **أداة البناء**: Vite
- **التنسيق**: Tailwind CSS
- **الرسوم البيانية**: Recharts
- **الأيقونات**: Lucide React
- **عميل HTTP**: Axios

## بنية المشروع

```
src/
├── components/          # مكونات الواجهة
│   ├── PropertyCard.tsx     # بطاقة العقار
│   ├── BookingForm.tsx      # نموذج الحجز
│   ├── KPICard.tsx          # بطاقة المؤشرات
│   ├── RevenueChart.tsx     # رسم الإيرادات
│   ├── BookingsTable.tsx    # جدول الحجوزات
│   ├── PropertiesGrid.tsx   # شبكة العقارات
│   ├── Sidebar.tsx          # القائمة الجانبية
│   └── Header.tsx           # الرأس
├── pages/              # الصفحات
│   ├── DashboardPage.tsx  # لوحة التحكم
│   ├── PropertiesPage.tsx # صفحة العقارات
│   ├── BookingsPage.tsx   # صفحة الحجوزات
│   ├── CustomersPage.tsx  # صفحة العملاء
│   ├── RevenuePage.tsx    # صفحة الإيرادات
│   ├── OdooSyncPage.tsx   # صفحة الربط مع أودو
│   └── SettingsPage.tsx   # صفحة الإعدادات
├── services/           # خدمات API
│   └── odooService.ts   # خدمة أودو
├── data/              # البيانات التجريبية
│   └── mockData.ts
├── types/             # تعريفات TypeScript
│   └── index.ts
└── App.tsx            # المكون الرئيسي
```

## التكامل مع أودو

### الإعدادات

يتصل التطبيق بأودو عبر REST API. يمكن تكوين الاتصال من صفحة ربط أودو:

- **رابط أودو**: عنوان خادم أودو
- **قاعدة البيانات**: اسم قاعدة البيانات
- **اسم المستخدم**: اسم المستخدم للـ API
- **مفتاح API**: مفتاح المصادقة

### نقاط API المستخدمة

- `GET /api/v1/rental/properties` - جلب جميع العقارات
- `GET /api/v1/rental/bookings` - جلب جميع الحجوزات
- `POST /api/v1/rental/bookings` - إنشاء حجز جديد
- `GET /api/v1/rental/customers` - جلب جميع العملاء
- `GET /api/v1/rental/kpis` - جلب مؤشرات الأداء
- `GET /api/v1/rental/revenue` - جلب بيانات الإيرادات
- `POST /api/v1/rental/sync` -触发 مزامنة البيانات

### نماذج البيانات

يدعم التطبيق نماذج البيانات التالية:

- **العقار**: المعرف، الاسم، النوع، الموقع، الحالة، الأسعار، الإشغال
- **الحجز**: المعرف، العقار، العميل، التواريخ، المبلغ، الحالة، الدفع
- **العميل**: المعرف، الاسم، التواصل، الحجوزات، الإنفاق، مستوى الولاء
- **الإيرادات**: الشهر، الإيرادات، المصروفات، الربح، عدد الحجوزات

## البدء

### المتطلبات

- Node.js 18+
- npm أو yarn
-实例 أودو (للتكامل)

### التثبيت

```bash
# تثبيت المتطلبات
npm install

# تشغيل خادم التطوير
npm run dev

# البناء للإنتاج
npm run build
```

## التخصيص

### إضافة مؤشرات جديدة

عدل الملف `src/data/mockData.ts` لإضافة مؤشرات أداء جديدة.

### إضافة أنواع عقارات جديدة

حدث مصفوفة `propertyTypes` في `src/data/mockData.ts`.

### تخصيص السمة

عدل إعدادات السمة في `src/pages/SettingsPage.tsx`.

## التصميم المتجاوب

اللوحة متجاوبة بالكامل وتعمل على:
- أجهزة سطح المكتب (1024px+)
- الأجهزة اللوحية (768px - 1023px)
- الهواتف المحمولة (320px - 767px)

## دعم المتصفحات

- Chrome (أحدث إصدار)
- Firefox (أحدث إصدار)
- Safari (أحدث إصدار)
- Edge (أحدث إصدار)

## التوثيق

- **[دليل الربط مع أودو](ODOO_INTEGRATION.md)** - شرح تفصيلي لكيفية ربط التطبيق مع نظام أودو
- **[دليل النشر](DEPLOYMENT_GUIDE.md)** - خطوات إطلاق التطبيق على سيرفر الإنتاج

## الترخيص

ترخيص MIT - يمكنك استخدام هذا المشروع لأعمالك.

---

بُحب ❤️ باستخدام React و Vite و Tailwind CSS

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── KPICard.tsx
│   ├── RevenueChart.tsx
│   ├── OccupancyChart.tsx
│   ├── BookingsTable.tsx
│   ├── PropertiesGrid.tsx
│   ├── CustomersTable.tsx
│   ├── Sidebar.tsx
│   └── Header.tsx
├── pages/              # Page components
│   ├── DashboardPage.tsx
│   ├── PropertiesPage.tsx
│   ├── BookingsPage.tsx
│   ├── CustomersPage.tsx
│   ├── RevenuePage.tsx
│   ├── AnalyticsPage.tsx
│   ├── ReportsPage.tsx
│   ├── OdooSyncPage.tsx
│   └── SettingsPage.tsx
├── services/           # API services
│   └── odooService.ts
├── data/              # Mock data for demonstration
│   └── mockData.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Odoo Integration

### Configuration

The dashboard connects to Odoo through a REST API. Configure the connection in the Odoo Sync page:

- **Odoo URL**: Your Odoo instance URL
- **Database**: Database name
- **Username**: API username
- **API Key**: Authentication key

### API Endpoints

The application uses the following Odoo API endpoints:

- `GET /api/v1/rental/properties` - Get all properties
- `GET /api/v1/rental/bookings` - Get all bookings
- `POST /api/v1/rental/bookings` - Create new booking
- `GET /api/v1/rental/customers` - Get all customers
- `GET /api/v1/rental/kpis` - Get KPI metrics
- `GET /api/v1/rental/revenue` - Get revenue data
- `POST /api/v1/rental/sync` - Trigger data sync
- `GET /api/v1/rental/reports/{type}` - Generate reports

### Data Models

The application supports the following data models:

- **Property**: ID, name, type, location, status, rates, occupancy, revenue
- **Booking**: ID, property, customer, dates, amount, status, payment
- **Customer**: ID, name, contact, bookings, spending, loyalty tier
- **Revenue**: Month, revenue, expenses, profit, bookings count

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Odoo instance (for integration)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file for Odoo configuration:

```
VITE_ODOO_URL=https://your-odoo-instance.com
VITE_ODOO_DATABASE=rental_db
VITE_ODOO_USERNAME=admin
VITE_ODOO_API_KEY=your-api-key
```

## Customization

### Adding New KPIs

Edit `src/data/mockData.ts` to add new KPI metrics:

```typescript
{
  id: '7',
  title: 'New KPI',
  value: '100',
  change: 5.5,
  changeType: 'positive',
  icon: 'trending-up',
  description: 'Description'
}
```

### Adding New Property Types

Update the `propertyTypes` array in `src/data/mockData.ts`:

```typescript
{ value: 'newtype', label: 'New Type' }
```

### Customizing Themes

Modify the theme settings in `src/pages/SettingsPage.tsx` or update Tailwind configuration.

## Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your rental business needs.

## Support

For questions or issues, please contact the development team.

---

Built with ❤️ using React, Vite, and Tailwind CSS
