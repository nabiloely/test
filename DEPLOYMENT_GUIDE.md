# دليل إطلاق ونشر التطبيق (Deployment Guide)

## 1. متطلبات النظام

### أ. الحد الأدنى

- **Node.js**: 18.x أو أحدث
- **npm**: 9.x أو أحدث
- **الذاكرة**: 512 MB RAM
- **التخزين**: 1 GB مساحة حرة

### ب. الموصى به

- **Node.js**: 20.x LTS
- **npm**: 10.x
- **الذاكرة**: 2 GB RAM
- **التخزين**: 5 GB مساحة حرة
- **نطاق مخصص**: https://your-domain.com
- **شهادة SSL**: Let's Encrypt أو غيرها

## 2. بناء التطبيق للإنتاج

### أ. البناء المحلي

```bash
# تثبيت المتطلبات
npm install

# بناء التطبيق
npm run build

# سيتم إنشاء الملفات في مجلد dist/
```

### ب. فحص البناء

```bash
# بعد البناء، افحص المجلد
ls -la dist/

# يجب أن يحتوي على:
# - index.html
# - assets/ (ملفات JS و CSS)
```

## 3. خيارات النشر

### الخيار 1: Vercel (الأسهل - مجاني)

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel --prod

# أو ببساطة
vercel
```

**إعدادات Vercel:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### الخيار 2: Netlify

```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# تسجيل الدخول
netlify login

# النشر
netlify deploy --prod --dir=dist
```

**إعدادات Netlify:**
- Base directory: `/`
- Build command: `npm run build`
- Publish directory: `dist`

### الخيار 3: خادم خاص (VPS)

#### أ. إعداد الخادم (Ubuntu/Debian)

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# تثبيت npm
sudo apt-get install -y npm

# تثبيت Nginx
sudo apt install nginx -y

# تثبيت PM2 لإدارة التطبيق
sudo npm install -g pm2
```

#### ب. رفع التطبيق

```bash
# إنشاء مجلد للتطبيق
sudo mkdir -p /var/www/rental-app
sudo chown -R $USER:$USER /var/www/rental-app

# رفع ملفات dist/
# يمكنك استخدام SCP أو Git
scp -r dist/* user@your-server:/var/www/rental-app/

# أو باستخدام Git
cd /var/www/rental-app
git clone https://github.com/your-repo/rental-app.git
npm install
npm run build
```

#### ج. إعداد Nginx

```bash
# إنشاء ملف إعداد Nginx
sudo nano /etc/nginx/sites-available/rental-app
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/rental-app;
    index index.html;

    #gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# تفعيل الموقع
sudo ln -s /etc/nginx/sites-available/rental-app /etc/nginx/sites-enabled/

# اختبار الإعداد
sudo nginx -t

# إعادة تشغيل Nginx
sudo systemctl restart nginx
```

#### د. إعداد SSL (Let's Encrypt)

```bash
# تثبيت Certbot
sudo apt install certbot python3-certbot-nginx -y

# الحصول على شهادة SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# التجديد التلقائي
sudo certbot renew --dry-run
```

#### هـ. إعداد PM2 (اختياري - إذا كان لديك backend)

```bash
# إنشاء ملف ecosystem.config.js
module.exports = {
  apps: [{
    name: 'rental-app',
    script: 'npm',
    args: 'run serve',
    env: {
      NODE_ENV: 'production',
    }
  }]
};

# بدء التطبيق
pm2 start ecosystem.config.js

# جعله يبدأ مع النظام
pm2 startup
pm2 save
```

### الخيار 4: Docker

#### أ. إنشاء Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### ب. إنشاء nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### ج. إنشاء docker-compose.yml

```yaml
version: '3.8'
services:
  rental-app:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    networks:
      - rental-network

networks:
  rental-network:
    driver: bridge
```

#### د. تشغيل Docker

```bash
# بناء الصورة
docker-compose build

# تشغيل الحاوية
docker-compose up -d

# عرض السجلات
docker-compose logs -f
```

## 4. متغيرات البيئة للإنتاج

### أ. إنشاء ملف .env.production

