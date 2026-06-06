!/bin/bash

# Run this from the root of your project
# Example:
# chmod +x setup.sh
# ./setup.sh

echo "Creating project structure..."

# Root folders
mkdir -p tests

# Src folders
mkdir -p src/config
mkdir -p src/routes
mkdir -p src/controllers
mkdir -p src/services/ingestion
mkdir -p src/services/classification
mkdir -p src/services/impact
mkdir -p src/services/analytics
mkdir -p src/services/reports
mkdir -p src/services/auth
mkdir -p src/services/subscriptions
mkdir -p src/repositories
mkdir -p src/models
mkdir -p src/middleware
mkdir -p src/validators
mkdir -p src/jobs
mkdir -p src/utils

# Config
touch src/config/database.ts
touch src/config/env.ts
touch src/config/logger.ts

# Routes
touch src/routes/auth.routes.ts
touch src/routes/users.routes.ts
touch src/routes/extension.routes.ts
touch src/routes/analytics.routes.ts
touch src/routes/reports.routes.ts
touch src/routes/subscriptions.routes.ts
touch src/routes/settings.routes.ts

# Controllers
touch src/controllers/auth.controller.ts
touch src/controllers/users.controller.ts
touch src/controllers/extension.controller.ts
touch src/controllers/analytics.controller.ts
touch src/controllers/reports.controller.ts
touch src/controllers/subscriptions.controller.ts
touch src/controllers/settings.controller.ts

# Services - Ingestion
touch src/services/ingestion/contentIngestion.service.ts
touch src/services/ingestion/contentNormalizer.service.ts
touch src/services/ingestion/sourceProcessor.service.ts

# Services - Classification
touch src/services/classification/topicClassifier.service.ts
touch src/services/classification/sentimentClassifier.service.ts
touch src/services/classification/emotionClassifier.service.ts
touch src/services/classification/riskClassifier.service.ts

# Services - Impact
touch src/services/impact/impactEngine.service.ts
touch src/services/impact/wellbeingScorer.service.ts
touch src/services/impact/trendAnalyzer.service.ts

# Services - Analytics
touch src/services/analytics/dashboard.service.ts
touch src/services/analytics/categoryAnalytics.service.ts
touch src/services/analytics/emotionAnalytics.service.ts
touch src/services/analytics/usageAnalytics.service.ts

# Services - Reports
touch src/services/reports/dailyReport.service.ts
touch src/services/reports/weeklyReport.service.ts
touch src/services/reports/monthlyReport.service.ts
touch src/services/reports/pdfReport.service.ts

# Services - Auth
touch src/services/auth/auth.service.ts
touch src/services/auth/jwt.service.ts
touch src/services/auth/password.service.ts

# Services - Subscriptions
touch src/services/subscriptions/subscription.service.ts
touch src/services/subscriptions/billing.service.ts

# Repositories
touch src/repositories/user.repository.ts
touch src/repositories/content.repository.ts
touch src/repositories/analytics.repository.ts
touch src/repositories/report.repository.ts
touch src/repositories/subscription.repository.ts

# Models
touch src/models/User.ts
touch src/models/ContentEvent.ts
touch src/models/Classification.ts
touch src/models/ImpactAnalysis.ts
touch src/models/Report.ts
touch src/models/Subscription.ts

# Middleware
touch src/middleware/auth.middleware.ts
touch src/middleware/validation.middleware.ts
touch src/middleware/rateLimit.middleware.ts
touch src/middleware/error.middleware.ts

# Validators
touch src/validators/auth.validator.ts
touch src/validators/extension.validator.ts
touch src/validators/reports.validator.ts

# Jobs
touch src/jobs/dailyReports.job.ts
touch src/jobs/weeklyReports.job.ts
touch src/jobs/monthlyReports.job.ts

# Utils
touch src/utils/constants.ts
touch src/utils/helpers.ts
touch src/utils/date.ts

# Main app
touch src/app.ts

# Root files
touch package.json

echo "Project structure created successfully."
