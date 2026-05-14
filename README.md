# Inventory Export Internship App

Web application for managing users and assigned inventory items.

## Backend

Run from the repository root:

```bash
dotnet restore
dotnet run --project backend/InventoryExport.Api
```

The API starts on:

```txt
http://localhost:5087
```

Swagger is available in development:

```txt
http://localhost:5087/swagger
```

Main endpoints:

```txt
GET    /api/users?page=1&pageSize=10
GET    /api/inventory-items?page=1&pageSize=10&type=&comment=&userId=
DELETE /api/inventory-items/{id}
GET    /api/export/pdf?template=Classic&type=&comment=&userId=
```

Soft delete sets `InventoryItem.IsActive = false`. Inactive items remain visible in
the UI, but the export service always excludes them.

List endpoints return paginated responses:

```json
{
  "items": [],
  "page": 1,
  "pageSize": 10,
  "totalItems": 0,
  "totalPages": 1
}
```

## Frontend

Run from `frontend/inventory-export-ui`:

```bash
npm install
npm run dev
```

The frontend starts on:

```txt
http://localhost:5173
```

If the backend URL changes, create `frontend/inventory-export-ui/.env`:

```txt
VITE_API_URL=http://localhost:5087/api
```

## Tests

Run from the repository root:

```bash
dotnet test
```
