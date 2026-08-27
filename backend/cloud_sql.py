# ==========================================
# Authr - Google Cloud SQL PostgreSQL Engine
# ==========================================
import os
import json
import sqlite3
from typing import Dict, Any, List

# PostgreSQL database URL from Cloud SQL environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "")
INSTANCE_CONNECTION_NAME = os.getenv("CLOUD_SQL_CONNECTION_NAME", "")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASS", "authr_secure_password_2026")
DB_NAME = os.getenv("DB_NAME", "authr_db")

# Fallback to local SQLite file
DB_FILE = os.path.join(os.path.dirname(__file__), "rightsguard.db")

def get_db_connection():
    """
    Connects to Google Cloud SQL PostgreSQL if DATABASE_URL or CLOUD_SQL_CONNECTION_NAME is set,
    otherwise falls back to high-performance local SQLite for local dev.
    """
    if DATABASE_URL and DATABASE_URL.startswith("postgresql"):
        try:
            import psycopg2
            import psycopg2.extras
            conn = psycopg2.connect(DATABASE_URL, cursor_factory=psycopg2.extras.DictCursor)
            return conn
        except Exception as e:
            print(f"[Google Cloud SQL Warning] PostgreSQL connection failed: {e}. Falling back to SQLite.")

    # SQLite fallback connection
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_cloud_sql_tables():
    """
    Creates PostgreSQL database schema for Google Cloud SQL instance.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # Determine if SQLite or PostgreSQL
    is_sqlite = isinstance(conn, sqlite3.Connection)

    text_type = "TEXT"
    real_type = "REAL" if is_sqlite else "DOUBLE PRECISION"
    int_type = "INTEGER"

    # 1. Users Table
    cursor.execute(f"""
    CREATE TABLE IF NOT EXISTS users (
        id {text_type} PRIMARY KEY,
        email {text_type} UNIQUE NOT NULL,
        password_hash {text_type} NOT NULL,
        full_name {text_type} NOT NULL,
        handle {text_type} NOT NULL,
        discipline {text_type} NOT NULL,
        avatar_url {text_type},
        created_at {text_type} NOT NULL,
        kyc_status {text_type} DEFAULT 'verified',
        kyc_verified_at {text_type},
        id_document_type {text_type},
        id_match_score {real_type}
    );
    """)

    # 2. Digital Twin Table
    cursor.execute(f"""
    CREATE TABLE IF NOT EXISTS digital_twin (
        user_id {text_type} PRIMARY KEY,
        user_name {text_type} NOT NULL,
        handle {text_type} NOT NULL,
        policy_mode {text_type} NOT NULL,
        ai_fetch_rate {real_type} NOT NULL,
        ad_license_rate {real_type} NOT NULL,
        face_vector {text_type},
        voice_print {text_type}
    );
    """)

    # 3. Protected Assets Table
    cursor.execute(f"""
    CREATE TABLE IF NOT EXISTS protected_assets (
        id {text_type} PRIMARY KEY,
        title {text_type} NOT NULL,
        media_type {text_type} NOT NULL,
        original_url {text_type} NOT NULL,
        thumbnail_url {text_type} NOT NULL,
        phash {text_type} NOT NULL,
        steg_payload {text_type} NOT NULL,
        c2pa_signature {text_type} NOT NULL,
        duration {text_type},
        platform {text_type} NOT NULL,
        created_at {text_type} NOT NULL,
        matches_count {int_type} DEFAULT 0
    );
    """)

    # 4. Detection Matches Table
    cursor.execute(f"""
    CREATE TABLE IF NOT EXISTS detection_matches (
        id {text_type} PRIMARY KEY,
        asset_id {text_type},
        asset_title {text_type} NOT NULL,
        asset_type {text_type} NOT NULL,
        target_platform {text_type} NOT NULL,
        infringing_url {text_type} NOT NULL,
        uploader_name {text_type} NOT NULL,
        visual_similarity {real_type} NOT NULL,
        audio_similarity {real_type} NOT NULL,
        match_category {text_type} NOT NULL,
        view_count {int_type} NOT NULL,
        estimated_lost_revenue {real_type} NOT NULL,
        detected_at {text_type} NOT NULL,
        status {text_type} NOT NULL,
        timestamp_start {text_type} NOT NULL,
        timestamp_end {text_type} NOT NULL
    );
    """)

    # 5. Settlement Claims Table
    cursor.execute(f"""
    CREATE TABLE IF NOT EXISTS settlement_claims (
        id {text_type} PRIMARY KEY,
        match_id {text_type} NOT NULL,
        infringing_url {text_type} NOT NULL,
        target_platform {text_type} NOT NULL,
        uploader_name {text_type} NOT NULL,
        match_category {text_type} NOT NULL,
        retroactive_fee {real_type} NOT NULL,
        suggested_action {text_type} NOT NULL,
        grace_period_hours_remaining {int_type} NOT NULL,
        claim_url {text_type} NOT NULL,
        status {text_type} NOT NULL,
        created_at {text_type} NOT NULL
    );
    """)

    # 6. Financial Transactions Table
    cursor.execute(f"""
    CREATE TABLE IF NOT EXISTS financial_transactions (
        id {text_type} PRIMARY KEY,
        date {text_type} NOT NULL,
        source {text_type} NOT NULL,
        type {text_type} NOT NULL,
        gross_amount {real_type} NOT NULL,
        platform_fee {real_type} NOT NULL,
        net_payout {real_type} NOT NULL,
        status {text_type} NOT NULL
    );
    """)

    conn.commit()
    conn.close()
    print("[Google Cloud SQL Engine] Database Schema Initialized Successfully!")
