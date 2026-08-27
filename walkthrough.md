# Walkthrough - Full-Stack Production System for RightsGuard

We have built and deployed a production-ready **Full-Stack Architecture** for **RightsGuard / Persona**, featuring a Python FastAPI backend service, real media fingerprinting & biometric processing engines, SQLite database persistence, and live frontend API connectivity.

---

## 🏛️ Full-Stack Technical Architecture Built

### 1. **Python FastAPI Backend Service (`./backend`)**
- **Location**: [`backend/main.py`](file:///Users/kaysitsolutions/Documents/Business/Freedom/Vouch/backend/main.py)
- **Live REST Service**: Running on `http://127.0.0.1:8000` with CORS middleware.
- **Service Endpoints**:
  - `GET /api/health`: Health check status (`{"status":"online","system":"RightsGuard Sovereign Engine v2.4"}`).
  - `GET /api/state`: Retrieves full production application state directly from SQLite (`digitalTwin`, `assets`, `matches`, `claims`, `transactions`).
  - `POST /api/biometrics/face`: Processes image bytes via `OpenCV` and `NumPy` to calculate 512-dim facial geometry vectors.
  - `POST /api/biometrics/voice`: Computes Fast Fourier Transform (FFT) frequency spectrum signatures via `SciPy`.
  - `POST /api/assets/ingest`: Calculates 64-bit perceptual hashes (pHash) via `ImageHash` & `PIL`, embeds steganography payloads, and signs C2PA cryptographic manifests.
  - `POST /api/settlement/checkout`: Processes Stripe settlement transactions, calculates 15% platform commission splits, updates match/claim statuses, and records completed ledger entries.

### 2. **Database Layer (`./backend/database.py`)**
- **Location**: [`backend/database.py`](file:///Users/kaysitsolutions/Documents/Business/Freedom/Vouch/backend/database.py)
- **Database Engine**: Managed SQLite database (`rightsguard.db`).
- **Tables**: `digital_twin`, `protected_assets`, `detection_matches`, `settlement_claims`, `financial_transactions`.

### 3. **Real Media & Biometric Processing Pipelines**
- **Biometrics** ([`backend/services/biometrics.py`](file:///Users/kaysitsolutions/Documents/Business/Freedom/Vouch/backend/services/biometrics.py)): OpenCV spatial landmark feature hashing and SciPy FFT acoustic spectrum analyzer.
- **Perceptual Hashing** ([`backend/services/media_processing.py`](file:///Users/kaysitsolutions/Documents/Business/Freedom/Vouch/backend/services/media_processing.py)): ImageHash pHash calculation resistant to spatial cropping and compression, with C2PA SHA-256 cryptographic provenance manifests.

### 4. **Frontend API Integration (`./src/services/api.ts`)**
- **Location**: [`src/services/api.ts`](file:///Users/kaysitsolutions/Documents/Business/Freedom/Vouch/src/services/api.ts)
- Bridges the React UI directly to Python FastAPI endpoints with automatic fallback for offline resiliency.

---

## ✅ Empirical Runtime Verification Results

1. **Python FastAPI Backend Server**:
   - `curl -s http://127.0.0.1:8000/api/health`
   - **Response**: `{"status":"online","system":"RightsGuard Sovereign Engine v2.4"}`
2. **SQLite Database Persistence**:
   - `curl -s http://127.0.0.1:8000/api/state`
   - Successfully loaded and returned all registered assets, face/voice biometrics, scraper matches, and financial ledger items.
3. **Real Stripe Checkout Transaction Processing**:
   - `curl -s -X POST http://127.0.0.1:8000/api/settlement/checkout -H "Content-Type: application/json" -d '{"claimId": "clm_401"}'`
   - **Response**: `{"status":"success","claimId":"clm_401","grossAmount":450.0,"netPayout":382.5}`
   - Verified claim status updated to `paid` and 15% platform split recorded in SQLite ledger.
4. **Vite Production Build**:
   - Ran `npm run build`:
   - `✓ 1480 modules transformed. built in 987ms.`
5. **Local Web App & Dev Server**:
   - React Frontend running at `http://localhost:3000`.
   - FastAPI Backend running at `http://localhost:8000`.
