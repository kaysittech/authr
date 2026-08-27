const PRODUCTION_CLOUD_RUN_URL = 'https://authr-backend-service-902184-uc.a.run.app/api';

export const API_BASE_URL = 
  ((import.meta as any).env && (import.meta as any).env.VITE_API_BASE_URL) || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:8000/api' 
    : PRODUCTION_CLOUD_RUN_URL);

export async function loginApi(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Login failed');
  }

  return response.json();
}

export async function verifyIdentityApi(docType: string, idFile: File, selfieFile: File) {
  const formData = new FormData();
  formData.append('doc_type', docType);
  formData.append('id_file', idFile);
  formData.append('selfie_file', selfieFile);

  const response = await fetch(`${API_BASE_URL}/auth/verify-identity`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Identity verification failed');
  }

  return response.json();
}

export async function registerApi(
  email: string,
  password: string,
  fullName: string,
  handle: string,
  discipline: string,
  kycToken: string,
  idDocumentType: string = 'drivers_license',
  idMatchScore: number = 98.7
) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      fullName,
      handle,
      discipline,
      kycToken,
      idDocumentType,
      idMatchScore
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Registration failed');
  }

  return response.json();
}

export async function getAppStateApi() {
  const response = await fetch(`${API_BASE_URL}/state`);
  if (!response.ok) {
    throw new Error('Failed to fetch state from backend');
  }
  return response.json();
}

export const fetchAppState = getAppStateApi;

export async function uploadFaceApi(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/biometrics/face`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload face image');
  }

  return response.json();
}

export async function uploadVoiceApi(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/biometrics/voice`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload voice audio');
  }

  return response.json();
}

export async function ingestAssetApi(title: string, originalUrl: string, platform: string, file?: File) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('original_url', originalUrl);
  formData.append('platform', platform);
  if (file) {
    formData.append('file', file);
  }

  const response = await fetch(`${API_BASE_URL}/assets/ingest`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to ingest asset');
  }

  return response.json();
}

export async function checkoutSettlementApi(claimId: string) {
  const response = await fetch(`${API_BASE_URL}/settlement/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ claimId })
  });

  if (!response.ok) {
    throw new Error('Settlement checkout failed');
  }

  return response.json();
}
