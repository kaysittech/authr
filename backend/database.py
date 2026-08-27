import sqlite3
import json
import os
import hashlib
from typing import Dict, Any, List

DB_FILE = os.path.join(os.path.dirname(__file__), "rightsguard.db")

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # 1. Digital Twin Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS digital_twin (
        user_id TEXT PRIMARY KEY,
        user_name TEXT NOT NULL,
        handle TEXT NOT NULL,
        policy_mode TEXT NOT NULL,
        ai_fetch_rate REAL NOT NULL,
        ad_license_rate REAL NOT NULL,
        face_vector TEXT,
        voice_print TEXT
    )
    """)

    # 2. Protected Assets Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS protected_assets (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        media_type TEXT NOT NULL,
        original_url TEXT NOT NULL,
        thumbnail_url TEXT NOT NULL,
        phash TEXT NOT NULL,
        steg_payload TEXT NOT NULL,
        c2pa_signature TEXT NOT NULL,
        duration TEXT,
        platform TEXT NOT NULL,
        created_at TEXT NOT NULL,
        matches_count INTEGER DEFAULT 0
    )
    """)

    # 3. Detection Matches Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS detection_matches (
        id TEXT PRIMARY KEY,
        asset_id TEXT,
        asset_title TEXT NOT NULL,
        asset_type TEXT NOT NULL,
        target_platform TEXT NOT NULL,
        infringing_url TEXT NOT NULL,
        uploader_name TEXT NOT NULL,
        visual_similarity REAL NOT NULL,
        audio_similarity REAL NOT NULL,
        match_category TEXT NOT NULL,
        view_count INTEGER NOT NULL,
        estimated_lost_revenue REAL NOT NULL,
        detected_at TEXT NOT NULL,
        status TEXT NOT NULL,
        timestamp_start TEXT NOT NULL,
        timestamp_end TEXT NOT NULL
    )
    """)

    # 4. Settlement Claims Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS settlement_claims (
        id TEXT PRIMARY KEY,
        match_id TEXT NOT NULL,
        infringing_url TEXT NOT NULL,
        target_platform TEXT NOT NULL,
        uploader_name TEXT NOT NULL,
        match_category TEXT NOT NULL,
        retroactive_fee REAL NOT NULL,
        suggested_action TEXT NOT NULL,
        grace_period_hours_remaining INTEGER NOT NULL,
        claim_url TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL
    )
    """)

    # 5. Financial Transactions Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS financial_transactions (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        source TEXT NOT NULL,
        type TEXT NOT NULL,
        gross_amount REAL NOT NULL,
        platform_fee REAL NOT NULL,
        net_payout REAL NOT NULL,
        status TEXT NOT NULL
    )
    """)

    # 6. Sovereign Users Auth Table (with Government ID & Selfie KYC Verification)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        handle TEXT NOT NULL,
        discipline TEXT NOT NULL,
        avatar_url TEXT NOT NULL,
        created_at TEXT NOT NULL,
        kyc_status TEXT DEFAULT 'verified',
        kyc_verified_at TEXT,
        id_document_type TEXT DEFAULT 'drivers_license',
        id_match_score REAL DEFAULT 98.7
    )
    """)

    # Check and add columns if upgrading existing table
    cursor.execute("PRAGMA table_info(users)")
    user_cols = [row["name"] for row in cursor.fetchall()]
    if "kyc_status" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN kyc_status TEXT DEFAULT 'verified'")
    if "kyc_verified_at" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN kyc_verified_at TEXT")
    if "id_document_type" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN id_document_type TEXT DEFAULT 'drivers_license'")
    if "id_match_score" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN id_match_score REAL DEFAULT 98.7")

    # Upsert default demo user alex@authr.id
    cursor.execute("""
    INSERT OR REPLACE INTO users (id, email, password_hash, full_name, handle, discipline, avatar_url, created_at, kyc_status, kyc_verified_at, id_document_type, id_match_score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        "usr_892314",
        "alex@authr.id",
        hash_password("password123"),
        "Alex Rivera",
        "@arivera_official",
        "Musicians & Composers",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        "2026-07-15T10:00:00Z",
        "verified",
        "2026-07-15T10:05:00Z",
        "drivers_license",
        98.7
    ))

    conn.commit()
    seed_if_empty(conn)
    conn.close()

def seed_if_empty(conn):
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM digital_twin")
    if cursor.fetchone()[0] == 0:
        face_v = {
            "id": "fvec_9021",
            "landmarksCount": 128,
            "hashVector": "0x9F4A881C2B01E37A5D...E912B",
            "confidenceScore": 99.4,
            "sampleImageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
            "createdAt": "2026-07-15T10:30:00Z"
        }
        voice_p = {
            "id": "vprt_4410",
            "frequencyRange": "85Hz - 3.4kHz (HD Spectral)",
            "spectralSignature": "SIG_009182_AUDIO_VECTOR_V4",
            "sampleAudioUrl": "voice_sample_master.wav",
            "createdAt": "2026-07-15T10:35:00Z"
        }
        cursor.execute("""
        INSERT INTO digital_twin VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "usr_892314",
            "Alex Rivera",
            "@arivera_official",
            "micro_monetization",
            0.08,
            250.0,
            json.dumps(face_v),
            json.dumps(voice_p)
        ))

        # Seed assets
        assets = [
            ('ast_101', 'The Future of Autonomous AI Agents - Deep Dive Breakdown', 'video', 'https://youtube.com/watch?v=demo_asset_101', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', 'b9e4a3f120c8d76e', 'AUTHR-C2PA-USR892314-AST101-WATERMARK-OK', 'SHA256:8f920a1bc391d84e...01c4', '14:22', 'YouTube', '2026-08-01T14:20:00Z', 4),
            ('ast_102', '5 Productivity Hacks Every Creator Needs in 2026', 'video', 'https://tiktok.com/@arivera/video/781920', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80', 'c4f2e8d910a7b531', 'AUTHR-C2PA-USR892314-AST102-WATERMARK-OK', 'SHA256:7a419c82b104d92e...99e1', '0:58', 'TikTok', '2026-08-03T09:15:00Z', 2),
            ('ast_103', 'Podcast Keynote: Building Digital Assets with Sovereign Identity', 'audio', 'https://spotify.com/episode/9018234', 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80', 'a1b2c3d4e5f60718', 'AUTHR-AUDIO-SPECTRAL-USR892314-AST103', 'SHA256:3d91048e21a003f9...44a8', '42:10', 'Upload', '2026-08-05T18:40:00Z', 3)
        ]
        cursor.executemany("INSERT INTO protected_assets VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", assets)

        # Seed matches
        matches = [
            ('mtc_901', 'ast_101', 'The Future of Autonomous AI Agents', 'video', 'Instagram Reels', 'https://instagram.com/reels/C89x0192A', '@tech_dropship_daily', 96.4, 98.2, 'brand_commercial', 142000, 450.00, '2026-08-08T11:20:00Z', 'settlement_sent', '01:12', '03:45'),
            ('mtc_902', 'ast_102', '5 Productivity Hacks Every Creator Needs', 'video', 'YouTube Shorts', 'https://youtube.com/shorts/30192Aa-X', 'MotivationClips_Vault', 91.8, 89.0, 'organic_reupload', 88500, 125.00, '2026-08-08T09:45:00Z', 'flagged', '00:05', '00:52'),
            ('mtc_903', None, 'Facial Geometry & Biometric Scan', 'biometric_face', 'E-Commerce / Amazon', 'https://amazon.com/dp/B09X10928_storefront', 'GlobalFashionVendor_99', 94.1, 0.0, 'brand_commercial', 52000, 750.00, '2026-08-07T16:10:00Z', 'settlement_sent', '00:00', '00:00'),
            ('mtc_904', None, 'Voice Acoustic Clone Dataset', 'biometric_voice', 'Common Crawl AI', 'https://huggingface.co/datasets/unauthorized_voice_clones_v2', 'SyntheticVoices_Lab', 0.0, 97.9, 'ai_training_scraping', 3100, 280.00, '2026-08-06T12:00:00Z', 'licensed', '00:00', '12:40'),
            ('mtc_905', 'ast_101', 'The Future of Autonomous AI Agents', 'video', 'TikTok', 'https://tiktok.com/@ai_repost_hub/video/892019', '@ai_repost_hub', 88.5, 92.1, 'organic_reupload', 21500, 45.00, '2026-08-05T20:30:00Z', 'dmca_issued', '05:10', '06:00')
        ]
        cursor.executemany("INSERT INTO detection_matches VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", matches)

        # Seed claims
        claims = [
            ('clm_401', 'mtc_901', 'https://instagram.com/reels/C89x0192A', 'Instagram Reels', '@tech_dropship_daily', 'brand_commercial', 450.00, 'pay_license', 31, 'https://claim.authr.id/c89x0192a', 'pending', '2026-08-08T11:30:00Z'),
            ('clm_402', 'mtc_903', 'https://amazon.com/dp/B09X10928_storefront', 'E-Commerce / Amazon', 'GlobalFashionVendor_99', 'brand_commercial', 750.00, 'pay_license', 14, 'https://claim.authr.id/amazon-b09x10928', 'pending', '2026-08-07T16:30:00Z'),
            ('clm_403', 'mtc_904', 'https://huggingface.co/datasets/unauthorized_voice_clones_v2', 'Common Crawl AI', 'SyntheticVoices_Lab', 'ai_training_scraping', 280.00, 'pay_license', 0, 'https://claim.authr.id/hf-voice-clone-2', 'paid', '2026-08-06T13:00:00Z')
        ]
        cursor.executemany("INSERT INTO settlement_claims VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", claims)

        # Seed transactions
        txns = [
            ('txn_1001', '2026-08-07T14:22:00Z', 'SyntheticVoices_Lab (Common Crawl AI License)', 'micro_license', 280.00, 42.00, 238.00, 'completed'),
            ('txn_1002', '2026-08-04T18:10:00Z', 'YouTube Content ID Ad Revenue Claim (#ast_101)', 'ad_revenue_claim', 310.50, 46.58, 263.92, 'completed'),
            ('txn_1003', '2026-07-29T11:05:00Z', 'Nexus Media Corp (Retroactive Ad Settlement)', 'settlement_fee', 1200.00, 180.00, 1020.00, 'completed')
        ]
        cursor.executemany("INSERT INTO financial_transactions VALUES (?,?,?,?,?,?,?,?)", txns)

        conn.commit()