```env
VITE_ODOO_URL=https://your-odoo-instance.com
VITE_ODOO_DATABASE=production_db
VITE_ODOO_USERNAME=api_user
VITE_ODOO_API_KEY=production-api-key
VITE_APP_NAME=نظام حجز العقارات
VITE_APP_VERSION=1.0.0
```

### ب. استخدام المتغيرات في البناء

```bash
# بناء مع متغيرات البيئة
export VITE_ODOO_URL=https://your-odoo.com
export VITE_ODOO_DATABASE=prod_db
npm run build
```

## 5. اختبار ما بعد النشر

### قائمة التحقق

- [ ] التطبيق يفتح بدون أخطاء
- [ ] جميع الصفحات تعمل
- [ ] الرسوم البيانية تظهر بشكل صحيح
- [ ] النماذج تعمل (حجز، صيانة، إلخ)
- [ ] الاتصال بأودو يعمل
- [ ] SSL مُفعّل
- [ ] الضغط (gzip) مُفعّل
- [ ] التخزين المؤقت يعمل
- [ ]Responsive على الجوال

### أدوات الاختبار

```bash
# اختبار السرعة
https://pagespeed.web.dev/

# اختبار SSL
https://www.ssllabs.com/ssltest/

# اختبار الأداء
https://webpagetest.org/
```

## 6. المراقبة والصيانة

### أ. إعداد المراقبة

```bash
# تثبيت أدوات المراقبة
sudo apt install htop iotop -y

# مراقبة استخدام الموارد
htop

# مراقبة سجلات Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### ب. النسخ الاحتياطي

```bash
# إنشاء سكريبت نسخ احتياطي
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/rental-app_$DATE"

mkdir -p $BACKUP_DIR
cp -r /var/www/rental-app $BACKUP_DIR/

# ضغط النسخة
tar -czf $BACKUP_DIR.tar.gz $BACKUP_DIR

# رفع إلى S3 أو تخزين سحابي
# aws s3 cp $BACKUP_DIR.tar.gz s3://your-bucket/

# حذف النسخ القديمة (أقدم من 7 أيام)
find /backups -name "*.tar.gz" -mtime +7 -delete
```

```bash
# جدولة النسخ الاحتياطي
crontab -e

# إضافة سطر للنسخ اليومي الساعة 2 صباحاً
0 2 * * * /path/to/backup.sh
```

### ج. التحديثات

```bash
# تحديث التطبيق
cd /var/www/rental-app
git pull origin main
npm install
npm run build
sudo systemctl restart nginx

# أو باستخدام PM2
pm2 restart rental-app
```

## 7. استكشاف أخطاء النشر

### أ. المشاكل الشائعة

| المشكلة | الحل |
|---------|------|
| صفحة بيضاء | تحقق من console errors، تأكد من build صحيح |
| 404 عند التحديث | تأكد من try_files في Nginx |
| بطء التحميل | فعّل gzip، استخدم CDN |
| SSL لا يعمل | تحقق من Certbot، أعد تشغيل Nginx |
| CORS errors | فعّل CORS في أودو |

### ب. السجلات

```bash
# سجلات Nginx
/var/log/nginx/access.log
/var/log/nginx/error.log

# سجلات النظام
journalctl -u nginx -f

# سجلات Node (إذا استخدمت PM2)
pm2 logs
```

## 8. الأداء والتحسين

### أ. تحسينات موصى بها

1. **CDN**: استخدم Cloudflare أو CloudFront
2. **ضغط الصور**: حوّل الصور إلى WebP
3. **تقسيم الكود**: Code splitting في Vite
4. **تخزين مؤقت**: Cache-Control headers
5. **Preload**: للملفات المهمة

### ب. إعداد Vite للتحسين

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
```

## 9. الدعم الفني

للحصول على مساعدة:
- راجع السجلات أولاً
- تحقق من متغيرات البيئة
- اختبر الاتصال بأودو
- تواصل مع فريق الدعم

---

**ملاحظة**: احفظ دائماً نسخة احتياطية قبل أي تحديث!
